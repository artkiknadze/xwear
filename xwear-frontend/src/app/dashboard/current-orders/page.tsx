"use client";

import { useEffect, useState } from "react";
import moment from "moment";
import "moment/locale/uk";
import { api } from "@/utlis/axios";

const Order = ({ order }: { order: any }) => {
  return (
    <div className="border rounded-xl p-4 space-y-4 my-4">
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <span className="font-bold text-lg">Замовлення #{order.id}</span>
          <div>
            <span className="text-gray-600">
              було оформлено{" "}
              <span className="text-black font-bold">
                {moment(order.createdAt).format("DD.MM.YYYY")}
              </span>{" "}
              — статус замовлення:
            </span>
            <span className="text-green-600 font-semibold   p-2">
              Замовлення підтверджено
            </span>
          </div>
        </div>
        <button className="text-black font-bold underline uppercase">
          ⟵ Повернутись до замовлень
        </button>
      </div>

      <table className="w-full text-sm">
        <thead>
          <tr className="border-b text-left">
            <th className="py-2">ТОВАР</th>
            <th className="py-2 text-right">ЦІНА</th>
          </tr>
        </thead>
        <tbody>
          {order.products.map((item: any, index: number) => (
            <tr key={index} className="border-b">
              <td className="py-4">{item.title}</td>
              <td className="py-4 text-right">{item.price} ₴</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default function CurrentOrdersPage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    api.get("/order/").then((response) => {
      setData(response.data);
    });
  }, []);

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Мої замовлення</h2>
      {data.map((order: any) => (
        <Order key={order.id} order={order} />
      ))}
    </div>
  );
}
