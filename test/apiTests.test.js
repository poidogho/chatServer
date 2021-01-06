const supertest = require('supertest');
const config = require('../config/keys');
const host = `${config.appUrl}:${config.appPort}`;
const request = supertest(host);

let token;
beforeAll((done) => {
  request
    .post('/api/login')
    .send({
      email: 'test@test.com',
      password: '12345',
    })
    .end((err, response) => {
      if (err) throw err;
      //console.log(response.body.token);
      token = response.body.token;
      done();
    });
});

describe('Get users', () => {
  it('should get all users', async () => {
    console.log(token);
    const response = await request.get('/api/users');
    //console.log(response);
    expect(response.statusCode).toBe(200);
    expect(response.body).not.toBeNull();
  });
});

describe('Get user', () => {
  it('should get a users', async () => {
    const response = await request.get('/api/users/2');
    //console.log(response);
    expect(response.statusCode).toBe(200);
    expect(response.body).not.toBeNull();
    expect(response.body.firstName).toContain('Odafe');
    expect(response.body.email).toEqual('poidogho@yahoo.com');
  });
});

// describe('Create User', () => {
//   it('create a user', async () => {
//     const users = await request.get('/api/users');
//     const userCount = users.body.length;
//     console.log(userCount);
//     const response = await request.post('/api/register').send({
//       firstName: 'test',
//       lastName: 'super test2',
//       email: 'supertest2@test.com',
//       password: '123456',
//     });
//     //console.log(response.body);
//     expect(response.statusCode).toBe(200);
//     //expect(response.body.length).toEqual(userCount + 1);
//     expect(response.body.user.email).toEqual('supertest2@test.com');
//   });
// });

describe('Create User that already exixts', () => {
  it('should throw a 404 error', async () => {
    const response = await request.post('/api/register').send({
      firstName: 'test',
      lastName: 'super test2',
      email: 'supertest2@test.com',
      password: '123456',
    });
    //console.log(response);
    expect(response.statusCode).toBe(500);
  });
});
