import { Plato } from "../config/relaciones";
import { subirArchivo } from "../utils/manejoArchivoFirebase";

export const subirImagen = async (req, res) => {
  // try {
  // imagen => es el nombre de mi llave donde va a estar alojado mi archivo
  // let ruta = req.files.imagen.path;
  let { plato_id } = req.body;
  const link = await subirArchivo(req.file);
  let objPlato = await Plato.update(
    {
      plato_img: link[0],
    },
    {
      where: {
        plato_id,
      },
    }
  );
  res.status(200).json({
    ok: objPlato[0] === 1,
    content: "Imagen subida correctamente",
    url: link[0],
  });

  // } catch (error) {
  //   res.status(404).json({
  //     ok: false,
  //     content: 'No se ha seleccionado ningun archivo'
  //   })
  // }
};
