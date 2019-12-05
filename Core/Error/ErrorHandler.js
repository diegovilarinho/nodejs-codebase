const HttpError = require('../../Core/Error/HttpError');
const MessageBroker = require('../Broker');

const ErrorHandler = (error, responseObject) => {

    //new MessageBroker('log').send('error', 'http.error', error);
    console.log(error);
    switch(error.constructor) {
        case HttpError:
            responseObject.status(error.status).send({
                message: error.message,
                errors: error.errors
            });
            return;
        default:
            responseObject.status(500).send({
                message: "Something went wrong in the server",
                "errors": []
            });
    }
} 

module.exports = ErrorHandler;