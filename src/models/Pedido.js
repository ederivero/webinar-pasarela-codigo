import { DataTypes } from "sequelize";
import { conexion } from "../config/sequelize";

export const pedido_model = () =>
  conexion.define(
    "Pedido",
    {
      pedido_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        unique: true,
      },
      pedido_fech: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      pedido_nro: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      pedido_est: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
    },
    {
      tableName: "t_pedido",
      timestamps: true,
    }
  );
