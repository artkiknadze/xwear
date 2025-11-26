import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nova Blog",
};

const articles = [
  {
    title: "Evolve Nature",
    content:
      "Наша нова літня колекція — це маніфест екологічності та мінімалізму. Натуральні тканини, нейтральні кольори та продуманий крій створені, щоб ти відчував гармонію з природою навіть у мегаполісі.",
  },
  {
    title: "Свіжий старт: Літо 2025",
    content:
      "Ми відкриваємо сезон із яскравими акцентами та дихаючими текстурами. Обирай свободу руху, легкість форм і сміливі стилістичні рішення — ідеально для тих, хто готовий до змін.",
  },
];

type ArticleProps = {
  title: string;
  content: string;
};

const Article = ({ title, content }: ArticleProps) => {
  return (
    <div className="p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all bg-white">
      <h2 className="text-2xl font-bold mb-2 text-gray-900">{title}</h2>
      <p className="text-gray-700 leading-relaxed">{content}</p>
    </div>
  );
};

export default function BlogPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-10">NOVA БЛОГ</h1>
      <div className="grid gap-6">
        {articles.map((article, index) => (
          <Article
            key={index}
            title={article.title}
            content={article.content}
          />
        ))}
      </div>
    </div>
  );
}
