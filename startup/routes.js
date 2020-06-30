const express = require('express');
const genres = require('../routes/genres');
const customers = require('../routes/customers');
const movies = require('../routes/movies');
const users = require('../routes/user');
const error = require('../middlewares/error');
const login = require('../routes/login');
const rentals = require('../routes/rentals');

module.exports = function(app){

 app.use(express.json());
 app.use('/api/genres', genres);
 app.use('/api/customers', customers);
 app.use('/api/movies', movies);
 app.use('/api/rentals', rentals);
 app.use('/api/users', users);
 app.use('/api/login', login);
 app.use(error)

}