"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./sidebar.module.css";

interface NavItem {
  label: string;
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: "HOME", href: "/" },
  { label: "SERVICES", href: "/services" },
  { label: "PROJECT", href: "/project" },
  { label: "CONTACT", href: "/contact" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const isLinkActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  const spacexLogoSvg = (className: string) => (
    <svg
      className={className}
      viewBox="0 0 540 68"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* S */}
      <path
        d="M32.8 45.4C32.8 48.9 29.8 51.5 24.2 51.5C18.6 51.5 13.9 48.7 12.1 46.2L0 55.4C4.8 61.6 13.7 66.8 24.5 66.8C40.4 66.8 49.3 57.5 49.3 44.8C49.3 27.6 28.5 25.1 28.5 19.3C28.5 16.5 31.1 14.8 35.8 14.8C40.6 14.8 44.6 16.9 46.5 19.1L57.2 9.6C51.6 4.3 43.8 0 35.2 0C21.1 0 12.8 8.8 12.8 20.3C12.8 38.3 32.8 40.2 32.8 45.4Z"
        fill="white"
      />
      {/* P */}
      <path
        d="M74.8 1.4H90.8C108.6 1.4 119.7 11.2 119.7 26.6C119.7 42.1 108.6 51.8 90.8 51.8H90.5V66H74.8V1.4ZM90.5 37.8C98.4 37.8 103.5 33.4 103.5 26.6C103.5 19.8 98.4 15.4 90.5 15.4H90.3V37.8H90.5Z"
        fill="white"
      />
      {/* A */}
      <path
        d="M165.7 66H182.2L162.7 1.4H147.2L127.7 66H144.2L147.6 53.6H162.3L165.7 66ZM151.3 40.5L155 26.8L158.6 40.5H151.3Z"
        fill="white"
      />
      {/* C */}
      <path
        d="M239.5 46.7C236.4 50 230.7 52.6 223.7 52.6C210.5 52.6 200.7 42.4 200.7 29.8C200.7 17.2 210.5 7 223.7 7C230.7 7 236.4 9.6 239.5 12.9L251.2 3.1C244.6 -2.1 234.9 -5.4 223.7 -5.4C198.8 -5.4 184 10.3 184 29.8C184 49.3 198.8 65 223.7 65C234.9 65 244.6 61.7 251.2 56.5L239.5 46.7Z"
        transform="translate(10, 4)"
        fill="white"
      />
      {/* E */}
      <path
        d="M276.5 1.4H319.4V15.4H292.2V26.2H315.6V39.4H292.2V52H320.6V66H276.5V1.4Z"
        fill="white"
      />
      {/* X with curved trajectory swoosh */}
      <path
        d="M344.8 66H361.6L378.8 38.6L395.7 66H412.5L387.2 26.4L410.9 0H394.1L378.8 24.3L363.8 0H347L370.4 26.4L344.8 66Z"
        fill="white"
      />
      <path
        d="M338 64C376 43 434 23 528 2C482 17 433 37 398 62L382 66C412 43 458 26 500 14C436 29 380 47 344 68L338 64Z"
        fill="white"
      />
    </svg>
  );

  return (
    <>
      {/* Mobile Top Bar (visible on < 769px) */}
      <div className={styles.mobileTopBar}>
        <Link
          href="/"
          onClick={handleLinkClick}
          className={styles.mobileBrand}
          aria-label="SpaceX Home"
        >
          {spacexLogoSvg(styles.mobileBrandLogo)}
        </Link>
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className={styles.mobileHamburger}
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
        >
          <span
            className={`${styles.hamburgerBar} ${isOpen ? styles.hamburgerBarOpenTop : ""
              }`}
          />
          <span
            className={`${styles.hamburgerBar} ${isOpen ? styles.hamburgerBarOpenMid : ""
              }`}
          />
          <span
            className={`${styles.hamburgerBar} ${isOpen ? styles.hamburgerBarOpenBot : ""
              }`}
          />
        </button>
      </div>

      {/* Backdrop overlay for mobile drawer */}
      <div
        className={`${styles.backdrop} ${isOpen ? styles.backdropOpen : ""}`}
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      {/* Main Sidebar */}
      <aside
        className={`${styles.sidebar} ${isOpen ? styles.sidebarOpen : ""}`}
        aria-label="Sidebar Navigation"
      >
        <div>
          {/* Top Logo */}
          <div className={styles.logoWrapper}>
            <Link
              href="/"
              onClick={handleLinkClick}
              className={styles.brandLink}
              aria-label="SpaceX Home"
            >
              {spacexLogoSvg(styles.brandLogo)}
            </Link>
          </div>

          {/* User Profile Card at Top of Navigations */}
          <div className={styles.profileSection}>
            <div className={styles.avatarContainer}>
              <svg
                viewBox="0 0 100 100"
                className={styles.avatarSvg}
                aria-label="Profile Avatar"
              >
                <defs>
                  <linearGradient id="avatarBgGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#f8f9fa" />
                    <stop offset="100%" stopColor="#e9ecef" />
                  </linearGradient>
                  <linearGradient id="figureGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6c7a89" />
                    <stop offset="100%" stopColor="#3d4852" />
                  </linearGradient>
                </defs>
                {/* Background Circle */}
                <circle cx="50" cy="50" r="50" fill="url(#avatarBgGrad)" />
                {/* Head */}
                <circle cx="50" cy="38" r="20" fill="url(#figureGrad)" />
                {/* Neck & Shoulders */}
                <path
                  d="M18 92 C18 68, 32 58, 50 58 C68 58, 82 68, 82 92 Z"
                  fill="url(#figureGrad)"
                />
              </svg>
            </div>

            {/* Name & Blue Verified Badge */}
            <div className={styles.nameRow}>
              <span className={styles.userName}>Your Name</span>
              <svg
                className={styles.verifiedBadge}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-label="Verified Profile"
              >
                <path
                  d="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81c-.67-1.31-1.91-2.19-3.34-2.19s-2.67.88-3.34 2.19c-1.39-.46-2.9-.2-3.91.81s-1.27 2.52-.81 3.91c-1.31.67-2.19 1.91-2.19 3.34s.88 2.67 2.19 3.34c-.46 1.39-.2 2.9.81 3.91s2.52 1.27 3.91.81c.67 1.31 1.91 2.19 3.34 2.19s2.67-.88 3.34-2.19c1.39.46 2.9.2 3.91-.81s1.27-2.52.81-3.91c1.31-.67 2.19-1.91 2.19-3.34z"
                  fill="#1D9BF0"
                />
                <path
                  d="M9.5 16.5l-3.5-3.5 1.41-1.41 2.09 2.08 6.09-6.09 1.41 1.41-7.5 7.51z"
                  fill="#FFFFFF"
                />
              </svg>
            </div>

            {/* Handle */}
            <span className={styles.userHandle}>@yourhandle</span>

            {/* Social / Action Row */}
            <div className={styles.socialRow}>
              {/* Facebook */}
              <a
                href="https://www.facebook.com/cyyyyyycyyyy"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialBtn}
                aria-label="Facebook"
              >
                <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href="https://github.com/Sukehiro13"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialBtn}
                aria-label="LinkedIn"
              >
                <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                </svg>
              </a>

              {/* Discord */}
              <a
                href="https://discord.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialBtn}
                aria-label="Discord"
              >
                <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.893.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                </svg>
              </a>

              {/* Theme Toggle / Moon */}
              <button
                type="button"
                className={styles.socialBtn}
                aria-label="Theme mode"
              >
                <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Navigation Links (No numbers on the left) */}
          <div className={styles.navSection}>
            <span className={styles.sectionLabel}>{"// NAVIGATION"}</span>
            <nav className={styles.navList}>
              {NAV_ITEMS.map((item) => {
                const active = isLinkActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={handleLinkClick}
                    className={`${styles.navItem} ${active ? styles.navItemActive : ""
                      }`}
                    aria-current={active ? "page" : undefined}
                  >
                    {active && <span className={styles.activeIndicator} />}
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Sidebar Telemetry Footer */}
        <div className={styles.sidebarFooter}>
          <div className={styles.footerTelemetry}>
            <span>TELEMETRY</span>
            <span className={styles.telemetryStatus}>
              <span className={styles.statusDot} />
              ONLINE
            </span>
          </div>
          <span className={styles.copyright}>SPACEX © 2026</span>
        </div>
      </aside>
    </>
  );
}
