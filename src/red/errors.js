const responses = require('./responses');

function errors(err, req, res, next ){
    console.error('error', err);

    const message = err.message || 'Internal error';
    const status = err.statusCode || 500;

    responses.error (req, res, message, status);
}

module.exports = errors