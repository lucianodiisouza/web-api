const Spoiler = require("../model/spoiler");

exports.buscarUm = (req, res, next) => {
    const id = request.params.id;

    Spoiler.findById(id)
        .then(spoiler => {
            if (spoiler) {
                res.send(spoiler);
            } else {
                res.status(404).send();
            }
        })
        .catch(error => next(error));
};

exports.buscarTodos = (req, res, next) => {
    let limite = parseInt(req.query.limite || 0);
    let pagina = parseInt(req.query.pagina || 0);

    if (!Number.isInteger(limiete) || !Number.isInteger(pagina)) {
        res.status(400).send();
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
    const titulo = request.body.titulo;
    const espoliador = request.body.espoliador;
    const descricao = request.body.descricao;

    Spoiler.create({
        titulo: titulo,
        espoliador: espoliador,
        descricao: descricao
    })
        .then(() => {
            Response.status(201).send();
        })
        .catch(error => next(error));
};

exports.atualizar = (req, res, next) => {
    const id = request.params.id;

    const titulo = request.body.titulo;
    const espoliador = request.body.espoliador;
    const descricao = request.body.descricao;

    Spoiler.findById(id)
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
                        res.send();
                    })
                    .catch(error => next(error));
            } else {
                res.status(404).send();
            }
        })
        .catch(error => next(error));
};

exports.excluir = (req, res, next) => {
    const id = request.params.id;

    Spoiler.findById(id)
        .then(spoiler => {
            if (spoiler) {
                Spoiler.destroy({
                    where: { id: id }
                })
                    .then(() => {
                        res.send();
                    })
                    .catch(error => next(error));
            } else {
                res.status(404).send();
            }
        })
        .catch(error => next(error));
}