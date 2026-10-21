import React from "react";
import styles from "./tools-bar.module.css";

interface Tool {
  id: string;
  name: string;
  icon: React.ReactNode;
}

const TOOLS: Tool[] = [
  {
    id: "vercel",
    name: "Vercel App",
    icon: (
      <svg
        width="17"
        height="17"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path d="M12 2L24 22H0L12 2Z" fill="#FFFFFF" />
      </svg>
    ),
  },
  {
    id: "php",
    name: "PHP Language",
    icon: (
      <svg
        width="22"
        height="15"
        viewBox="0 0 24 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <rect width="24" height="16" rx="3.5" fill="#777BB4" />
        <path
          d="M4 12V4H6.8C7.9 4 8.6 4.7 8.6 5.6C8.6 6.5 7.9 7.2 6.8 7.2H5.4V12H4ZM5.4 6.1H6.7C7.2 6.1 7.5 5.9 7.5 5.6C7.5 5.3 7.2 5.1 6.7 5.1H5.4V6.1ZM9.8 12V4H11.2V7.3H13.6V4H15V12H13.6V8.4H11.2V12H9.8ZM16.4 12V4H19.2C20.3 4 21 4.7 21 5.6C21 6.5 20.3 7.2 19.2 7.2H17.8V12H16.4ZM17.8 6.1H19.1C19.6 6.1 19.9 5.9 19.9 5.6C19.9 5.3 19.6 5.1 19.1 5.1H17.8V6.1Z"
          fill="#FFFFFF"
        />
      </svg>
    ),
  },
  {
    id: "css",
    name: "CSS",
    icon: (
      <svg
        width="17"
        height="17"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path d="M3 2L4.6 20.2L12 22.2L19.4 20.2L21 2H3Z" fill="#264DE4" />
        <path d="M12 3.6V20.4L18 18.7L19.4 3.6H12Z" fill="#2965F1" />
        <path
          d="M12 7.4H7.2L7.4 9.6H12V7.4ZM12 13.5H9.7L9.5 11.8H7.3L7.7 15.6H12V13.5ZM12 18.3V16.2L10.3 15.7L10.2 14.7H8L8.2 16.9L12 18.3Z"
          fill="#EBEBEB"
        />
        <path
          d="M12 7.4V9.6H16.6L16.8 7.4H12ZM12 13.5V11.8H16.4L16.2 13.5H12ZM12 18.3L15.8 16.9L16.3 11.8H14.1L13.9 14.7L12 15.2V17.3L12 18.3Z"
          fill="#FFFFFF"
        />
      </svg>
    ),
  },
  {
    id: "nodejs",
    name: "Node.js",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path d="M12 2L21 7.2V17.6L12 22.8L3 17.6V7.2L12 2Z" fill="#539E43" />
        <path d="M12 4.2L18.8 8.1V16.7L12 20.6L5.2 16.7V8.1L12 4.2Z" fill="#1e1e24" />
        <path d="M12 6.5L16.5 9.1V15.7L12 18.3L7.5 15.7V9.1L12 6.5Z" fill="#68A063" />
      </svg>
    ),
  },
  {
    id: "django",
    name: "Django",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <rect width="24" height="24" rx="4" fill="#092E20" />
        <path
          d="M13.2 4.5H15.5V14.8C14.7 15 14 15.1 13.3 15.1C11.1 15.1 9.8 14 9.8 12C9.8 10.1 11.1 8.8 13.2 8.8V4.5ZM13.2 10.8C12.3 10.8 11.8 11.3 11.8 12C11.8 12.7 12.3 13.2 13.2 13.2V10.8ZM16.8 8.8H19.1V19.5H16.8V8.8ZM7.5 16.5C8.2 16.5 8.8 16.3 9.4 16V17.9C8.8 18.2 8.1 18.3 7.3 18.3C5.1 18.3 3.8 17.2 3.8 15.2V8.8H6.1V15C6.1 15.9 6.6 16.5 7.5 16.5ZM16.8 4.5H19.1V6.8H16.8V4.5Z"
          fill="#44B78B"
        />
      </svg>
    ),
  },
  {
    id: "react",
    name: "React",
    icon: (
      <svg
        width="19"
        height="17"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61DAFB" strokeWidth="1.5" />
        <ellipse
          cx="12"
          cy="12"
          rx="10"
          ry="4"
          stroke="#61DAFB"
          strokeWidth="1.5"
          transform="rotate(60 12 12)"
        />
        <ellipse
          cx="12"
          cy="12"
          rx="10"
          ry="4"
          stroke="#61DAFB"
          strokeWidth="1.5"
          transform="rotate(120 12 12)"
        />
        <circle cx="12" cy="12" r="2.2" fill="#61DAFB" />
      </svg>
    ),
  },
  {
    id: "antigravity",
    name: "Antigravity",
    icon: (
      <svg
        width="19"
        height="19"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="toolsAgyGrad" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#818CF8" />
            <stop offset="50%" stopColor="#38BDF8" />
            <stop offset="100%" stopColor="#34D399" />
          </linearGradient>
        </defs>
        <ellipse
          cx="12"
          cy="12"
          rx="10"
          ry="4"
          stroke="#38BDF8"
          strokeWidth="1.4"
          transform="rotate(-25 12 12)"
        />
        <path
          d="M12 3.5L18 16.5H6L12 3.5Z"
          stroke="url(#toolsAgyGrad)"
          strokeWidth="1.8"
          strokeLinejoin="round"
          fill="rgba(56, 189, 248, 0.15)"
        />
        <path d="M9 13H15" stroke="#38BDF8" strokeWidth="1.5" />
        <circle cx="12" cy="8" r="1.5" fill="#FFFFFF" />
        <circle cx="4.5" cy="15.5" r="1.2" fill="#38BDF8" />
        <circle cx="19.5" cy="8.5" r="1.2" fill="#818CF8" />
      </svg>
    ),
  },
];

export default function ToolsBar() {
  const renderTools = (prefix: string) => (
    <ul className={styles.toolsList}>
      {TOOLS.map((tool) => (
        <React.Fragment key={`${prefix}-${tool.id}`}>
          <li className={styles.toolItem} title={tool.name}>
            <span className={styles.toolIconWrapper}>{tool.icon}</span>
            <span className={styles.toolName}>{tool.name}</span>
          </li>
          <li className={styles.itemDivider} aria-hidden="true" />
        </React.Fragment>
      ))}
    </ul>
  );

  return (
    <section className={styles.wrapper} aria-label="Daily Drivers - Tools I work with">
      {/* Left Title Area */}
      <div className={styles.titleSection}>
        <span className={styles.eyebrow}>DAILY DRIVERS</span>
        <h2 className={styles.title}>Tools I work with</h2>
      </div>

      {/* Vertical Section Divider */}
      <div className={styles.sectionDivider} aria-hidden="true" />

      {/* Pill Capsule with Sliding Marquee Track */}
      <div className={styles.pillContainer}>
        <div className={styles.marqueeTrack}>
          {/* First Half */}
          <div className={styles.marqueeGroup}>
            {renderTools("g1a")}
            {renderTools("g1b")}
          </div>
          {/* Second Half (duplicate for seamless infinite loop) */}
          <div className={styles.marqueeGroup} aria-hidden="true">
            {renderTools("g2a")}
            {renderTools("g2b")}
          </div>
        </div>
      </div>
    </section>
  );
}
