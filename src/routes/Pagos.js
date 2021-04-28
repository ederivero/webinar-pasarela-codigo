import { Router } from "express";
import {
  getFailure,
  getPending,
  getSuccess,
  postCrearPreferenceMercadoPago,
} from "../controllers/Pagos.js";

export const pagos_router = Router();

pagos_router.post("/simularpago", postCrearPreferenceMercadoPago);
pagos_router.get("/pagosuccess", getSuccess);
pagos_router.get("/pagofailure", getFailure);
pagos_router.get("/pagopending", getPending);
