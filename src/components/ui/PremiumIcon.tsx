import { cn } from "@/lib/utils";

interface PremiumIconProps {
  children: React.ReactNode;
  className?: string;
  gradient?: string;
}

export default function PremiumIcon({
  children,
  className,
  gradient = "from-primary-500 to-accent-500",
}: PremiumIconProps) {
  return (
    <div
      className={cn(
        "relative flex items-center justify-center rounded-2xl w-14 h-14",
        "bg-gradient-to-br shadow-lg border border-white/10",
        gradient,
        className
      )}
    >
      <div className="absolute inset-0 rounded-2xl bg-white/10 backdrop-blur-sm" />
      <div className="relative text-white">{children}</div>
    </div>
  );
}