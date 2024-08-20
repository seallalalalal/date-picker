import React, { PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";

interface Props
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  isActive?: boolean;
  isHighlight?: boolean;
}
export default function DayButton({
  isActive,
  isHighlight,
  children,
  ...props
}: Props) {
  return (
    <button
      className={twMerge(
        "text-center bg-white disabled:text-[#757575] hover:bg-[#e6e6e6] disabled:cursor-not-allowed disabled:hover:bg-white",
        isHighlight && "bg-[#ffff76]",
        isActive && "bg-[#006edc] text-white hover:bg-blue-400"
      )}
      {...props}
    >
      {children}
    </button>
  );
}
