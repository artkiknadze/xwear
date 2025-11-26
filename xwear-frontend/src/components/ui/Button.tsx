import Link from "next/link";
import React from "react";
import { NextIcon } from "./Icons";

export interface ButtonProps {
  href: string;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ children, href }) => {
  return (
    <Link className="flex w-fit bg-black text-white font-semibold py-4 px-6 rounded-md" href={href}>
      {children} <NextIcon size={6} invert={true} className="ml-3" />
    </Link>
  );
};
