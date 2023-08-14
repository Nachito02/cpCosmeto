import { updateStatus } from "./controller/turnoController";

export default async function handler(req, res) {
  console.log(req.query);
  if (req.query.status === "approved") {
    try {
      const updated = await updateStatus(req.query.id);
      return res.redirect(
        `${process.env.NEXT_PUBLIC_FRONTEND_URL}/confirm/${req.query.id}?paymentId=${req.query.payment_id}`
      );
    } catch (error) {
      console.log(error);
    }
  }

  if (req.query.status === "null") {
    return res.redirect(
      `${process.env.NEXT_PUBLIC_FRONTEND_URL}/confirm/${req.query.id}`
    );
  }
  return res.redirect(
    `${process.env.NEXT_PUBLIC_FRONTEND_URL}/confirm/${req.query.id}`
  );
}
