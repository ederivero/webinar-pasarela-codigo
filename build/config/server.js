"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Server = void 0;

var _express = _interopRequireDefault(require("express"));

var _http = _interopRequireDefault(require("http"));

var _socket = require("socket.io");

var _bodyParser = require("body-parser");

var _swaggerUiExpress = _interopRequireDefault(require("swagger-ui-express"));

var _sequelize = require("./sequelize.js");

var _apidocs = _interopRequireDefault(require("../docs/apidocs.js"));

var _Socket = require("../controllers/Socket.js");

var _Mesa = require("../routes/Mesa.js");

var _Usuario = require("../routes/Usuario.js");

var _Pedido = require("../routes/Pedido.js");

var _Categoria = require("../routes/Categoria.js");

var _Plato = require("../routes/Plato.js");

var _Imagen = require("../routes/Imagen.js");

var _Pagos = require("../routes/Pagos.js");

var _Comprobante = require("../routes/Comprobante.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Server {
  constructor() {
    this.port = process.env.PORT || 5000;
    this.app = (0, _express.default)();
    this.httpServer = new _http.default.createServer(this.app);
    this.clientes = {};
    this.io = new _socket.Server(this.httpServer, {
      cors: {
        origin: "*"
      }
    }); // this.io = new socketio(this.httpServer, {
    //   cors: {
    //     origin: "*",
    //     methods: ["GET", "POST"],
    //     // allowedHeaders: ["Access-Control-Allow-Methods"],
    //     credentials: true
    //   }
    // })

    this.habilitarCORS();
    this.configurarBodyParser();
    this.configurarRutas();
    this.escucharSockets();

    if (typeof Server.instance === "object") {
      console.log("ya habia una instancia creada");
      return Server.instance;
    } else {
      console.log("NO HABIAAA");
      this.app = (0, _express.default)();
      this.httpServer = new _http.default.createServer(this.app);
      this.clientes = {};
      this.io = new _socket.Server(this.httpServer, {
        cors: {
          origin: "*",
          methods: ["GET", "POST"],
          allowedHeaders: ["Access-Control-Allow-Methods"],
          credentials: true
        }
      });
      this.habilitarCORS();
      this.configurarBodyParser();
      this.configurarRutas();
      this.escucharSockets();
      console.log("no habia");
      Server.instance = this;
      return this;
    }
  }

  escucharSockets() {
    console.log("Escuchando Sockets"); // Evento 'connect'
    // Es un evento que se dispara automáticamente cuando un cliente
    // se conecta al servidor SOCKET(io)

    this.io.on("connect", cliente => {
      console.log("Se conectó " + cliente.id);
      this.clientes[cliente.id] = cliente; // setInterval(() => {
      //   console.log("emitiendo");
      //   console.log(new Date().toString());
      //   this.io.emit("mensaje-nuevo", new Date().toString());
      // }, 1000)

      cliente.on("disconnect", () => {
        console.log("Se desconectó " + cliente.id);
        delete this.clientes[cliente];
      });
      cliente.on("peticion-reporte-dashboard", () => {
        (0, _Socket.emitirReporte)();
      }); // cliente.on("pedir-productos", () => {
      //   this.io.emit("lista-productos", objProductos.productos);
      // });
      // cliente.on("agregar-producto", (objProducto: Producto) => {
      //   objProductos.agregarProducto(objProducto);
      //   this.io.emit("lista-productos", objProductos.productos);
      // });
    });
  }

  habilitarCORS() {
    this.app.use((req, res, next) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method");
      res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
      res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
      next();
    });
  }

  configurarBodyParser() {
    this.app.use((0, _bodyParser.json)());
    this.app.use((0, _bodyParser.urlencoded)({
      extended: true
    }));
  }

  configurarRutas() {
    this.app.use("/imagenes", _express.default.static("imagenes"));
    this.app.get("/", (req, res) => {
      res.json({
        ok: true,
        message: "El servidor está activo!"
      });
    });
    this.app.post("/notificaciones_mercadopago", (req, res) => {
      console.log("Esto es el query");
      console.log(req.query);
      console.log("Esto es el body");
      console.log(req.body);
      res.status(200);
    });
    this.app.use("", _Usuario.usuario_router);
    this.app.use("", _Mesa.mesa_router);
    this.app.use("", _Pedido.pedido_router);
    this.app.use("", _Categoria.categoria_router);
    this.app.use("", _Plato.plato_router);
    this.app.use("", _Imagen.imagen_router);
    this.app.use("", _Pagos.pagos_router);
    this.app.use("", _Comprobante.comprobante_router);
    this.app.use("/apidocs", _swaggerUiExpress.default.serve, _swaggerUiExpress.default.setup(_apidocs.default));
  }

  start() {
    this.httpServer.listen(this.port, () => {
      console.log("Servidor corriendo perfectamente en el puerto " + this.port);

      _sequelize.conexion.sync({
        force: false,
        alter: true
      }).then(() => {
        console.log("== BD creada con Exito ==");
      }).catch(error => {
        console.log("== ERROR al crear la BD");
        console.log(error);
      });
    });
  }

}

exports.Server = Server;