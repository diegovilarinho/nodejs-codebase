const md5 = require('md5');
const AuthService = require('../Auth/AuthService');
const HttpHandler = require('../../../Core/Error/HttpError');

class UserService {
    constructor() {
        this._repository = require('../../Repository/UserRepository');
    }

    async createUser(data) {
        data.password = data.password ? md5(data.password + process.env.SALT_KEY_USER) : undefined;
        data.secondaryEmails = data.secondaryEmails || [];
        data.createdAt = new Date(Date.now()).toISOString();
        data.updatedAt = null;
        const result = await this._repository.create(data);
        return result;
    }

    async findUser(id) {
        const ObjectId = require('mongodb').ObjectID;
        return this._repository.findOne({_id: new ObjectId(id)});
    }

    async findUsers(filterObj) {
        const users = await this._repository.find(filterObj);
        return users;
    }

    async deleteUser(id) {
        const ObjectId = require('mongodb').ObjectID;
        return this._repository.delete({_id: new ObjectId(id)});
    }

    async updateUser(id, data, res) {
        const ObjectId = require('mongodb').ObjectID;
        const cleaner = require('deep-cleaner');
        data.password = data.password ? md5(data.password + process.env.SALT_KEY_USER) : undefined;
        const user = {...data};
        cleaner(user);
        return this._repository.update(new ObjectId(id), user);
    }

    async authenticateUser(email, password) {
        password = md5(password + process.env.SALT_KEY_USER);
        console.log(email, password);
        const user = await this._repository.findOne({email, password});
        
        if (!user) {
            throw new HttpHandler('Invalid email or password', 400);
        }

        const token = await AuthService.generateToken({
            id: user._id,
            email: user.email,
            name: user.name
        });

        return {
            token: token,
            email: user.email,
            name: user.name
        };
    }
    
    async refreshAuth(token) {
        const data = await AuthService.decodeToken(token);
        if(!data || !data.id) throw new HttpHandler('Invalid Token', 400);

        const user = await this.findUser(data.id);
        if (!user) throw new HttpHandler('Invalid Token', 400);

        const newToken = await AuthService.generateToken({
            id: user._id,
            email: user.email,
            name: user.name
        });

        return newToken;
    }

    async addUserRoles(id, roles) {
        const aclService = require('../Acl/AclService');
        const result = await aclService.addUserRoles(id, roles);
        return result;
    }
}

module.exports = new UserService;