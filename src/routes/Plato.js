import { Router } from "express";
import { getPlatoById, getPlatos, postPlato } from "../controllers/Plato.js";

export const plato_router = Router();

plato_router.get("/plato/:plato_id", getPlatoById);
plato_router.get("/plato", getPlatos);
plato_router.post("/plato", postPlato);
