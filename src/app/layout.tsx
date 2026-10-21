import type { Metadata } from "next";
import Sidebar from "./components/sidebar";
import Footer from "./components/footer";
import styles from "./layout.module.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cyrus B. Reyes | Portfolio",
  description: "Portfolio of Cyrus B. Reyes — Software Developer & Computer Science Graduate.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className={styles.layoutWrapper}>
          <Sidebar />
          <div className={styles.mainContent}>
            {children}
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}
