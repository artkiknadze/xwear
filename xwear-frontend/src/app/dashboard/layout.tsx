"use client";
import { Container } from "@/components/Container";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

const links = [
  {
    title: "Мій акаунт",
    name: "dashboard",
    href: "/dashboard",
  },
  {
    title: "Редагувати профіль",
    name: "profile",
    href: "/dashboard/profile",
  },
  {
    title: "Історія замовлень",
    name: "orders",
    href: "/dashboard/orders",
  },
  {
    title: "Мої замовлення",
    name: "current-orders",
    href: "/dashboard/current-orders",
  },
  {
    title: "Адреса",
    name: "adress",
    href: "/dashboard/adress",
  },
  {
    title: "Пароль",
    name: "password",
    href: "/dashboard/password",
  },
  {
    title: "Вихід",
    name: "logout",
    href: "/dashboard/logout",
  },
];

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const url = usePathname();

  return (
    <Container>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="border rounded-xl p-2">
          {links.map((item, index) => (
            <Link key={item.href} href={item.href}>
              <div
                className={`text-gray-800 cursor-pointer py-3 px-2 hover:text-black ${
                  item.href === url ? "font-semibold" : ""
                }`}
              >
                {item.title}
              </div>
            </Link>
          ))}
        </div>
        <div className="lg:col-span-3 space-y-6">{children}</div>
      </div>
    </Container>
  );
}
