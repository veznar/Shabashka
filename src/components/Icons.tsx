type P = { className?: string };

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.9,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export const IconBike = ({ className }: P) => (
  <svg {...base} className={className}>
    <circle cx="5.5" cy="17" r="3.1" />
    <circle cx="18.5" cy="17" r="3.1" />
    <path d="M5.5 17 8.6 10h4.9l2.9 7M8.6 10 12 17M13.5 10l-.9-3h-2.1M13 6.5h2.2" />
  </svg>
);

export const IconMegaphone = ({ className }: P) => (
  <svg {...base} className={className}>
    <path d="M3.5 10.5v3a1.5 1.5 0 0 0 1.5 1.5h2l7 4V5l-7 4H5a1.5 1.5 0 0 0-1.5 1.5Z" />
    <path d="M17.5 9.5a3 3 0 0 1 0 5M7.5 15.5l.8 3.4a1.3 1.3 0 0 0 1.3 1.1h.9" />
  </svg>
);

export const IconPaw = ({ className }: P) => (
  <svg {...base} className={className}>
    <path d="M12 12.5c-2.6 0-5.2 2.1-5.2 4.7 0 1.5 1.1 2.3 2.4 2.3 1 0 1.8-.5 2.8-.5s1.8.5 2.8.5c1.3 0 2.4-.8 2.4-2.3 0-2.6-2.6-4.7-5.2-4.7Z" />
    <circle cx="5.5" cy="10" r="1.6" />
    <circle cx="9.7" cy="6.6" r="1.7" />
    <circle cx="14.3" cy="6.6" r="1.7" />
    <circle cx="18.5" cy="10" r="1.6" />
  </svg>
);

export const IconBook = ({ className }: P) => (
  <svg {...base} className={className}>
    <path d="M12 6.5C10 4.8 7 4.4 4 4.8v13.4c3-.4 6 0 8 1.8 2-1.8 5-2.2 8-1.8V4.8c-3-.4-6 0-8 1.7Z" />
    <path d="M12 6.5V20" />
  </svg>
);

export const IconHash = ({ className }: P) => (
  <svg {...base} className={className}>
    <path d="M9.5 4 7 20M17 4l-2.5 16M4.5 9h16M3.5 15h16" />
  </svg>
);

export const IconHeartHands = ({ className }: P) => (
  <svg {...base} className={className}>
    <path d="M12 11.5s-4.2-2.6-4.2-5.2c0-1.5 1.1-2.5 2.4-2.5 1 0 1.5.6 1.8 1.1.3-.5.8-1.1 1.8-1.1 1.3 0 2.4 1 2.4 2.5 0 2.6-4.2 5.2-4.2 5.2Z" />
    <path d="M3.5 16.5c1.8-1.6 4-1.9 6-.8l1.5.8h3.2c1.4 0 1.4 2.1 0 2.1H10M3.5 21v-6.5M20.5 14.5c-1.6-1.4-3.7-1.6-5.6-.6l-.9.5M20.5 21v-6.5" />
  </svg>
);

export const IconFlower = ({ className }: P) => (
  <svg {...base} className={className}>
    <circle cx="12" cy="8" r="2.2" />
    <path d="M12 5.8c-2-.6-2.5-2.8-1-4 1.4 1 1.6 2.6 1 4Zm0 0c2-.6 2.5-2.8 1-4-1.4 1-1.6 2.6-1 4ZM9.8 8c-.6-2-2.8-2.5-4-1 1 1.4 2.6 1.6 4 1Zm0 0c-.6 2-2.8 2.5-4 1 1-1.4 2.6-1.6 4-1Zm4.4 0c.6-2 2.8-2.5 4-1-1 1.4-2.6 1.6-4 1Zm0 0c.6 2 2.8 2.5 4 1-1-1.4-2.6-1.6-4-1Z" />
    <path d="M12 10.5V21m0-4c0-2.4 1.8-4 4.5-4-.3 2.7-2 4.2-4.5 4Zm0 1.5c0-2.4-1.8-4-4.5-4 .3 2.7 2 4.2 4.5 4Z" />
  </svg>
);

export const IconGrid = ({ className }: P) => (
  <svg {...base} className={className}>
    <rect x="4" y="4" width="6.5" height="6.5" rx="1.5" />
    <rect x="13.5" y="4" width="6.5" height="6.5" rx="1.5" />
    <rect x="4" y="13.5" width="6.5" height="6.5" rx="1.5" />
    <rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1.5" />
  </svg>
);

export const IconStarburst = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M12 1.6l1.9 4.6 4.8-1.9-2.5 4.6 4.9 2.1-4.9 2.1 2.5 4.6-4.8-1.9-1.9 4.6-1.9-4.6-4.8 1.9 2.5-4.6-4.9-2.1 4.9-2.1-2.5-4.6 4.8 1.9z" />
  </svg>
);

export const IconSpark = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M12 2c.9 5.4 4.6 9.1 10 10-5.4.9-9.1 4.6-10 10-.9-5.4-4.6-9.1-10-10 5.4-.9 9.1-4.6 10-10Z" />
  </svg>
);

export const IconBolt = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M13.5 2 4.8 13.2h5.4L10 22l8.9-11.5h-5.6L13.5 2Z" />
  </svg>
);

