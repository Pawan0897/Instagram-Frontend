const paths = {
  home: <path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" />,
  plus: <><rect x="3" y="3" width="18" height="18" rx="4" /><path d="M12 8v8M8 12h8" /></>,
  heart: <path d="M12 20.5S3.5 15.2 3.5 9A4.5 4.5 0 0 1 12 6.8 4.5 4.5 0 0 1 20.5 9c0 6.2-8.5 11.5-8.5 11.5z" />,
  comment: <path d="M21 11.5a8.5 8.5 0 0 1-12.4 7.5L3 20.5l1.6-5A8.5 8.5 0 1 1 21 11.5z" />,
  user: <><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></>,
  users: <><circle cx="9" cy="8" r="3.5" /><path d="M2.5 20a6.5 6.5 0 0 1 13 0" /><path d="M16 4.7a3.5 3.5 0 0 1 0 6.6M18 14a6.5 6.5 0 0 1 3.5 6" /></>,
  settings: <><circle cx="12" cy="12" r="3" /><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M19.1 4.9 17 7M7 17l-2.1 2.1" /></>,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  image: <><rect x="3" y="4" width="18" height="16" rx="2" /><circle cx="9" cy="10" r="1.6" /><path d="m21 16-5-5-8 8" /></>,
  logout: <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />,
  edit: <path d="M4 20h4L19 9a2.1 2.1 0 0 0-3-3L5 17z" />,
  trash: <path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3" />,
  search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></>,
  bell: <><path d="M6 16V10a6 6 0 1 1 12 0v6l1.5 2H4.5z" /><path d="M10 20a2 2 0 0 0 4 0" /></>,
  compass: <><circle cx="12" cy="12" r="9" /><path d="m10 14 1.2-3.8L15 9l-1.2 3.8z" /></>,
  reels: <><rect x="3" y="5" width="18" height="14" rx="3" /><path d="M10 9.5v5l4.5-2.5z" /></>,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m4 7 8 6 8-6" /></>,
  pin: <path d="M12 21s7-5.4 7-11a7 7 0 1 0-14 0c0 5.6 7 11 7 11z" />,
  video: <><rect x="3" y="6" width="13" height="12" rx="2" /><path d="m16 10 5-3v10l-5-3z" /></>,
  smile: <><circle cx="12" cy="12" r="9" /><path d="M8 14s1.5 2.5 4 2.5 4-2.5 4-2.5M9 10h.01M15 10h.01" /></>,
  bookmark: <path d="M7 4h10v16l-5-3-5 3z" />,
  share: <path d="M4 12v7a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-7M16 7l-4-4-4 4M12 3v13" />,
  grid: <><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></>,
  spark: <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18" />,
  moon: <path d="M16 13a6 6 0 0 1-7-8 7 7 0 1 0 8 9 5.5 5.5 0 0 1-1-1z" />,
  sun: <><circle cx="12" cy="12" r="4" /><path d="M12 3v2M12 19v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M3 12h2M19 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></>,
  more: <><circle cx="5" cy="12" r="1.6" /><circle cx="12" cy="12" r="1.6" /><circle cx="19" cy="12" r="1.6" /></>,
  chevron: <path d="m9 6 6 6-6 6" />,
  play: <path d="M8 6v12l10-6z" />,
  pause: <path d="M8 6h3v12H8zM13 6h3v12h-3z" />,
  skip: <path d="M6 7v10l8-5zM17 7v10" />,
  skipback: <path d="M18 7v10l-8-5zM7 7v10" />,
  crown: <path d="M3 17h18l-2-9-5 4-4-7-4 7-5-4z" />,
  check: <path d="M20 7 10.5 17.5 4 11" />,
  wave: <path d="M4 12c2 0 2-4 4-4s2 8 4 8 2-8 4-8 2 4 4 4" />,
};

export default function Icon({ name, className = "h-5 w-5", filled = false }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill={filled ? "currentColor" : "none"}
      stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {paths[name]}
    </svg>
  );
}
