"use client";
import { Container } from "@/components/Container";
import { ArticleCard } from "@/components/ui/ArticleCard";
import { api } from "@/utlis/axios";
import { faker } from "@faker-js/faker";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState, useMemo } from "react";
import { pushDataLayer } from "@/utlis/data-layer";

const FilterBlock = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="border border-gray-300 rounded-md p-4 md:min-w-80 md:mr-4">
    <span className="text-lg font-bold">{title}</span>
    <div className="mt-3">{children}</div>
  </div>
);

const TextFilterList = ({
  items,
  paramKey,
  currentValue,
  onSelect,
}: {
  items: string[];
  paramKey: string;
  currentValue: string;
  onSelect: (key: string, value: string) => void;
}) => (
  <div className="flex flex-col overflow-y-auto max-h-72 gap-2">
    {items.map((item, index) => {
      const isActive = currentValue === item;
      return (
        <button
          key={index}
          onClick={() => onSelect(paramKey, item)}
          className={`text-sm rounded-md p-2 text-left ${
            isActive ? "bg-gray-200 font-semibold" : "hover:bg-gray-100"
          }`}
        >
          {item}
        </button>
      );
    })}
  </div>
);

const SizeFilter = ({
  currentValue,
  onSelect,
}: {
  currentValue: string;
  onSelect: (key: string, value: string) => void;
}) => (
  <div className="grid grid-cols-3 gap-2">
    {Array.from({ length: 18 }).map((_, index) => {
      const size = (36 + index / 2).toFixed(1);
      const isActive = currentValue === size;
      return (
        <button
          key={size}
          onClick={() => onSelect("size", size)}
          className={`text-sm border ${
            isActive
              ? "border-blue-500 bg-blue-100 text-blue-700"
              : "border-gray-300 hover:bg-gray-100"
          } rounded-md p-2 text-center`}
        >
          {size}
        </button>
      );
    })}
  </div>
);

const ColorFilter = ({
  currentValue,
  onSelect,
}: {
  currentValue: string;
  onSelect: (key: string, value: string) => void;
}) => {
  const colors = [
    "Black",
    "White",
    "Red",
    "Blue",
    "Green",
    "Yellow",
    "Pink",
    "Purple",
    "Orange",
    "Gray",
    "Brown",
  ];

  return (
    <div className="grid grid-cols-3 gap-2">
      {colors.map((color, index) => {
        const isActive = currentValue === color;
        return (
          <div
            key={index}
            className="flex flex-col items-center justify-center"
          >
            <button
              onClick={() => onSelect("color", color)}
              className={`text-sm border rounded-full w-8 h-8 text-center hover:outline-2 ${
                isActive ? "outline outline-2 outline-blue-500" : ""
              }`}
              style={{
                backgroundColor: color,
                borderColor: color,
              }}
            />
            <span className={`text-xs mt-1 ${isActive ? "font-semibold" : ""}`}>
              {color}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default function CatalogPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const categoryParam = searchParams?.get("category") || "";
  const minPriceParam = searchParams?.get("minPrice") || "";
  const maxPriceParam = searchParams?.get("maxPrice") || "";
  const sizeParam = searchParams?.get("size") || "";
  const collectionParam = searchParams?.get("collection") || "";
  const modelParam = searchParams?.get("model") || "";
  const colorParam = searchParams?.get("color") || "";

  const [minPriceInput, setMinPriceInput] = useState(minPriceParam);
  const [maxPriceInput, setMaxPriceInput] = useState(maxPriceParam);

  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const params = new URLSearchParams(Array.from(searchParams!.entries()));
    api.get(`/products?${params.toString()}`).then((res) => {
      console.log(res.data);
      setData(res.data);
    });
  }, [searchParams]);

  useEffect(() => {
    const categoryName =
      categories.find((x) => x.code === categoryParam)?.name || "Усі товари";

    pushDataLayer({
      event: "view_item_list",
      item_list_name: categoryName,
    });
  }, [categoryParam]);

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(Array.from(searchParams!.entries()));
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    const newQuery = params.toString();
    router.push(`?${newQuery}`);
  };

  const categories = [
    { name: "Взуття", code: "shoes" },
    { name: "Одяг", code: "clothes" },
    { name: "Аксесуари", code: "accessories" },
  ];

  const collections = [
    "Evolve Nature",
    "Modern Pulse",
    "Beyond Limits",
    "Silhouette Harmony",
    "Freedom Motion",
    "Timeless Spirit",
  ];

  return (
    <Container>
      <div className="flex md:flex-row flex-col gap-4">
        <div className="flex flex-col flex-2 max-w-sm gap-4">
          <FilterBlock title="Категорії">
            <ul className="flex flex-col gap-4">
              {categories.map((cat) => {
                const isActive = categoryParam === cat.code;
                return (
                  <li key={cat.code}>
                    <button
                      onClick={() => updateFilter("category", cat.code)}
                      className={`hover:underline text-left ${
                        isActive ? "font-semibold text-blue-600" : ""
                      }`}
                    >
                      {cat.name}
                    </button>
                  </li>
                );
              })}
            </ul>
          </FilterBlock>

          <FilterBlock title="Фільтрувати за ціною">
            <div className="flex items-center gap-3">
              <input
                type="number"
                className="w-full border rounded-md p-2"
                placeholder="Від"
                value={minPriceInput}
                onChange={(e) => setMinPriceInput(e.target.value)}
                onBlur={() => {
                  updateFilter("minPrice", minPriceInput);
                }}
              />
              <span>-</span>
              <input
                type="number"
                className="w-full border rounded-md p-2"
                placeholder="До"
                value={maxPriceInput}
                onChange={(e) => setMaxPriceInput(e.target.value)}
                onBlur={() => {
                  updateFilter("maxPrice", maxPriceInput);
                }}
              />
            </div>
          </FilterBlock>

          <FilterBlock title="Розмір (EU)">
            <SizeFilter currentValue={sizeParam} onSelect={updateFilter} />
          </FilterBlock>

          <FilterBlock title="Колекції">
            <TextFilterList
              items={collections}
              paramKey="collection"
              currentValue={collectionParam}
              onSelect={updateFilter}
            />
          </FilterBlock>

          <FilterBlock title="Модель">
            <TextFilterList
              items={[
                "Trail Max",
                "Solar Edge",
                "Titan Loop",
                "Ultra Shade",
                "Winter Glow",
                "Nature Grip",
                "Peak Motion",
                "Calm Flow",
                "Urban Ease",
                "RainGuard X",
                "Cloud Walk",
                "Chic Apex",
              ]}
              paramKey="model"
              currentValue={modelParam}
              onSelect={updateFilter}
            />
          </FilterBlock>

          <FilterBlock title="Колір">
            <ColorFilter currentValue={colorParam} onSelect={updateFilter} />
          </FilterBlock>

          <div className="border border-gray-300 rounded-md p-4 md:min-w-80 md:mr-4">
            <button
              onClick={() => {
                router.push("/catalog");
              }}
              className="text-lg font-bold hover:underline"
            >
              Скинути усі фільтри
            </button>
          </div>
        </div>

        <div className="flex flex-col flex-1">
          <div className="mb-4">
            <h2 className="text-4xl font-bold">
              {categories.find((x) => x.code === categoryParam)?.name ||
                "Усі товари"}
            </h2>
            <span className="text-gray-500">{data.length} продуктів</span>
          </div>

          <div className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(300px,1fr))]">
            {data.map((item) => (
              <ArticleCard
                key={item.href}
                href={"/product/" + item.id}
                title={item.title}
                image={item.images[0]}
                price={item.price}
              />
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
}
