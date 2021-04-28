"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pedido_model = void 0;

var _sequelize = require("sequelize");

var _sequelize2 = require("../config/sequelize");

const pedido_model = () => _sequelize2.conexion.define("Pedido", {
  pedido_id: {
    type: _sequelize.DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    unique: true
  },
  pedido_fech: {
    type: _sequelize.DataTypes.DATE,
    allowNull: false
  },
  pedido_nro: {
    type: _sequelize.DataTypes.STRING(10),
    allowNull: false
  },
  pedido_est: {
    type: _sequelize.DataTypes.STRING(20),
    allowNull: false
  }
}, {
  tableName: "t_pedido",
  timestamps: true
});

exports.pedido_model = pedido_model;