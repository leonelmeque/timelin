import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Timelin - Task Management Made Simple",
  description: "A beautiful task management app for iOS, Android, and Web. Stay organized, track timelines, and get things done.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
