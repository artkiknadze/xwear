"use client";
import Link from "next/link";
import Image from "next/image";
import { Disclosure } from "@headlessui/react";
import Avatar from "react-avatar";
import { LinkList, LinkListItem } from "@/components/ui/LinkList";
import { CartIcon, SearchIcon, StarIcon, UserIcon } from "../ui/Icons";

export const Navbar = () => {
  const navigation: LinkListItem[] = [
    { title: "Одяг", href: "/catalog?category=clothes" },
    { title: "Взуття", href: "/catalog?category=shoes" },
    { title: "Аксесуари", href: "/catalog?category=accessories" },
    { title: "Інформація", href: "/faq" },
  ];

  return (
    <div className="w-full bg-black text-white">
      <nav className="container relative flex flex-wrap items-center justify-between p-8 mx-auto lg:justify-between xl:px-1">
        <Link href="/">
          <span className="flex items-center space-x-2 text-2xl font-medium">
            <span>
              <Image src="/logo.svg" alt="N" height={34} width={84} />
            </span>
          </span>
        </Link>

        <div className="gap-3 nav__item mr-2 lg:flex ml-auto lg:ml-0 lg:order-2">
          <div className="hidden mr-3 lg:flex items-center nav__item gap-10">
            <Link href={"/wishlist"}>
              <StarIcon size={24} />
            </Link>
            
            <Link href={"/cart"}>
              <CartIcon size={20} />
            </Link>

            <Link href={"/dashboard"}>
              <UserIcon size={16} />
            </Link>
          </div>
        </div>

        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button
                aria-label="Toggle Menu"
                className="px-2 py-1 text-gray-500 rounded-md lg:hidden hover:text-indigo-500 focus:text-indigo-500 focus:bg-indigo-100 focus:outline-none dark:text-gray-300 dark:focus:bg-trueGray-700"
              >
                <svg
                  className="w-6 h-6 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  {open && (
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
                    />
                  )}
                  {!open && (
                    <path
                      fillRule="evenodd"
                      d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                    />
                  )}
                </svg>
              </Disclosure.Button>

              <Disclosure.Panel className="flex flex-wrap w-full my-5 lg:hidden">
                <>
                  {navigation.map((item, index) => (
                    <Link
                      key={index}
                      href={item.href}
                      className="w-full px-4 py-2 -ml-4 text-gray-500 rounded-md dark:text-gray-300 hover:text-indigo-500 focus:text-indigo-500 focus:bg-indigo-100 dark:focus:bg-gray-800 focus:outline-none"
                    >
                      {item.title}
                    </Link>
                  ))}
                  <div className="flex gap-2 mt-3">
                    <div>
                      <Link href={"/wishlist"}>
                        <StarIcon size={24} />
                      </Link>

                      <Link href={"/cart"}>
                        <CartIcon size={20} />
                      </Link>

                      <Link href={"/dashboard"}>
                        <UserIcon size={16} />
                      </Link>
                    </div>

                    {/* <Link href={"/dashboard"}>
                      <Avatar
                        name="NAME"
                        textSizeRatio={0}
                        color="#49D0FF"
                        size="24"
                        round={true}
                      ></Avatar>
                    </Link> */}
                  </div>
                </>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

        {/* center  */}
        <div className="hidden text-center lg:flex lg:items-center">
          <LinkList className="flex flex-row" list={navigation} />
          {/* <ul className="items-center justify-end flex-1 pt-6 list-none lg:pt-0 lg:flex">
            {navigation.map((menu, index) => (
              <li className="mr-3 nav__item" key={index}>
                <Link
                  href="/"
                  className="inline-block px-4 py-2 text-lg font-normal no-underline rounded-md focus:outline-none"
                >
                  {menu}
                </Link>
              </li>
            ))}
          </ul> */}
        </div>
      </nav>
    </div>
  );
};
