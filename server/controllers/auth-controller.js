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

        return res.status(200).json({
            loggedIn: true,
            user: loggedInUser
        })
    } catch (err) {
        res.json(false);
    }
}

loginUser = async (req, res) => {
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
            user: existingUser
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
        const existingUser = await User.findOne({ email: email });
        const existingUsername = await User.findOne({ userName: userName});
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
            user: savedUser
        })
    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
}

findUserByEmail = async (req, res) => {
    try {
        const { email } = req.params;

        if (!email) {
            return res
                .status(400)
                .json({ errorMessage: "Please enter email." });
        }

        const emailPattern = XRegExp('^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$');
        if(!XRegExp.test(email, emailPattern)) {
            return res
                .status(400)
                .json({
                    errorMessage: "Invalid email address. Please re-enter with a valid one."
                });
        }

        const existingUser = await User.findOne({ email: email });
        if (!existingUser) {
            console.log('no such email')
            return res
                .status(400)
                .json({
                    errorMessage: "Non-exist email. Please register with this email or re-enter correct one."
                })
        }

        return res.status(200).json({
            success: true,
            user: existingUser
        })
    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
}

resetPassword = async (req, res) => {
    try {
        const { userId, newPassword, confirmNewPassword } = req.body;
        
        if(!userId){
            return res
                .status(401)
                .json({ errorMessage: "User ID does not exist." });
        }

        if(!newPassword || !confirmNewPassword){
            return res
                .status(401)
                .json({ errorMessage: "Please enter all fields to reset password." });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res
                .status(401)
                .json({
                    errorMessage: "User not found from given email."
                })
        }

        if(newPassword !== confirmNewPassword){
            return res
                .status(400)
                .json({
                    errorMessage: "New password should match with confirm new password."
                })
        }

        const matchOldPw = await bcrypt.compare(newPassword, user.passwordHash);
        if (matchOldPw) {
            return res
                .status(401)
                .json({
                    errorMessage: "New Password should not be same as your old password."
                })
        }

        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const passwordHash = await bcrypt.hash(newPassword, salt);
        console.log("passwordHash: " + passwordHash);

        user.passwordHash = passwordHash;

        user.save().then(() => {
            return res.status(200).json({
                message: "Password has been resetted successfully!",
                user: user
            });
        })
        .catch((err) => {
            return res.status(500).json({ errorMessage: err.message });
        });
    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
}

module.exports = {
    getLoggedIn,
    registerUser,
    loginUser,
    logoutUser,
    findUserByEmail,
    resetPassword
}