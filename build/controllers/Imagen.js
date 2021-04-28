"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.subirImagen = void 0;

var _relaciones = require("../config/relaciones");

var _manejoArchivoFirebase = require("../utils/manejoArchivoFirebase");

const subirImagen = async (req, res) => {
  // try {
  // imagen => es el nombre de mi llave donde va a estar alojado mi archivo
  // let ruta = req.files.imagen.path;
  let {
    plato_id
  } = req.body;
  const link = await (0, _manejoArchivoFirebase.subirArchivo)(req.file);
  let objPlato = await _relaciones.Plato.update({
    plato_img: link[0]
  }, {
    where: {
      plato_id
    }
  });
  res.status(200).json({
    ok: objPlato[0] === 1,
    content: "Imagen subida correctamente",
    url: link[0]
  }); // } catch (error) {
  //   res.status(404).json({
  //     ok: false,
  //     content: 'No se ha seleccionado ningun archivo'
  //   })
  // }
};

exports.subirImagen = subirImagen;