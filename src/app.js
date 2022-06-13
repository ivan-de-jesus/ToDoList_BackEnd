const express = require('express');
const morgan = require('morgan');
const config = require('./config');
const tasks = require('./modules/tasks/routes');
const error = require('./red/errors');

const app = express();

//Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


//setting
app.set('port', config.app.port);

//routes
app.use('/api/todoList',tasks)
app.use('/api/todoList/status',tasks)
app.use(error);

module.exports = app;
