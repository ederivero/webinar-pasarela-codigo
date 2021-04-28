import {
  Pedido,
  Mesa,
  Usuario,
  PedidoPlato,
  Plato,
} from "../config/relaciones";
import { conexion } from "../config/sequelize";
import { emitirReporte } from "./Socket";

const excluir = ["createdAt", "updatedAt"];

export const getPedidos = async (req, res) => {
  const pedidos = await Pedido.findAll({
    attributes: { exclude: excluir },
    include: [
      { model: Mesa, attributes: { exclude: excluir } },
      {
        model: Usuario,
        attributes: {
          include: ["usu_nom", "usu_ape", "usu_email", "usu_tipo"],
          exclude: [...excluir, "usu_hash", "usu_salt"],
        },
      },
      {
        model: PedidoPlato,
        attributes: { exclude: excluir },
      },
    ],
  });
  res.status(200).json({
    ok: true,
    pedidos,
  });
};

export const getPedidoById = async (req, res) => {
  const pedido = await Pedido.findByPk(req.params.pedido_id, {
    attributes: { exclude: excluir },
    include: [
      {
        model: Mesa,
        attributes: {
          exclude: excluir,
        },
      },
      {
        model: Usuario,
        attributes: {
          include: ["usu_nom", "usu_ape", "usu_email", "usu_tipo"],
          exclude: [...excluir, "usu_hash", "usu_salt"],
        },
      },
      {
        model: PedidoPlato,
        attributes: { exclude: excluir },
        include: [
          {
            model: Plato,
            attributes: {
              exclude: excluir,
            },
          },
        ],
      },
    ],
  });
  res.status(200).json({
    ok: true,
    pedido,
  });
};

export const postPedido = async (req, res) => {
  /**EJEMPLO DE OBJ QUE DEBEMOS MANDAR DESDE FRONT
   * {
    "pedido_fech": "2021-01-15 09:20:00",
    "pedido_nro": "123",
    "pedido_est": "pagado",
    "usu_id": 9,
    "mesa_id": 4,
    "pedidoplatos": [
        {
            "plato_id": 1,
            "pedidoplato_cant": 3
        },
        {
            "plato_id": 2,
            "pedidoplato_cant": 2
        }
    ]
}
   */
  /**
   * Cada pedidoplato{} debe tener
   * [
   *  {
   *   plato_id:1,
   *   pedidoplato_cant:5
   *  }
   *  {
   *   plato_id:1,
   *   pedidoplato_cant:5
   *  }
   * ]
   */
  const { pedidoplatos } = req.body;
  const t = await conexion.transaction();

  try {
    const objPedido = await Pedido.create(req.body, { transaction: t });
    // considerar agregar la fecha desde el backend al objPedido recientemente
    // creado

    for (const pedidoplato of pedidoplatos) {
      await PedidoPlato.create(
        {
          ...pedidoplato,
          pedido_id: objPedido.pedido_id,
        },
        { transaction: t }
      );
    }
    await t.commit();
    emitirReporte();
    res.status(201).json({
      ok: true,
      content: objPedido,
    });
  } catch (error) {
    await t.rollback();
    res.status(500).json({
      ok: false,
      content: "Errores en el servidor",
      error: error,
    });
    throw new Error(error);
  }
};
