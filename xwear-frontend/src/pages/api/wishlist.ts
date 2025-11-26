import Datastore from "nedb-promises";
import { NextApiRequest, NextApiResponse } from "next";

const db = Datastore.create("wishlist.db");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const wishlist = await db.find<any>({});
  if (req.method === "GET") {
    const total = wishlist.reduce((acc, item) => acc + item.price, 0);
    return res
      .setHeader("Cache-Control", "no-store")
      .status(200)
      .json({ wishlist, total });
  }

  if (req.method === "POST") {
    const newItem = JSON.parse(req.body);
    await db.insert(newItem);
    const total = wishlist.reduce((acc, item) => acc + item.price, 0);
    return res.status(200).json({ wishlist, total });
  }

  if (req.method === "DELETE") {
    const { _id } = req.body;
    await db.remove({ _id }, {});

    const wishlist = await db.find<any>({});
    const total = wishlist.reduce((acc, item) => acc + item.price, 0);
    return res.status(200).json({ wishlist, total });
  }

  return res.status(405);
}
