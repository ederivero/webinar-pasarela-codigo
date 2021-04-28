import {
  getMesas,
  postMesa,
  putMesa,
  deleteMesa,
  getMesaById,
} from "../controllers/Mesa.js";
import { Router } from "express";

export const mesa_router = Router();

mesa_router.get("/mesa", getMesas);
mesa_router.get("/mesa/:mesa_id", getMesaById);
mesa_router.post("/mesa", postMesa);
mesa_router.put("/mesa/:mesa_id", putMesa);
mesa_router.delete("/mesa/:mesa_id", deleteMesa);
