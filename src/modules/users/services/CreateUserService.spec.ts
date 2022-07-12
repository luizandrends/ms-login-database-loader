import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../interfaces/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let createUserService: CreateUserService;

describe('CreateUserService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    createUserService = new CreateUserService(fakeUsersRepository);
  });

  it('should be able to create a user', async () => {
    const userData = {
      email: 'johndoe@example.com',
      password: '123456',
      userRegisterDbId: '62cd012e9d1c1a0f75411efd',
    };

    const createUser = await createUserService.execute(userData);

    expect(createUser).toHaveProperty('id');
  });

  it('should not be able to create a user with an existent email', async () => {
    const userData = {
      email: 'johndoe@example.com',
      password: '123456',
      userRegisterDbId: '62cd012e9d1c1a0f75411efd',
    };

    await createUserService.execute(userData);

    const repeatedEmail = {
      email: 'johndoe@example.com',
      password: '123456',
      userRegisterDbId: '62ce0680896e2f1bb0695fdc',
    };

    await expect(
      createUserService.execute(repeatedEmail)
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a user with an existent userRegisterDbId', async () => {
    const userData = {
      email: 'johndoe@example.com',
      password: '123456',
      userRegisterDbId: '62cd012e9d1c1a0f75411efd',
    };

    await createUserService.execute(userData);

    const repeatedEmail = {
      email: 'john@example.com',
      password: '123456',
      userRegisterDbId: '62cd012e9d1c1a0f75411efd',
    };

    await expect(
      createUserService.execute(repeatedEmail)
    ).rejects.toBeInstanceOf(AppError);
  });
});
