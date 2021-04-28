import { DataTypes } from "sequelize";
import { conexion } from "../config/sequelize";
export const categoria_model = () =>
  conexion.define(
    "Categoria",
    {
      categoria_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        unique: true,
      },
      categoria_nom: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
    },
    {
      tableName: "t_categoria",
      timestamps: true,
    }
  );
