import app from './app';

import '@modules/users/infra/events/consumers/CreateUserConsumer';

app.listen(process.env.EXPRESS_PORT, () => {
  console.log(`Server up on port ${process.env.EXPRESS_PORT}`);
});
