const mercadopago = require("mercadopago");

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { precio, nombre, id } = req.query;
    mercadopago.configure({
      access_token: process.env.NEXT_PUBLIC_MP_TOKEN,
    });

    let preference = {
      back_urls: {
        success: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/feedback?id=${id}`,
        failure: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/feedback`,
        pending: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/feedback`,
      },

      auto_return: "approved",
      // el "purpose": "wallet_purchase" solo permite pagos registrados
      // para permitir pagos de guests puede omitir esta propiedad
      purpose: "wallet_purchase",
      items: [
        {
          id: id,
          title: nombre,
          quantity: 1,
          unit_price: Number(precio),
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
