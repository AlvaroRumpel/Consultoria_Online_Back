const bodyParser = require('body-parser');
const client = require('./clientRoute');
const initialForms = require('./initialFormsRoute');
const clientFormRoute = require('./clientFormRoute');

module.exports = app => {
    app.use(
        bodyParser.json(),
        client,
        initialForms,
        clientFormRoute
    );
}