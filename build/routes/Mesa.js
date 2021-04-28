"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mesa_router = void 0;

var _Mesa = require("../controllers/Mesa.js");

var _express = require("express");

const mesa_router = (0, _express.Router)();
exports.mesa_router = mesa_router;
mesa_router.get("/mesa", _Mesa.getMesas);
mesa_router.get("/mesa/:mesa_id", _Mesa.getMesaById);
mesa_router.post("/mesa", _Mesa.postMesa);
mesa_router.put("/mesa/:mesa_id", _Mesa.putMesa);
mesa_router.delete("/mesa/:mesa_id", _Mesa.deleteMesa);