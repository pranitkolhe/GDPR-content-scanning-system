import { Link, useLocation } from "react-router-dom";

const routeMap = {

  "/": {
    label: "Home",
    icon: (
      <svg
        width="11"
        height="11"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
  },

  "/scan": {
    label: "Scan",
    icon: (
      <svg
        width="11"
        height="11"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="11" cy="11" r="8"/>
        <path d="m21 21-4.35-4.35"/>
      </svg>
    ),
  },

  "/dashboard": {
    label: "Dashboard",
    icon: (
      <svg
        width="11"
        height="11"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="3" width="7" height="7" rx="1"/>
        <rect x="14" y="3" width="7" height="7" rx="1"/>
        <rect x="3" y="14" width="7" height="7" rx="1"/>
        <rect x="14" y="14" width="7" height="7" rx="1"/>
      </svg>
    ),
  },

  "/rules": {
    label: "Rules",
    icon: (
      <svg
        width="11"
        height="11"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
  },

  "/violations": {
    label: "Violations",
    icon: (
      <svg
        width="11"
        height="11"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10"/>
        <line x1="12" y1="8" x2="12" y2="12"/>
        <line x1="12" y1="16" x2="12.01" y2="16"/>
      </svg>
    ),
  },

};

const violationsIcon = (
  <svg
    width="11"
    height="11"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10"/>
    <line x1="12" y1="8" x2="12" y2="12"/>
    <line x1="12" y1="16" x2="12.01" y2="16"/>
  </svg>
);

export default function Breadcrumb() {

  const location = useLocation();

  const scanIdMatch =
    location.pathname.match(/^\/scan\/(.+)$/);

  let segments = [];

  // HOME PAGE
  if (location.pathname === "/") {

    segments = [
      { path: "/", ...routeMap["/"] }
    ];

  }

  // SCAN DETAILS PAGE
  else if (scanIdMatch) {

    segments = [

      { path: "/", ...routeMap["/"] },

      {
        path: "/dashboard",
        ...routeMap["/dashboard"],
      },

      {
        path: location.pathname,
        label: `Violations #${scanIdMatch[1]}`,
        icon: violationsIcon,
      },

    ];

  }

  // OTHER PAGES
  else {

    segments = [

      { path: "/", ...routeMap["/"] },

      ...location.pathname
        .split("/")
        .filter(Boolean)
        .map((_, i, arr) => {

          const path =
            "/" + arr.slice(0, i + 1).join("/");

          // CUSTOM LABELS
          const customLabels = {

            "/analyst-dashboard": {
              label: "Dashboard",
              icon: routeMap["/dashboard"]?.icon,
            },

            "/violations": {
              label: "Violations",
              icon: routeMap["/violations"]?.icon,
            },

          };

          return {

            path,

            ...(customLabels[path] ||
              routeMap[path] || {
                label: path.replace("/", ""),
                icon: null,
              }),

          };

        }),

    ];

  }

  // HIDE BREADCRUMB
  if (
    segments.length <= 1 ||
    location.pathname === "/analyst-dashboard"
  ) {
    return null;
  }

  return (

    <div className="fixed top-[64px] left-0 z-[9999] py-1.5">

      <div className="flex items-center gap-1">

        {segments.map((seg, i) => {

          const isLast =
            i === segments.length - 1;

          return (

            <span
              key={seg.path}
              className="flex items-center gap-1"
            >

              {/* SEPARATOR */}

              {i > 0 && (

                <svg
                  width="8"
                  height="8"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-slate-400"
                >
                  <path d="M9 18l6-6-6-6"/>
                </svg>

              )}

              {/* ACTIVE */}

              {isLast ? (

                <span className="flex items-center gap-1 text-purple-600 font-bold text-xs">

                  <span>{seg.icon}</span>

                  {seg.label}

                </span>

              ) : (

                <Link
                  to={seg.path}
                  className="flex items-center gap-1 text-slate-400 hover:text-slate-600 font-medium text-xs transition-colors duration-200 no-underline"
                >

                  <span>{seg.icon}</span>

                  {seg.label}

                </Link>

              )}

            </span>

          );

        })}

        {/* GLOW DOT */}

        <span className="ml-1 w-1.5 h-1.5 rounded-full bg-purple-500 shadow-[0_0_6px_rgba(167,139,250,0.8)] inline-block flex-shrink-0" />

      </div>

    </div>

  );

}