const mysql = require('../mysql').pool;

exports.getUsuarios = (req, res, next) => {
    mysql.getConnection((error, conn) => {

        if (error) {return res.status(500).send({ error: error })};

        conn.query(
            'SELECT * FROM usuarios;', 
            function (error, result, field) {
                if (error) {return res.status(500).send({ error: error})};
                // DOCUMENTA MELHOR A API
                const response = {
                    quantidade: result.length,
                    usuarios: result.map(usuario => {
                        return {
                            id_usuario: usuario.id_usuario,
                            login: usuario.login,
                            senha: usuario.senha
                        }
                    })
                }
                return res.status(200).send(response);
            }
        )
    })
    
};

exports.getUsuarioById = (req, res, next) => {
    mysql.getConnection((error, conn) => {

        if (error) {return res.status(500).send({ error: error })};

        conn.query(
            'SELECT * FROM usuarios WHERE id_usuario = ?;',
            [req.params.id_usuario],
            function (error, result, field) {
                if (error) {return res.status(500).send({ error: error})};

                if (result.length === 0) {
                    return res.status(404).send({ 
                        mensagem: "Nenhum usuário encontrado com o ID informado."
                    })
                }

                return res.status(200).send(result);
            }
        )
    })
};

exports.postUsuario = (req, res, next) => {
    mysql.getConnection((error, conn) => {

        if (error) {return res.status(500).send({ error: error })};

        conn.query(
            'INSERT INTO usuarios (login, senha) VALUES (?, ?);',
            [req.body.login, req.body.senha],
            function (error, result, field) {
                conn.release();
                
                if (error) {return res.status(500).send({ error: error })};

                res.status(201).send({
                    mensagem: "Usuário criado com sucesso",
                    id_criado: result.insertId
                })
            }
        )
    })

};

exports.removeUsuario = (req, res, next) => {
    mysql.getConnection((error, conn) => {

        if (error) {return res.status(500).send({ error: error })};

        conn.query(
            'DELETE FROM usuarios WHERE id_usuario = ?;',

            [req.params.id_usuario],

            function (error, result, field) {
                conn.release();

                if (error) {return res.status(500).send({ error: error })};

                const response = {
                    mensagem: "Usuário deletado com sucesso."
                }
                return res.status(202).send(response);
            }
        )
    })
};

exports.updateSenha = (req, res, next) => {
    mysql.getConnection((error, conn) => {

        if (error) {return res.status(500).send({ error: error })};

        conn.query(
            'UPDATE usuarios SET senha = ? WHERE id_usuario = ?;',
            
            [req.body.senha, req.body.id_usuario],

            function (error, result, field) {
                conn.release();
                
                if (error) {return res.status(500).send({ error: error })};

                const response = {
                    id_usuario: req.body.id_usuario,
                    login: req.body.login,
                    senha_nova: req.body.senha
                }
                return res.status(202).send(response);
            }
        )
    })

}