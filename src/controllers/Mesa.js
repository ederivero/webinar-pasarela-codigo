import { Mesa } from "../config/relaciones";
import { Server } from "../config/server";
import { emitirReporte } from "./Socket";

const excluir = ["createdAt", "updatedAt"];

export const getMesas = async (req, res) => {
  const mesas = await Mesa.findAll({ attributes: { exclude: excluir } });

  if (mesas) {
    res.status(200).json({
      ok: true,
      content: mesas,
    });
  }
};

export const getMesaById = async (req, res) => {
  const mesa = await Mesa.findByPk(req.params.mesa_id);
  if (mesa) {
    res.status(200).json({
      ok: true,
      content: mesa,
    });
  } else {
    res.status(404).json({
      ok: false,
      content: "no encontrado",
    });
  }
};

export const postMesa = async (req, res) => {
  const objMesa = Mesa.build(req.body);
  const objMesaCreada = await objMesa.save();
  res.status(201).json({
    ok: true,
    content: objMesaCreada,
  });
  const objServer = new Server();

  Mesa.findAll().then((mesas) => {
    console.log("emitiendo lista de mesas");
    objServer.io.emit("mesas-lista", JSON.stringify(mesas));
  });
  emitirReporte();
};

export const putMesa = async (req, res) => {
  let objMesa = await Mesa.update(
    { ...req.body },
    { where: { mesa_id: req.params.mesa_id } }
  );
  res.status(200).json({
    ok: objMesa[0] === 1,
    content: objMesa,
  });
};

export const deleteMesa = async (req, res) => {
  let objMesa = await Mesa.destroy({ where: { mesa_id: req.params.mesa_id } });
  res.status(200).json({
    ok: objMesa === 1,
    content: objMesa,
  });
};
