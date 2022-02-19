import winston from "winston";

export default winston.createLogger({
    level: 'info',
    transports: [
        new winston.transports.File({
            filename: 'data.log',
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.align(),
                winston.format.printf(info => `${info.level}: ${[info.timestamp]}: ${info.message}`),
            )
        }),
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.align(),
                winston.format.printf(info => `${info.level}: ${[info.timestamp]}: ${info.message}`),
            )
        })
    ]
});
