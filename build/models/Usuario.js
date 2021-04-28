"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.usuario_model = void 0;

var _sequelize = require("sequelize");

var _sequelize2 = require("../config/sequelize");

var _crypto = _interopRequireDefault(require("crypto"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const usuario_model = () => {
  const modelo = _sequelize2.conexion.define("Usuario", {
    usu_id: {
      type: _sequelize.DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      unique: true
    },
    usu_email: {
      type: _sequelize.DataTypes.STRING(50),
      allowNull: false
    },
    usu_nom: {
      type: _sequelize.DataTypes.TEXT,
      allowNull: false
    },
    usu_ape: {
      type: _sequelize.DataTypes.TEXT,
      allowNull: false
    },
    usu_tipo: {
      type: _sequelize.DataTypes.STRING(45),
      allowNull: false
    },
    usu_hash: {
      type: _sequelize.DataTypes.TEXT,
      allowNull: false
    },
    usu_salt: {
      type: _sequelize.DataTypes.TEXT,
      allowNull: false
    }
  }, {
    tableName: "t_usuario",
    timestamps: true
  });

  modelo.prototype.setSaltAndHash = function (password) {
    this.usu_salt = _crypto.default.randomBytes(16).toString("hex");
    this.usu_hash = _crypto.default.pbkdf2Sync(password, this.usu_salt, 1000, 64, "sha512").toString("hex");
  };

  modelo.prototype.validarPassword = function (password) {
    let hash_temporal = _crypto.default.pbkdf2Sync(password, this.usu_salt, 1000, 64, "sha512").toString("hex");

    if (hash_temporal === this.usu_hash) {
      return true;
    } else {
      return false;
    }
  };

  modelo.prototype.generarJWT = function () {
    // El payload es una parte del JWT que sirve para guardar informacion adicional para ser utilizada despues (por ejemplo: en el front)
    let payload = {
      usu_id: this.usu_id,
      usu_nom: `${this.usu_nom} ${this.usu_ape}`,
      usu_tipo: this.usu_tipo
    }; //jwt.sign(payload,secret key, tiempo de vida, algoritmo)

    var token = _jsonwebtoken.default.sign(payload, "sapeee", {
      expiresIn: "1h"
    }, {
      algorithm: "RS256"
    });

    return token;
  };

  modelo.prototype.verificarJWT = function (token) {
    try {
      var decoded = _jsonwebtoken.default.verify(token, "sapeee");

      return decoded;
    } catch (error) {
      return "error";
    }
  };

  return modelo;
};

exports.usuario_model = usuario_model;