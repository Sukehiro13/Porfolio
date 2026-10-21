import type { Metadata } from "next";
import Link from "next/link";
import styles from "./services.module.css";

export const metadata: Metadata = {
  title: "Services — Cyrus B. Reyes",
  description:
    "UI/UX Design, Frontend Development, Responsive Web Design, and Backend Development services by Cyrus B. Reyes.",
};

interface ServiceItem {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  tags: string[];
}

const SERVICES: ServiceItem[] = [
  {
    id: "ui-ux",
    name: "UI/UX Design",
    icon: (
      <svg
        width="26"
        height="26"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#ffffff"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        style={{ color: "#ffffff", stroke: "#ffffff" }}
      >
        <circle cx="13.5" cy="6.5" r=".75" fill="#ffffff" />
        <circle cx="17.5" cy="10.5" r=".75" fill="#ffffff" />
        <circle cx="8.5" cy="7.5" r=".75" fill="#ffffff" />
        <circle cx="6.5" cy="12.5" r=".75" fill="#ffffff" />
        <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.563-2.512 5.563-5.563C21.437 6.082 17.215 2 12 2z" />
      </svg>
    ),
    description:
      "Crafting intuitive, visually engaging digital interfaces that provide seamless user experiences and encourage meaningful interaction.",
    tags: ["User Research", "Wireframing", "Prototyping", "Visual Design"],
  },
  {
    id: "frontend",
    name: "Frontend Development",
    icon: (
      <svg
        width="26"
        height="26"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#ffffff"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        style={{ color: "#ffffff", stroke: "#ffffff" }}
      >
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    description:
      "Developing fast, responsive, and interactive web applications with modern technologies and efficient development practices.",
    tags: [
      "Vue.js / React",
      "Next.js / React",
      "TypeScript",
      "Tailwind CSS",
      "Performance Optimization",
    ],
  },
  {
    id: "responsive",
    name: "Responsive Design",
    icon: (
      <svg
        width="26"
        height="26"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#ffffff"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        style={{ color: "#ffffff", stroke: "#ffffff" }}
      >
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
        <line x1="12" y1="18" x2="12.01" y2="18" />
      </svg>
    ),
    description:
      "Creating flexible, user-friendly websites that deliver a consistent experience across different devices, browsers, and screen sizes.",
    tags: [
      "Mobile-First Design",
      "Cross-Browser Compatibility",
      "Accessibility",
      "Progressive Enhancement",
    ],
  },
  {
    id: "backend",
    name: "Backend Development",
    icon: (
      <svg
        width="26"
        height="26"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#ffffff"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        style={{ color: "#ffffff", stroke: "#ffffff" }}
      >
        <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
        <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
        <line x1="6" y1="6" x2="6.01" y2="6" />
        <line x1="6" y1="18" x2="6.01" y2="18" />
      </svg>
    ),
    description:
      "Developing secure, reliable server-side systems and APIs that support smooth functionality and scalable web applications.",
    tags: [
      "Node.js / Express",
      "Django",
      "Database Design",
      "RESTful APIs",
      "Authentication & Security",
    ],
  },
];

export default function ServicesPage() {
  return (
    <main className={styles.page}>
      <div className={styles.container}>
        {/* Page Header */}
        <header className={styles.header}>
          <span className={styles.eyebrow}>SERVICES // 02</span>
          <h1 className={styles.title}>Services</h1>
        </header>

        <div className={styles.divider} />

        {/* 2x2 Services Cards Grid */}
        <div className={styles.servicesGrid}>
          {SERVICES.map((service) => (
            <article key={service.id} className={styles.serviceCard}>
              <div className={styles.cardHeader}>
                <div
                  className={styles.iconBox}
                  style={{
                    color: "#ffffff",
                    borderColor: "rgba(255, 255, 255, 0.22)",
                    backgroundColor: "rgba(255, 255, 255, 0.06)",
                  }}
                >
                  {service.icon}
                </div>
                <h2 className={styles.serviceName}>{service.name}</h2>
              </div>

              <p className={styles.serviceDesc}>{service.description}</p>

              <div className={styles.tagsContainer}>
                {service.tags.map((tag) => (
                  <span key={tag} className={styles.tagPill}>
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>

        {/* Bottom CTA Box */}
        <div className={styles.ctaBox}>
          <div className={styles.ctaTextGroup}>
            <h3 className={styles.ctaHeading}>Need a custom solution?</h3>
            <p className={styles.ctaSub}>
              Have a project with unique requirements? Let&apos;s discuss how we can tailor these services to your vision.
            </p>
          </div>
          <Link href="/contact" className={styles.contactBtn}>
            Get In Touch →
          </Link>
        </div>
      </div>
    </main>
  );
}
