import { DataTypes } from "sequelize";
import { conexion } from "../config/sequelize";

export const plato_model = () =>
  conexion.define(
    "Plato",
    {
      plato_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        unique: true,
      },
      plato_nom: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      plato_img: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      plato_pre: {
        type: DataTypes.DECIMAL(6, 2),
        allowNull: false,
      },
    },
    {
      tableName: "t_plato",
      timestamps: true,
    }
  );
