import { RegistrarUsuario, Login, getUsuarios } from "../controllers/Usuario";
import { wachiman } from "../utils/utils";

import express from "express";
const { Router } = express;

export let usuario_router = Router();

usuario_router.post("/registro", RegistrarUsuario);
usuario_router.post("/login", Login);
usuario_router.get("/usuario", wachiman, getUsuarios);
usuario_router.post("/verificar", wachiman, (req, res) =>
  res.status(200).json({ ok: true, content: "token valido" })
);
