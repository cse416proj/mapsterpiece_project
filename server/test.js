const request = require("supertest");
const app = require("./app");

const mongoose = require('mongoose');

beforeEach(async () => {
  await mongoose.connect(process.env.DB_CONNECT);
})

afterEach(async () => {
  await mongoose.connection.close();
});

// describe('POST /register success', () => {
//   it('responds with 200 and success message on successful register', async () => {
//     const validRequestBody = {
//         firstName: 'user',
//         lastName: '4',
//         userName: 'user4',
//         email: 'user4@gmail.com',
//         password: 'user1234',
//         passwordVerify: 'user1234'
//     };

//     const response = await request(app)
//     .post('/auth/register')
//     .send(validRequestBody);

//     expect(response.status).toBe(200);
//     expect(response.body.success).toBe(true);
//     expect(response.body.user.firstName).toBe('user');
//     expect(response.body.user.lastName).toBe('4');
//     expect(response.body.user.userName).toBe('user4');
//     expect(response.body.user.email).toBe('user4@gmail.com');
//   });
// });

describe("POST /register fail", () => {
  it("responds with 400 on invalid email", async () => {
    const invalidRequestBody = {
      firstName: "user",
      lastName: "2",
      userName: "user2",
      email: "user2",
      password: "user",
      passwordVerify: "user",
    };

    const response = await request(app)
      .post("/auth/register")
      .send(invalidRequestBody);

    expect(response.status).toBe(400);
    expect(response.body.errorMessage).toBe("Invalid email address");
  });
});

describe("POST /login success", () => {
  it("responds with 200 on valid login email and password", async () => {
    const validRequestBody = {
      email: "user4@gmail.com",
      password: "user1234",
    };

    const response = await request(app)
      .post("/auth/login")
      .send(validRequestBody);

    expect(response.status).toBe(200);
  });
});

describe("POST /login fail", () => {
  it("responds with 401 on invalid email", async () => {
    const invalidRequestBody = {
      email: "user4",
      password: "user1234",
    };

    const response = await request(app)
      .post("/auth/login")
      .send(invalidRequestBody);

    expect(response.status).toBe(401);
  });

  it("responds with 401 on invalid password", async () => {
    const invalidRequestBody = {
      email: "user4@gmail.com",
      password: "user",
    };

    const response = await request(app)
      .post("/auth/login")
      .send(invalidRequestBody);

    expect(response.status).toBe(401);
  });

  it("responds with 400 on nothing entered", async () => {
    const invalidRequestBody = {
      email: null,
      password: null,
    };

    const response = await request(app)
      .post("/auth/login")
      .send(invalidRequestBody);

    expect(response.status).toBe(400);
  });

  it("responds with 400 on entered email but password empty", async () => {
    const invalidRequestBody = {
      email: "user4@gmail.com",
      password: null,
    };

    const response = await request(app)
      .post("/auth/login")
      .send(invalidRequestBody);

    expect(response.status).toBe(400);
  });

  it("responds with 400 on entered password but email empty ", async () => {
    const invalidRequestBody = {
      email: null,
      password: "user1234",
    };

    const response = await request(app)
      .post("/auth/login")
      .send(invalidRequestBody);

    expect(response.status).toBe(400);
  });
});

describe("POST /login success", () => {
  it("responds with 200 on valid login email and password", async () => {
    const validRequestBody = {
      email: "user4@gmail.com",
      password: "user1234",
    };

    const response = await request(app)
      .post("/auth/login")
      .send(validRequestBody);

    expect(response.status).toBe(200);
  });
});

