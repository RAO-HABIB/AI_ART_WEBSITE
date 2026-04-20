import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "relative inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500/50 disabled:opacity-50 disabled:cursor-not-allowed",
          {
            "bg-gradient-to-r from-primary-600 to-accent-600 text-white hover:from-primary-500 hover:to-accent-500 shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 hover:scale-[1.02] active:scale-[0.98]":
              variant === "primary",
            "bg-dark-800 text-white border border-dark-700 hover:bg-dark-700 hover:border-dark-600":
              variant === "secondary",
            "border border-primary-500/30 text-primary-300 hover:bg-primary-500/10 hover:border-primary-500/50 backdrop-blur-sm":
              variant === "outline",
            "text-dark-300 hover:text-white hover:bg-white/5":
              variant === "ghost",
          },
          {
            "px-4 py-2 text-sm gap-1.5": size === "sm",
            "px-6 py-3 text-sm gap-2": size === "md",
            "px-8 py-4 text-base gap-2.5": size === "lg",
          },
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;