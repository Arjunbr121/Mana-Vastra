import { cn } from "@/lib/utils";

export function Badge({ className, tone = "default", ...props }) {
  const tones = {
    default: "bg-white/5 text-foreground",
    success: "bg-success/20 text-[#9fe2b8]",
    warning: "bg-primary/20 text-[#f3d7a3]",
    danger: "bg-danger/20 text-[#efb0b0]",
  };

  return (
    <span
      className={cn("inline-flex rounded-full px-3 py-1 text-xs font-medium", tones[tone], className)}
      {...props}
    />
  );
}
