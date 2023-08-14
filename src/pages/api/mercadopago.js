const mercadopago = require("mercadopago");

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { precio, nombre, id } = req.query;
    mercadopago.configure({
      access_token: process.env.NEXT_PUBLIC_MP_TOKEN,
    });

    try {
      let preference = {
        back_urls: {
          success: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/feedback?id=${id}`,
          failure: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/feedback?id=${id}`,
          pending: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/feedback?id=${id}`,
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

      const response = await mercadopago.preferences.create(preference);
      const preferenceId = response.body.id;
      console.log(preferenceId);
      return res.status(200).json(preferenceId);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
}
