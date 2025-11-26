import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "FAQ",
};

export default function FaqPage() {
  return (
    <div className="max-w-3xl mx-auto py-16 px-4">
      <h1 className="text-4xl font-bold text-center mb-8">
        Поширені запитання (FAQ)
      </h1>

      <p className="text-lg text-gray-700 mb-8 text-center">
        Тут ви знайдете відповіді на основні запитання про доставку, оплату,
        повернення та інші важливі моменти, пов’язані з нашими товарами та
        обслуговуванням.
      </p>

      <div className="space-y-6 text-lg">
        <div>
          <Link href="/faq/delivery" className="hover:underline font-semibold">
            Доставка
          </Link>
          <p className="text-gray-600">
            Як ми доставляємо ваші замовлення, які служби використовуємо, строки
            та міжнародна доставка.
          </p>
        </div>

        <div>
          <Link href="/faq/payment" className=" hover:underline font-semibold">
            Оплата
          </Link>
          <p className="text-gray-600">
            Доступні способи оплати: післяплата, переказ на картку та майбутні
            платіжні системи.
          </p>
        </div>

        <div>
          <Link href="/faq/contacts" className=" hover:underline font-semibold">
            Обмін і Повернення
          </Link>
          <p className="text-gray-600">
            Як повернути або обміняти товар, що не підійшов, або у випадку
            браку.
          </p>
        </div>
        <div>
          <h2 className="font-semibold">Оформлення замовлення</h2>
          <p className="text-gray-600">
            Для оформлення замовлення заповніть контактні дані, оберіть службу
            доставки, вкажіть відділення або поштомат та бажаний спосіб оплати.
            Після підтвердження наш менеджер зв’яжеться з вами у разі потреби.
          </p>
        </div>
      </div>
    </div>
  );
}
