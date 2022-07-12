import { kafka } from '@shared/infra/events/kafka';

import CreateUserController from '../controllers/CreateUserController';

const userConsumer = async (): Promise<void> => {
  const createUserController = new CreateUserController();
  const groupId = process.env.KAFKA_GROUP_ID || 'auth';

  const consumer = kafka.consumer({
    groupId,
  });

  await consumer.connect();

  await consumer.subscribe({
    topic: process.env.KAFKA_CREATE_USER_TOPIC as string,
  });

  await consumer.run({
    eachMessage: async ({ message }) => {
      const value = message.value?.toString();

      const parsedValue = JSON.parse(value as string);

      const { email, password, userId } = parsedValue;

      await createUserController.create({
        email,
        password,
        userRegisterDbId: userId,
      });
    },
  });
};

userConsumer();
