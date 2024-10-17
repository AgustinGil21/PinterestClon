import { createLogger, format, transports } from 'winston';
const customLevels = {
    levels: {
        Error: 0,
        Warn: 1,
        Info: 2,
        Response: 3,
    },
    colors: {
        Error: 'bold red',
        Warn: 'bold yellow',
        Info: 'bold blue',
        Response: 'bold magenta',
    },
};
const loggerConfig = {
    format: format.combine(format.colorize({ all: true }), format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss',
    }), format.json(), format.printf((info) => {
        return `[${info.level}]: {
         message: ${info.message},
         timestamp: ${info.timestamp}
        }`;
    })),
    transports: [
        new transports.Console(),
        new transports.File({
            filename: '../logs/errors.log',
            level: 'error',
        }),
        new transports.File({
            filename: '../logs/warns.log',
            level: 'warn',
        }),
        new transports.File({
            filename: '../logs/info.log',
            level: 'info',
        }),
    ],
};
export const logger = createLogger(loggerConfig);
