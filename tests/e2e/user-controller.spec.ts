import 'node-fetch';
jest.mock('node-fetch', () => jest.fn());

import { CreateUserDTO } from '../../src/application/use-cases/user-use-cases/create-user-dto';

describe('User Controller', () => {
  let userData: CreateUserDTO;

  beforeAll(() => {
    userData = {
      username: 'test' + new Date().getTime(),
      name: 'test',
      password: '123',
    };
  });

  it('Should create a new user', async () => {
    const response = await fetch('http://localhost:3000/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    expect(response.status).toBe(201);
  });

  it('Should not create a user with same username', async () => {
    const response = await fetch('http://localhost:3000/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    expect(await response.json()).toHaveProperty('error');
  });
});
