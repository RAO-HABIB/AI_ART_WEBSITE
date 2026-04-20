import { cn } from "@/lib/utils";
import { HTMLAttributes, forwardRef } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "glass" | "gradient";
  hover?: boolean;
  glow?: boolean;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = "default", hover = true, glow = false, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-2xl transition-all duration-500",
          {
            "bg-dark-900/50 border border-dark-700/50": variant === "default",
            "glass": variant === "glass",
            "bg-gradient-to-br from-dark-800/80 to-dark-900/80 border border-dark-700/30":
              variant === "gradient",
          },
          hover &&
            "hover:border-primary-500/30 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary-500/5",
          glow && "glow-blue",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";

export default Card;