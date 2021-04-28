import express from "express";
import http from "http";
import { Server as socketio } from "socket.io";
import { json, urlencoded } from "body-parser";
import swaggerUi from "swagger-ui-express";
import { conexion } from "./sequelize.js";
import jsondoc from "../docs/apidocs.js";
import { emitirReporte } from "../controllers/Socket.js";
import { mesa_router } from "../routes/Mesa.js";
import { usuario_router } from "../routes/Usuario.js";
import { pedido_router } from "../routes/Pedido.js";
import { categoria_router } from "../routes/Categoria.js";
import { plato_router } from "../routes/Plato.js";
import { imagen_router } from "../routes/Imagen.js";
import { pagos_router } from "../routes/Pagos.js";
import { comprobante_router } from "../routes/Comprobante.js";

export class Server {
  constructor() {
    this.port = process.env.PORT || 5000;
    this.app = express();
    this.httpServer = new http.createServer(this.app);
    this.clientes = {};
    this.io = new socketio(this.httpServer, { cors: { origin: "*" } });
    // this.io = new socketio(this.httpServer, {
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
      this.app = express();
      this.httpServer = new http.createServer(this.app);
      this.clientes = {};

      this.io = new socketio(this.httpServer, {
        cors: {
          origin: "*",
          methods: ["GET", "POST"],
          allowedHeaders: ["Access-Control-Allow-Methods"],
          credentials: true,
        },
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
    console.log("Escuchando Sockets");
    // Evento 'connect'
    // Es un evento que se dispara automáticamente cuando un cliente
    // se conecta al servidor SOCKET(io)
    this.io.on("connect", (cliente) => {
      console.log("Se conectó " + cliente.id);
      this.clientes[cliente.id] = cliente;

      // setInterval(() => {
      //   console.log("emitiendo");
      //   console.log(new Date().toString());
      //   this.io.emit("mensaje-nuevo", new Date().toString());
      // }, 1000)

      cliente.on("disconnect", () => {
        console.log("Se desconectó " + cliente.id);
        delete this.clientes[cliente];
      });

      cliente.on("peticion-reporte-dashboard", () => {
        emitirReporte();
      });

      // cliente.on("pedir-productos", () => {
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
      res.header(
        "Access-Control-Allow-Headers",
        "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
      );
      res.header(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, DELETE"
      );
      res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
      next();
    });
  }
  configurarBodyParser() {
    this.app.use(json());
    this.app.use(urlencoded({ extended: true }));
  }
  configurarRutas() {
    this.app.use("/imagenes", express.static("imagenes"));
    this.app.get("/", (req, res) => {
      res.json({
        ok: true,
        message: "El servidor está activo!",
      });
    });
    this.app.post("/notificaciones_mercadopago", (req, res) => {
      console.log("Esto es el query");
      console.log(req.query);
      console.log("Esto es el body");
      console.log(req.body);
      res.status(200);
    });

    this.app.use("", usuario_router);
    this.app.use("", mesa_router);
    this.app.use("", pedido_router);
    this.app.use("", categoria_router);
    this.app.use("", plato_router);
    this.app.use("", imagen_router);
    this.app.use("", pagos_router);
    this.app.use("", comprobante_router);
    this.app.use("/apidocs", swaggerUi.serve, swaggerUi.setup(jsondoc));
  }
  start() {
    this.httpServer.listen(this.port, () => {
      console.log("Servidor corriendo perfectamente en el puerto " + this.port);
      conexion
        .sync({ force: false, alter: true })
        .then(() => {
          console.log("== BD creada con Exito ==");
        })
        .catch((error) => {
          console.log("== ERROR al crear la BD");
          console.log(error);
        });
    });
  }
}
