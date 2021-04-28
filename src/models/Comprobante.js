import { DataTypes } from "sequelize";
import { conexion } from "../config/sequelize";

export const comprobante_model = () =>
  conexion.define(
    "Facturacion",
    {
      comprobante_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        unique: true,
      },
      comprobante_type: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      comprobante_reference: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      comprobante_payment_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "t_facturacion",
      timestamps: false,
    }
  );