describe("POST/GET/PUT post success", () => {
  let postId = null;
  const validRequestBody = {
    title: 'post title',
    tags: ['tag1', 'tag2'],
    content: "this is post content"
  };

  it("Create post", async () => {
    const response = await request(app)
      .post('/post/createPost')
      .set('Cookie', 'token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTVhNmFhMzA5MjZiMzE0OTVjMmM0YWMiLCJpYXQiOjE3MDExMTQ1MDh9.mWnIFB0dr-urQEWEYr8WoRWuhbNkIAAoisPTKeL6O9Y')
      .send(validRequestBody);

    expect(response.status).toBe(201);
    expect(response.body.message).toBe("Post created successfully!");
    expect(response.body.post).not.toBeNull();
    expect(response.body.post).toBeDefined();
    expect(response.body.post.ownerUserName).toBe('apple');
    expect(response.body.post.title).toBe(validRequestBody.title);
    expect(response.body.post.tags).toStrictEqual(validRequestBody.tags);
    expect(response.body.post.content).toBe(validRequestBody.content);

    postId = response.body.post._id;
  });

  it("Get post", async () => {
    const response = await request(app)
      .get(`/post/post/${postId}`)
      .set('Cookie', 'token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTVhNmFhMzA5MjZiMzE0OTVjMmM0YWMiLCJpYXQiOjE3MDExMTQ1MDh9.mWnIFB0dr-urQEWEYr8WoRWuhbNkIAAoisPTKeL6O9Y');

    expect(response.status).toBe(200);
    expect(response.body).not.toBeNull();
    expect(response.body).toBeDefined();
    expect(response.body.ownerUserName).toBe('apple');
    expect(response.body.title).toBe(validRequestBody.title);
    expect(response.body.tags).toStrictEqual(validRequestBody.tags);
    expect(response.body.content).toBe(validRequestBody.content);
  });

  it("Update post", async () => {
    const newValidRequestBody = {
      title: 'updated post title',
      tags: ['updated tag1', 'updated tag2'],
      content: "this is updated post content."
    };

    const response = await request(app)
      .put(`/post/updatePost/${postId}`)
      .set('Cookie', 'token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTVhNmFhMzA5MjZiMzE0OTVjMmM0YWMiLCJpYXQiOjE3MDExMTQ1MDh9.mWnIFB0dr-urQEWEYr8WoRWuhbNkIAAoisPTKeL6O9Y')
      .send(newValidRequestBody);

    expect(response.status).toBe(201);
    expect(response.body.message).toBe("Post updated successfully!");
    expect(response.body.post).not.toBeNull();
    expect(response.body.post).toBeDefined();
    expect(response.body.post.ownerUserName).toBe('apple');
    expect(response.body.post.title).toBe(newValidRequestBody.title);
    expect(response.body.post.tags).toStrictEqual(newValidRequestBody.tags);
    expect(response.body.post.content).toBe(newValidRequestBody.content);
    expect(response.body.post.title).not.toBe(validRequestBody.title);
    expect(response.body.post.tags).not.toBe(validRequestBody.tags);
    expect(response.body.post.content).not.toBe(validRequestBody.content);
  });
});

describe("POST/GET/PUT post fail", () => {
  it("Create post with missing title", async () => {
    const validRequestBody = {
      title: null,
      tags: ['tag1', 'tag2'],
      content: "this is post content"
    };

    const response = await request(app)
      .post('/post/createPost')
      .set('Cookie', 'token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTVhNmFhMzA5MjZiMzE0OTVjMmM0YWMiLCJpYXQiOjE3MDExMTQ1MDh9.mWnIFB0dr-urQEWEYr8WoRWuhbNkIAAoisPTKeL6O9Y') // Replace with your actual token and cookie name
      .send(validRequestBody);

    expect(response.status).toBe(400);
    expect(response.body.errorMessage).toBe("Please enter all required fields.");
  });

  it("Create post with missing tags", async () => {
    const validRequestBody = {
      title: 'post title',
      tags: null,
      content: "this is post content"
    };

    const response = await request(app)
      .post('/post/createPost')
      .set('Cookie', 'token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTVhNmFhMzA5MjZiMzE0OTVjMmM0YWMiLCJpYXQiOjE3MDExMTQ1MDh9.mWnIFB0dr-urQEWEYr8WoRWuhbNkIAAoisPTKeL6O9Y') // Replace with your actual token and cookie name
      .send(validRequestBody);

    expect(response.status).toBe(400);
    expect(response.body.errorMessage).toBe("Please enter all required fields.");
  });

  it("Create post with missing content", async () => {
    const validRequestBody = {
      title: 'post title',
      tags: ['tag1', 'tag2'],
      content: null
    };

    const response = await request(app)
      .post('/post/createPost')
      .set('Cookie', 'token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTVhNmFhMzA5MjZiMzE0OTVjMmM0YWMiLCJpYXQiOjE3MDExMTQ1MDh9.mWnIFB0dr-urQEWEYr8WoRWuhbNkIAAoisPTKeL6O9Y') // Replace with your actual token and cookie name
      .send(validRequestBody);

    expect(response.status).toBe(400);
    expect(response.body.errorMessage).toBe("Please enter all required fields.");
  });

  it("Get deleted post", async () => {
    const response = await request(app)
      .get(`/post/post/6564fb0b5686f6efcfea39b4`)
      .set('Cookie', 'token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTVhNmFhMzA5MjZiMzE0OTVjMmM0YWMiLCJpYXQiOjE3MDExMTQ1MDh9.mWnIFB0dr-urQEWEYr8WoRWuhbNkIAAoisPTKeL6O9Y');

    expect(response.status).toBe(404);
    expect(response.body.errorMessage).toBe("Post not found.");
  });
});