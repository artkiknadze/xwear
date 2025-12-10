"use client";
import { useEffect, useState } from "react";
import moment from "moment";
import "moment/locale/uk";
import { api } from "@/utlis/axios";

export default function OrdersPage() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    api.get("/order/").then((response) => {
      setData(response.data);
    });
  }, []);

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Історія замовлень</h2>
      <div className="border rounded-xl p-4">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b font-medium">
              <tr>
                <th className="px-4 py-2">НОМЕР</th>
                <th className="px-4 py-2">ДАТА</th>
                <th className="px-4 py-2">СТАТУС</th>
                <th className="px-4 py-2">СУМА</th>
              </tr>
            </thead>
            <tbody>
              {data.map((order, index) => (
                <tr
                  key={index}
                  className="border-t odd:bg-gray-50 even:bg-white"
                >
                  <td className="px-4 py-6">{order.id}</td>
                  <td className="px-4 py-6">
                    {moment(order.createdAt).format("DD.MM.YYYY")}
                  </td>

                  <td className="px-4 py-6">{order.status === 'paid' ? 'Замовлення підтверджено' : 'Очікується оплата'}</td>
                  <td className="px-4 py-6">{order.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
