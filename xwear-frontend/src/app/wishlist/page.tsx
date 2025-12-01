"use client";
import { api } from "@/utlis/axios";
import { useEffect, useState } from "react";
import { pushDataLayer } from "@/utlis/data-layer";

const ArticleItem = ({
  id,
  image,
  productId,
  price,
  title,
  onDelete,
}: {
  id: number;
  image: string;
  productId: string;
  price: number;
  title: string;
  onDelete: (i: number) => void;
}) => (
  <div className="flex items-center border border-gray-200 rounded-lg p-4 mb-4">
    <img src={image} alt={title} className="w-16 h-16 mr-4" />
    <div className="flex flex-col">
      <a href={`/product/${productId}`} className="text-lg font-semibold">
        {title}
      </a>
      <p className="text-gray-500">{price} грн</p>
    </div>
    <button
      onClick={() => onDelete(id)}
      className="ml-auto text-red-500 hover:underline"
    >
      Видалити
    </button>
  </div>
);

export default function CartPage() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    api.get("/wishlist").then((res) => {
      setData(res.data);
    });
  }, []);

  const deleteItem = (id: number) => {
    const item = data.wishlist.find((i: any) => i.id === id);
    pushDataLayer({
      event: "remove_from_wishlist",
      ecommerce: {
        items: [
          {
            item_id: String(item.product.id),
            item_name: item.product.title,
            item_category: item.product.category,
          },
        ],
      },
    });

    api.delete("/wishlist/" + id).then((res) => {
      setData(res.data);
    });
  };

  return (
    <div className="flex flex-col">
      <h1 className="text-4xl font-bold">Список бажань</h1>
      <div className="flex flex-col mt-6">
        {data?.wishlist.map((item: any, index: number) => (
          <ArticleItem
            key={index}
            id={item.id}
            productId={item.product.id}
            onDelete={deleteItem}
            image={item.product.images[0]}
            price={item.product.price}
            title={item.product.title}
          />
        ))}
      </div>
    </div>
  );
}
