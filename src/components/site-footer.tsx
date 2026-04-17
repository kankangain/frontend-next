import Link from "next/link";
import { ArrowRight, Facebook, Globe, Instagram, Mail, SendHorizontal, Sparkles } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-slate-400/20 bg-[linear-gradient(180deg,rgba(12,18,38,.85),rgba(19,28,54,1))] text-slate-100">
      <div className="section-shell py-10 sm:py-14">
        <div className="mx-auto max-w-5xl rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(168,85,247,.35),rgba(17,24,39,.88))] px-6 py-8 shadow-[0_20px_60px_rgba(0,0,0,.35)] sm:px-10 sm:py-10">
          <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr] lg:items-center">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-200">
                <Sparkles className="h-3.5 w-3.5 text-violet-300" />
                Ready to Compete?
              </div>
              <h2 className="font-display text-3xl font-black tracking-tight text-slate-50 sm:text-4xl">
                Join 5000+ hackers
              </h2>
              <p className="max-w-xl text-sm leading-6 text-slate-300 sm:text-base">
                Register for PRABUDDHA 2026, explore challenge tracks, and lock your place in the most intense campus hackathon of the year.
              </p>
            </div>
            <div className="flex justify-start lg:justify-end">
              <Link
                href="/register"
                className="inline-flex min-w-[190px] items-center justify-center gap-2 rounded-full bg-white px-5 py-3 font-bold text-[#1e1b4b] shadow-[0_12px_30px_rgba(255,255,255,.16)] transition hover:-translate-y-0.5"
              >
                Apply Now
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-10 border-t border-white/10 pt-10 md:grid-cols-2 xl:grid-cols-4">
          <div className="space-y-4">
            <div>
              <p className="flex items-center gap-2 font-display text-xl font-black text-slate-50">
                <span className="text-violet-400">⚡</span> PRABUDDHA 2026
              </p>
              <p className="mt-3 max-w-xs text-sm leading-6 text-slate-300">
                India&apos;s premier tech festival experience, blending code, hardware, creativity, and leadership.
              </p>
            </div>
            <Link href="https://tint.edu.in/" target="_blank" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-200 hover:text-white">
              <Globe className="h-4 w-4 text-violet-300" /> Visit TINT
            </Link>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-slate-200/80">Quick Links</h3>
            <div className="space-y-3 text-sm text-slate-300">
              <Link href="/about" className="flex items-center gap-2 transition hover:text-white">
                <ArrowRight className="h-4 w-4 text-violet-300" /> About
              </Link>
              <Link href="/events" className="flex items-center gap-2 transition hover:text-white">
                <ArrowRight className="h-4 w-4 text-violet-300" /> Events
              </Link>
              <Link href="/contact" className="flex items-center gap-2 transition hover:text-white">
                <ArrowRight className="h-4 w-4 text-violet-300" /> Contact
              </Link>
              <Link href="/admin/login" className="flex items-center gap-2 transition hover:text-white">
                <ArrowRight className="h-4 w-4 text-violet-300" /> Admin
              </Link>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-slate-200/80">Follow Us</h3>
            <div className="flex gap-3">
              <Link href="https://www.instagram.com/technointernationalnewtown/" target="_blank" className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/6 text-violet-300 transition hover:bg-white/12 hover:text-white">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="https://www.facebook.com/tint.edu.in" target="_blank" className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/6 text-violet-300 transition hover:bg-white/12 hover:text-white">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="https://tint.edu.in/" target="_blank" className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/6 text-violet-300 transition hover:bg-white/12 hover:text-white">
                <Globe className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-slate-200/80">Newsletter</h3>
            <form className="flex max-w-sm gap-2">
              <label className="sr-only" htmlFor="footer-email">Email address</label>
              <div className="relative flex-1">
                <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  id="footer-email"
                  type="email"
                  placeholder="Enter your email"
                  className="h-11 w-full rounded-lg border border-white/10 bg-white/10 pl-9 pr-3 text-sm text-slate-100 placeholder:text-slate-400 outline-none transition focus:border-violet-300/60 focus:bg-white/14"
                />
              </div>
              <button
                type="submit"
                className="inline-flex h-11 items-center justify-center rounded-lg bg-indigo-500 px-4 text-white transition hover:bg-indigo-400"
                aria-label="Subscribe"
              >
                <SendHorizontal className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-center text-xs text-slate-400 sm:text-sm">
          <p>© 2026 PRABUDDHA Tech Fest. Built with heart for innovators.</p>
          <div className="mt-3 flex flex-wrap items-center justify-center gap-3">
            <Link href="/" className="transition hover:text-slate-200">Privacy Policy</Link>
            <span>•</span>
            <Link href="/" className="transition hover:text-slate-200">Terms &amp; Conditions</Link>
            <span>•</span>
            <Link href="/" className="transition hover:text-slate-200">Code of Conduct</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
