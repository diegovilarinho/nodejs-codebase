const ErrorHandler = require('../../Core/Error/ErrorHandler');
const HttpHandler = require('../../Core/Error/HttpError');

class UserController {

    constructor() {
        this.service = require('../Services/User/UserService');
    }

    async getMany(req, res) {
        try{
            const result = await this.service.findUsers(req.query || {});
            if(result.length == 0) {
                res.status(204).json([]); 
                return;
            }
            res.status(200).json(result);
        }catch(error) {
            ErrorHandler(error, res);
            return;
        }
    }

    async getById(req, res) {
        try{
            const result = await this.service.findUser(req.params.id);
            res.status(200).json(result);
        }catch(error) {
            ErrorHandler(error, res);
            return;
        }
    }

    async create(req, res) {
        try{
            const Validator = require('../Validation/Validator');
            Validator.validate(
                req.body,
                require('../Validation/User/UserCreateValidator')
            );
            const result = await this.service.createUser(req.body);
            res.status(201).json(result);
        } catch(error) {
            if(error.name == 'MongoError' && error.code == '11000') {
                throw new HttpHandler('User with this email already exists', 409);
            }
            ErrorHandler(error, res);
            return;
        }
    }

    async update(req, res) {
        try{
            const Validator = require('../Validation/Validator');
            Validator.validate(
                req.body,
                require('../Validation/User/UserUpdateValidator')
            );
            const result = await this.service.updateUser(req.params.id, req.body, res);
            if(!result) {
                res.status(400).json({message: 'Fail to update user data'});
                return;
            }
            res.status(200).json({message: 'User data updated successfully'});
        }catch(error) {
            ErrorHandler(error, res);
            return;
        }
    }

    async authenticate(req, res) {
        try{
            const Validator = require('../Validation/Validator');
            Validator.validate(
                req.body,
                require('../Validation/User/UserAuthenticateValidator')
            );
            const result = await this.service.authenticateUser(req.body.email, req.body.password);
            console.log(result);
            res.status(200).json(result);
        } catch(error) {
            ErrorHandler(error, res);
            return;
        }
    }

    async refreshAuth(req, res) {
        try {
            Validator.validate(
                req.body,
                require('../Validation/User/UserAuthenticateRefreshToken')
            );
            const token = req.headers['x-auth'];
            const result = this.service.refreshAuth(token);
            res.status(200).json(...result);
        } catch (e) {
            ErrorHandler(error, res);
            return;
        }
    }

    async addUserRoles(req, res) {
        try{
            const result = await this.service.addUserRoles(req.params.id, req.body.roles);
            if(!result) {
                res.status(503).json({message: `Fail to assign roles to user ${req.params.id}. Try again.`});
            }
            res.status(200).json({message: `Assigned ${req.body.roles.join(', ')} roles to user ${req.params.id}`});
        }catch(error) {
            ErrorHandler(error, res);
            return;
        }
    }
}

module.exports = new UserController;