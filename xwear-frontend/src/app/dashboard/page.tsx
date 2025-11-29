"use client";
import { Container } from "@/components/Container";

import {
  AiOutlineEnvironment,
  AiOutlineLogout,
  AiOutlineOrderedList,
  AiOutlineSetting,
  AiOutlineStar,
  AiOutlineUser,
} from "react-icons/ai";
import Link from "next/link";
import { useEffect, useState } from "react";
import { api } from "@/utlis/axios";
import moment from "moment";

type SidebarProps = {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
};

const cardsItems = [
  {
    title: "Мій профіль",
    href: "/dashboard/",
    icon: <AiOutlineUser size={96} className="inline-block mr-2" />,
  },
  {
    title: "Замовлення",
    href: "/dashboard/orders",
    icon: <AiOutlineOrderedList size={96} className="inline-block mr-2" />,
  },
  {
    title: "Мої адреси",
    href: "/dashboard/adress",
    icon: <AiOutlineEnvironment size={96} className="inline-block mr-2" />,
  },
  {
    title: "Редагувати профіль",
    href: "/dashboard/profile",
    icon: <AiOutlineSetting size={96} className="inline-block mr-2" />,
  },
  {
    title: "Обрані товари",
    href: "/wishlist",
    icon: <AiOutlineStar size={96} className="inline-block mr-2" />,
  },
  {
    title: "Вихід",
    href: "/dashboard/logout",
    icon: <AiOutlineLogout size={96} className="inline-block mr-2" />,
  },
];

export default function DashboardPage() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    api.get("/order/").then((response) => {
      console.log(response.data);
      setData(response.data);
    });
  }, []);

  return (
    <div>
      <div className="text-lg font-semibold mb-4">Ласкаво просимо!</div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cardsItems.map((item, index) => (
          <div
            key={index}
            className="border rounded-xl p-4 text-center cursor-pointer hover:border-gray-500"
          >
            <Link href={item.href}>
              <div className="text-gray-700 flex flex-col justify-center items-center font-medium">
                {item.icon}
                {item.title}
              </div>
            </Link>
          </div>
        ))}
      </div>

      <div className="border rounded-xl p-4 mt-6">
        <h2 className="text-lg font-semibold mb-4">Поточні замовлення</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b font-medium">
              <tr>
                <th className="px-4 py-2">НОМЕР</th>
                <th className="px-4 py-2">ДАТА</th>
                <th className="px-4 py-2">СТАТУС</th>
                <th className="px-4 py-2">ЦІНА</th>
              </tr>
            </thead>
            <tbody>
              {data.map((order, index) => (
                <tr
                  key={index}
                  className="border-t odd:bg-gray-50 even:bg-white"
                >
                  <td className="px-4 py-6">{order.id}</td>
                  <td className="px-4 py-6">{moment(order.createdAt).format("DD.MM.YYYY")}</td>
                  <td className="px-4 py-6">Замовлення підтверджено</td>
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
