"use client";
import { Input } from "@/components/ui/Input";
import { api } from "@/utlis/axios";
import { useEffect, useState } from "react";

export default function AdressPage() {
  const [data, setData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
    company: "",
    country: "",
    street: "",
    house: "",
    city: "",
    region: "",
    zip: "",
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
        company: response.data.company,
        country: response.data.country,
        street: response.data.street,
        house: response.data.house,
        city: response.data.city,
        region: response.data.region,
        zip: response.data.zip,
      });
    });
  }, []);

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Редагування адреси</h2>

      <form className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
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
          value={data.company}
          onChange={(e) =>
            setData((prev) => ({ ...prev, company: e.target.value }))
          }
          type="text"
          title="Назва компанії"
          placeholder="Введіть назву Вашої компанії"
        />
        <Input
          value={data.country}
          onChange={(e) =>
            setData((prev) => ({ ...prev, country: e.target.value }))
          }
          type="text"
          title="Країна"
          placeholder="Введіть назву Вашої країни"
        />
        <Input
          value={data.street}
          onChange={(e) =>
            setData((prev) => ({ ...prev, street: e.target.value }))
          }
          type="text"
          title="Вулиця"
          placeholder="Введіть назву вулиці"
        />
        <Input
          value={data.house}
          onChange={(e) =>
            setData((prev) => ({ ...prev, house: e.target.value }))
          }
          type="text"
          title="Номер дому / квартира"
          placeholder="Введіть номер дому і квартири"
        />
        <Input
          value={data.city}
          onChange={(e) =>
            setData((prev) => ({ ...prev, city: e.target.value }))
          }
          type="text"
          title="Місто"
          placeholder="Ваше місто"
        />
        <Input
          value={data.region}
          onChange={(e) =>
            setData((prev) => ({ ...prev, region: e.target.value }))
          }
          type="text"
          title="Область / район"
          placeholder="Введіть область чи район"
        />
        <Input
          value={data.zip}
          onChange={(e) =>
            setData((prev) => ({ ...prev, zip: e.target.value }))
          }
          type="text"
          title="Індекс"
          placeholder="Введіть індекс"
        />
        <Input
          value={data.email}
          onChange={(e) =>
            setData((prev) => ({ ...prev, email: e.target.value }))
          }
          type="text"
          title="Пошта"
          placeholder="Ваша пошта"
        />
        <Input
          value={data.phone}
          onChange={(e) =>
            setData((prev) => ({ ...prev, phone: e.target.value }))
          }
          type="text"
          title="Номер телефону"
          placeholder="+38 (000) 000 - 00 - 00"
        />
      </form>

      <button
        onClick={updateUser}
        className="flex w-fit bg-black text-white font-semibold py-4 px-6 rounded-md"
      >
        ЗБЕРЕГТИ
      </button>
    </div>
  );
}
