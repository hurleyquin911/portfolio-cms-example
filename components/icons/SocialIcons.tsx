import { cn } from "@/lib/cn";

type IconProps = {
  className?: string;
  title?: string;
};

function Svg({
  className,
  title,
  children,
}: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden={title ? undefined : true}
      role={title ? "img" : undefined}
      className={cn("h-[1.125rem] w-[1.125rem] shrink-0", className)}
    >
      {title ? <title>{title}</title> : null}
      {children}
    </svg>
  );
}

export function IconMail(props: IconProps) {
  return (
    <Svg {...props}>
      <path
        d="M3.5 6.5h17v11h-17v-11Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="m4 7 8 6 8-6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function IconInstagram(props: IconProps) {
  return (
    <Svg {...props}>
      <rect
        x="3.5"
        y="3.5"
        width="17"
        height="17"
        rx="4.5"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle cx="12" cy="12" r="3.75" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" />
    </Svg>
  );
}

export function IconBehance(props: IconProps) {
  return (
    <Svg {...props}>
      <path
        d="M4 8.2h5.1c1.85 0 3 .95 3 2.35 0 1.05-.6 1.85-1.55 2.15v.05c1.25.3 2.05 1.25 2.05 2.55 0 1.7-1.35 2.7-3.45 2.7H4V8.2Zm2.2 3.55h2.55c.95 0 1.5-.4 1.5-1.1s-.5-1.05-1.4-1.05H6.2v2.15Zm0 4.35h2.85c1.1 0 1.7-.5 1.7-1.3 0-.85-.65-1.3-1.75-1.3H6.2v2.6Z"
        fill="currentColor"
      />
      <path
        d="M14.2 14.05c.35 1.1 1.25 1.65 2.5 1.65 1.15 0 1.95-.45 2.2-1.2h2.05c-.45 2-2.15 3.2-4.3 3.2-2.7 0-4.55-1.85-4.55-4.45S14.4 8.8 16.95 8.8c2.45 0 4.2 1.7 4.2 4.35 0 .35-.05.7-.1.9h-6.85Zm4.55-1.55c-.25-1.05-1-1.6-2.15-1.6-1.25 0-2.05.55-2.3 1.6h4.45Z"
        fill="currentColor"
      />
      <path d="M14.6 6.4h5.4V7.7h-5.4V6.4Z" fill="currentColor" />
    </Svg>
  );
}

export function IconDribbble(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="12" r="8.25" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M7.2 17.3c1.7-2.7 4-4.7 7.1-6.1M6.4 10.8c2.6.1 5.5.05 8.8-.9M10.1 4.9c1.5 2.3 2.7 5.1 3.3 8.4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </Svg>
  );
}

export function IconLinkedin(props: IconProps) {
  return (
    <Svg {...props}>
      <path
        d="M6.2 9.4h2.5v8.2H6.2V9.4ZM7.45 5.4a1.45 1.45 0 1 1 0 2.9 1.45 1.45 0 0 1 0-2.9ZM10.9 9.4h2.4v1.15h.05c.35-.65 1.2-1.35 2.5-1.35 2.65 0 3.15 1.75 3.15 4.05v4.35h-2.5v-3.85c0-.9 0-2.05-1.25-2.05s-1.45.95-1.45 1.95v3.95h-2.5V9.4Z"
        fill="currentColor"
      />
    </Svg>
  );
}

export function IconArrowUpRight(props: IconProps) {
  return (
    <Svg {...props}>
      <path
        d="M7 17 17 7M9 7h8v8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function IconSun(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M12 3.5v1.5M12 19v1.5M3.5 12H5M19 12h1.5M5.8 5.8l1.1 1.1M17.1 17.1l1.1 1.1M17.1 5.8l-1.1 1.1M6.9 17.1l-1.1 1.1"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </Svg>
  );
}

export function IconMoon(props: IconProps) {
  return (
    <Svg {...props}>
      <path
        d="M19 13.5A7.5 7.5 0 1 1 10.5 5 5.8 5.8 0 0 0 19 13.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export const SOCIAL_ICON_MAP = {
  Instagram: IconInstagram,
  Behance: IconBehance,
  Dribbble: IconDribbble,
  LinkedIn: IconLinkedin,
} as const;
