import { Pedido, PedidoPlato, Plato } from "../config/relaciones";

const mercado = require("mercadopago");
mercado.configure({
  access_token:
    "APP_USR-8208253118659647-112521-dd670f3fd6aa9147df51117701a2082e-677408439",
  integrator_id: "dev_2e4ad5dd362f11eb809d0242ac130004",
});
const metodos_pago = {
  installments: 6,
  excluded_payment_methods: [
    {
      id: "diners",
    },
  ],
  excluded_payment_types: [
    {
      id: "atm",
    },
  ],
};
const back_urls = {
  success:
    "https://jorgegarba.github.io/punto-de-venta-demo-codigo/#/pos/terminal?payment_info=success",
  pending:
    "https://jorgegarba.github.io/punto-de-venta-demo-codigo/#/pos/terminal?payment_info=pending",
  failure:
    "https://jorgegarba.github.io/punto-de-venta-demo-codigo/#/pos/terminal?payment_info=failed",
};
export const crearInitPoint = async (req, res) => {
  const { comprador, pedido_id } = req.body;
  try {
    const pedidoEncontrado = await Pedido.findByPk(pedido_id, {
      include: { model: PedidoPlato, include: Plato },
    });
    if (!pedidoEncontrado) {
      return res.status(404).json({
        ok: false,
        content: null,
      });
    }
    const items = [];
    // console.log(pedidoEncontrado.to);
    await Promise.all(
      pedidoEncontrado.PedidoPlatos.map((pedidoPlato) => {
        const { plato_id, plato_nom, plato_img, plato_pre } = pedidoPlato.Plato;
        const { pedidoplato_cant } = pedidoPlato;
        const item = {
          id: plato_id,
          title: plato_nom,
          description: plato_nom,
          picture_url: plato_img,
          quantity: +pedidoplato_cant,
          currency_id: "PEN",
          unit_price: +plato_pre,
        };
        items.push(item);
      })
    );
    const preference = {
      payer: comprador,
      payment_methods: metodos_pago,
      back_urls, // sirven para mostrar el resultado luego que el cliente completo la compra, la pasarela de pagos lo redireccionara a estas
      notification_url: `${req.get("host")}/notificaciones_mercadopago`, //aquí va a ser donde mercado pago nos mande las actualizaciones de nuestro pago
      statement_descriptor: "MITIENDA", // el detalle que va a aparecer en la aplicacion bancaria del cliente
      auto_return: "approved", // una vez que se completo el pago pasado 5seg se retornara a la pagina de la tienda dependiendo del estado del proceso
      external_reference: "ederiveroman@gmail.com", // sirve para validar con el integrator id para ver si esta correcta la integracion
      items,
    };
    const respuestaMP = await mercado.preferences.create(preference);
    const url = respuestaMP.body.init_point;
    res.json({
      ok: true,
      content: url,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      content: error,
    });
  }
};
