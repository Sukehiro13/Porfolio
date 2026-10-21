"use client";

import React, { useState } from "react";
import styles from "./contact.module.css";

type FormStatus = "idle" | "submitting" | "success" | "opened_email" | "error";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState<FormStatus>("idle");
  const [feedbackMessage, setFeedbackMessage] = useState<string>("");
  const [copiedEmail, setCopiedEmail] = useState<boolean>(false);

  const emailAddress = "cyrusreyes1313@gmail.com";

  // Usable Email Copy Functionality with fallback
  const handleCopyEmail = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(emailAddress);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = emailAddress;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2500);
    } catch (err) {
      console.error("Failed to copy email:", err);
    }
  };

  // Pre-filled mailto fallback link preserving user inputs
  const mailtoFallbackUrl = `mailto:${emailAddress}?subject=${encodeURIComponent(
    formData.subject || "Portfolio Inquiry // Cyrus B. Reyes"
  )}&body=${encodeURIComponent(
    `Hi Cyrus,\n\n${formData.message ? formData.message + "\n\n" : ""}---\nSent by: ${
      formData.name || "[Your Name]"
    }\nEmail: ${formData.email || "[Your Email]"}`
  )}`;

  // Submit via SMTP API Route with automatic seamless fallback
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "submitting") return;

    setStatus("submitting");
    setFeedbackMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.success && data.method === "smtp") {
        // SMTP sent successfully in background
        setStatus("success");
        setFeedbackMessage(
          data.message ||
            "Your message has been sent successfully via SMTP! Cyrus will get back to you shortly."
        );
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        // SMTP password not set in .env.local -> seamlessly make email usable via mail client
        window.location.href = mailtoFallbackUrl;
        setStatus("opened_email");
        setFeedbackMessage(
          "Your message has been prepared in your default email application addressed to " +
            emailAddress +
            "."
        );
      }
    } catch (err) {
      console.error("Error submitting contact form:", err);
      // On network or server error, still launch mail client seamlessly
      window.location.href = mailtoFallbackUrl;
      setStatus("opened_email");
      setFeedbackMessage(
        "Your message has been prepared in your default email application addressed to " +
          emailAddress +
          "."
      );
    }
  };

  const handleReset = () => {
    setStatus("idle");
    setFeedbackMessage("");
  };

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        {/* Header */}
        <header className={styles.header}>
          <span className={styles.eyebrow}>INQUIRIES // 04</span>
          <h1 className={styles.title}>Contact</h1>
          <p className={styles.subtitle}>
            Have a project in mind, an opportunity to discuss, or just want to say hello? Send a message below or connect directly through any of my channels.
          </p>
        </header>

        <div className={styles.divider} />

        {/* Contact Layout: Left Channels + Right Form */}
        <div className={styles.contactGrid}>
          {/* Left Column: Coordinates & Channels */}
          <div className={styles.channelsCol}>
            {/* 1. Usable Interactive Email Card */}
            <div className={styles.emailCard}>
              <div className={styles.emailCardTop}>
                <div className={styles.iconBox}>
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </div>
                <div className={styles.channelInfo}>
                  <span className={styles.channelLabel}>Email Address</span>
                  <span className={styles.channelValue}>{emailAddress}</span>
                </div>
              </div>

              {/* Usable Email Actions: Copy & Direct Mail App Link */}
              <div className={styles.channelActions}>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className={`${styles.cardActionBtn} ${
                    copiedEmail ? styles.cardActionBtnCopied : ""
                  }`}
                  aria-label="Copy email address"
                  title="Copy email to clipboard"
                >
                  {copiedEmail ? (
                    <>
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                      </svg>
                      <span>Copy</span>
                    </>
                  )}
                </button>

                <a
                  href={`mailto:${emailAddress}`}
                  className={styles.cardActionBtn}
                  title="Open in default mail client"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                  <span>Open Mail App</span>
                </a>
              </div>
            </div>

            {/* 2. Telegram */}
            <a
              href="https://t.me/Sukehiro13"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.channelCard}
              title="Message Cyrus on Telegram"
            >
              <div className={styles.iconBox}>
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </div>
              <div className={styles.channelInfo}>
                <span className={styles.channelLabel}>Telegram</span>
                <span className={styles.channelValue}>@Sukehiro13</span>
              </div>
            </a>

            {/* 3. WhatsApp */}
            <a
              href="https://wa.me/639241004654"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.channelCard}
              title="Chat with Cyrus on WhatsApp"
            >
              <div className={styles.iconBox}>
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </div>
              <div className={styles.channelInfo}>
                <span className={styles.channelLabel}>WhatsApp</span>
                <span className={styles.channelValue}>+63 (924) 100 4654</span>
              </div>
            </a>

            {/* 4. Location */}
            <div className={styles.channelCard}>
              <div className={styles.iconBox}>
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <div className={styles.channelInfo}>
                <span className={styles.channelLabel}>Location</span>
                <span className={styles.channelValue}>Puerto Princesa City, Palawan</span>
              </div>
            </div>

            {/* 5. Quick Response Card */}
            <div className={styles.quickResponseCard}>
              <h2 className={styles.quickTitle}>Quick Response</h2>
              <p className={styles.quickText}>
                I typically respond to messages within 24 hours. For urgent inquiries, feel free to call directly.
              </p>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className={styles.formCard}>
            <div className={styles.formHeader}>
              <h2 className={styles.formTitle}>Transmit Message</h2>
              <p className={styles.formSubtitle}>
                Sends directly to cyrusreyes1313@gmail.com
              </p>
            </div>

            {/* State A: SMTP Direct Send Success */}
            {status === "success" && (
              <div className={styles.successCard}>
                <div className={styles.successHeader}>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#4ade80"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                  <span className={styles.successBadge}>Delivered // 200 OK</span>
                </div>
                <h3 className={styles.successTitle}>Inquiry Sent Successfully!</h3>
                <p className={styles.successText}>{feedbackMessage}</p>
                <button
                  type="button"
                  onClick={handleReset}
                  className={styles.resetBtn}
                >
                  <span>Send Another Message</span>
                  <span>→</span>
                </button>
              </div>
            )}

            {/* State B: Opened in Email Client */}
            {status === "opened_email" && (
              <div className={styles.infoCard}>
                <div className={styles.infoHeader}>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#38bdf8"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                  <span className={styles.infoBadge}>Email Client Ready // 200 OK</span>
                </div>
                <h3 className={styles.infoTitle}>Message Prepared in Your Email App</h3>
                <p className={styles.infoText}>
                  Your default email client has been launched with your message pre-filled to{" "}
                  <strong style={{ color: "#ffffff" }}>{emailAddress}</strong>. Just click &ldquo;Send&rdquo; in your mail app to complete delivery!
                </p>

                <div className={styles.infoActions}>
                  <a
                    href={mailtoFallbackUrl}
                    className={styles.fallbackMailtoBtn}
                    title="Click to re-open email client if needed"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                    <span>Re-open Email App</span>
                  </a>

                  <button
                    type="button"
                    onClick={handleReset}
                    className={styles.resetBtn}
                  >
                    <span>Write Another Message</span>
                    <span>→</span>
                  </button>
                </div>

                <div className={styles.smtpTip}>
                  💡 <strong>Direct Background Sending:</strong> To deliver messages silently in the background without opening an email app, paste your Google App Password to <span className={styles.smtpCode}>SMTP_PASS</span> in <span className={styles.smtpCode}>.env.local</span>.
                </div>
              </div>
            )}

            {/* State C: Error State (rare) */}
            {status === "error" && (
              <div className={styles.errorCard}>
                <div className={styles.errorHeader}>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#f87171"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                  <span className={styles.errorBadge}>Notice // Direct Email</span>
                </div>
                <h3 className={styles.errorTitle}>Send Directly via Email Client</h3>
                <p className={styles.errorText}>{feedbackMessage}</p>

                <div className={styles.errorActions}>
                  <a
                    href={mailtoFallbackUrl}
                    className={styles.fallbackMailtoBtn}
                    title="Send via your email application"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                    <span>Open in Email App (Pre-filled)</span>
                  </a>

                  <button
                    type="button"
                    onClick={handleReset}
                    className={styles.retryBtn}
                  >
                    Dismiss & Retry
                  </button>
                </div>
              </div>
            )}

            {/* The Form (Visible when not in success/opened_email states) */}
            {status !== "success" && status !== "opened_email" && (
              <form onSubmit={handleSubmit} className={styles.formGrid}>
                {/* Row 1: Name and Email */}
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="name-input" className={styles.fieldLabel}>
                      Name
                    </label>
                    <input
                      id="name-input"
                      type="text"
                      required
                      placeholder="John Doe"
                      disabled={status === "submitting"}
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className={styles.inputField}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="email-input" className={styles.fieldLabel}>
                      Email
                    </label>
                    <input
                      id="email-input"
                      type="email"
                      required
                      placeholder="johndoe@email.com"
                      disabled={status === "submitting"}
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className={styles.inputField}
                    />
                  </div>
                </div>

                {/* Row 2: Subject */}
                <div className={styles.formGroup}>
                  <label htmlFor="subject-input" className={styles.fieldLabel}>
                    Subject
                  </label>
                  <input
                    id="subject-input"
                    type="text"
                    required
                    placeholder="What would you like to discuss?"
                    disabled={status === "submitting"}
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                    className={styles.inputField}
                  />
                </div>

                {/* Row 3: Message */}
                <div className={styles.formGroup}>
                  <label htmlFor="message-input" className={styles.fieldLabel}>
                    Message
                  </label>
                  <textarea
                    id="message-input"
                    required
                    placeholder="Tell me about your project, timeline, or inquiry..."
                    disabled={status === "submitting"}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className={styles.textareaField}
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className={styles.submitBtn}
                >
                  {status === "submitting" ? (
                    <>
                      <svg
                        className={styles.spinner}
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
                        <path d="M12 2a10 10 0 0 1 10 10" />
                      </svg>
                      <span>Transmitting Message...</span>
                    </>
                  ) : (
                    <>
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <line x1="22" y1="2" x2="11" y2="13" />
                        <polygon points="22 2 15 22 11 13 2 9 22 2" />
                      </svg>
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
