"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.categoria_model = void 0;

var _sequelize = require("sequelize");

var _sequelize2 = require("../config/sequelize");

const categoria_model = () => _sequelize2.conexion.define("Categoria", {
  categoria_id: {
    type: _sequelize.DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    unique: true
  },
  categoria_nom: {
    type: _sequelize.DataTypes.STRING(50),
    allowNull: false
  }
}, {
  tableName: "t_categoria",
  timestamps: true
});

exports.categoria_model = categoria_model;