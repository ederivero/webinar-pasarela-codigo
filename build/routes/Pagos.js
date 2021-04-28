"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pagos_router = void 0;

var _express = require("express");

var _Pagos = require("../controllers/Pagos.js");

const pagos_router = (0, _express.Router)();
exports.pagos_router = pagos_router;
pagos_router.post("/simularpago", _Pagos.postCrearPreferenceMercadoPago);
pagos_router.get("/pagosuccess", _Pagos.getSuccess);
pagos_router.get("/pagofailure", _Pagos.getFailure);
pagos_router.get("/pagopending", _Pagos.getPending);