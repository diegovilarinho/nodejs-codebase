const ping = require('./PingRoutes');
const user = require('./UserRoutes');

module.exports = [
    ...ping,
    ...user
]