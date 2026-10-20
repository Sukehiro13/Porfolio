"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./navbar.module.css";

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

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
        buttonRef.current?.focus();
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
    <header
      className={`${styles.header} ${isScrolled ? styles.headerScrolled : ""}`}
    >
      <div className={styles.navContainer}>
        {/* SpaceX Wordmark Logo */}
        <Link
          href="/"
          onClick={handleLinkClick}
          className={styles.brand}
          aria-label="SpaceX Home"
        >
          <svg
            className={styles.brandLogo}
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
        </Link>

        {/* Desktop Navigation Links */}
        <nav className={styles.desktopNav} aria-label="Main Navigation">
          {NAV_ITEMS.map((item) => {
            const active = isLinkActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={handleLinkClick}
                className={`${styles.navItem} ${active ? styles.navItemActive : ""}`}
                aria-current={active ? "page" : undefined}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Mobile Hamburger Toggle */}
        <button
          ref={buttonRef}
          onClick={() => setIsOpen((prev) => !prev)}
          className={styles.mobileToggle}
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
        >
          <span className={`${styles.bar} ${isOpen ? styles.barOpenTop : ""}`} />
          <span className={`${styles.bar} ${isOpen ? styles.barOpenMid : ""}`} />
          <span className={`${styles.bar} ${isOpen ? styles.barOpenBot : ""}`} />
        </button>

        {/* Mobile Overlay Menu */}
        {isOpen && (
          <div ref={menuRef} className={styles.mobileMenu} role="menu">
            {NAV_ITEMS.map((item) => {
              const active = isLinkActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={handleLinkClick}
                  className={`${styles.mobileNavItem} ${active ? styles.mobileNavItemActive : ""}`}
                  role="menuitem"
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </header>
  );
}
