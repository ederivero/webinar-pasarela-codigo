"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Comprobante = exports.Mesa = exports.Plato = exports.PedidoPlato = exports.Categoria = exports.Pedido = exports.Usuario = void 0;

var _Mesa = require("../models/Mesa");

var _Plato = require("../models/Plato");

var _PedidoPlato = require("../models/PedidoPlato");

var _Categoria = require("../models/Categoria");

var _Pedido = require("../models/Pedido");

var _Usuario = require("../models/Usuario");

var _Comprobante = require("../models/Comprobante");

const Usuario = (0, _Usuario.usuario_model)();
exports.Usuario = Usuario;
const Pedido = (0, _Pedido.pedido_model)();
exports.Pedido = Pedido;
const Categoria = (0, _Categoria.categoria_model)();
exports.Categoria = Categoria;
const PedidoPlato = (0, _PedidoPlato.pedidoplato_model)();
exports.PedidoPlato = PedidoPlato;
const Plato = (0, _Plato.plato_model)();
exports.Plato = Plato;
const Mesa = (0, _Mesa.mesa_model)();
exports.Mesa = Mesa;
const Comprobante = (0, _Comprobante.comprobante_model)(); // relaciones

exports.Comprobante = Comprobante;
Categoria.hasMany(Plato, {
  foreignKey: {
    name: "categoria_id",
    allowNull: false
  }
});
Plato.belongsTo(Categoria, {
  foreignKey: "categoria_id"
});
Plato.hasMany(PedidoPlato, {
  foreignKey: {
    name: "plato_id",
    allowNull: false
  }
});
PedidoPlato.belongsTo(Plato, {
  foreignKey: "plato_id"
});
PedidoPlato.belongsTo(Pedido, {
  foreignKey: {
    name: "pedido_id",
    allowNull: false
  }
});
Pedido.hasMany(PedidoPlato, {
  foreignKey: "pedido_id"
});
Pedido.belongsTo(Usuario, {
  foreignKey: {
    name: "usu_id",
    allowNull: false
  }
});
Usuario.hasMany(Pedido, {
  foreignKey: "usu_id"
});
Pedido.belongsTo(Mesa, {
  foreignKey: {
    name: "mesa_id",
    allowNull: false
  }
});
Mesa.hasMany(Pedido, {
  foreignKey: "mesa_id"
});
Pedido.hasOne(Comprobante, {
  foreignKey: {
    name: "pedido_id",
    allowNull: false
  }
});
Comprobante.belongsTo(Pedido, {
  foreignKey: "pedido_id"
});