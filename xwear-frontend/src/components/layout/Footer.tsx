import Link from "next/link";
import React from "react";
import { Container } from "@/components/Container";
import { LinkList, LinkListItem } from "@/components/ui/LinkList";
import { NextIcon } from "../ui/Icons";

export function Footer() {
  const catalogue: LinkListItem[] = [
    { title: "Одяг", href: "/catalog?category=1" },
    { title: "Взуття", href: "/catalog?category=1" },
    { title: "Аксесуари", href: "/catalog?category=1" },
  ];

  const information: LinkListItem[] = [
    { title: "Блог", href: "/blog" },
    { title: "Контакти", href: "/faq/contacts" },
    { title: "Доставка", href: "/faq/delivery" },
    { title: "Оплата", href: "/faq/payment" },
    { title: "FAQ", href: "/faq" },
  ];

  return (
    <div className="p-8 w-full relative bg-black text-white">
      <div className="grid max-w-screen-xl grid-cols-1 pt-3 mx-auto gap-10 lg:grid-cols-4">
        <FooterColumn title="Каталог">
          <LinkList list={catalogue} />
        </FooterColumn>

        <FooterColumn title="Інформація">
          <LinkList list={information} />
        </FooterColumn>

        <FooterColumn title="Контакти">
          <a className="underline" href="mailto:info@xwear.info">
            info@xwear.info
          </a>
          <a href="tel:+380951234567">+38 095 123 45 67</a>
        </FooterColumn>

        <FooterColumn title="Підписка на новини">
          <span className="text-sm">Підписуйтесь на наші новини</span>

          <form className="flex flex-row gap-2 mt-3">
            <input
              type="email"
              placeholder="Ваш email"
              className="bg-black text-white border-b py-2 outline-none focus:border-blue-500 focus:ring-0"
            />
            <button className="px-4 rounded-full bg-white text-black">
              <NextIcon size={9} />
            </button>
          </form>
        </FooterColumn>
      </div>
    </div>
  );
}

const FooterColumn = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="flex flex-1 flex-col flex-wrap w-full">
    <span className="uppercase font-bold text-xl">{title}</span>
    {children}
  </div>
);
