"use client";

import React, { useState } from "react";
import Link from "next/link";
import ToolsBar from "./components/tools-bar";
import styles from "./home.module.css";

export default function Home() {
  const [terminalCmd, setTerminalCmd] = useState<string>("whoami");

  const terminalOutputs: Record<string, string> = {
    whoami:
      "Name: Cyrus B. Reyes (@Sukehiro13)\nRole: Full-Stack Developer & UI/UX Designer\nEducation: Computer Science Graduate, Palawan State University\nLocation: Palawan, Philippines\nStatus: 🟢 Available for hire & freelance projects",
    skills:
      "Frontend: React, Next.js, TypeScript, Vue.js, CSS3, Tailwind CSS\nBackend: Node.js, Express, Django, PHP, RESTful APIs\nDevOps & Tools: Vercel, Git, Antigravity, VS Code, Cursor\nDesign: Wireframing, Prototyping, Mobile-First, Modern UI/UX",
    contact:
      "Email: cyrusreyes1313@gmail.com\nGitHub: https://github.com/Sukehiro13\nFacebook: https://www.facebook.com/cyyyyyycyyyy\nInstagram: https://www.instagram.com/_sukehirooo",
    help:
      "Available commands:\n- whoami   : Display background & graduation info\n- skills   : View tech stack & capabilities\n- contact  : Retrieve contact & social links\n- clear    : Reset terminal display",
  };

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        {/* Hero Header */}
        <header className={styles.heroHeader}>
          <div className={styles.statusBadge}>
            <span className={styles.statusDot} />
            <span>Available for Opportunities // 2026</span>
          </div>

          <h1 className={styles.title}>
            Hi, I&apos;m <span className={styles.titleAccent}>Cyrus</span>
          </h1>

          <p className={styles.subtitle}>
            A Computer Science Graduate at Palawan State University with a strong passion for web design, intuitive user experiences, and creating performant, full-stack digital applications.
          </p>

          <div className={styles.heroActions}>
            <Link href="/project" className={styles.primaryBtn}>
              Explore Projects →
            </Link>
            <Link href="/contact" className={styles.secondaryBtn}>
              Get In Touch
            </Link>
          </div>
        </header>

        {/* Daily Drivers / Sliding Tools Bar */}
        <ToolsBar />

        {/* Interactive Developer Terminal */}
        <section className={styles.section} aria-label="Interactive Terminal">
          <div className={styles.sectionHeader}>
            <span className={styles.eyebrow}>INTERACTIVE // DEVELOPER CONSOLE</span>
            <h2 className={styles.sectionTitle}>Developer Console</h2>
          </div>

          <div className={styles.terminalCard}>
            <div className={styles.terminalHeader}>
              <div className={styles.terminalDots}>
                <span className={styles.dotRed} />
                <span className={styles.dotYellow} />
                <span className={styles.dotGreen} />
              </div>
              <span className={styles.terminalTitle}>cyrus@psu-dev:~</span>
            </div>
            <div className={styles.terminalBody}>
              <div className={styles.terminalCommandRow}>
                <span>Click a command:</span>
                <button
                  type="button"
                  className={styles.cmdBtn}
                  onClick={() => setTerminalCmd("whoami")}
                >
                  whoami
                </button>
                <button
                  type="button"
                  className={styles.cmdBtn}
                  onClick={() => setTerminalCmd("skills")}
                >
                  skills
                </button>
                <button
                  type="button"
                  className={styles.cmdBtn}
                  onClick={() => setTerminalCmd("contact")}
                >
                  contact
                </button>
                <button
                  type="button"
                  className={styles.cmdBtn}
                  onClick={() => setTerminalCmd("help")}
                >
                  help
                </button>
              </div>

              <div>
                <span className={styles.terminalPrompt}>$</span>{" "}
                <span>{terminalCmd}</span>
              </div>

              <div className={styles.terminalOutput}>
                {terminalOutputs[terminalCmd] || "Command not found. Try 'help'."}
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
