const Validator = require('../Validator');

const UserCreateSchema = {
    "id" : "UserCreate",
    "title": "User",
    "type" : "object",
    "properties" : {
        "name" : { 
            "type" : "string",
            "minLength": 3
        },
        "email" : { 
            "type" :  "string"
        },
        "password" : { 
            "type" : "string",
            "minLength": 6
        },
        "secondaryEmails": {
            "type": "array",
            "items": {
                "type": "string"
            }
        },
        "roles": {
            "type": "array",
            "items": {
                "type": "string"
            }
        }
    },
    "required" : ["name", "email", "password"]
};

module.exports = UserCreateSchema;