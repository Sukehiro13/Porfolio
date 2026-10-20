import type { Metadata } from "next";
import styles from "../blank-page.module.css";

export const metadata: Metadata = {
  title: "Services — SpaceX",
  description: "SpaceX commercial and scientific launch services.",
};

export default function ServicesPage() {
  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <span className={styles.eyebrow}>CAPABILITIES // 02</span>
        <h1 className={styles.title}>SERVICES</h1>
        <div className={styles.divider} />
        <div className={styles.contentPlaceholder}>
          <span className={styles.placeholderCode}>SERVICES PAGE CONTENT</span>
          <p className={styles.placeholderText}>
            Ready for your services catalog, mission specs, and capabilities.
          </p>
        </div>
      </div>
    </main>
  );
}
