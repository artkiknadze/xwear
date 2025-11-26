import Link from "next/link";

export type LinkListItem = {
  title: string;
  href: string;
};

export interface LinkListProps {
  list: LinkListItem[];
  className?: string;
}

export const LinkList: React.FC<LinkListProps> = ({ list, className = "" }) => (
  <ul className={`gap-10 ${className}`}>
    {list.map(({ title, href }, index) => (
      <li key={index} className="py-1">
        <Link
          href={href}
          className="hover:text-gray-400 w-full focus:outline-none"
        >
          {title}
        </Link>
      </li>
    ))}
  </ul>
);
