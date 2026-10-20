"use client";

import { useState } from "react";
import styles from "./contact-form.module.css";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    missionType: "Commercial Satellite",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus("submitting");
    setTimeout(() => {
      setStatus("success");
      setFormData({ name: "", email: "", missionType: "Commercial Satellite", message: "" });
      setTimeout(() => setStatus("idle"), 4000);
    }, 700);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit} id="contact-form">
      <div>
        <span className={styles.eyebrow}>PAYLOAD &amp; MISSION INQUIRY</span>
        <h3 className={styles.formTitle}>LAUNCH WITH SPACEX</h3>
      </div>

      {status === "success" && (
        <div className={styles.alertSuccess} role="alert">
          MISSION INQUIRY RECEIVED. A LAUNCH COORDINATOR WILL CONTACT YOU.
        </div>
      )}

      <div className={styles.inputGroup}>
        <label htmlFor="name-input" className={styles.label}>
          FULL NAME OR ORGANIZATION
        </label>
        <input
          id="name-input"
          type="text"
          required
          placeholder="DR. ELEANOR ARROWAY"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className={styles.input}
          disabled={status === "submitting"}
        />
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="email-input" className={styles.label}>
          OFFICIAL EMAIL
        </label>
        <input
          id="email-input"
          type="email"
          required
          placeholder="DIRECTOR@AEROSPACE.ORG"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className={styles.input}
          disabled={status === "submitting"}
        />
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="message-input" className={styles.label}>
          ORBITAL DESTINATION &amp; PAYLOAD SPECIFICATIONS
        </label>
        <textarea
          id="message-input"
          required
          rows={3}
          placeholder="TARGET ORBIT (LEO / GTO / LUNAR), ESTIMATED MASS, AND DESIRED LAUNCH TIMELINE..."
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className={styles.textarea}
          disabled={status === "submitting"}
        />
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className={styles.submitBtn}
      >
        {status === "submitting" ? "TRANSMITTING..." : "SUBMIT INQUIRY"}
      </button>
    </form>
  );
}
