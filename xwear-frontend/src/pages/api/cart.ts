import { NextApiRequest, NextApiResponse } from "next";
import Datastore from "nedb-promises";

const db = Datastore.create("cart.db");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const cart = await db.find<any>({});
  if (req.method === "GET") {
    const total = cart.reduce((acc, item) => acc + item.price, 0);
    return res
      .setHeader("Cache-Control", "no-store")
      .status(200)
      .json({ cart, total });
  }

  if (req.method === "POST") {
    const newItem = JSON.parse(req.body);
    await db.insert(newItem);
    const total = cart.reduce((acc, item) => acc + item.price, 0);
    return res.status(200).json({ cart, total });
  }

  if (req.method === "DELETE") {
    const { _id } = req.body;
    await db.remove({ _id }, {});

    const cart = await db.find<any>({});
    const total = cart.reduce((acc, item) => acc + item.price, 0);
    return res.status(200).json({ cart, total });
  }

  return res.status(405);
}
