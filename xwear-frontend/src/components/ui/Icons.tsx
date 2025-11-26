import Image from "next/image";
import clsx from "clsx";

type IconProps = {
  src: string;
  alt: string;
  size?: number;
  invert?: boolean;
  className?: string;
};

type ChildIconProps = Omit<IconProps, "src" | "alt">;

export const Icon = ({
  src,
  alt,
  size = 24,
  invert = false,
  className = "",
}: IconProps) => {
  return (
    <Image
      src={src}
      alt={alt}
      height={size}
      width={size}
      className={clsx(
        `w-[${size}px] h-[${size}px]`,
        invert && "invert",
        className
      )}
    />
  );
};

export const CartIcon = (props: ChildIconProps) => (
  <Icon src="/icons/cart.svg" alt="cart" {...props} />
);

export const SearchIcon = (props: ChildIconProps) => (
  <Icon src="/icons/search.svg" alt="search" {...props} />
);

export const StarIcon = (props: ChildIconProps) => (
  <Icon src="/icons/star.svg" alt="star" {...props} />
);

export const UserIcon = (props: ChildIconProps) => (
  <Icon src="/icons/user.svg" alt="user" {...props} />
);

export const NextIcon = (props: ChildIconProps) => (
  <Icon src="/icons/next.svg" alt="next" {...props} />
);