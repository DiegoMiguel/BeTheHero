const knex = require('knex');
const configuration = require('../../knexfile');

const config = (process.env.NODE_ENV === 'test')? configuration.test : configuration.development; //NODE_ENV: variável ambiente gerada no modo de test

const connection = knex(config);

module.exports = connection;