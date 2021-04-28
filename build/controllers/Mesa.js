"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteMesa = exports.putMesa = exports.postMesa = exports.getMesaById = exports.getMesas = void 0;

var _relaciones = require("../config/relaciones");

var _server = require("../config/server");

var _Socket = require("./Socket");

const excluir = ["createdAt", "updatedAt"];

const getMesas = async (req, res) => {
  const mesas = await _relaciones.Mesa.findAll({
    attributes: {
      exclude: excluir
    }
  });

  if (mesas) {
    res.status(200).json({
      ok: true,
      content: mesas
    });
  }
};

exports.getMesas = getMesas;

const getMesaById = async (req, res) => {
  const mesa = await _relaciones.Mesa.findByPk(req.params.mesa_id);

  if (mesa) {
    res.status(200).json({
      ok: true,
      content: mesa
    });
  } else {
    res.status(404).json({
      ok: false,
      content: "no encontrado"
    });
  }
};

exports.getMesaById = getMesaById;

const postMesa = async (req, res) => {
  const objMesa = _relaciones.Mesa.build(req.body);

  const objMesaCreada = await objMesa.save();
  res.status(201).json({
    ok: true,
    content: objMesaCreada
  });
  const objServer = new _server.Server();

  _relaciones.Mesa.findAll().then(mesas => {
    console.log("emitiendo lista de mesas");
    objServer.io.emit("mesas-lista", JSON.stringify(mesas));
  });

  (0, _Socket.emitirReporte)();
};

exports.postMesa = postMesa;

const putMesa = async (req, res) => {
  let objMesa = await _relaciones.Mesa.update({ ...req.body
  }, {
    where: {
      mesa_id: req.params.mesa_id
    }
  });
  res.status(200).json({
    ok: objMesa[0] === 1,
    content: objMesa
  });
};

exports.putMesa = putMesa;

const deleteMesa = async (req, res) => {
  let objMesa = await _relaciones.Mesa.destroy({
    where: {
      mesa_id: req.params.mesa_id
    }
  });
  res.status(200).json({
    ok: objMesa === 1,
    content: objMesa
  });
};

exports.deleteMesa = deleteMesa;