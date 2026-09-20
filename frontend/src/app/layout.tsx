import "./globals.css";
import ClientShell from "@/components/layout/ClientShell";

export const metadata = {
  title: "EcoRoute AI — Waste Management Optimizer",
  description: "Version 1 foundation: dashboard, bins, map, vehicles.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ClientShell>{children}</ClientShell>
      </body>
    </html>
  );
}