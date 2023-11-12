const auth = require('../auth');
const User = require('../models/user-model');
const bcrypt = require('bcryptjs');
const XRegExp = require('xregexp');

getLoggedIn = async (req, res) => {
    try {
        let userId = auth.verifyUser(req);
        if (!userId) {
            return res.status(200).json({
                loggedIn: false,
                user: null,
                errorMessage: "?"
            })
        }

        const loggedInUser = await User.findOne({ _id: userId });
        console.log("loggedInUser: " + loggedInUser);

        return res.status(200).json({
            loggedIn: true,
            user: {
                firstName: loggedInUser.firstName,
                lastName: loggedInUser.lastName,
                email: loggedInUser.email,
                userName: loggedInUser.userName
            }
        })
    } catch (err) {
        console.log("err: " + err);
        res.json(false);
    }
}

loginUser = async (req, res) => {
    console.log("loginUser");
    try {
        const { email, password } = req.body;
        console.log(email, password);

        if (!email || !password) {
            return res
                .status(400)
                .json({ errorMessage: "Please enter all required fields." });
        }

        const existingUser = await User.findOne({ email: email });
        console.log("existingUser: " + existingUser);
        if (!existingUser) {
            return res
                .status(401)
                .json({
                    errorMessage: "Wrong email or password provided."
                })
        }

        console.log("provided password: " + password);
        const passwordCorrect = await bcrypt.compare(password, existingUser.passwordHash);
        if (!passwordCorrect) {
            console.log("Incorrect password");
            return res
                .status(401)
                .json({
                    errorMessage: "Wrong email or password provided."
                })
        }

        // LOGIN THE USER
        const token = auth.signToken(existingUser._id);
        console.log(token);

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: true
        }).status(200).json({
            success: true,
            user: {
                firstName: existingUser.firstName,
                lastName: existingUser.lastName,  
                userName: existingUser.userName,
                email: existingUser.email              
            }
        })

    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
}

logoutUser = async (req, res) => {
    res.cookie("token", "", {
        httpOnly: true,
        expires: new Date(0),
        secure: false,
        sameSite: "none"
    }).send();
}

registerUser = async (req, res) => {
    console.log("REGISTERING USER IN BACKEND");
    try {
        if(!req.body){
            return res
                .status(400)
                .json({ errorMessage: "Request body not found." });
        }

        const { firstName, lastName, userName, email, password, passwordVerify } = req.body;
        console.log("create user: " + firstName + " " + lastName + " " + email + " " + password + " " + passwordVerify);
        if (!firstName || !lastName || !userName || !email || !password || !passwordVerify) {
            return res
                .status(400)
                .json({ errorMessage: "Please enter all required fields." });
        }
        console.log("all fields provided");

        // Define the regular expression pattern for matching email
        const emailPattern = XRegExp('^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$');
        if(!XRegExp.test(email, emailPattern)) {
            return res
                .status(400)
                .json({
                    errorMessage: "Invalid email address"
                });
        }

        if (password.length < 8) {
            return res
                .status(400)
                .json({
                    errorMessage: "Please enter a password of at least 8 characters."
                });
        }
        if (password !== passwordVerify) {
            return res
                .status(400)
                .json({
                    errorMessage: "Please enter the same password twice."
                })
        }
        console.log("password and password verify match");
        const existingUser = await User.findOne({ email: email });
        const existingUsername = await User.findOne({ userName: userName});
        console.log("existingUser: " + existingUser);
        console.log("existingUsername: " + existingUsername);
        if (existingUser || existingUsername) {
            return res
                .status(400)
                .json({
                    success: false,
                    errorMessage: "An account with this email address or user name already exists."
                })
        }

        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const passwordHash = await bcrypt.hash(password, salt);
        console.log("passwordHash: " + passwordHash);

        const newUser = new User({firstName, lastName, userName, email, passwordHash});
        const savedUser = await newUser.save();
        console.log("new user saved: " + savedUser._id);

        return res.status(200).json({
            success: true,
            user: {
                firstName: savedUser.firstName,
                lastName: savedUser.lastName,  
                email: savedUser.email,
                userName: savedUser.userName                    
            }
        })
    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
}

deleteUser = async (req, res) => {
    console.log("deleteUser function: req res");
    try{
        if(!req.body){
            return res
                .status(400)
                .json({ errorMessage: "Request body not found." });
        }

        console.log(req);

        console.log(req.body);

        const { userName } = req.body;
        console.log(`userName: ${userName}`);

        // if(!userName){
        //     return res
        //         .status(400)
        //         .json({ errorMessage: "Empty User Name is not valid" });
        // }
        
        // call async function to remove user by userName
        async function asyncDeleteUser(userName) {
            User.findOneAndDelete({ userName: userName }, () => {
                console.log(`userFound: ${userName}`)
                res.cookie("token", "", {
                    httpOnly: true,
                    expires: new Date(0),
                    secure: false,
                    sameSite: "none"
                })
                .status(200).json({
                    success: true
                })
            }).catch(err => console.log(err))
        }

        asyncDeleteUser(userName);
    }
    catch(err){
        console.error(err);
        res.status(400).json({
            success: false,
            errorMessage: err
        });
    }
}

module.exports = {
    getLoggedIn,
    registerUser,
    loginUser,
    logoutUser,
    deleteUser
}