"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.comprobante_model = void 0;

var _sequelize = require("sequelize");

var _sequelize2 = require("../config/sequelize");

const comprobante_model = () => _sequelize2.conexion.define("Facturacion", {
  comprobante_id: {
    type: _sequelize.DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    unique: true
  },
  comprobante_type: {
    type: _sequelize.DataTypes.TEXT,
    allowNull: false
  },
  comprobante_reference: {
    type: _sequelize.DataTypes.TEXT,
    allowNull: false
  },
  comprobante_payment_id: {
    type: _sequelize.DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: "t_facturacion",
  timestamps: false
});

exports.comprobante_model = comprobante_model;