"use client";
import Sidebar from "./Sidebar";

export default function ClientShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 px-6 md:px-8 py-6">{children}</main>
    </div>
  );
}