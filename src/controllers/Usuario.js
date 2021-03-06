import { Usuario } from "../config/relaciones";

export const getUsuarios = (req, res) => {
  Usuario.findAll({
    attributes: ["usu_id", "usu_email", "usu_nom", "usu_ape", "usu_tipo"],
  }).then((usuarios) => {
    if (usuarios) {
      res.status(201).json({
        ok: true,
        content: usuarios,
      });
    }
  });
};

export const RegistrarUsuario = (req, res) => {
  console.log(req.body);

  Usuario.findAll({
    where: { usu_email: req.body.usu_email },
  }).then((usuarios) => {
    if (usuarios.length != 0) {
      res.status(204).json({
        ok: false,
        content: `El usuario con email ${req.body.usu_email} ya existe!`,
      });
    } else {
      // Instanciar un objeto de mi usuario
      let objUsuario = Usuario.build(req.body);
      objUsuario.setSaltAndHash(req.body.password);
      objUsuario.save().then((usuarioCreado) => {
        // AGREGAR EL TOKEN LUEGO DEL REGISTRO DE UN USUARIO
        let token = usuarioCreado.generarJWT();
        res.status(201).json({
          ok: true,
          content: `Usuario ${usuarioCreado.usu_email} creado con exito`,
          token: token,
        });
      });
    }
  });
};

export const Login = (req, res) => {
  let { correo = "", password = "" } = req.body;
  if (typeof correo === "string" && typeof password === "string") {
    Usuario.findOne({
      where: {
        usu_email: correo,
      },
    }).then((objUsuario) => {
      if (objUsuario) {
        // Tengo que validar si la contraseña es la correcta
        let validacion = objUsuario.validarPassword(password);
        if (validacion) {
          let token = objUsuario.generarJWT();
          res.status(200).json({
            ok: true,
            token,
            content: "Usuario correctamente logeado",
          });
        } else {
          res.status(404).json({
            ok: false,
            content: "Usuario o contraseña incorrectos",
          });
        }
      } else {
        res.status(404).json({
          ok: false,
          content: "Usuario no registrado",
        });
      }
    });
  } else {
    res.status(400).json({
      ok: false,
      content: "No se han mandado los campos correctamente",
    });
  }
};

export const VerificarToken = (req, res) => {
  Usuario.findOne({ where: { usu_email: req.body.correo } }).then(
    (objUsuario) => {
      const decoded = objUsuario.verificarJWT(req.body.token);
      if (decoded.usu_id) {
      }
    }
  );
};
