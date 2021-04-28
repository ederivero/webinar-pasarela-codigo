import jwt from "jsonwebtoken";
export const verifcarToken = (token) => {
  try {
    // Valida la token enviada de acuerdo a su password y algoritmo, si todo es correcto, retorna un true y si algo esta mal, como su tiempo de vida, contraseña, algoritmo o longitud de la token, retorna un false
    let data = jwt.verify(token, "sapeee", { algorithm: "RS256" });
    console.log("data");
    return data;

  } catch (error) {
    console.log(error);

    if (error.expiredAt) {
      return "expirado"
    } else {
      return "falso"
    }
  }
};

// MIDDLEWARE ó WATCHMEN
export var wachiman = (req, res, next) => {
  if (req.headers.authorization) {
    let token = req.headers.authorization.split(" ")[1];
    let resultado = verifcarToken(token);
    console.log("sss");

    console.log(resultado);
    console.log("sss");

    if (resultado === "falso") {
      res.status(401).json({
        ok: false,
        codigo: "tokenfalso",
        content: "No esta autorizado para realizar la solicitud",
        resultado: resultado,
      });
      // next();
    } else if (resultado === "expirado") {
      res.status(401).json({
        ok: false,
        codigo: "tokenexpirado",
        content: "No esta autorizado para realizar la solicitud",
        resultado: resultado,
      });
    } else {
      next();
    }
  } else {
    res.status(401).json({
      ok: false,
      content: "Necesita un token para realizar la solicitud",
    });
  }
};
