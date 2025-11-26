import Image from "next/image";
import Link from "next/link";

export interface ArticleCardProps {
  title: string;
  href: string;
  price: number;
  image: string;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
  title,
  href,
  price,
  image,
}) => {
  return (
    <Link href={href} className="flex flex-col max-w-md bg-white">
      <Image
        src={image}
        alt="Article Image"
        className="self-center"
        width={318}
        height={318}
      />
      <div className="mt-4">
        <h3 className="text-xl font-bold">{title}</h3>
        <span className="text-gray-600">від {price.toLocaleString("uk-UA", {style: "currency", currency: "UAH"})}</span>
      </div>
    </Link>
  );
};
