import { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ | Payment",
};

export default function FaqPage() {
  return (
    <div className="max-w-3xl mx-auto py-16 px-4">
      <h1 className="text-4xl font-bold mb-6 text-center">FAQ - Оплата</h1>

      <div className="space-y-8 text-lg text-gray-700">
        <div>
          <h2 className="text-2xl font-semibold mb-2">
            Які способи оплати доступні?
          </h2>
          <p>На даний момент ми пропонуємо два варіанти оплати:</p>
          <ul className="list-disc list-inside mt-2">
            <li>
              <strong>Післяплата</strong> — оплата при отриманні у відділенні
              пошти (Нова Пошта, Укрпошта, Meest).
            </li>
            <li>
              <strong>Оплата на картку</strong> — реквізити вам надішлють наші
              менеджери після оформлення замовлення.
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">
            Як я отримаю реквізити для оплати?
          </h2>
          <p>
            Наші менеджери зв’яжуться з вами після оформлення замовлення і
            надішлють платіжні реквізити. Це може бути:
          </p>
          <ul className="list-disc list-inside mt-2">
            <li>
              На вашу <strong>електронну пошту</strong>
            </li>
            <li>
              У <strong>Viber</strong> або <strong>Telegram</strong>, якщо ви
              залишили номер телефону
            </li>
          </ul>
          <p className="mt-2">
            Будь ласка, перевіряйте вхідні повідомлення або папку "Спам", щоб не
            пропустити інформацію.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">
            Чи буде можливість оплатити онлайн через сайт?
          </h2>
          <p>
            Так! Ми активно працюємо над впровадженням сучасних платіжних систем
            прямо на сайті, щоб зробити процес оплати ще зручнішим для вас.
            Слідкуйте за оновленнями!
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">
            Чи безпечно оплачувати на картку?
          </h2>
          <p>
            Так, усі платежі відбуваються напряму між вами та нашим офіційним
            представником. Ми не зберігаємо ваші платіжні дані та дбаємо про
            вашу безпеку.
          </p>
        </div>
      </div>
    </div>
  );
}
