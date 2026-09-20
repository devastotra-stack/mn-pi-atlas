import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  selected: boolean;
  children: ReactNode;
};

export function ChipTab({ selected, children, className, ...props }: Props) {
  return (
    <button
      type="button"
      className={cn(
        "inline-flex h-11 shrink-0 items-center rounded-[10px] px-4 font-sans text-sm font-medium transition-[background-color,color,scale] duration-150 ease-out active:scale-[0.96]",
        selected
          ? "bg-accent text-accent-fg"
          : "bg-chip text-ink hover:bg-line",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
