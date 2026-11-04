import type { SVGProps } from "react";

export type IconName =
  | "globe" | "crosshair" | "land" | "plane" | "radar" | "ship" | "radio"
  | "shield" | "graduation" | "microscope" | "book" | "search" | "menu"
  | "close" | "arrow" | "moon" | "sun" | "monitor" | "home" | "layers"
  | "box" | "settings" | "compass" | "external" | "check" | "clock"
  | "map" | "chevron" | "target" | "lock" | "file" | "sparkles" | "info";

const shapes: Record<IconName, string[]> = {
  globe:["M12 3a9 9 0 1 0 0 18a9 9 0 0 0 0-18","M3 12h18","M12 3c2.3 2.4 3.4 5.4 3.4 9s-1.1 6.6-3.4 9","M12 3c-2.3 2.4-3.4 5.4-3.4 9s1.1 6.6 3.4 9"],
  crosshair:["M12 2v4","M12 18v4","M2 12h4","M18 12h4","M12 7a5 5 0 1 0 0 10a5 5 0 0 0 0-10","M12 10v4","M10 12h4"],
  land:["M3 20h18","M5 20l2-8h10l2 8","M8 12V8h8v4","M10 8V5h4v3","M2 12h20"],
  plane:["M3 13l8-2V4a1 1 0 0 1 2 0v7l8 2v2l-8-1v5l3 2v1l-4-1-4 1v-1l3-2v-5l-8 1z"],
  radar:["M12 12l7-7","M12 3a9 9 0 1 0 9 9","M12 7a5 5 0 1 0 5 5","M12 12h.01"],
  ship:["M3 13l9-9 9 9","M4 13h16l-2 6H6z","M8 19c1 1 2 1 4 0s3-1 4 0"],
  radio:["M4 7h16v13H4z","M8 7l8-4","M8 12h8","M8 16h.01","M16 16h.01"],
  shield:["M12 2l8 3v6c0 5-3.5 8.5-8 11-4.5-2.5-8-6-8-11V5z","M9 12l2 2 4-4"],
  graduation:["M2 9l10-5 10 5-10 5z","M6 11v5c3 3 9 3 12 0v-5","M22 9v6"],
  microscope:["M8 3h5v5H8z","M10 8l5 5","M14 13a5 5 0 0 1-5 5","M5 21h14","M8 18l-2 3","M16 4l3 3"],
  book:["M4 4h6a3 3 0 0 1 3 3v13a3 3 0 0 0-3-3H4z","M20 4h-4a3 3 0 0 0-3 3v13a3 3 0 0 1 3-3h4z"],
  search:["M20 20l-4.5-4.5","M10.5 17a6.5 6.5 0 1 0 0-13a6.5 6.5 0 0 0 0 13"],
  menu:["M3 6h18","M3 12h18","M3 18h18"],
  close:["M5 5l14 14","M19 5L5 19"],
  arrow:["M5 12h14","M13 6l6 6-6 6"],
  moon:["M20 15.5A8 8 0 0 1 8.5 4 8 8 0 1 0 20 15.5"],
  sun:["M12 3v2","M12 19v2","M3 12h2","M19 12h2","M5.6 5.6L7 7","M17 17l1.4 1.4","M18.4 5.6L17 7","M7 17l-1.4 1.4","M12 8a4 4 0 1 0 0 8a4 4 0 0 0 0-8"],
  monitor:["M3 4h18v13H3z","M8 21h8","M12 17v4"],
  home:["M3 10l9-7 9 7","M5 9v12h14V9","M9 21v-7h6v7"],
  layers:["M12 3l9 5-9 5-9-5z","M3 12l9 5 9-5","M3 16l9 5 9-5"],
  box:["M3 7l9-4 9 4-9 5z","M3 7v10l9 4 9-4V7","M12 12v9"],
  settings:["M12 8a4 4 0 1 0 0 8a4 4 0 0 0 0-8","M19 13.5l2 1.2-2 3.5-2.2-1a7 7 0 0 1-2 1.2L14.5 21h-5L9 18.4a7 7 0 0 1-2-1.2l-2.2 1-2-3.5 2-1.2a7 7 0 0 1 0-2.3l-2-1.2 2-3.5 2.2 1a7 7 0 0 1 2-1.2L9.5 3h5l.3 2.6a7 7 0 0 1 2 1.2l2.2-1 2 3.5-2 1.2a7 7 0 0 1 0 3z"],
  compass:["M12 2a10 10 0 1 0 0 20a10 10 0 0 0 0-20","M15.5 8.5l-2 5-5 2 2-5z"],
  external:["M14 4h6v6","M20 4l-9 9","M18 13v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h6"],
  check:["M5 12l4 4L19 6"],
  clock:["M12 3a9 9 0 1 0 0 18a9 9 0 0 0 0-18","M12 7v5l3 2"],
  map:["M3 6l6-3 6 3 6-3v15l-6 3-6-3-6 3z","M9 3v15","M15 6v15"],
  chevron:["M9 18l6-6-6-6"],
  target:["M12 3a9 9 0 1 0 0 18a9 9 0 0 0 0-18","M12 8a4 4 0 1 0 0 8a4 4 0 0 0 0-8","M12 11v2","M11 12h2"],
  lock:["M5 10h14v11H5z","M8 10V7a4 4 0 1 1 8 0v3","M12 14v3"],
  file:["M6 3h8l4 4v14H6z","M14 3v5h5","M9 13h6","M9 17h6"],
  sparkles:["M12 3l1.4 5.6L19 10l-5.6 1.4L12 17l-1.4-5.6L5 10l5.6-1.4z","M19 15l.7 2.3L22 18l-2.3.7L19 21l-.7-2.3L16 18l2.3-.7z"],
  info:["M12 11v5","M12 8h.01","M12 2a10 10 0 1 0 0 20a10 10 0 0 0 0-20"]
};

export default function Icon({ name, size = 20, className, ...props }: SVGProps<SVGSVGElement> & { name: IconName; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className={className}
      aria-hidden="true" focusable="false" {...props}>
      {shapes[name].map((shape, index) => <path key={index} d={shape} />)}
    </svg>
  );
}
