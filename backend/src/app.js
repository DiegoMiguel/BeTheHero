/**O app.js será utilizado quando o modo de testes for utilizado */

const express = require('express');
const routes = require('./routes');
const cors = require('cors');

const app = express();
const { errors } = require('celebrate');

app.use(cors());

// Necessário para que todas as requisições sejam entendidas no formato json
app.use(express.json());
app.use(routes);
app.use(errors());

//app.listen(3333); - utilizado antes dos teste
module.exports = app;