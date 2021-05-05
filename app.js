const express = require('express')
const morgan = require('morgan');
const app = express();

const rotaUsuarios = require('./routes/usuarios')

// TODOS OS APP.USE SÃO EXECUTADOS EM ORDEM

app.use(morgan('dev'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', "*") // CASO PRECISE QUE A API SÓ SEJA ACESSÍVEL DE UM SERVIDOR ESPECÍFICO
    res.header(
        'Access-Control-Allow-Header', 
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );

    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).send({});
    }

    next();

});

app.use('/usuarios', rotaUsuarios);

// QUANDO NÃO ENCONTRAR ROTA EXECUTA OS SEGUINTES APP.USE
app.use((req, res, next) => {
    const error = new Error('Não encontrado');
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    return res.send({ 
        error: {
            mensagem: error.message
        }
    })
});

module.exports = app;