import { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ | Delivery",
};

export default function FaqPage() {
  return (
    <div className="max-w-3xl mx-auto py-16 px-4">
      <h1 className="text-4xl font-bold mb-6 text-center">FAQ - Доставка</h1>

      <div className="space-y-8 text-lg text-gray-700">
        <div>
          <h2 className="text-2xl font-semibold mb-2">Куди ми доставляємо?</h2>
          <p>
            Ми здійснюємо доставку по всій території України, а також за кордон.
            Усі посилки ретельно пакуються, щоб гарантувати безпечне
            транспортування.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">
            Якими службами ми користуємося?
          </h2>
          <p>Ми відправляємо замовлення наступними службами:</p>
          <ul className="list-disc list-inside mt-2">
            <li>
              <strong>Нова Пошта</strong> — швидка доставка до відділення або
              кур’єром
            </li>
            <li>
              <strong>Укрпошта</strong> — бюджетна доставка, зручна для
              невеликих міст
            </li>
            <li>
              <strong>Meest</strong> — чудовий вибір для міжнародної доставки
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">
            Терміни обробки та доставки
          </h2>
          <p>
            Обробка замовлення зазвичай займає <strong>1–2 робочі дні</strong>.
            Після цього:
          </p>
          <ul className="list-disc list-inside mt-2">
            <li>
              По Україні доставка займає від <strong>1 до 4 днів</strong>{" "}
              залежно від служби.
            </li>
            <li>
              Міжнародна доставка — орієнтовно <strong>7–21 день</strong>,
              залежно від країни призначення.
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">Міжнародна доставка</h2>
          <p>
            Ми надсилаємо замовлення в більшість країн світу. Якщо ваша країна
            підтримується Meest або Укрпоштою — доставка можлива. Усі міжнародні
            відправлення супроводжуються трек-номером.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">Вартість доставки</h2>
          <p>
            Вартість доставки залежить від обраної служби, ваги посилки та
            регіону. Детальну інформацію ви отримаєте під час оформлення
            замовлення або від менеджера після підтвердження.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">
            Чи можна отримати безкоштовну доставку?
          </h2>
          <p>
            Так, ми періодично пропонуємо безкоштовну доставку при замовленні на
            певну суму або в рамках акцій. Слідкуйте за новинами на нашому сайті
            та в соціальних мережах.
          </p>
        </div>
      </div>
    </div>
  );
}
