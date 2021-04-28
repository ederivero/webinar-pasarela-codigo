"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.postPedido = exports.getPedidoById = exports.getPedidos = void 0;

var _relaciones = require("../config/relaciones");

var _sequelize = require("../config/sequelize");

var _Socket = require("./Socket");

const excluir = ["createdAt", "updatedAt"];

const getPedidos = async (req, res) => {
  const pedidos = await _relaciones.Pedido.findAll({
    attributes: {
      exclude: excluir
    },
    include: [{
      model: _relaciones.Mesa,
      attributes: {
        exclude: excluir
      }
    }, {
      model: _relaciones.Usuario,
      attributes: {
        include: ["usu_nom", "usu_ape", "usu_email", "usu_tipo"],
        exclude: [...excluir, "usu_hash", "usu_salt"]
      }
    }, {
      model: _relaciones.PedidoPlato,
      attributes: {
        exclude: excluir
      }
    }]
  });
  res.status(200).json({
    ok: true,
    pedidos
  });
};

exports.getPedidos = getPedidos;

const getPedidoById = async (req, res) => {
  const pedido = await _relaciones.Pedido.findByPk(req.params.pedido_id, {
    attributes: {
      exclude: excluir
    },
    include: [{
      model: _relaciones.Mesa,
      attributes: {
        exclude: excluir
      }
    }, {
      model: _relaciones.Usuario,
      attributes: {
        include: ["usu_nom", "usu_ape", "usu_email", "usu_tipo"],
        exclude: [...excluir, "usu_hash", "usu_salt"]
      }
    }, {
      model: _relaciones.PedidoPlato,
      attributes: {
        exclude: excluir
      },
      include: [{
        model: _relaciones.Plato,
        attributes: {
          exclude: excluir
        }
      }]
    }]
  });
  res.status(200).json({
    ok: true,
    pedido
  });
};

exports.getPedidoById = getPedidoById;

const postPedido = async (req, res) => {
  /**EJEMPLO DE OBJ QUE DEBEMOS MANDAR DESDE FRONT
   * {
    "pedido_fech": "2021-01-15 09:20:00",
    "pedido_nro": "123",
    "pedido_est": "pagado",
    "usu_id": 9,
    "mesa_id": 4,
    "pedidoplatos": [
        {
            "plato_id": 1,
            "pedidoplato_cant": 3
        },
        {
            "plato_id": 2,
            "pedidoplato_cant": 2
        }
    ]
  }
   */

  /**
   * Cada pedidoplato{} debe tener
   * [
   *  {
   *   plato_id:1,
   *   pedidoplato_cant:5
   *  }
   *  {
   *   plato_id:1,
   *   pedidoplato_cant:5
   *  }
   * ]
   */
  const {
    pedidoplatos
  } = req.body;
  const t = await _sequelize.conexion.transaction();

  try {
    const objPedido = await _relaciones.Pedido.create(req.body, {
      transaction: t
    }); // considerar agregar la fecha desde el backend al objPedido recientemente
    // creado

    for (const pedidoplato of pedidoplatos) {
      await _relaciones.PedidoPlato.create({ ...pedidoplato,
        pedido_id: objPedido.pedido_id
      }, {
        transaction: t
      });
    }

    await t.commit();
    (0, _Socket.emitirReporte)();
    res.status(201).json({
      ok: true,
      content: objPedido
    });
  } catch (error) {
    await t.rollback();
    res.status(500).json({
      ok: false,
      content: "Errores en el servidor",
      error: error
    });
    throw new Error(error);
  }
};

exports.postPedido = postPedido;