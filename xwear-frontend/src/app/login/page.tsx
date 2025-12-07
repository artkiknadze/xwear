"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/Input";
import { api } from "@/utlis/axios";
import Cookies from "js-cookie";
import { pushDataLayer } from "@/utlis/data-layer";

export default function LoginPage() {
  const router = useRouter();

  const [isLogin, setIsLogin] = useState(true);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");

    try {
      const response = await api.post("/auth/login", {
        email: loginEmail.trim(),
        password: loginPassword,
      });
      const { access_token } = response.data;
      if (access_token) {
        Cookies.set("access_token", access_token, {
          expires: 31,
          secure: true,
          sameSite: "lax",
          path: "/",
        });

        pushDataLayer({
          event: "login",
          method: "email",
          status: "success",
          error_message: null,
        });
        router.push("/dashboard");
      }
    } catch (error) {
      setLoginError("Неправильний логін або пароль");
      pushDataLayer({
        event: "login",
        method: "email",
        status: "fail",
        error_message: "Неправильний логін або пароль",
      });
      return;
    }
  };

  const handleRegSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");

    try {
      const response = await api.post("/auth/register", {
        email: loginEmail.trim(),
        password: loginPassword,
      });
      if (response.status === 201) {
        pushDataLayer({
          event: "sign_up",
          method: "email",
          status: "success",
          error_message: null,
        });
        alert("Акаунт зареєстровано!");
        return;
      }
    } catch (error) {
      const errorMsg = "Помилка реєстрації";
      pushDataLayer({
        event: "sign_up",
        method: "email",
        status: "fail",
        error_message: errorMsg,
      });
      setLoginError(errorMsg);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-10 text-center">АКАУНТ</h1>

      <div className="flex justify-center mb-8">
        <button
          onClick={() => setIsLogin(true)}
          className={`px-6 py-2 font-semibold border-b-2 ${isLogin
            ? "border-black text-black"
            : "border-transparent text-gray-500"
            }`}
        >
          Увійти
        </button>
        <button
          onClick={() => setIsLogin(false)}
          className={`px-6 py-2 font-semibold border-b-2 ${!isLogin
            ? "border-black text-black"
            : "border-transparent text-gray-500"
            }`}
        >
          Зареєструватися
        </button>
      </div>

      <section className="border border-gray-200 rounded-lg p-8">
        <h2 className="text-2xl font-semibold mb-6">
          {isLogin ? "ВХІД" : "РЕЄСТРАЦІЯ"}
        </h2>

        {loginError && (
          <div className="mb-4 text-red-600">{loginError}</div>
        )}

        <div>
          <div className="flex flex-col gap-4">
            <Input
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              title="Пошта"
              type="email"
            />
            <Input
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              title="Пароль"
              type="password"
            />
            {!isLogin && <Input title="Повторіть пароль" type="password" />}

            {isLogin && (
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-black border border-gray-300 rounded"
                  />
                  <span className="ml-2">Запам'ятати мене</span>
                </label>
                <a href="#" className="text-gray-600 hover:underline">
                  Забули пароль?
                </a>
              </div>
            )}

            <button
              type="button"
              onClick={isLogin ? handleLoginSubmit : handleRegSubmit}
              className="text-center uppercase bg-black text-white font-semibold py-4 px-6 rounded-md"
            >
              {isLogin ? "Увійти" : "Зареєструватися"}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
