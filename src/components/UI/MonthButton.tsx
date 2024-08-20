import React, { PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";

type Props = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;
export default function DayButton({ ...props }: Props) {
  return (
    <button
      className="px-3 py-1 bg-white hover:bg-[#e6e6e6] w-[44px] h-[44px] disabled:bg-white disabled:cursor-not-allowed"
      {...props}
    >
      {props.children}
    </button>
  );
}
