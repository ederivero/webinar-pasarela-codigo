"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.usuario_router = void 0;

var _Usuario = require("../controllers/Usuario");

var _utils = require("../utils/utils");

var _express = _interopRequireDefault(require("express"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  Router
} = _express.default;
let usuario_router = Router();
exports.usuario_router = usuario_router;
usuario_router.post("/registro", _Usuario.RegistrarUsuario);
usuario_router.post("/login", _Usuario.Login);
usuario_router.get("/usuario", _utils.wachiman, _Usuario.getUsuarios);
usuario_router.post("/verificar", _utils.wachiman, (req, res) => res.status(200).json({
  ok: true,
  content: "token valido"
}));