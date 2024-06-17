import React from "react";

type RoundButtonProps = {
  children: React.ReactElement;
  onClick?: () => void;
  className?: string;
};

export default function RoundButton({
  children,
  onClick,
  className,
}: RoundButtonProps) {
  const handleClick = onClick ? onClick : () => {};
  return (
    <div
      onClick={handleClick}
      className={`${className} flex aspect-square w-fit cursor-pointer items-center justify-center rounded-full bg-background-light p-3`}
    >
      {children}
    </div>
  );
}
