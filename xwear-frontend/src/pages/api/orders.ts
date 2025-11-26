import { NextApiRequest, NextApiResponse } from "next";
import Datastore from "nedb-promises";

const db = Datastore.create("orders.db");

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const orders = await db.find<any>({}).sort({ createdAt: -1 });

  if (req.method === "GET") {
    res.status(200).json(orders);
  } else if (req.method === "POST") {
    const newOrder = req.body;

    await db.insert({
      ...newOrder,
      id: orders.length + 1,
      createdAt: new Date(),
      total: newOrder.cart.reduce(
        (sum: number, item: any) => sum + item.price,
        0
      ),
    });
    res.status(201).json(newOrder);
  }
}
