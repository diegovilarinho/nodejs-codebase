const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');

class App {

    constructor(port = process.env.port || 3193) {
        this.handleAppErrors();
        this.port = port;
        this.server = null;
        this.app = express();
        this.app.use(bodyParser.json({ limit: '5mb' }));
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use((req,res,next) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-auth');
            res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
            res.header('Content-Type', 'application/json');
            next();
        })
        this.routes = require('../App/Routes');
        this.setRoutes();
    }

    setRoutes() {
        this.router = express.Router();
        this.routes.forEach(route => {
            const middleware = hasProperty(route, 'middleware');
            if(middleware) {
                this.router[route.method](route.route, middleware, route.handler);
            }else {
                this.router[route.method](route.route, route.handler);
            }
        });
        this.app.use(`/${process.env.API_VERSION}/`, this.router);
    }

    run() {
        this.server = http.createServer(this.app);
        this.server.listen(this.port, () => {
            console.log(`Server running in port: ${this.port} | ENV: ${process.env.NODE_ENV}`);
        });
    }

    handleAppErrors() {
        process.on('unhandledRejection', (reason, promise) => {
            console.log('Unhandled Rejection at:', reason.stack || reason);
            // Recommended: send the information to sentry.io
            // or whatever crash reporting service you use
        });
    }
}

module.exports = App;