export const IconCheck = ({ className }: P) => (
  <svg {...base} strokeWidth={2.4} className={className}>
    <path d="m4.5 12.5 5 5 10-11" />
  </svg>
);

export const IconVerified = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M12 1.8 14.7 4l3.5-.3.7 3.4 3 1.9-1.5 3 1.5 3-3 1.9-.7 3.4-3.5-.3-2.7 2.2L9.3 20l-3.5.3-.7-3.4-3-1.9 1.5-3-1.5-3 3-1.9.7-3.4L9.3 4 12 1.8Z" />
    <path
      d="m8.6 12.3 2.3 2.3 4.5-4.9"
      stroke="var(--color-paper)"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const IconHeart = ({ className, filled }: P & { filled?: boolean }) => (
  <svg
    {...base}
    className={className}
    fill={filled ? "currentColor" : "none"}
  >
    <path d="M12 20.2S3.5 15.1 3.5 9.3C3.5 6.4 5.7 4.5 8 4.5c1.7 0 3.2 1 4 2.4.8-1.4 2.3-2.4 4-2.4 2.3 0 4.5 1.9 4.5 4.8 0 5.8-8.5 10.9-8.5 10.9Z" />
  </svg>
);

export const IconPin = ({ className }: P) => (
  <svg {...base} className={className}>
    <path d="M12 21s-6.8-5.4-6.8-10.6A6.8 6.8 0 0 1 12 3.6a6.8 6.8 0 0 1 6.8 6.8C18.8 15.6 12 21 12 21Z" />
    <circle cx="12" cy="10.4" r="2.4" />
  </svg>
);

export const IconClock = ({ className }: P) => (
  <svg {...base} className={className}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5V12l3 2" />
  </svg>
);

export const IconSearch = ({ className }: P) => (
  <svg {...base} className={className}>
    <circle cx="10.5" cy="10.5" r="6.5" />
    <path d="m15.5 15.5 5 5" />
  </svg>
);

export const IconX = ({ className }: P) => (
  <svg {...base} strokeWidth={2.2} className={className}>
    <path d="m6 6 12 12M18 6 6 18" />
  </svg>
);

export const IconArrow = ({ className }: P) => (
  <svg {...base} strokeWidth={2.2} className={className}>
    <path d="M4 12h16m-6-6 6 6-6 6" />
  </svg>
);

export const IconArrowUp = ({ className }: P) => (
  <svg {...base} strokeWidth={2.2} className={className}>
    <path d="M7 17 17 7m-9 0h9v9" />
  </svg>
);

export const IconShield = ({ className }: P) => (
  <svg {...base} className={className}>
    <path d="M12 3 5 5.8v5.4c0 4.6 3 7.9 7 9.8 4-1.9 7-5.2 7-9.8V5.8L12 3Z" />
    <path d="m9 11.5 2.2 2.2 4-4.4" />
  </svg>
);

export const IconDoc = ({ className }: P) => (
  <svg {...base} className={className}>
    <path d="M6 3.5h8l4 4v13H6v-17Z" />
    <path d="M14 3.5v4h4M9 12h6M9 15.5h6M9 8.5h2.5" />
  </svg>
);

export const IconWallet = ({ className }: P) => (
  <svg {...base} className={className}>
    <path d="M4 7.5A2.5 2.5 0 0 1 6.5 5h11A2.5 2.5 0 0 1 20 7.5v9a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 4 16.5v-9Z" />
    <path d="M4 8.5h16M15 13.5h2" />
  </svg>
);

export const IconSos = ({ className }: P) => (
  <svg {...base} className={className}>
    <path d="M12 3.5a8.5 8.5 0 0 1 8.5 8.5 8.5 8.5 0 0 1-8.5 8.5c-1.4 0-2.8-.3-4-.9L3.5 20.5l1-4.3A8.5 8.5 0 0 1 3.5 12 8.5 8.5 0 0 1 12 3.5Z" />
    <path d="M8 12h.01M12 12h.01M16 12h.01" strokeWidth={3} />
  </svg>
);

export const IconUsers = ({ className }: P) => (
  <svg {...base} className={className}>
    <circle cx="9" cy="8.5" r="3.2" />
    <path d="M3.5 19.5c.6-3.2 2.8-5 5.5-5s4.9 1.8 5.5 5M15.5 5.7a3.2 3.2 0 0 1 0 5.6M17.8 14.9c1.5.7 2.4 2.3 2.7 4.6" />
  </svg>
);

export const IconPhone = ({ className }: P) => (
  <svg {...base} className={className}>
    <rect x="7" y="2.5" width="10" height="19" rx="2.5" />
    <path d="M10.5 5h3M10.8 18.5h2.4" />
  </svg>
);

export const CATEGORY_ICONS: Record<string, (p: P) => JSX.Element> = {
  all: IconGrid,
  courier: IconBike,
  promo: IconMegaphone,
  pets: IconPaw,
  edu: IconBook,
  digital: IconHash,
  care: IconHeartHands,
  season: IconFlower,
};

export const GUARANTEE_ICONS: Record<string, (p: P) => JSX.Element> = {
  shield: IconShield,
  doc: IconDoc,
  wallet: IconWallet,
  sos: IconSos,
};
