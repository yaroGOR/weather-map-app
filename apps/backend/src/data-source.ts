import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { DataSource } from 'typeorm';

import { IConfig } from './interfaces/config.interface';

config();

const configService = new ConfigService<IConfig>();

const dataSource = new DataSource({
  cache: true,
  logging: configService.get('TURN_ON_TYPEORM_LOGS') === '1',
  migrationsRun: false,
  synchronize: false,
  type: 'postgres',
  host: configService.get('DB_HOST'),
  port: configService.get('DB_PORT'),
  username: configService.get('DB_USER'),
  password: configService.get('DB_PASS'),
  database: configService.get('DB_NAME'),
  entities: [`${__dirname}/**/*.entity{.ts,.js}`],
  migrations: [`${__dirname}/migrations/**/*{.ts,.js}`],
  poolSize: 20,
  ssl:
    configService.get('TURN_ON_TYPEORM_SSL') === '1'
      ? {
          rejectUnauthorized: false,
        }
      : false,
});

export default dataSource;
