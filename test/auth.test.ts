import request from 'supertest';
import app from '../src/app';
import db from '../src/drizzle/db';
import { usersTable } from '../src/drizzle/schema';
import { eq } from 'drizzle-orm';

describe('Auth API Unit Test', () => {


  const testUser = {
    firstName: 'Newton',
    lastName: 'chumba',
    email: 'newton@gmail.com',
    password: 'admin',
    userType: 'admin'
  };
  //1. Test to register user
  it('should register a user', async () => {
    const res = await request(app).post('/api/auth/register').send(testUser);

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('message');
    expect(res.body.message).toBe("User Created Successfully ");
  });
  //Login Test for User
  it('should login the user and return JWT', async () => {
    const res = await request(app).post('/api/auth/login').send({
      email: testUser.email,
      password: testUser.password,
    });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('token');
    expect(res.body).toHaveProperty('userId')

  });

  
  afterAll(async () => {
    await db.delete(usersTable).where(eq(usersTable.email, testUser.email));
    //await db.$client.end(); // or await client.end(); depending on your setup
  });
});