import { registerAs } from '@nestjs/config';

export const CONFIG_DATABASE = 'ledger';

export default registerAs(CONFIG_DATABASE, () => ({
  users: {
    uri: 'mongodb://admin:password@localhost:27018/',
    // uri: process.env.DATABASE_URL,
  },
}));
