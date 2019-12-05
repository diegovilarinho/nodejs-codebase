const Validator = require('../Validator');

const UserAuthenticateSchema = {
    "id" : "UserAuthenticate",
    "title": "User Authenticate",
    "type" : "object",
    "properties" : {
        "email" : { 
            "type" :  "string"
        },
        "password" : { 
            "type" : "string",
            "minLength": 6
        }
    },
    "required" : ["email", "password"]
};

module.exports = UserAuthenticateSchema;