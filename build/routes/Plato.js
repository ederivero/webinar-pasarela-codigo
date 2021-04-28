"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.plato_router = void 0;

var _express = require("express");

var _Plato = require("../controllers/Plato.js");

const plato_router = (0, _express.Router)();
exports.plato_router = plato_router;
plato_router.get("/plato/:plato_id", _Plato.getPlatoById);
plato_router.get("/plato", _Plato.getPlatos);
plato_router.post("/plato", _Plato.postPlato);