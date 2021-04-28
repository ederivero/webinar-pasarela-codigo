"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.emitirReporte = void 0;

var _server = require("../config/server");

var _relaciones = require("../config/relaciones");

const excluir = ["createdAt", "updatedAt"];

const emitirReporte = async () => {
  console.log("Emitiendo reporte");
  const objServer = new _server.Server();
  const mesas = await _relaciones.Mesa.count();
  const pedidos = await _relaciones.Pedido.count();
  const categorias = await _relaciones.Categoria.count();
  const pedidosLista = await _relaciones.PedidoPlato.findAll({
    include: [{
      model: _relaciones.Plato
    }]
  });
  const totalMoney = pedidosLista.reduce((prev, objPedidoPlato) => {
    var _objPedidoPlato$Plato;

    return prev + (+((_objPedidoPlato$Plato = objPedidoPlato.Plato) === null || _objPedidoPlato$Plato === void 0 ? void 0 : _objPedidoPlato$Plato.plato_pre) || 0) * +objPedidoPlato.pedidoplato_cant;
  }, 0);
  const pedidosCompletos = await _relaciones.Pedido.findAll({
    exclude: excluir,
    include: [{
      model: _relaciones.PedidoPlato,
      include: _relaciones.Plato
    }]
  });
  objServer.io.emit("reporte-dashboard", JSON.stringify({
    totales: {
      mesas,
      pedidos,
      categorias
    },
    total_caja: {
      totalMoney
    },
    pedidosCompletos
  }));
};

exports.emitirReporte = emitirReporte;