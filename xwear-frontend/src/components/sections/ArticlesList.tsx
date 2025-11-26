"use client";
import { ArticleCard, ArticleCardProps } from "@/components/ui/ArticleCard";
import { useKeenSlider } from "keen-slider/react";
import Link from "next/link";
import React, { useState } from "react";

export interface ArticlesListProps {
  title: string;
  href: string;
  articles: ArticleCardProps[];
}

export const ArticlesList: React.FC<ArticlesListProps> = ({
  title,
  href,
  articles,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider({
    initial: 0,
    loop: false,
    breakpoints: {
      "(max-width: 500px)": {
        slides: {
          perView: 1,
        }
      },
      "(min-width: 500px) and (max-width: 800px)": {
        slides: {
          perView: 2,
          spacing: 15,
        },
      },
    },
    slides: {
      perView: 4,
      spacing: 15,
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
  });

  return (
    <div className="m-8">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-3xl font-bold mb-5">{title.toUpperCase()}</h2>
        <Link className="font-bold underline uppercase" href={href}>
          Більше товарів
        </Link>
      </div>
      <div ref={sliderRef} className="keen-slider">
        {articles.map((article, index) => (
          <div key={index} className="keen-slider__slide">
            <ArticleCard
              href={article.href}
              title={article.title}
              image={article.image}
              price={article.price}
            />
          </div>
        ))}
      </div>

      {instanceRef.current && (
        <div className="flex justify-center mt-4 space-x-2">
          {loaded &&
            instanceRef.current.track.details &&
            Array.from(
              Array(instanceRef.current.track.details.slides.length - 3).keys()
            ).map((idx) => (
              <button
                key={idx}
                onClick={() => {
                  instanceRef.current?.moveToIdx(idx);
                }}
                className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                  currentSlide === idx
                    ? "bg-black"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
              ></button>
            ))}
        </div>
      )}
    </div>
  );
};
