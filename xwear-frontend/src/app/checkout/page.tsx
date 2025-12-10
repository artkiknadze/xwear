"use client";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import { api } from "@/utlis/axios";
import { pushDataLayer } from "@/utlis/data-layer";

export default function CheckoutPage() {
  const router = useRouter();
  const [cart, setCart] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    company: "",
    country: "",
    street: "",
    house: "",
    city: "",
    region: "",
    zip: "",
    email: "",
    phone: "",
    promoCode: "",
  });

  const [deliveryService, setDeliveryService] = useState<string>("");
  const [deliveryDetails, setDeliveryDetails] = useState<string>("");
  const [isDeliveryDetailsValid, setIsDeliveryDetailsValid] =
    useState<boolean>(true);
  const [paymentMethod, setPaymentMethod] = useState<string>("");

  useEffect(() => {
    api.get("/cart").then((res) => {
      setCart(res.data.cart);
    });

    api.get("/users").then((res) => {
      setFormData({
        firstName: res.data.firstName || "",
        lastName: res.data.lastName || "",
        company: res.data.company || "",
        country: res.data.country || "",
        street: res.data.street || "",
        house: res.data.house || "",
        city: res.data.city || "",
        region: res.data.region || "",
        zip: res.data.zip || "",
        email: res.data.email || "",
        phone: res.data.phone || "",
        promoCode: "",
      });
    });
  }, []);

  const confirmOrder = () => {
    const transactionId = `TXN-${Math.floor(Math.random() * 1000000)}`;
    const promoCode = formData.promoCode?.trim() || null;

    const items = cart.map((item) => ({
      item_id: String(item.product.id),
      item_name: item.product.title,
      item_category: item.product.category,
      price: item.product.price,
      quantity: item.quantity || 1,
    }));

    const value = items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    pushDataLayer({
      event: "purchase",
      transaction_id: transactionId,
      value,
      item_count: items.length,
      promo_code: promoCode,
      payment_method: paymentMethod || "not_selected",
      ecommerce: { items },
    });

    api.post("/order", {...formData, paymentMethod}).then((res) => {
      console.log(res.data);
      router.push(res.data.checkoutUrl);
      // alert("Замовлення успішно оформлено!");
      // router.push("/");
    });
  };

  const checkPromoCode = () => {
    api.get(`/promocodes/validate?code=${formData.promoCode}`).then((res) => {
      alert(
        `Промокод ${
          res.data.valid
            ? `дійсний. Знижка: ${res.data.discount * 100}%`
            : "недійсний"
        }`
      );
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-10">ОФОРМЛЕННЯ ЗАМОВЛЕННЯ</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <section className="border border-gray-200 rounded-lg p-8">
          <h2 className="text-2xl font-semibold mb-6">ПЛАТІЖНІ РЕКВІЗИТИ</h2>
          <form className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              value={formData.firstName}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  firstName: e.target.value,
                }))
              }
              type="text"
              title="Ваше ім'я"
              placeholder="Введіть ваше ім'я"
            />
            <Input
              value={formData.lastName}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  lastName: e.target.value,
                }))
              }
              type="text"
              title="Прізвище"
              placeholder="Введіть ваше прізвище"
            />
            <Input
              value={formData.company}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  company: e.target.value,
                }))
              }
              type="text"
              title="Назва компанії (необов'язково)"
              placeholder="Введіть назву"
              className="sm:col-span-2"
            />
            <Input
              value={formData.country}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  country: e.target.value,
                }))
              }
              type="text"
              title="Країна"
              placeholder="Введіть країну"
              className="sm:col-span-2"
            />
            <Input
              value={formData.street}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  street: e.target.value,
                }))
              }
              type="text"
              title="Вулиця"
              placeholder="Введіть назву вулиці"
              className="sm:col-span-2"
            />
            <Input
              value={formData.house}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  house: e.target.value,
                }))
              }
              type="text"
              title="Номер будинку/квартири"
              placeholder="Введіть номер будинку та квартири"
            />
            <Input
              value={formData.city}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  city: e.target.value,
                }))
              }
              type="text"
              title="Місто"
              placeholder="Ваше місто"
            />
            <Input
              value={formData.region}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  region: e.target.value,
                }))
              }
              type="text"
              title="Область/район"
              placeholder="Введіть область або район"
            />
            <Input
              value={formData.zip}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  zip: e.target.value,
                }))
              }
              type="text"
              title="Індекс"
              placeholder="Введіть індекс"
            />
            <Input
              value={formData.email}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  email: e.target.value,
                }))
              }
              type="email"
              title="Email"
              className="bg-gray-100"
            />
            <Input
              value={formData.phone}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  phone: e.target.value,
                }))
              }
              type="tel"
              title="Номер телефону"
              placeholder="+380 (99) 000 - 00 - 00"
            />
            <Input
              value={formData.promoCode}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  promoCode: e.target.value,
                }))
              }
              type="text"
              title="Промокод"
              placeholder="Введіть промокод"
            />

            <div
              onClick={checkPromoCode}
              className="bg-black text-white font-semibold rounded-md flex justify-center items-center cursor-pointer py-2 px-3"
            >
              Перевірити промокод
            </div>
          </form>
          <div className="mt-10">
            <h3 className="text-xl font-semibold mb-3">
              Оберіть службу доставки
            </h3>
            <div className="flex flex-col space-y-3">
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="deliveryService"
                  value="mist"
                  checked={deliveryService === "mist"}
                  onChange={() => setDeliveryService("mist")}
                  className="form-radio text-blue-600"
                />
                <span className="ml-2">Міст</span>
              </label>
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="deliveryService"
                  value="ukrposhta"
                  checked={deliveryService === "ukrposhta"}
                  onChange={() => setDeliveryService("ukrposhta")}
                  className="form-radio text-blue-600"
                />
                <span className="ml-2">Укрпошта</span>
              </label>
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="deliveryService"
                  value="nova"
                  checked={deliveryService === "nova"}
                  onChange={() => setDeliveryService("nova")}
                  className="form-radio text-blue-600"
                />
                <span className="ml-2">Нова Пошта</span>
              </label>
            </div>

            {deliveryService && (
              <>
                <div className="mt-6">
                  <Input
                    type="text"
                    title="Введіть, будь ласка, деталі доставки (відділення, поштомат тощо)"
                    placeholder="Наприклад: №123, відділення на вул. Хрещатик, поштомат №45"
                    value={deliveryDetails}
                    onChange={(e) => {
                      setDeliveryDetails(e.target.value);
                      setIsDeliveryDetailsValid(
                        e.target.value.trim().length > 0
                      );
                    }}
                    className={`${
                      isDeliveryDetailsValid
                        ? "border-transparent"
                        : "border border-red-500"
                    }`}
                  />
                  {!isDeliveryDetailsValid && (
                    <p className="text-red-600 mt-1 text-sm">
                      Це поле обов'язкове для заповнення.
                    </p>
                  )}
                </div>

                {/* Спосіб оплати */}
                <div className="mt-6">
                  <h3 className="text-xl font-semibold mb-3">
                    Оберіть спосіб оплати
                  </h3>
                  <div className="flex flex-col space-y-3">
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="cashOnDelivery"
                        checked={paymentMethod === "cashOnDelivery"}
                        onChange={() => setPaymentMethod("cashOnDelivery")}
                        className="form-radio text-blue-600"
                      />
                      <span className="ml-2">Післяплата на пошті</span>
                    </label>
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="manual"
                        checked={paymentMethod === "manual"}
                        onChange={() => setPaymentMethod("manual")}
                        className="form-radio text-blue-600"
                      />
                      <span className="ml-2">
                        Оплата за реквізитами (менеджер зв’яжеться після
                        замовлення)
                      </span>
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="online"
                        checked={paymentMethod === "online"}
                        onChange={() => setPaymentMethod("online")}
                        className="form-radio text-blue-600"
                      />
                      <span className="ml-2">Карткою онлайн</span>
                    </label>
                  </div>
                </div>
              </>
            )}
          </div>
        </section>

        <aside className="border border-gray-200 rounded-lg p-8 flex flex-col">
          <h2 className="text-2xl font-semibold mb-6">ВАШЕ ЗАМОВЛЕННЯ</h2>
          {cart.map((item, index) => (
            <div
              key={index}
              className="flex items-start border border-gray-200 rounded-md p-4 mb-6"
            >
              <img
                src={item.product.images[0]}
                alt={item.title}
                className="w-16 h-16 object-cover mr-4"
              />
              <div className="flex-1">
                <h3 className="text-lg font-semibold">{item.product.title}</h3>
                <p className="text-sm text-gray-500">
                  {item.productSize.price.toLocaleString("uk-UA", {
                    style: "currency",
                    currency: "UAH",
                  })}{" "}
                  / {item.productSize.size} розмір
                </p>
              </div>
            </div>
          ))}
          <p className="text-xs text-gray-500 mb-4">
            Я прочитав(ла) та погоджуюся з{" "}
            <a href="#" className="underline">
              політикою конфіденційності
            </a>
          </p>
          <button
            onClick={confirmOrder}
            className="bg-black text-white font-semibold py-4 px-6 rounded-md"
          >
            Оформити замовлення
          </button>
        </aside>
      </div>
    </div>
  );
}
