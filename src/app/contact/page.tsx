"use client";

import React, { useState } from "react";
import styles from "./contact.module.css";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 5000);
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
            {/* 1. Email */}
            <a
              href="mailto:cyrusreyes1313@gmail.com"
              className={styles.channelCard}
              title="Send an email to Cyrus"
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
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </div>
              <div className={styles.channelInfo}>
                <span className={styles.channelLabel}>Email</span>
                <span className={styles.channelValue}>cyrusreyes1313@gmail.com</span>
              </div>
            </a>

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
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
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
                  placeholder="Tell me about your project..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className={styles.textareaField}
                />
              </div>

              {/* Feedback Alert */}
              {submitted && (
                <div className={styles.successMsg}>
                  ✓ Message sent! Thank you for reaching out, Cyrus will get back to you shortly.
                </div>
              )}

              {/* Submit Button */}
              <button type="submit" className={styles.submitBtn}>
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
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
