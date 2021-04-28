import { mesa_model } from "../models/Mesa";
import { plato_model } from "../models/Plato";
import { pedidoplato_model } from "../models/PedidoPlato";
import { categoria_model } from "../models/Categoria";
import { pedido_model } from "../models/Pedido";
import { usuario_model } from "../models/Usuario";
import { comprobante_model } from "../models/Comprobante";

export const Usuario = usuario_model();
export const Pedido = pedido_model();
export const Categoria = categoria_model();
export const PedidoPlato = pedidoplato_model();
export const Plato = plato_model();
export const Mesa = mesa_model();
export const Comprobante = comprobante_model();
// relaciones

Categoria.hasMany(Plato, {
  foreignKey: { name: "categoria_id", allowNull: false },
});
Plato.belongsTo(Categoria, { foreignKey: "categoria_id" });

Plato.hasMany(PedidoPlato, {
  foreignKey: { name: "plato_id", allowNull: false },
});
PedidoPlato.belongsTo(Plato, { foreignKey: "plato_id" });

PedidoPlato.belongsTo(Pedido, {
  foreignKey: { name: "pedido_id", allowNull: false },
});
Pedido.hasMany(PedidoPlato, { foreignKey: "pedido_id" });

Pedido.belongsTo(Usuario, { foreignKey: { name: "usu_id", allowNull: false } });
Usuario.hasMany(Pedido, { foreignKey: "usu_id" });

Pedido.belongsTo(Mesa, { foreignKey: { name: "mesa_id", allowNull: false } });
Mesa.hasMany(Pedido, { foreignKey: "mesa_id" });

Pedido.hasOne(Comprobante, {
  foreignKey: { name: "pedido_id", allowNull: false },
});
Comprobante.belongsTo(Pedido, { foreignKey: "pedido_id" });
