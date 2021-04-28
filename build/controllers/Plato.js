"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.postPlato = exports.getPlatos = exports.getPlatoById = void 0;

var _relaciones = require("../config/relaciones");

var _Socket = require("./Socket");

const excluir = ["createdAt", "updatedAt"];

const getPlatoById = (req, res) => {
  _relaciones.Plato.findByPk(req.params.plato_id).then(objPlato => {
    res.status(200).json({
      ok: true,
      content: objPlato
    });
  });
};

exports.getPlatoById = getPlatoById;

const getPlatos = async (req, res) => {
  const objPlatos = await _relaciones.Plato.findAll({
    attributes: {
      exclude: excluir
    },
    include: [{
      model: _relaciones.Categoria,
      attributes: {
        exclude: [...excluir]
      }
    }]
  });
  res.status(200).json({
    ok: true,
    content: objPlatos
  });
};

exports.getPlatos = getPlatos;

const postPlato = (req, res) => {
  const objPlato = _relaciones.Plato.build(req.body);

  objPlato.save().then(data => {
    console.log(data);
    res.status(201).json({
      ok: true,
      content: objPlato
    });
  });
  (0, _Socket.emitirReporte)();
};

exports.postPlato = postPlato;