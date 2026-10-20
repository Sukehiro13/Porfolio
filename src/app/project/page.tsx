import type { Metadata } from "next";
import styles from "../blank-page.module.css";

export const metadata: Metadata = {
  title: "Project — SpaceX",
  description: "SpaceX active aerospace and multiplanetary architecture projects.",
};

export default function ProjectPage() {
  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <span className={styles.eyebrow}>ARCHITECTURE // 03</span>
        <h1 className={styles.title}>PROJECT</h1>
        <div className={styles.divider} />
        <div className={styles.contentPlaceholder}>
          <span className={styles.placeholderCode}>PROJECT PAGE CONTENT</span>
          <p className={styles.placeholderText}>
            Ready for your active vehicle developments, technical specs, and engineering portfolios.
          </p>
        </div>
      </div>
    </main>
  );
}
