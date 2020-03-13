const Usuario = require("../model/usuario");
const status = require('http-status');
const crypto = require('crypto');

exports.buscaUsuario = (req, res, next) => {
    const id = req.params.id;

    Usuario.findByPk(id)
        .then(usuario => {
            if (usuario) {
                res.status(status.OK).send(usuario);
            } else {
                res.status(status.NOT_FOUND).send();
            }
        })
        .catch(error => next(error));
};

exports.buscaTodosUsuarios = (req, res, next) => {
    let limite = parseInt(req.query.limite || 0);
    let pagina = parseInt(req.query.pagina || 0);

    if (!Number.isInteger(limite) || !Number.isInteger(pagina)) {
        res.status(status.BAD_REQUEST).send();
    }

    const USUARIOS_POR_PAGINA = 10;

    limite = limite > USUARIOS_POR_PAGINA || limite <= 0 ? USUARIOS_POR_PAGINA : limite;
    pagina = pagina <= 0 ? 0 : pagina * limite;

    Usuario.findAll({ limit: limite, offset: pagina })
        .then(usuarios => {
            res.send(usuarios);
        })
        .catch(error => next(error));
}
exports.criarUsuario = (req, res, next) => {
    const nome = req.body.nome;
    const email = req.body.email;
    const telefone = req.body.telefone;
    const senha = req.body.senha;
    const senhaCrypto = crypto.createHmac('sha256', senha)
        .update('thecodelovers')
        .digest('hex');
    const rua = req.body.rua;
    const numero = req.body.numero;
    const bairro = req.body.bairro;
    const cidade = req.body.cidade;
    const estado = req.body.estado;
    const complemento = req.body.complemento;

    Usuario.findOne({
        where: { email: email }
    })
    .then(usuario => {
        if (usuario) {
            res.status(status.ALREADY_REPORTED);
        } else {
            Usuario.create({
                nome: nome,
                email: email,
                telefone: telefone,
                senha: senhaCrypto,
                rua: rua,
                numero: numero,
                bairro: bairro,
                cidade: cidade,
                estado: estado,
                complemento: complemento
            })
                .then(() => {
                    res.status(status.CREATED).send();
                })
                .catch(error => next(error));
        }
    })
}



exports.atualizarUsuario = (req, res, next) => {
    const id = req.params.id;

    const nome = req.body.nome;
    const email = req.body.email;
    const telefone = req.body.telefone;
    const rua = req.body.rua;
    const numero = req.body.numero;
    const bairro = req.body.bairro;
    const cidade = req.body.cidade;
    const estado = req.body.estado;
    const complemento = req.body.complemento;

    Usuario.findByPk(id)
        .then(usuario => {
            if (usuario) {
                Usuario.update({
                    nome: nome,
                    email: email,
                    telefone: telefone,
                    rua: rua,
                    numero: numero,
                    bairro: bairro,
                    cidade: cidade,
                    estado: estado,
                    complemento: complemento
                }, {
                    where: { id: id }
                })
                    .then(() => {
                        res.status(status.OK).send();
                    })
                    .catch(error = next(error));
            } else {
                res.status(status.NOT_FOUND).send();
            }
        })
        .catch(error => next(error));
}

exports.excluirUsuario = (req, res, next) => {
    const id = req.params.id;

    Usuario.findByPk(id)
        .then(usuario => {
            if (usuario) {
                Usuario.destroy({
                    where: { id: id }
                })
                    .then(() => {
                        res.status(status.OK).send();
                    })
                    .catch(error => next(error));
            } else {
                res.status(status.NOT_FOUND).send();
            }
        })
        .catch(error => next(error));
}