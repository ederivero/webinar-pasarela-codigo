import { Router } from "express";
import { crearInitPoint } from "../controllers/Comprobante";

export const comprobante_router = Router();

comprobante_router.post("/mercadopago", crearInitPoint);
