import { Router } from "express";
import { subirImagen } from "../controllers/Imagen.js";
import Multer from "multer";

export const imagen_router = Router();
const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    //bytes*1024=kilobytes*1024=megabytes
    fileSize: 5 * 1024 * 1024,
  },
});

imagen_router.post(
  "/plato/imagen/upload",
  multer.single("imagen"),
  subirImagen
);
