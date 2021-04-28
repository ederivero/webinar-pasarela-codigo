"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.categoria_router = void 0;

var _express = require("express");

var _Categoria = require("../controllers/Categoria");

const categoria_router = (0, _express.Router)();
exports.categoria_router = categoria_router;
categoria_router.get("/categoria", _Categoria.getCategorias);
categoria_router.get("/categoria/:categoria_id/platos", _Categoria.getPlatosByCategoriaId);
categoria_router.post("/categoria", _Categoria.postCategoria);