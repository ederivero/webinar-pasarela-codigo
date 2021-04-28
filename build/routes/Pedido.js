"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pedido_router = void 0;

var _express = require("express");

var _Pedido = require("../controllers/Pedido.js");

const pedido_router = (0, _express.Router)();
exports.pedido_router = pedido_router;
pedido_router.get("/pedido", _Pedido.getPedidos);
pedido_router.post("/pedido", _Pedido.postPedido);
pedido_router.get("/pedido/:pedido_id", _Pedido.getPedidoById);