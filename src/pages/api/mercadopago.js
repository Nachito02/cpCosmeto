const mercadopago = require("mercadopago");

export default async function handler(req, res) {
  if (req.method === "GET") {
    console.log("entrando");
    mercadopago.configure({
      access_token: process.env.NEXT_PUBLIC_MP_TOKEN,
    });

    let preference = {
      // el "purpose": "wallet_purchase" solo permite pagos registrados
      // para permitir pagos de guests puede omitir esta propiedad
      purpose: "wallet_purchase",
      items: [
        {
          id: "item-ID-1234",
          title: "Meu produto",
          quantity: 1,
          unit_price: 75.76,
        },
      ],
    };

    mercadopago.preferences
      .create(preference)
      .then(function (response) {
        // Este valor es el ID de preferencia que se enviará al ladrillo al inicio
        const preferenceId = response.body.id;
        console.log(preferenceId);
        res.status(200).json(preferenceId);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}
