"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.imagen_router = void 0;

var _express = require("express");

var _Imagen = require("../controllers/Imagen.js");

var _multer = _interopRequireDefault(require("multer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const imagen_router = (0, _express.Router)();
exports.imagen_router = imagen_router;
const multer = (0, _multer.default)({
  storage: _multer.default.memoryStorage(),
  limits: {
    //bytes*1024=kilobytes*1024=megabytes
    fileSize: 5 * 1024 * 1024
  }
});
imagen_router.post("/plato/imagen/upload", multer.single("imagen"), _Imagen.subirImagen);