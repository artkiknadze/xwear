"use client";
import { Button } from "@/components/ui/Button";
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
  productSize,
}: {
  id: number;
  productId: string;
  image: string;
  price: number;
  title: string;
  onDelete: (i: number) => void;
  productSize?: string;
}) => (
  <div className="flex items-center border border-gray-200 rounded-lg p-4 mb-4">
    <img src={image} alt={title} className="w-16 h-16 mr-4" />
    <div className="flex flex-col">
      <a href={`/product/${productId}`} className="text-lg font-semibold">
        {title}
      </a>
      <p className="text-gray-500">{price} грн</p>
      <div className="text-gray-500">Розмір: {productSize}</div>
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
    api.get("/cart").then((res) => {
      console.log(res.data);
      setData(res.data);
    });
  }, []);

  const deleteItem = (id: number) => {
    const removed = data.cart.find((i: any) => i.id === id);
    pushDataLayer({
      event: "remove_from_cart",
      ecommerce: {
        items: [
          {
            item_id: String(removed.product.id),
            item_name: removed.product.title,
            item_category: removed.product.category,
            price: removed.product.price,
            quantity: removed.quantity || 1,
          },
        ],
      },
    });
    api.delete("/cart/" + id).then((res) => {
      setData(res.data);
    });
  };

  const beginCheckout = () => {
    const items = data.cart.map((item: any) => ({
      item_id: String(item.product.id),
      item_name: item.product.title,
      item_category: item.product.category,
      price: item.product.price,
      quantity: item.quantity || 1,
    }));

    pushDataLayer({
      event: "begin_checkout",
      value: data.total,
      item_count: items.length,
      ecommerce: {
        items,
      },
    });
  };

  return (
    <div className="flex flex-col">
      <h1 className="text-4xl font-bold">Кошик товарів</h1>
      <div className="flex flex-col mt-6">
        {data?.cart?.map((item: any, index: number) => (
          <ArticleItem
            key={index}
            id={item.id}
            productId={item.product.id}
            onDelete={deleteItem}
            image={item.product.images[0]}
            price={item.productSize.price}
            title={item.product.title}
            productSize={item.productSize.size}
          />
        ))}
      </div>
      <div className="flex justify-between items-center mt-6">
        <p className="text-2xl font-semibold">
          Загальна сума: {data?.total} грн
        </p>
        <div onClick={beginCheckout}>
          <Button href="/checkout">ЗАМОВИТИ</Button>
        </div>
      </div>
    </div>
  );
}
