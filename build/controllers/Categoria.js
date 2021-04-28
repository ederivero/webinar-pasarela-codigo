"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.postCategoria = exports.getPlatosByCategoriaId = exports.getCategorias = void 0;

var _relaciones = require("../config/relaciones");

const excluir = ["createdAt", "updatedAt"];

const getCategorias = (req, res) => {
  _relaciones.Categoria.findAll({
    attributes: {
      exclude: excluir
    }
  }).then(usuarios => {
    if (usuarios) {
      res.status(201).json({
        ok: true,
        content: usuarios
      });
    }
  });
};

exports.getCategorias = getCategorias;

const getPlatosByCategoriaId = (req, res) => {
  _relaciones.Categoria.findByPk(req.params.categoria_id, {
    include: [{
      model: _relaciones.Plato,
      attributes: {
        exclude: excluir
      }
    }],
    attributes: {
      exclude: excluir
    }
  }).then(usuarios => {
    if (usuarios) {
      res.status(201).json({
        ok: true,
        content: usuarios
      });
    }
  });
};

exports.getPlatosByCategoriaId = getPlatosByCategoriaId;

const postCategoria = (req, res) => {
  const objCategoria = _relaciones.Categoria.build({ ...req.body
  });

  objCategoria.save().then(data => {
    res.status(201).json(data);
  });
};

exports.postCategoria = postCategoria;