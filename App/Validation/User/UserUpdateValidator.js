const Validator = require('../Validator');

const UserUpdateSchema = {
    "id" : "UserUpdate",
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
    }
};

module.exports = UserUpdateSchema;