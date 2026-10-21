import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact // Cyrus B. Reyes",
  description:
    "Get in touch with Cyrus B. Reyes. Send a direct inquiry via SMTP, email cyrusreyes1313@gmail.com, or connect on Telegram and WhatsApp.",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
