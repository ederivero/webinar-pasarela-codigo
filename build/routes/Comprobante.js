"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.comprobante_router = void 0;

var _express = require("express");

var _Comprobante = require("../controllers/Comprobante");

const comprobante_router = (0, _express.Router)();
exports.comprobante_router = comprobante_router;
comprobante_router.post("/mercadopago", _Comprobante.crearInitPoint);