import { DataTypes } from "sequelize";
import { conexion } from "../config/sequelize";

export const pedidoplato_model = () =>
  conexion.define(
    "PedidoPlato",
    {
      pedidoplato_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        unique: true,
      },
      pedidoplato_cant: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
    },
    {
      tableName: "t_pedidoplato",
      timestamps: true,
    }
  );
