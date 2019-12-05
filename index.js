const App = require('./Core/App');
require('dotenv').config({ path: `./Config/Environment/${process.env.NODE_ENV}.env` });
require('./Core/Utils');
server = new App();
server.run();