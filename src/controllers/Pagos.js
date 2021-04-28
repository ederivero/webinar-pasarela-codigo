import fetch from "node-fetch";
export const postCrearPreferenceMercadoPago = async (req, res) => {
  //EJEMPLO DE CREACIÓN DE UN PAGO CON UN SOLO PRODUCTO

  let objProducto = {
    id: 1234,
    title: "Cebiche de Camarones",
    quantity: 2,
    img: "https://img1.freepng.es/20180501/wce/kisspng-ceviche-thai-cuisine-peruvian-cuisine-tiradito-5ae8bae70e7af8.0689743315252016390593.jpg",
    description: "Cebiche de Camarones frescos",
    currency_id: "PEN",
    unit_price: 25.00
  };
  const payer = {
    name: "Lalo",
    surname: "Landa",
    email: "test_user_46542185@testuser.com",
    phone: {
      number: "5549737300",
      area_code: 52
    },
    identification: {
      type: "dni",
      number: 22334445
    },
    address: {
      zip_code: "03940",
      street_name: "Insurgentes Sur",
      street_number: "1602",
    }
  }
  const payment_methods = {
    installments: 6,
    excluded_payment_methods: [
      {
        id: "diners"
      }
    ],
    excluded_payment_types: [
      {
        id: "atm"
      }
    ]
  }
  const back_urls = {
    success: `https://codigo4-pos.herokuapp.com/pagosuccess`,
    failure: `https://codigo4-pos.herokuapp.com/pagofailure`,
    pending: `https://codigo4-pos.herokuapp.com/pagopending`,
  }

  const peticion = await fetch(`https://api.mercadopago.com/checkout/preferences`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "Authorization": "Bearer APP_USR-8208253118659647-112521-dd670f3fd6aa9147df51117701a2082e-677408439",
      "x-integrator-id": "dev_2e4ad5dd362f11eb809d0242ac130004"
    },
    body: JSON.stringify({
      items: [objProducto],
      payer,
      payment_methods,
      back_urls,
      auto_return: "approved",
      external_reference: "jorgegarba@gmail.com",
      notification_url: `http://localhost:5000/pagopending`
    })
  });
  const data = await peticion.json();
  console.log(data);

  res.status(200).json(
    data
  )
};


export const getSuccess = (req, res) => {
  console.log("getSuccess------------****************************************");
  console.log(req.body);
  res.status(200).json({ ruta: " getSuccess", ok: "ok" });
}
export const getFailure = (req, res) => {
  console.log("getFailure------------****************************************");
  console.log(req.body);
  res.status(200).json({ ruta: " getFailure", ok: "ok" });
}
export const getPending = (req, res) => {
  console.log("getPending------------****************************************");
  console.log(req.body);
  res.status(200).json({ ruta: " getPending", ok: "ok" });

}