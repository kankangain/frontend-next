"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

const links = [
  { href: "/about", label: "About" },
  { href: "/events", label: "Events" },
  { href: "/register", label: "Register" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 px-3 pt-3 sm:px-6 sm:pt-4">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between rounded-2xl border border-slate-400/35 bg-[rgba(17,20,44,.92)] px-4 py-3 shadow-[0_10px_40px_rgba(0,0,0,.35)] backdrop-blur-md sm:px-6">
        <div className="flex items-center gap-3 sm:gap-4">
          <Link
            href="/"
            className="rounded-full bg-slate-200 px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#1e1b4b] shadow-[0_0_0_1px_rgba(255,255,255,.12)] sm:text-xs"
          >
            PRABUDDHA
          </Link>
          <div className="h-5 w-px bg-slate-300/35" />
          <Link href="/" className="font-display text-sm font-bold tracking-wide text-slate-100 sm:text-base">
            PRABUDDHA 3.0
          </Link>
        </div>

        <nav className="flex items-center gap-1 text-sm font-semibold text-slate-100/90 sm:gap-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-lg px-3 py-2 transition-colors",
                pathname === link.href
                  ? "bg-white/10 text-white"
                  : "text-slate-200/90 hover:bg-white/10 hover:text-white",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
