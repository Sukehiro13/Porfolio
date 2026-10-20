"use client";

import { useState } from "react";
import styles from "./interactive-counter.module.css";

export default function InteractiveDemo() {
  const [count, setCount] = useState(0);
  const [copied, setCopied] = useState(false);

  const command = "npm run dev";

  const handleCopy = () => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={styles.container}>
      <div className={styles.terminalBox}>
        <div className={styles.terminalHeader}>
          <div className={styles.terminalDots}>
            <span className={styles.dotRed} />
            <span className={styles.dotYellow} />
            <span className={styles.dotGreen} />
          </div>
          <span className={styles.terminalTitle}>Quickstart Terminal</span>
        </div>
        <div className={styles.terminalBody}>
          <code className={styles.terminalCode}>
            <span className={styles.prompt}>$</span> {command}
          </code>
          <button
            onClick={handleCopy}
            className={styles.copyButton}
            aria-label="Copy dev command"
          >
            {copied ? (
              <span className={styles.copiedText}>✓ Copied!</span>
            ) : (
              <span>Copy</span>
            )}
          </button>
        </div>
      </div>

      <div className={styles.interactiveCard}>
        <div className={styles.cardHeader}>
          <span className={styles.cardTag}>Client Component</span>
          <span className={styles.pingBadge}>
            <span className={styles.pingDot} />
            Interactive
          </span>
        </div>
        <div className={styles.counterContent}>
          <p className={styles.counterLabel}>Turbopack State Demo</p>
          <div className={styles.counterRow}>
            <button
              onClick={() => setCount((c) => c - 1)}
              className={styles.calcBtn}
              aria-label="Decrement"
            >
              −
            </button>
            <span className={styles.counterValue}>{count}</span>
            <button
              onClick={() => setCount((c) => c + 1)}
              className={styles.calcBtn}
              aria-label="Increment"
            >
              +
            </button>
            <button
              onClick={() => setCount(0)}
              className={styles.resetBtn}
              title="Reset counter"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
