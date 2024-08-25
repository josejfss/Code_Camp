const port = (process.env.ALL_MICROSERVICE_PORT || 4000);

if (process.platform == 'linux') {
    "use strict";
}

const app = require('./server')

const server = app.listen(port, function () {
    console.log(`App listening at http://localhost:${port}`);
});