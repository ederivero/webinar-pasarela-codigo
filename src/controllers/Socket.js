import { Server } from "../config/server";
import {
  Mesa,
  Pedido,
  Categoria,
  PedidoPlato,
  Plato,
} from "../config/relaciones";
const excluir = ["createdAt", "updatedAt"];

export const emitirReporte = async () => {
  console.log("Emitiendo reporte");
  const objServer = new Server();

  const mesas = await Mesa.count();
  const pedidos = await Pedido.count();
  const categorias = await Categoria.count();

  const pedidosLista = await PedidoPlato.findAll({
    include: [{ model: Plato }],
  });

  const totalMoney = pedidosLista.reduce((prev, objPedidoPlato) => {
    return (
      prev +
      (+objPedidoPlato.Plato?.plato_pre || 0) * +objPedidoPlato.pedidoplato_cant
    );
  }, 0);

  const pedidosCompletos = await Pedido.findAll({
    exclude: excluir,
    include: [
      {
        model: PedidoPlato,
        include: Plato,
      },
    ],
  });

  objServer.io.emit(
    "reporte-dashboard",
    JSON.stringify({
      totales: {
        mesas,
        pedidos,
        categorias,
      },
      total_caja: {
        totalMoney,
      },
      pedidosCompletos,
    })
  );
};
