const request = require('supertest')
const express = require('express')

// set up server port
const dotenv = require('dotenv')
dotenv.config()
const PORT = process.env.PORT || 4000;

// set up backend framework & allow read body as json
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// connect to router
const authRouter = require('../routes/auth-router')
app.use('/auth', authRouter)

// connect to database
const db = require('../db')
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

// set up server @ port
let server;
beforeAll(() => {
  server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  app.on('error', (e) => log.error(`Error opening listener on port ${port}`, e));
})

afterAll((done) => {
  server.close(done);
})

describe('POST /register success', () => {
  it('responds with 200 and success message on successful register', async () => {
    const validRequestBody = {
        firstName: 'user',
        lastName: '4',
        userName: 'user4',
        email: 'user4@gmail.com',
        password: 'user1234',
        passwordVerify: 'user1234'
    };
    
    const response = await request(app)
    .post('/auth/register')
    .send(validRequestBody);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.user.firstName).toBe('user');
    expect(response.body.user.lastName).toBe('4');
    expect(response.body.user.userName).toBe('user4');
    expect(response.body.user.email).toBe('user4@gmail.com');
  });
});

describe('POST /register fail', () => {
    it('responds with 400 on invalid email', async () => {
        const invalidRequestBody = {
            firstName: 'user',
            lastName: '2',
            userName: 'user2',
            email: 'user2',
            password: 'user',
            passwordVerify: 'user'
        };

        const response = await request(app)
            .post('/auth/register')
            .send(invalidRequestBody);

        expect(response.status).toBe(400);
        expect(response.body.errorMessage).toBe("Invalid email address");
    });
});

describe('POST /login success', () => {
    it('responds with 200 on valid login email and password', async () => {
        const validRequestBody ={
            email: 'user4@gmail.com',
            password: 'user1234'
        };

        const response = await request(app)
            .post('/auth/login')
            .send(validRequestBody);

        expect(response.status).toBe(200);
    });
});

describe('POST /login fail', () => {
    it('responds with 401 on invalid email', async() => {
        const invalidRequestBody ={
            email: 'user4',
            password: 'user1234'
        };

        const response = await request(app)
            .post('/auth/login')
            .send(invalidRequestBody);

        expect(response.status).toBe(401);
    })

    it('responds with 401 on invalid password', async() => {
        const invalidRequestBody ={
            email: 'user4@gmail.com',
            password: 'user'
        };

        const response = await request(app)
            .post('/auth/login')
            .send(invalidRequestBody);

        expect(response.status).toBe(401);
    })

    it('responds with 400 on nothing entered', async() => {
        const invalidRequestBody ={
            email: null,
            password: null
        };

        const response = await request(app)
            .post('/auth/login')
            .send(invalidRequestBody);

        expect(response.status).toBe(400);
    })

    it('responds with 400 on entered email but password empty', async() => {
        const invalidRequestBody ={
            email: 'user4@gmail.com',
            password: null
        };

        const response = await request(app)
            .post('/auth/login')
            .send(invalidRequestBody);

        expect(response.status).toBe(400);
    })

    it('responds with 400 on entered password but email empty ', async() => {
        const invalidRequestBody ={
            email: null,
            password: 'user1234'
        };

        const response = await request(app)
            .post('/auth/login')
            .send(invalidRequestBody);

        expect(response.status).toBe(400);
    })


});