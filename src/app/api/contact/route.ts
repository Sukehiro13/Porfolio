import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Basic HTML escaping to prevent HTML injection in emails
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Validation
    if (!name || typeof name !== "string" || !name.trim()) {
      return NextResponse.json(
        { success: false, error: "Please enter your name." },
        { status: 400 }
      );
    }

    if (!email || typeof email !== "string" || !email.trim()) {
      return NextResponse.json(
        { success: false, error: "Please enter your email address." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    if (!subject || typeof subject !== "string" || !subject.trim()) {
      return NextResponse.json(
        { success: false, error: "Please enter a subject." },
        { status: 400 }
      );
    }

    if (!message || typeof message !== "string" || !message.trim()) {
      return NextResponse.json(
        { success: false, error: "Please write a message." },
        { status: 400 }
      );
    }

    // SMTP configuration from environment variables
    const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
    const smtpPort = parseInt(process.env.SMTP_PORT || "465", 10);
    const smtpSecure =
      process.env.SMTP_SECURE !== undefined
        ? process.env.SMTP_SECURE === "true"
        : smtpPort === 465;
    const smtpUser = process.env.SMTP_USER || process.env.EMAIL_USER;
    const smtpPass =
      process.env.SMTP_PASS || process.env.EMAIL_PASS || process.env.SMTP_PASSWORD;
    const receiverEmail =
      process.env.CONTACT_RECEIVER_EMAIL ||
      process.env.SMTP_TO ||
      "cyrusreyes1313@gmail.com";

    // If SMTP credentials are not yet configured, notify the frontend to seamlessly use email client
    if (!smtpUser || !smtpPass) {
      console.info(
        "[Contact API] SMTP credentials not fully configured; delegating to client email fallback."
      );
      return NextResponse.json(
        {
          success: true,
          method: "fallback",
          message:
            "SMTP password not set in .env.local. Ready to send via default mail client.",
          fallbackEmail: receiverEmail,
        },
        { status: 200 }
      );
    }

    // Create Transporter
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpSecure,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
      connectionTimeout: 10000,
      greetingTimeout: 10000,
    });

    const cleanName = name.trim();
    const cleanEmail = email.trim();
    const cleanSubject = subject.trim();
    const cleanMessage = message.trim();
    const timestamp = new Date().toLocaleString("en-US", {
      timeZone: "Asia/Manila",
      dateStyle: "full",
      timeStyle: "short",
    });

    // Clean HTML email template
    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>New Portfolio Inquiry</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0b0d12; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #f1f5f9;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #0b0d12; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" style="max-width: 600px; background-color: #11141c; border: 1px solid rgba(255, 255, 255, 0.12); border-radius: 16px; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.6);">
          
          <!-- Header Bar -->
          <tr>
            <td style="padding: 28px 32px; background: linear-gradient(135deg, #181c26 0%, #0d0f15 100%); border-bottom: 1px solid rgba(255, 255, 255, 0.08);">
              <div style="font-size: 11px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: #d97736; margin-bottom: 6px; font-family: monospace;">
                INCOMING TRANSMISSION // 04
              </div>
              <h1 style="margin: 0; font-size: 22px; font-weight: 700; color: #ffffff; letter-spacing: -0.5px;">
                New Portfolio Inquiry
              </h1>
              <div style="margin-top: 6px; font-size: 13px; color: #94a3b8;">
                Received on ${timestamp} (PHT)
              </div>
            </td>
          </tr>

          <!-- Sender Details -->
          <tr>
            <td style="padding: 28px 32px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-bottom: 24px; background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; padding: 18px 20px;">
                <tr>
                  <td style="padding: 6px 0; font-size: 13px; color: #94a3b8; width: 90px; font-weight: 600; font-family: monospace;">From:</td>
                  <td style="padding: 6px 0; font-size: 14px; color: #ffffff; font-weight: 600;">${escapeHtml(cleanName)}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; font-size: 13px; color: #94a3b8; font-weight: 600; font-family: monospace;">Email:</td>
                  <td style="padding: 6px 0; font-size: 14px; color: #38bdf8;">
                    <a href="mailto:${escapeHtml(cleanEmail)}" style="color: #38bdf8; text-decoration: none;">${escapeHtml(cleanEmail)}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; font-size: 13px; color: #94a3b8; font-weight: 600; font-family: monospace;">Subject:</td>
                  <td style="padding: 6px 0; font-size: 14px; color: #ffffff;">${escapeHtml(cleanSubject)}</td>
                </tr>
              </table>

              <!-- Message Body -->
              <div style="font-size: 12px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; color: #94a3b8; margin-bottom: 10px; font-family: monospace;">
                Message Content
              </div>
              <div style="background: #0b0d12; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; padding: 20px; font-size: 15px; line-height: 1.7; color: #e2e8f0; white-space: pre-wrap; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">${escapeHtml(cleanMessage)}</div>

              <!-- Quick Action -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-top: 28px;">
                <tr>
                  <td align="center">
                    <a href="mailto:${escapeHtml(cleanEmail)}?subject=Re:%20${encodeURIComponent(cleanSubject)}" style="display: inline-block; padding: 13px 28px; background-color: #ffffff; color: #000000; text-decoration: none; font-size: 13px; font-weight: 700; border-radius: 9999px; font-family: monospace; letter-spacing: 0.5px;">
                      Reply Directly to ${escapeHtml(cleanName)} →
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 20px 32px; background: rgba(0, 0, 0, 0.4); border-top: 1px solid rgba(255, 255, 255, 0.06); text-align: center; font-size: 12px; color: #64748b; font-family: monospace;">
              Cyrus B. Reyes Portfolio Transmission System // SMTP Transport
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

    const plainText = `
=== NEW PORTFOLIO INQUIRY ===
Date: ${timestamp}
From: ${cleanName} <${cleanEmail}>
Subject: ${cleanSubject}

--- MESSAGE ---
${cleanMessage}

---
Reply directly to: ${cleanEmail}
`;

    // Send the email via SMTP
    await transporter.sendMail({
      from: `"${cleanName} via Portfolio" <${smtpUser}>`,
      replyTo: `"${cleanName}" <${cleanEmail}>`,
      to: receiverEmail,
      subject: `[Portfolio Inquiry] ${cleanSubject} — from ${cleanName}`,
      text: plainText,
      html: htmlContent,
    });

    return NextResponse.json({
      success: true,
      method: "smtp",
      message:
        "Your message has been sent successfully via SMTP! Cyrus will get back to you shortly.",
    });
  } catch (error: unknown) {
    console.error("[Contact API Error]:", error);
    const errMessage =
      error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json(
      {
        success: true,
        method: "fallback",
        error: `SMTP notice: ${errMessage}`,
        code: "SMTP_DELIVERY_NOTICE",
      },
      { status: 200 }
    );
  }
}
