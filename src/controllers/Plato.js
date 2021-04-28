import { Categoria, Plato } from "../config/relaciones";
import { emitirReporte } from "./Socket";
const excluir = ["createdAt", "updatedAt"];

export const getPlatoById = (req, res) => {
  Plato.findByPk(req.params.plato_id).then((objPlato) => {
    res.status(200).json({
      ok: true,
      content: objPlato,
    });
  });
};

export const getPlatos = async (req, res) => {
  const objPlatos = await Plato.findAll({
    attributes: { exclude: excluir },
    include: [
      {
        model: Categoria,

        attributes: {
          exclude: [...excluir],
        },
      },
    ],
  });

  res.status(200).json({
    ok: true,
    content: objPlatos,
  });
};

export const postPlato = (req, res) => {
  const objPlato = Plato.build(req.body);
  objPlato.save().then((data) => {
    console.log(data);
    res.status(201).json({
      ok: true,
      content: objPlato,
    });
  });
  emitirReporte();
};
