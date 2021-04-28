import { Categoria, Plato } from "../config/relaciones";
const excluir = ["createdAt", "updatedAt"];

export const getCategorias = (req, res) => {
  Categoria.findAll({
    attributes: {
      exclude: excluir,
    },
  }).then((usuarios) => {
    if (usuarios) {
      res.status(201).json({
        ok: true,
        content: usuarios,
      });
    }
  });
};
export const getPlatosByCategoriaId = (req, res) => {
  Categoria.findByPk(req.params.categoria_id, {
    include: [{ model: Plato, attributes: { exclude: excluir } }],
    attributes: {
      exclude: excluir,
    },
  }).then((usuarios) => {
    if (usuarios) {
      res.status(201).json({
        ok: true,
        content: usuarios,
      });
    }
  });
};

export const postCategoria = (req, res) => {
  const objCategoria = Categoria.build({ ...req.body });
  objCategoria.save().then((data) => {
    res.status(201).json(data);
  });
};
