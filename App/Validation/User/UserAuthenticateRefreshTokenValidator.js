const Validator = require('../Validator');

const UserAuthenticateRefreshTokenSchema = {
    "id" : "UserAuthenticateRefreshToken",
    "title": "User Authenticate Refresh Token",
    "type" : "object",
    "properties" : {
        "token" : { 
            "type" :  "string"
        }
    },
    "required" : ["token"]
};

module.exports = UserAuthenticateRefreshTokenSchema;