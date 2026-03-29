import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

const variants = {
  default: "bg-primary text-background hover:bg-[#e2ba76]",
  ghost: "bg-transparent text-foreground hover:bg-white/5",
  outline: "border border-border bg-transparent text-foreground hover:bg-white/5",
  danger: "bg-danger text-white hover:bg-[#bf5a5a]",
};

export function Button({
  className,
  variant = "default",
  asChild = false,
  type = "button",
  ...props
}) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      type={type}
      className={cn(
        "inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-primary/40 disabled:cursor-not-allowed disabled:opacity-50",
        variants[variant],
        className
      )}
      {...props}
    />
  );
}
