import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  type: process.env.DB_TYPE || 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3307,
  name: process.env.DB_DATABASE || 'chat-db',
  username: process.env.DB_USERNAME || 'root',
  userpassword: process.env.DB_PASSWORD || 'root',
}));
