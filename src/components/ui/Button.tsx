import { cn } from "@/lib/cn";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost" | "outline";
};

export function Button({
  className,
  variant = "primary",
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex cursor-pointer items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b6ff3b]",
        variant === "primary" &&
          "bg-[#b6ff3b] text-[#081018] hover:brightness-105",
        variant === "outline" &&
          "border border-white/15 bg-transparent text-white hover:bg-white/5",
        variant === "ghost" &&
          "bg-transparent text-white/60 hover:text-white",
        className,
      )}
      {...props}
    />
  );
}
