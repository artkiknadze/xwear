import { Input } from "@/components/ui/Input";

export default function PasswordPage() {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Зміна паролю</h2>

      <form className="grid grid-cols-1 gap-6 max-w-xl">
        <Input
          type="password"
          title="Старий пароль"
          placeholder="Введіть старий пароль"
        />
        <Input
          type="password"
          title="Новий пароль"
          placeholder="Введіть новий пароль"
        />
        <Input
          type="password"
          title="Повторіть новий пароль"
          placeholder="Введіть новий пароль ще раз"
        />

        <button className="flex mt-6 w-fit bg-black text-white font-semibold py-4 px-6 rounded-md">
          ЗБЕРЕГТИ
        </button>
      </form>
    </div>
  );
}
