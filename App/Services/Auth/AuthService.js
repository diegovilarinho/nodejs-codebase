const jwt = require('jsonwebtoken');

class AuthService {
    static async generateToken(data) {
        const ret = await jwt.sign(data, process.env.SALT_KEY_USER, { expiresIn: '1d' });
        return ret;
    }    

    static async decodeToken(token) {
        const ret = await jwt.verify(token, process.env.SALT_KEY_USER);
        return ret;
    }
}

module.exports = AuthService;