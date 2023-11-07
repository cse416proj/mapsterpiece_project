const request = require('supertest')
const app = require('./app')

describe('POST /register success', () => {
  it('responds with 200 and success message on successful register', async () => {
    const validRequestBody = {
        firstName: 'user',
        lastName: '1',
        userName: 'user1',
        email: 'user1@gmail.com',
        password: 'user1234',
        passwordVerify: 'user1234'
    };
    
    const response = await request(app)
    .post('/auth/register')
    .send(validRequestBody);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.user.firstName).toBe('user');
    expect(response.body.user.lastName).toBe('1');
    expect(response.body.user.userName).toBe('user1');
    expect(response.body.user.email).toBe('user1@gmail.com');

    await request(app)
    .delete('/auth/user')
    .send({ userName: 'user1', });
    if(response.body.success){
      console.log('user removed');
    }
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