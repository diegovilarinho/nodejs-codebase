const HttpError = require('../../Core/Error/HttpError');
const validate = require('jsonschema').validate;

class Validator {

    static validate(obj, schema) {
        const result = validate(obj, schema);
        if(result.errors.length) {
            const errors = result.errors.map(error => error.message);
            throw new HttpError("Validation Error", 400, errors);
        }else {
            return true;
        }
    }
}

module.exports = Validator;