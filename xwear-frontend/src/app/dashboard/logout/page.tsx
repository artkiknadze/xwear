"use client";

import { useEffect } from "react";
import { AiOutlineLogout } from "react-icons/ai";
import Cookies from "js-cookie";

export default function LogoutPage() {
  useEffect(() => {
    Cookies.set("access_token", "");
  })

  return (
    <div className="max-w-2xl mx-auto px-4 py-12 text-center">
      <AiOutlineLogout size={96} className="mx-auto mb-6 text-gray-700" />
      <h1 className="text-3xl font-bold mb-4">Вихід з акаунту</h1>
      <p className="text-lg text-gray-600 mb-8">
        Ви успішно вийшли з акаунту або натиснули кнопку "Вийти".
      </p>
      <a
        href="/login"
        className="inline-block uppercase bg-black text-white font-semibold py-4 px-6 rounded-md"
      >
        Увійти знову
      </a>
    </div>
  );
}
