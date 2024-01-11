export interface IConfig {
  NODE_ENV: 'development' | 'production' | 'test';

  SWAGGER_ENDPOINT: string;
  SWAGGER_SERVER_URL: string;

  TURN_ON_TYPEORM_LOGS: '0' | '1';
  TURN_ON_TYPEORM_SSL: '0' | '1';

  HOST: string;
  PORT: number;

  DB_HOST: string;
  DB_PORT: number;
  DB_USER: string;
  DB_PASS: string;
  DB_NAME: string;

  JWT_ACCESS_SECRET: string;

  LOGS_PATH: string;
}
