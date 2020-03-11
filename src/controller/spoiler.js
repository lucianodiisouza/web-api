const Spoiler = require("../model/spoiler");
const status = require('http-status');

exports.buscarUm = (req, res, next) => {
    const id = req.params.id;

    Spoiler.findByPk(id)
        .then(spoiler => {
            if (spoiler) {
                res.status(status.OK).send(spoiler);
            } else {
                res.status(status.NOT_FOUND).send();
            }
        })
        .catch(error => next(error));
};

exports.buscarTodos = (req, res, next) => {
    let limite = parseInt(req.query.limite || 0);
    let pagina = parseInt(req.query.pagina || 0);

    if (!Number.isInteger(limite) || !Number.isInteger(pagina)) {
        res.status(status.BAD_REQUEST).send();
    }

    const ITENS_POR_PAGINA = 10;

    limite = limite > ITENS_POR_PAGINA || limite <= 0 ? ITENS_POR_PAGINA : limite;
    pagina = pagina <= 0 ? 0 : pagina * limite;

    Spoiler.findAll({ limit: limite, offset: pagina })
        .then(spoilers => {
            res.send(spoilers);
        })
        .catch(error => next(error));
};

exports.criar = (req, res, next) => {
    const titulo = req.body.titulo;
    const espoliador = req.body.espoliador;
    const descricao = req.body.descricao;

    Spoiler.create({
        titulo: titulo,
        espoliador: espoliador,
        descricao: descricao
    })
        .then(() => {
            res.status(status.CREATED).send();
        })
        .catch(error => next(error));
};

exports.atualizar = (req, res, next) => {
    const id = req.params.id;

    const titulo = req.body.titulo;
    const espoliador = req.body.espoliador;
    const descricao = req.body.descricao;

    Spoiler.findByPk(id)
        .then(spoiler => {
            if (spoiler) {
                Spoiler.update(
                    {
                        titulo: titulo,
                        espoliador: espoliador,
                        descricao: descricao
                    },
                    { where: { id: id } }
                )
                    .then(() => {
                        res.status(status.OK).send();
                    })
                    .catch(error => next(error));
            } else {
                res.status(status.NOT_FOUND).send();
            }
        })
        .catch(error => next(error));
};

exports.excluir = (req, res, next) => {
    const id = req.params.id;

    Spoiler.findByPk(id)
        .then(spoiler => {
            if (spoiler) {
                Spoiler.destroy({
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