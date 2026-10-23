import Link from "next/link";
import { forwardRef } from "react";
import { cn } from "@/lib/cn";

const variants = {
  primary:
    "bg-accent text-accent-fg hover:opacity-90 border border-transparent",
  secondary:
    "bg-transparent text-foreground border border-border hover:bg-surface-2",
  ghost: "bg-transparent text-foreground hover:bg-surface-2 border border-transparent",
  danger: "bg-danger text-white hover:opacity-90 border border-transparent",
} as const;

const sizes = {
  sm: "h-9 px-3 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-base",
} as const;

type Variant = keyof typeof variants;
type Size = keyof typeof sizes;

type Common = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
};

type ButtonAsButton = Common &
  React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type ButtonAsLink = Common & {
  href: string;
  target?: string;
  rel?: string;
};

export const Button = forwardRef<HTMLButtonElement, ButtonAsButton | ButtonAsLink>(
  function Button(
    { variant = "primary", size = "md", className, children, ...props },
    ref,
  ) {
    const classes = cn(
      "inline-flex items-center justify-center gap-2 rounded-[var(--radius-md)] font-medium transition-opacity disabled:opacity-50",
      variants[variant],
      sizes[size],
      className,
    );

    if ("href" in props && props.href) {
      const { href, target, rel } = props;
      return (
        <Link href={href} className={classes} target={target} rel={rel}>
          {children}
        </Link>
      );
    }

    const buttonProps = props as ButtonAsButton;
    return (
      <button
        ref={ref}
        type={buttonProps.type ?? "button"}
        className={classes}
        {...buttonProps}
      >
        {children}
      </button>
    );
  },
);
