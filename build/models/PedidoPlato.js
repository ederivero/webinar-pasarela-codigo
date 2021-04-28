"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pedidoplato_model = void 0;

var _sequelize = require("sequelize");

var _sequelize2 = require("../config/sequelize");

const pedidoplato_model = () => _sequelize2.conexion.define("PedidoPlato", {
  pedidoplato_id: {
    type: _sequelize.DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    unique: true
  },
  pedidoplato_cant: {
    type: _sequelize.DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1
  }
}, {
  tableName: "t_pedidoplato",
  timestamps: true
});

exports.pedidoplato_model = pedidoplato_model;