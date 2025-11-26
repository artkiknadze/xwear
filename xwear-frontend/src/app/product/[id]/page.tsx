"use client";
import { Container } from "@/components/Container";
import { Button } from "@/components/ui/Button";
import { KeenSliderInstance, KeenSliderPlugin } from "keen-slider";
import { useKeenSlider } from "keen-slider/react";
import Image from "next/image";
import { MutableRefObject, useEffect, useState } from "react";
import "keen-slider/keen-slider.min.css";
import Link from "next/link";
import { useParams } from "next/navigation";
import { api } from "@/utlis/axios";
import { Input } from "@/components/ui/Input";

const SIZES = ["36", "36.5", "37", "37.5", "38", "38.5", "39", "39.5", "40"];

function ThumbnailPlugin(
  mainRef: MutableRefObject<KeenSliderInstance | null>
): KeenSliderPlugin {
  return (slider) => {
    function removeActive() {
      slider.slides.forEach((slide) => {
        slide.classList.remove("active");
      });
    }
    function addActive(idx: number) {
      slider.slides[idx].classList.add("active");
    }

    function addClickEvents() {
      slider.slides.forEach((slide, idx) => {
        slide.addEventListener("click", () => {
          if (mainRef.current) mainRef.current.moveToIdx(idx);
        });
      });
    }

    slider.on("created", () => {
      if (!mainRef.current) return;
      addActive(slider.track.details.rel);
      addClickEvents();
      mainRef.current.on("animationStarted", (main) => {
        removeActive();
        const next = main.animator.targetIdx || 0;
        addActive(main.track.absToRel(next));
        slider.moveToIdx(Math.min(slider.track.details.maxIdx, next));
      });
    });
  };
}

const Reviews = ({ reviews, productId }: { reviews: any[]; productId: number }) => {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);

  const addReview = async () => {
    api
      .post("/reviews/", {
        productId: productId,
        rating: rating,
        comment: comment,
      })
      .then((res) => {
        alert("Відгук додано!");
      });
  }

  return <div>
    <h2 className="text-2xl font-bold mt-16 mb-6">Відгуки</h2>
    <div className="mb-3">
      <Input title="Ваша оцінка (1-5)" type="number" value={rating} onChange={(e) => setRating(Number(e.target.value))}></Input>
      <textarea
        className="bg-gray-100 focus:outline-none w-full my-3 p-3 rounded-md"
        rows={4}
        placeholder="Напишіть ваш відгук..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      ></textarea>
      <button className="flex w-fit bg-black text-white font-semibold py-4 px-6 rounded-md" onClick={addReview}>Додати відгук</button>
    </div>
    <div className="grid gap-3">
      {reviews.map((review, index) => (
        <div key={index} className="border rounded-md p-4">
          <div className="flex items-center mb-2">
            <div className="font-semibold mr-4">{review.user.firstName} {review.user.lastName}</div>
            <div className="text-yellow-500">
              {'★'.repeat(review.rating)}
            </div>
          </div>
          <div className="text-gray-700">{review.comment}</div>
        </div>
      ))}
    </div>
  </div>;
}

