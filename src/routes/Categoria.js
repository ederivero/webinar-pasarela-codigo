import { Router } from "express";
import {
  getCategorias,
  getPlatosByCategoriaId,
  postCategoria,
} from "../controllers/Categoria";

export const categoria_router = Router();

categoria_router.get("/categoria", getCategorias);
categoria_router.get("/categoria/:categoria_id/platos", getPlatosByCategoriaId);
categoria_router.post("/categoria", postCategoria);
