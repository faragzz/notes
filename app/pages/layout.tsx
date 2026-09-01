import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Jot",
  description: "Capture and organize your thoughts in one place.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
