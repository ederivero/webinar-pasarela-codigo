"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mesa_model = void 0;

var _sequelize = require("sequelize");

var _sequelize2 = require("../config/sequelize");

const mesa_model = () => _sequelize2.conexion.define("Mesa", {
  mesa_id: {
    type: _sequelize.DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    unique: true
  },
  mesa_nro: {
    type: _sequelize.DataTypes.STRING(50),
    allowNull: false
  },
  mesa_cap: {
    type: _sequelize.DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: "t_mesa",
  timestamps: true
});

exports.mesa_model = mesa_model;