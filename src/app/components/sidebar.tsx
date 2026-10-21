"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
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
  const [isLightMode, setIsLightMode] = useState<boolean>(false);

  useEffect(() => {
    // Check saved theme preference on mount
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
      setIsLightMode(true);
      document.documentElement.setAttribute("data-theme", "light");
    } else {
      setIsLightMode(false);
      document.documentElement.setAttribute("data-theme", "dark");
    }
  }, []);

  const toggleTheme = () => {
    const nextMode = !isLightMode;
    setIsLightMode(nextMode);
    const themeName = nextMode ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", themeName);
    localStorage.setItem("theme", themeName);
  };

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

  return (
    <>
      {/* Mobile Top Bar (visible on < 769px) */}
      <div className={styles.mobileTopBar}>
        <Link
          href="/"
          onClick={handleLinkClick}
          className={styles.mobileBrand}
          aria-label="Cyrus B. Reyes"
        >
          <span className={styles.mobileBrandText}>CYRUS B. REYES</span>
        </Link>
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className={styles.mobileHamburger}
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
        >
          <span
            className={`${styles.hamburgerBar} ${
              isOpen ? styles.hamburgerBarOpenTop : ""
            }`}
          />
          <span
            className={`${styles.hamburgerBar} ${
              isOpen ? styles.hamburgerBarOpenMid : ""
            }`}
          />
          <span
            className={`${styles.hamburgerBar} ${
              isOpen ? styles.hamburgerBarOpenBot : ""
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
          {/* User Profile Card at Top of Navigations */}
          <div className={styles.profileSection}>
            <div className={styles.avatarContainer}>
              <Image
                src="/images/cyrus.png"
                alt="Cyrus B. Reyes"
                width={80}
                height={80}
                className={styles.avatarImg}
                priority
              />
            </div>

            {/* Name & Blue Verified Badge */}
            <div className={styles.nameRow}>
              <span className={styles.userName}>Cyrus B. Reyes</span>
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
            <span className={styles.userHandle}>@Sukehiro13</span>

            {/* Social / Action Row */}
            <div className={styles.socialRow}>
              {/* 1. Facebook */}
              <a
                href="https://www.facebook.com/cyyyyyycyyyy"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialBtn}
                aria-label="Facebook"
                title="Facebook"
              >
                <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>

              {/* 2. Telegram */}
              <a
                href="https://t.me/Sukehiro13"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialBtn}
                aria-label="Telegram"
                title="Telegram"
              >
                <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.121l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.832.946z" />
                </svg>
              </a>

              {/* 3. WhatsApp */}
              <a
                href="https://wa.me/639241004654"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialBtn}
                aria-label="WhatsApp"
                title="WhatsApp"
              >
                <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                </svg>
              </a>

              {/* 4. Night mode / Daylight mode */}
              <button
                type="button"
                onClick={toggleTheme}
                className={styles.socialBtn}
                aria-label={
                  isLightMode ? "Switch to night mode" : "Switch to daylight mode"
                }
                title={
                  isLightMode ? "Switch to night mode" : "Switch to daylight mode"
                }
              >
                {isLightMode ? (
                  <svg
                    viewBox="0 0 24 24"
                    width="15"
                    height="15"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="5" />
                    <line x1="12" y1="1" x2="12" y2="3" />
                    <line x1="12" y1="21" x2="12" y2="23" />
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                    <line x1="1" y1="12" x2="3" y2="12" />
                    <line x1="21" y1="12" x2="23" y2="12" />
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                  </svg>
                ) : (
                  <svg
                    viewBox="0 0 24 24"
                    width="15"
                    height="15"
                    fill="currentColor"
                  >
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                  </svg>
                )}
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
                    className={`${styles.navItem} ${
                      active ? styles.navItemActive : ""
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
      </aside>
    </>
  );
}
