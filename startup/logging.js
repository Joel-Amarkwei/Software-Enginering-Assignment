require('express-async-errors');
require('winston-mongodb')
const winston = require('winston')

module.exports = function(){
    //  a better way of handling rejections or exceptions
    winston.handleExceptions(
        new winston.transports.Console({ colorize: true, pettyPrint: true }),
        new winston.transports.File( { filename: 'uncaughtExceptions.log' } ))
        
        process.on('unhandledRejection', (ex) => {
        throw ex
        })
        
        winston.add(winston.transports.File, { filename: 'logfile.log' });
        winston.add(winston.transports.MongoDB, { db: 'mongodb://localhost/vidly', level: 'info' })
        
}