"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

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

  return (
    <header className="sticky top-0 z-40 px-3 pt-3 sm:px-6 sm:pt-4">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between rounded-2xl border border-white/15 bg-[linear-gradient(180deg,rgba(16,20,44,.52),rgba(16,20,44,.25))] px-4 py-3 shadow-[0_8px_28px_rgba(0,0,0,.18)] backdrop-blur-xl sm:px-6">
        <div className="flex items-center gap-3 sm:gap-4">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-white/15 bg-transparent px-3 py-1 shadow-[0_0_0_1px_rgba(255,255,255,.08)] backdrop-blur-sm transition hover:bg-white/90"
            aria-label="PRABUDDHA home">
            <Image
              src="/prabuddha_logo.webp"
              alt="PRABUDDHA logo"
              width={88}
              height={28}
              className="h-auto w-20 object-contain sm:w-24"
              priority
            />
          </Link>
          <div className="h-5 w-px bg-slate-300/35" />
          <Link href="/" className="font-display text-sm font-bold tracking-wide text-slate-100/95 sm:text-base">
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
                  ? "bg-white/14 text-white shadow-[0_0_0_1px_rgba(255,255,255,.12)]"
                  : "text-slate-200/90 hover:bg-white/8 hover:text-white",
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
