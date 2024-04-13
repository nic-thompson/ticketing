import request from 'supertest';
import { app } from '../../app';
import e from 'express';

it('fails when a email that does not exist is supplied', async () => {
  await request(app)
    .post('/api/users/signin')
    .send({
      email: 'test@nicolasthompson.com',
      password: 'XXXXXXXX',
    })
    .expect(400);
});

it('fails when an incorrect password is supplied', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@nicolasthompson.com',
      password: 'XXXXXXXX',
    })
    .expect(201);

  await request(app)
    .post('/api/users/signin')
    .send({
      email: 'test@nicolasthompson.com',
      password: 'X',
    })
    .expect(400);
});

it('responds with a cookie when given valid credentials', async () => {
  const response = await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@nicolasthompson.com',
      password: 'XXXXXXXX',
    })
    .expect(201);

  expect(response.get('Set-Cookie')).toBeDefined();
});
