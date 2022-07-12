import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import { UsersInterface } from '../interfaces/UsersInterface';
import { UserDTO } from '../dtos/UserDTO';

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: UsersInterface
  ) {}

  public async execute(userData: UserDTO): Promise<void> {
    const { email, password, userRegisterDbId } = userData;

    const findUserByEmail = await this.usersRepository.findByEmail(email);
    const findUserByRegisterDbId =
      await this.usersRepository.findByRegisterDbId(userRegisterDbId);

    if (findUserByEmail) {
      throw new AppError('Email already exists', 401);
    }

    if (findUserByRegisterDbId) {
      throw new AppError('User register db already exists', 401);
    }

    await this.usersRepository.create({
      email,
      password,
      userRegisterDbId,
    });
  }
}

export default CreateUserService;
