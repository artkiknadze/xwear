"use client";
import {Container} from "@/components/Container";
import {ArticlesList} from "@/components/sections/ArticlesList";
import {Banner} from "@/components/sections/Banner";
import {api} from "@/utlis/axios";
import {transformProducts} from "@/utlis/transform-data";
import "keen-slider/keen-slider.min.css";
import {useEffect, useState} from "react";

const articles = [
    {
        href: "/product/1",
        title: "NIKE COURT ZOOM CAGE 2",
        image: "/img/shoes-1.png",
        price: 1000,
    },
    {
        href: "/product/1",
        title: "NIKE COURT ZOOM CAGE 3",
        image: "/img/shoes-1.png",
        price: 1000,
    },
    {
        href: "/product/1",
        title: "NIKE COURT ZOOM CAGE 4",
        image: "/img/shoes-1.png",
        price: 1000,
    },
    {
        href: "/product/1",
        title: "NIKE COURT ZOOM CAGE 8",
        image: "/img/shoes-1.png",
        price: 1000,
    },
    {
        href: "/product/1",
        title: "NIKE COURT ZOOM CAGE 108",
        image: "/img/shoes-1.png",
        price: 1000,
    },
];

export default function Home() {
    useEffect(() => {
        api.get("/products?category=shoes").then(res => setShoes(res.data));
        api.get("/products?category=clothes").then(res => setClothes(res.data));
        api.get("/products?category=accessories").then(res => setAccessories(res.data));
    }, []);
    const [shoes, setShoes] = useState();
    const [clothes, setClothes] = useState();
    const [accessories, setAccessories] = useState();

    const shoesData = transformProducts(shoes);
    const clothesData = transformProducts(clothes);
    const accessoriesData = transformProducts(accessories);

    return (
        <Container>
            <Banner/>
            <ArticlesList
                title="Взуття"
                href="/catalog?category=mens-shirts"
                articles={shoesData}
            />
            <ArticlesList
                title="Одяг"
                href="/catalog?category=mens-shoes"
                articles={clothesData}
            />
            <ArticlesList
                title="Аксесуари"
                href="/catalog?category=womens-watches"
                articles={accessoriesData}
            />
        </Container>
    );
}
