import request from 'supertest';
import { app } from '../../app';

it('clears the cookie after signing out', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@nicolasthompson.com',
      password: 'XXXXXXXX',
    })
    .expect(201);

  const res = await request(app)
    .post('/api/users/signout')
    .send({})
    .expect(200);

  expect(res.get('Set-Cookie')).toEqual([
    'session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly',
  ]);
});
