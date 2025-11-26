import { Button } from "@/components/ui/Button";

export const Banner = () => (
  <div className="bg-[url(/img/main-banner-1.png)] rounded-md p-16">
    <div className="flex flex-col font-bold text-5xl mb-5">
      <span>ШИРОКИЙ</span>
      <span>ВИБІР</span>
      <span>ОДЯГУ</span>
    </div>
    <div className="flex flex-col mb-5">
      <span>Новинки вже чікають на Вас!</span>
      <span>Тільки якісні речі!</span>
    </div>
    <Button href="/catalog">Перейти до каталогу</Button>
  </div>
);
