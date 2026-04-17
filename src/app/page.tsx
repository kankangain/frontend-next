"use client";

import Link from "next/link";
import { Building2, Star, Trophy, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import GlassCountdown from "@/components/GlassCard";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

const EVENT_TARGET_MS = Date.parse("2026-12-01T09:00:00+05:30");

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main className="relative isolate min-h-screen overflow-hidden text-slate-100">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 50% 70%, rgba(88,28,135,.26), transparent 42%), radial-gradient(circle at 20% 15%, rgba(55,65,81,.34), transparent 40%), linear-gradient(165deg, #1e1b4b 0%, #2a245f 34%, #581c87 62%, #374151 100%)",
          }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,.18),rgba(0,0,0,.58))]" />
        <div className="absolute -left-12 top-28 h-48 w-48 rounded-full bg-purple-400/20 blur-3xl animate-ember-float" />
        <div className="absolute -right-10 bottom-24 h-56 w-56 rounded-full bg-slate-300/15 blur-3xl animate-ember-float [animation-delay:1.1s]" />

        <section className="relative z-10 mx-auto flex min-h-[calc(100vh-88px)] w-full max-w-7xl flex-col items-center justify-center px-4 pb-16 pt-10 text-center sm:px-6">
          <div className="animate-rise-in rounded-full border border-slate-300/35 bg-black/35 px-6 py-2 text-xs font-black uppercase tracking-[0.14em] text-slate-300 shadow-[0_0_0_2px_rgba(156,163,175,.25)] sm:text-sm">
            30-Hour India&apos;s Premier Software + Hardware Hackathon
          </div>

          <div className="mt-6 animate-rise-in [animation-delay:.15s]">
            <p className="font-display text-5xl font-black uppercase leading-[0.9] text-slate-100 drop-shadow-[0_6px_8px_rgba(0,0,0,.5)] sm:text-7xl lg:text-8xl">
              Prabuddha
            </p>
            <p className="font-display text-6xl font-black leading-none text-[#9ca3af] drop-shadow-[0_8px_12px_rgba(0,0,0,.5)] sm:text-8xl lg:text-9xl">
              3.0
            </p>
          </div>

          <p className="mt-5 animate-rise-in text-lg font-black text-[#d8b4fe] [animation-delay:.25s] sm:text-2xl">
            The Clan Wars Begin
          </p>

          <p className="mt-2 animate-rise-in max-w-2xl text-sm text-slate-200/90 [animation-delay:.35s] sm:text-lg">
            Clash with codes, conquer with vision, and forge your legend at PRABUDDHA 2026.
          </p>

          <div className="mt-5 inline-flex animate-rise-in items-center gap-2 rounded-full border border-[#9ca3af]/35 bg-[#9ca3af]/10 px-4 py-2 text-sm font-bold text-[#e5e7eb] [animation-delay:.45s]">
            <GlassCountdown targetMs={EVENT_TARGET_MS} />
          </div>

          <div className="mt-6 flex gap-4 animate-rise-in [animation-delay:.55s]">
            <Button asChild className="h-12 rounded-xl bg-[#581c87] px-8 text-base font-extrabold text-white shadow-[0_10px_24px_rgba(88,28,135,.45)] transition hover:bg-[#6b21a8]">
              <Link href="/register">Register Yourself</Link>
            </Button>
            <Button asChild className="h-12 rounded-xl bg-[#581c87] px-8 text-base font-extrabold text-white shadow-[0_10px_24px_rgba(88,28,135,.45)] transition hover:bg-[#6b21a8]">
              <Link href="/events">Explore Events</Link>
            </Button>
          </div>

          <div className="mt-16 w-full max-w-6xl space-y-6">
            <p className="text-sm uppercase tracking-[0.22em] text-slate-300/80">PRABUDDHA Impact</p>
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              <div className="animate-rise-in rounded-[1.6rem] border border-white/15 bg-[linear-gradient(180deg,rgba(104,42,140,.55),rgba(71,43,91,.72))] p-6 text-center shadow-[0_14px_40px_rgba(0,0,0,.2)] backdrop-blur-md [animation-delay:.65s]">
                <Star className="mx-auto mb-6 h-12 w-12 text-fuchsia-400" />
                <p className="font-display text-4xl font-black text-sky-400 sm:text-5xl">50+</p>
                <p className="mt-4 text-sm text-slate-200/85 sm:text-base">Events &amp; Workshops</p>
              </div>
              <div className="animate-rise-in rounded-[1.6rem] border border-white/15 bg-[linear-gradient(180deg,rgba(104,42,140,.55),rgba(71,43,91,.72))] p-6 text-center shadow-[0_14px_40px_rgba(0,0,0,.2)] backdrop-blur-md [animation-delay:.75s]">
                <Users className="mx-auto mb-6 h-12 w-12 text-fuchsia-400" />
                <p className="font-display text-4xl font-black text-sky-400 sm:text-5xl">5000+</p>
                <p className="mt-4 text-sm text-slate-200/85 sm:text-base">Registered Participants</p>
              </div>
              <div className="animate-rise-in rounded-[1.6rem] border border-white/15 bg-[linear-gradient(180deg,rgba(104,42,140,.55),rgba(71,43,91,.72))] p-6 text-center shadow-[0_14px_40px_rgba(0,0,0,.2)] backdrop-blur-md [animation-delay:.85s]">
                <Trophy className="mx-auto mb-6 h-12 w-12 text-fuchsia-400" />
                <p className="font-display text-4xl font-black text-sky-400 sm:text-5xl">10L+</p>
                <p className="mt-4 text-sm text-slate-200/85 sm:text-base">Total Prize Pool</p>
              </div>
              <div className="animate-rise-in rounded-[1.6rem] border border-white/15 bg-[linear-gradient(180deg,rgba(104,42,140,.55),rgba(71,43,91,.72))] p-6 text-center shadow-[0_14px_40px_rgba(0,0,0,.2)] backdrop-blur-md [animation-delay:.95s]">
                <Building2 className="mx-auto mb-6 h-12 w-12 text-fuchsia-400" />
                <p className="font-display text-4xl font-black text-sky-400 sm:text-5xl">100+</p>
                <p className="mt-4 text-sm text-slate-200/85 sm:text-base">Colleges Participating</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
