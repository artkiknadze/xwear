export const transformProducts = (data: any) => {
  const products = data || [];

  const simplified = products.map((p: any) => {
    if (!Array.isArray(p.images) || p.images.length === 0) {
      p.images = ["/img/shoes-1.png"];
    }

    return {
      title: p.title,
      href: `/product/${p.id}`,
      price: p.price,
      image: p.images[0],
      collection: p.collection || "",
      color: p.color || "",
    };
  });

  return simplified;
};
