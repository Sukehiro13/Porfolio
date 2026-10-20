import styles from "./footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <span className={styles.footerBrand}>SPACEX © 2026</span>
      </div>
    </footer>
  );
}
