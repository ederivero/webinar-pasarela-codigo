import { DataTypes } from "sequelize";
import { conexion } from "../config/sequelize";

export const mesa_model = () =>
  conexion.define(
    "Mesa",
    {
      mesa_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        unique: true,
      },
      mesa_nro: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      mesa_cap: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "t_mesa",
      timestamps: true,
    }
  );
