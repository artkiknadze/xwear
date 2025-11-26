"use client";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/Input";
import { api } from "@/utlis/axios";

export default function ProfilePage() {
  const [data, setData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
  });

  const updateUser = () => {
    api.patch("/users", data).then((response) => {
      alert("Дані успішно оновлено!");
    });
  };

  useEffect(() => {
    api.get("/users").then((response) => {
      setData({
        email: response.data.email,
        firstName: response.data.firstName,
        lastName: response.data.lastName,
        phone: response.data.phone,
      });
    });
  }, []);

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Редагування профілю</h2>

      <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          value={data.firstName}
          onChange={(e) =>
            setData((prev) => ({ ...prev, firstName: e.target.value }))
          }
          type="text"
          title="Ваше ім'я"
          placeholder="Введіть ваше ім'я"
        />
        <Input
          value={data.lastName}
          onChange={(e) =>
            setData((prev) => ({ ...prev, lastName: e.target.value }))
          }
          type="text"
          title="Ваше прізвище"
          placeholder="Введіть ваше прізвище"
        />
        <Input
          value={data.email}
          onChange={(e) =>
            setData((prev) => ({ ...prev, email: e.target.value }))
          }
          type="mail"
          title="Пошта"
          placeholder="Введіть ваш email"
        />
        <Input
          value={data.phone}
          onChange={(e) =>
            setData((prev) => ({ ...prev, phone: e.target.value }))
          }
          type="tel"
          title="Номер телефону"
          placeholder="+38 (000) 000 - 00 - 00"
        />
      </form>

      <button
        onClick={updateUser}
        className="flex mt-6 w-fit bg-black text-white font-semibold py-4 px-6 rounded-md"
      >
        ЗБЕРЕГТИ
      </button>
    </div>
  );
}
