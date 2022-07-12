import { Users as User } from '@prisma/client';

import { prisma } from '@shared/infra/database';

import { UsersInterface } from '@modules/users/interfaces/UsersInterface';
import { UserDTO } from '@modules/users/dtos/UserDTO';

class UsersRepository implements UsersInterface {
  public async create(userData: UserDTO): Promise<User> {
    const user = await prisma.users.create({
      data: userData,
    });

    return user;
  }

  public async findByEmail(
    userEmail: string
  ): Promise<User | null | undefined> {
    const findUser = await prisma.users.findUnique({
      where: { email: userEmail },
    });

    return findUser;
  }

  public async findByRegisterDbId(
    registerDbId: string
  ): Promise<User | null | undefined> {
    const findUser = await prisma.users.findUnique({
      where: { userRegisterDbId: registerDbId },
    });

    return findUser;
  }
}

export default UsersRepository;
