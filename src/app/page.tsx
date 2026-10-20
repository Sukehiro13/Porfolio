import styles from "./blank-page.module.css";

export default function Home() {
  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.title}>Hi, I&apos;m Cyrus</h1>
        <div className={styles.divider} />
        <div className={styles.contentPlaceholder}>
          <span className={styles.placeholderCode}>HOME PAGE CONTENT</span>
          <p className={styles.placeholderText}>
            Ready for your layout, hero components, and content.
          </p>
        </div>
      </div>
    </main>
  );
}
