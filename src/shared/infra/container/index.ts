import { container } from 'tsyringe';

import UsersRepository from '@modules/users/infra/database/repositories/UsersRepository';
import { UsersInterface } from '@modules/users/interfaces/UsersInterface';

container.registerSingleton<UsersInterface>('UsersRepository', UsersRepository);
