import { Params } from 'nestjs-pino';

export const loggerOptions: Params = {
  pinoHttp: {
    serializers: {
      err: (error) =>
        JSON.stringify({
          type: error.type,
          message: error.message,
          stack: error.stack,
        }),
    },
    transport: {
      targets: [
        {
          level: 'info',
          target: 'pino-pretty',
          options: { colorize: true, singleLine: true },
        },
      ],
    },
  },
};
