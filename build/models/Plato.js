"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.plato_model = void 0;

var _sequelize = require("sequelize");

var _sequelize2 = require("../config/sequelize");

const plato_model = () => _sequelize2.conexion.define("Plato", {
  plato_id: {
    type: _sequelize.DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    unique: true
  },
  plato_nom: {
    type: _sequelize.DataTypes.STRING(50),
    allowNull: false
  },
  plato_img: {
    type: _sequelize.DataTypes.TEXT,
    allowNull: false
  },
  plato_pre: {
    type: _sequelize.DataTypes.DECIMAL(6, 2),
    allowNull: false
  }
}, {
  tableName: "t_plato",
  timestamps: true
});

exports.plato_model = plato_model;