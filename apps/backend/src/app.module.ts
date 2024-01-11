import { Module } from '@nestjs/common';
import { loggerOptions } from './logger.config';
import dataSource from './data-source';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule } from 'nestjs-pino';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [],
  imports: [
    
    ConfigModule.forRoot({ isGlobal: true }),
    LoggerModule.forRoot(loggerOptions),
    TypeOrmModule.forRoot(dataSource.options),
  ],
  providers: [],
})
export class AppModule {}
