"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { cn } from "@/lib/utils";

const links = [
  { href: "/about", label: "About" },
  { href: "/events", label: "Events" },
  { href: "/register", label: "Register" },
  { href: "/contact", label: "Contact" },
  { href: "/login", label: "Login" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 px-3 pt-3 sm:px-6 sm:pt-4">
      <div className="mx-auto w-full max-w-6xl rounded-2xl border border-white/15 bg-[linear-gradient(180deg,rgba(16,20,44,.52),rgba(16,20,44,.25))] px-4 py-3 shadow-[0_8px_28px_rgba(0,0,0,.18)] backdrop-blur-xl sm:px-6">
        <div className="flex items-center justify-between gap-4">
          <div className="flex min-w-0 items-center gap-3 sm:gap-4">
            <Link
              href="/"
              className="inline-flex shrink-0 items-center justify-center rounded-full border border-white/15 bg-transparent px-3 py-1 shadow-[0_0_0_1px_rgba(255,255,255,.08)] backdrop-blur-sm transition hover:bg-white/90"
              aria-label="PRABUDDHA home"
            >
              <Image
                src="/prabuddha_logo.webp"
                alt="PRABUDDHA logo"
                width={88}
                height={28}
                className="h-auto w-20 object-contain sm:w-24"
                priority
              />
            </Link>
            <div className="h-5 w-px shrink-0 bg-slate-300/35" />
            <Link
              href="/"
              className="font-display whitespace-nowrap text-xs font-bold tracking-wide text-slate-100/95 sm:text-base"
            >
              PRABUDDHA 3.0
            </Link>
          </div>

          <button
            type="button"
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/20 text-slate-100 transition hover:bg-white/10 md:hidden"
            aria-label="Toggle navigation menu"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-site-nav"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          >
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              {isMobileMenuOpen ? (
                <path d="M6 6L18 18M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              ) : (
                <path d="M4 7H20M4 12H20M4 17H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              )}
            </svg>
          </button>

          <nav className="hidden items-center gap-1 text-sm font-semibold text-slate-100/90 md:flex md:gap-2">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-lg px-3 py-2 transition-colors",
                  pathname === link.href
                    ? "bg-white/14 text-white shadow-[0_0_0_1px_rgba(255,255,255,.12)]"
                    : "text-slate-200/90 hover:bg-white/8 hover:text-white",
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {isMobileMenuOpen ? (
          <nav id="mobile-site-nav" className="mt-3 flex flex-col gap-1 rounded-xl border border-white/12 bg-white/5 p-2 md:hidden">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  "rounded-lg px-3 py-2 text-sm font-semibold transition-colors",
                  pathname === link.href
                    ? "bg-white/14 text-white shadow-[0_0_0_1px_rgba(255,255,255,.12)]"
                    : "text-slate-200/90 hover:bg-white/8 hover:text-white",
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        ) : null}
      </div>
    </header>
  );
}
