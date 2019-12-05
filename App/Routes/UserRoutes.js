const Controller = require('../Controllers/UserController');

module.exports = [
    {
        method: 'get',
        route: '/users',
        handler: (req, res) => Controller.getMany(req, res),
    },
    {
        method: 'get',
        route: '/users/:id',
        handler: (req, res) => Controller.getById(req, res),
    },
    {
        method: 'post',
        route: '/users',
        handler: (req, res) => Controller.create(req, res),
    },
    {
        method: 'put',
        route: '/users/:id',
        handler: (req, res) => Controller.update(req, res),
    },
    {
        method: 'post',
        route: '/users/authenticate',
        handler: (req, res) => Controller.authenticate(req, res),
    },
    {
        method: 'post',
        route: '/users/refresh-auth',   
        handler: (req, res) => Controller.refreshAuth(req, res),
    },
    {
        method: 'put',
        route: '/users/:id/roles',
        handler: (req, res) => Controller.addUserRoles(req, res),
    }
]