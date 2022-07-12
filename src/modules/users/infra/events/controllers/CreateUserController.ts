import { container } from 'tsyringe';

import CreateUserService from '@modules/users/services/CreateUserService';

import { UserDTO } from '@modules/users/dtos/UserDTO';

class CreateUserController {
  public async create(userData: UserDTO): Promise<void> {
    const createUserService = container.resolve(CreateUserService);

    await createUserService.execute(userData);
  }
}

export default CreateUserController;
