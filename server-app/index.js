const express = require('express');
const routerUser = require('./routes/user');
const routerProfissional = require('./routes/profissional');
const routerServico = require('./routes/servico');

const app = express();

app.use(express.json());

app.use('/user', routerUser);
app.use('/profissional', routerProfissional);
app.use('/servico', routerServico);

app.listen(3000, () => {
    console.log('Running in port 3000...')
})