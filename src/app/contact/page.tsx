import type { Metadata } from "next";
import styles from "../blank-page.module.css";

export const metadata: Metadata = {
  title: "Contact — SpaceX",
  description: "SpaceX mission inquiries and partnership contacts.",
};

export default function ContactPage() {
  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <span className={styles.eyebrow}>INQUIRIES // 04</span>
        <h1 className={styles.title}>CONTACT</h1>
        <div className={styles.divider} />
        <div className={styles.contentPlaceholder}>
          <span className={styles.placeholderCode}>CONTACT PAGE CONTENT</span>
          <p className={styles.placeholderText}>
            Ready for your mission inquiry forms, communication channels, and coordinates.
          </p>
        </div>
      </div>
    </main>
  );
}