export default function ProductPage() {
  const params = useParams();
  const [data, setData] = useState<any>({
    id: 0,
    title: "",
    price: 0,
    images: [],
    category: "",
    collection: "",
    color: "",
    reviews: [],
  });

  const addToCart = async () => {
    api
      .post("/cart/" + data.id)
      .then((res) => {
        alert("Товар додано до кошика!");
      });
  };

  const addToWishlist = async () => {
    api
      .post("/wishlist/" + data.id)
      .then((res) => {
        alert("Товар додано до бажаного!");
      });
  };

  useEffect(() => {
    api.get("/products/" + params?.id).then((res) => {
      setData(res.data);
      console.log(res.data);
      setSelectedSize({
        size: "36",
        price: res.data.price,
      });
    });
  }, [params?.id]);

  const sizes = SIZES.map((size) => ({
    size,
    price: data?.price,
  }));

  const [selectedSize, setSelectedSize] = useState<{
    size: string;
    price: number;
  }>({
    size: "0",
    price: 0,
  });

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
  });

  const [thumbnailRef] = useKeenSlider<HTMLDivElement>(
    {
      initial: 0,
      slides: {
        perView: 4,
        spacing: 10,
      },
    },
    [ThumbnailPlugin(instanceRef)]
  );

  const details = data
    ? {
      Артикул: data?.id?.toString(),
      Категорія: data?.category,
      Колекція: data?.collection || "-",
      Модель: data?.title,
      Колір: data?.color || "-",
    }
    : {};

  return (
    <Container>
      <div className="flex flex-col md:flex-row gap-10 py-10">
        <div className="flex-1">
          <div ref={sliderRef} className="keen-slider max-w-[600px]">
            {data.images.map((src: string, i: number) => (
              <div key={i} className="keen-slider__slide">
                <Image
                  key={i}
                  src={src}
                  alt={`Зображення ${i + 1}`}
                  width={600}
                  height={600}
                  className="hover:opacity-80 w-600 h-600"
                />
              </div>
            ))}
          </div>

          <div ref={thumbnailRef} className="mt-4 keen-slider thumbnail">
            {data.images.map((src: string, i: number) => (
              <div
                key={i}
                className="keen-slider__slide gap-4 border-b !max-w-[80px] !min-w-[80px]"
              >
                <Image
                  key={i}
                  src={src}
                  alt={`Мініатюра ${i + 1}`}
                  width={80}
                  height={80}
                  className="hover:opacity-80"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex-1">
          <h1 className="text-2xl font-bold uppercase">{data.title}</h1>

          <div className="mt-6">
            <span className="text-sm text-gray-600 mb-2 block">
              Розміри (EU):
            </span>
            <div className="grid grid-cols-4 gap-2">
              {sizes.map((s) => (
                <button
                  key={s.size}
                  onClick={() => setSelectedSize(s)}
                  className={`text-sm border rounded-md py-2 px-4 text-center ${selectedSize.size === s.size
                    ? "bg-blue-400 text-white border-blue-500"
                    : "border-gray-300 hover:bg-gray-50"
                    }`}
                >
                  <div className="font-medium">{s.size}</div>
                  <div
                    className={`text-xs ${selectedSize.size === s.size
                      ? "text-white"
                      : "text-gray-500"
                      }`}
                  ></div>
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-row gap-4 mt-6 items-center">
            <div>
              <div className="text-lg font-semibold">
                {selectedSize.price.toLocaleString("uk-UA", {
                  style: "currency",
                  currency: "UAH",
                })}
              </div>
              <div className="text-sm text-gray-500">
                Розмір – {selectedSize.size}
              </div>
            </div>

            <button
              className="flex w-fit bg-black text-white font-semibold py-4 px-6 rounded-md"
              onClick={addToCart}
            >
              Додати у кошик
            </button>

            <button
              className="flex w-fit border border-black text-black font-semibold py-4 px-6 rounded-md"
              onClick={addToWishlist}
            >
              Додати у бажане
            </button>
          </div>
        </div>
      </div>

      <div className="">
        <div className="flex gap-8 border-t border-b text-sm pt-3 font-semibold">
          <span className="border-b-2 border-blue-400 pb-1">Деталі</span>
          <span className="text-gray-400 cursor-pointer hover:text-black">
            <Link href="/faq/delivery/">Доставка</Link>
          </span>
          <span className="text-gray-400 cursor-pointer hover:text-black">
            <Link href="/faq/payment">Оплата</Link>
          </span>
          <span className="text-gray-400 cursor-pointer hover:text-black">
            <Link href="/faq">FAQ</Link>
          </span>
        </div>

        <div className="grid gap-y-3 text-sm max-w-xl mt-6">
          {Object.entries(details).map(([label, value]) => (
            <div
              key={label}
              className="flex justify-between pr-4 border-b py-1"
            >
              <span className="text-gray-600">{label}</span>
              <span className="text-right font-medium">{value}</span>
            </div>
          ))}
        </div>
      </div>

      <Reviews reviews={data.reviews} productId={data.id} />
    </Container>
  );
}
