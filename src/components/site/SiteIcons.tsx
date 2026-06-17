import type { ReactNode, SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function BaseIcon({ size = 24, children, ...props }: IconProps & { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

const paths: Record<string, ReactNode> = {
  vase: (
    <>
      <path d="M9 2.5h6l1.2 4.2-2.1 3.1v8.2a2.2 2.2 0 0 1-2.2 2.2h-.2a2.2 2.2 0 0 1-2.2-2.2v-8.2L7.8 6.7Z" />
      <path d="M8 6.5h8" opacity="0.55" />
      <circle cx="12" cy="14" r="1.2" fill="currentColor" stroke="none" />
    </>
  ),
  lamp: (
    <>
      <path d="M8 2.5h8l2 6.5H6Z" />
      <path d="M8.5 9h7l-1.2 6.5H9.7Z" />
      <path d="M12 15.5v5.5" />
      <path d="M9.5 21h5" />
      <circle cx="12" cy="5.5" r="0.8" fill="currentColor" stroke="none" />
    </>
  ),
  planter: (
    <>
      <path d="M6 8.5h12l-1.6 11.5a2.2 2.2 0 0 1-2.2 1.9H9.8a2.2 2.2 0 0 1-2.2-1.9Z" />
      <path d="M4 8.5h16" />
      <path d="M9 8.5V6a3 3 0 0 1 6 0v2.5" />
      <path d="M8 13h8" opacity="0.45" />
    </>
  ),
  organizer: (
    <>
      <rect x="3" y="7" width="18" height="13" rx="1.8" />
      <path d="M3 12h18" />
      <path d="M9 7V4.8h6V7" />
      <path d="M12 12v8" opacity="0.45" />
    </>
  ),
  coaster: (
    <>
      <circle cx="12" cy="12" r="8.2" />
      <circle cx="12" cy="12" r="3.2" />
      <path d="M12 3.8v2.4M12 17.8v2.4M3.8 12h2.4M17.8 12h2.4" opacity="0.45" />
    </>
  ),
  figurine: (
    <>
      <rect x="7" y="3.5" width="10" height="8.5" rx="2.2" />
      <circle cx="9.5" cy="7.5" r="1" fill="currentColor" stroke="none" />
      <circle cx="14.5" cy="7.5" r="1" fill="currentColor" stroke="none" />
      <path d="M9 16.5h6l1.2 4.5H7.8Z" />
      <path d="M10 12v4.5M14 12v4.5" opacity="0.45" />
    </>
  ),
  phoneStand: (
    <>
      <path d="M5 19.5h14" />
      <path d="M7.5 19.5v-5.2l4.5-6.8 4.5 6.8v5.2" />
      <path d="M10 10.5h4" opacity="0.45" />
    </>
  ),
  spiral: (
    <>
      <path d="M12 21a9 9 0 1 1 6.2-15.6" />
      <path d="M12 17a5 5 0 1 1 3.1-9" />
      <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" />
    </>
  ),
  led: (
    <>
      <rect x="3" y="9" width="18" height="6" rx="2" />
      <path d="M6 9v6M10 9v6M14 9v6M18 9v6" />
      <path d="M3 12h18" opacity="0.35" />
    </>
  ),
  hotend: (
    <>
      <path d="M9 2.5h6v6.2l-3 9.8-3-9.8Z" />
      <path d="M9 8.7h6" />
      <path d="M10.5 14.5h3" opacity="0.45" />
      <circle cx="12" cy="5.5" r="1" fill="currentColor" stroke="none" />
    </>
  ),
  spool: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="3.4" />
      <path d="M5.2 7.2c2 2 2 7.6 0 9.6" />
      <path d="M18.8 7.2c-2 2-2 7.6 0 9.6" />
      <path d="M12 3v18" opacity="0.25" />
    </>
  ),
  chat: (
    <>
      <path d="M21 11.8a8.4 8.4 0 0 1-1 3.7 8.5 8.5 0 0 1-7.6 4.6 8.4 8.4 0 0 1-3.7-1L3 21l1.9-5.6a8.4 8.4 0 0 1-.9-3.7 8.5 8.5 0 0 1 4.7-7.5 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8v.4Z" />
      <path d="M8.5 11.5h7M8.5 14.5h4.5" opacity="0.55" />
    </>
  ),
  telegram: (
    <>
      <path d="M22 2 11 13" />
      <path d="M22 2 15 22l-4-9-9-4 20-7Z" />
    </>
  ),
  mail: (
    <>
      <rect x="2" y="4" width="20" height="16" rx="2.2" />
      <path d="m22 7-10 6L2 7" />
    </>
  ),
  menu: (
    <>
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </>
  ),
};

export function SiteIcon({
  name,
  size = 24,
  className,
}: {
  name: string;
  size?: number;
  className?: string;
}) {
  return (
    <BaseIcon size={size} className={className}>
      {paths[name] ?? paths.spiral}
    </BaseIcon>
  );
}
