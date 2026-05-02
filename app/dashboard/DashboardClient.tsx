"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  CalendarCheck,
  Check,
  Clock3,
  LogOut,
  MessageSquareText,
  Route,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { useRouter } from "next/navigation";
import type { AppDashboardData } from "../../lib/ghl";

type DashboardClientProps = {
  data: AppDashboardData;
};

export default function DashboardClient({ data }: DashboardClientProps) {
  const router = useRouter();
  const leads = data.contacts;
  const opportunities = data.opportunities;
  const pipeline = data.pipeline;
  const heroStats = [
    { value: String(data.stats.leads), label: "kontaktů v GHL", icon: MessageSquareText },
    {
      value: String(data.stats.opportunities),
      label: "opportunities",
      icon: CalendarCheck,
    },
    { value: String(data.stats.won), label: "vyhráno", icon: Check },
  ];

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
  }

  return (
    <main className="min-h-screen bg-[#f7faf4] text-zinc-950">
      <div className="paper-grid" />
      <div className="relative z-10 mx-auto max-w-7xl px-5 py-5 sm:px-6 lg:px-8">
        <header className="flex flex-col gap-4 border-b border-zinc-950/10 pb-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-2xl border border-zinc-950 bg-lime-300 text-sm font-black">
              IF
            </span>
            <div>
              <p className="text-xl font-black tracking-tight">InstallFlow</p>
              <p className="text-xs font-black uppercase tracking-[0.16em] text-zinc-500">
                firemní cockpit
              </p>
            </div>
          </div>
          <button
            onClick={logout}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-zinc-200 bg-white px-4 text-sm font-black transition hover:border-zinc-950"
          >
            <LogOut aria-hidden="true" className="h-4 w-4" />
            Odhlásit
          </button>
        </header>

        <section className="grid gap-6 py-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-sm font-black uppercase tracking-[0.16em] text-lime-700">
              Dnes
            </p>
            <h1 className="mt-3 max-w-3xl text-5xl font-black leading-[0.92] tracking-tight sm:text-7xl">
              Reálná data z firemního GHL.
            </h1>
            <p className="mt-5 max-w-2xl text-lg font-semibold leading-8 text-zinc-600">
              Dashboard používá serverový Private Integration Token. Kontakty a
              opportunities se načítají přímo z vybraného subaccountu.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative overflow-hidden rounded-[2rem] border border-zinc-950 bg-zinc-950 p-4 text-white shadow-[0_34px_90px_rgba(24,24,27,0.22)]"
          >
            <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(190,242,100,.24)_1px,transparent_1px),linear-gradient(90deg,rgba(190,242,100,.18)_1px,transparent_1px)] [background-size:42px_42px]" />
            <div className="relative grid gap-3 sm:grid-cols-3">
              {heroStats.map(({ value, label, icon: Icon }) => (
                <div key={label} className="rounded-[1.4rem] border border-white/10 bg-white/[0.06] p-4">
                  <Icon aria-hidden="true" className="h-5 w-5 text-lime-300" />
                  <p className="mt-5 text-4xl font-black tracking-tight">{value}</p>
                  <p className="mt-1 text-sm font-bold text-zinc-300">{label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        <section className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="rounded-[2rem] border border-zinc-950/15 bg-white p-4 shadow-[0_20px_70px_rgba(24,24,27,0.07)]">
            <div className="flex items-center justify-between gap-4 px-2 py-2">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.16em] text-lime-700">
                  GHL kontakty
                </p>
                <h2 className="mt-1 text-3xl font-black tracking-tight">
                  Poslední kontakty v subaccountu
                </h2>
              </div>
              <span className="rounded-full bg-lime-100 px-3 py-1 text-xs font-black text-lime-800">
                live API
              </span>
            </div>

            <div className="mt-4 divide-y divide-zinc-950/10">
              {data.error && (
                <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm font-bold leading-6 text-amber-900">
                  {data.error}
                </div>
              )}
              {!data.error && leads.length === 0 && (
                <div className="rounded-2xl border border-zinc-200 bg-[#fbfff5] p-4 text-sm font-bold leading-6 text-zinc-600">
                  GHL API odpovědělo, ale v tomhle location nejsou žádné kontakty
                  v prvních načtených záznamech.
                </div>
              )}
              {leads.map((lead, index) => (
                <motion.div
                  key={lead.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.08, duration: 0.45 }}
                  className="grid gap-4 py-5 md:grid-cols-[1fr_auto] md:items-center"
                >
                  <div>
                    <p className="text-xl font-black tracking-tight">
                      {lead.name}
                    </p>
                    <p className="mt-1 text-sm font-bold text-zinc-500">
                      {lead.detail}
                    </p>
                    <p className="mt-3 inline-flex rounded-full bg-lime-100 px-3 py-1 text-xs font-black text-lime-900">
                      {lead.status}
                    </p>
                  </div>
                  <div className="w-full rounded-2xl border border-zinc-200 p-3 md:w-36">
                    <p className="text-xs font-black uppercase text-zinc-400">
                      fit score
                    </p>
                    <p className="mt-1 text-3xl font-black">{lead.score}</p>
                    <div className="mt-2 h-2 overflow-hidden rounded-full bg-zinc-100">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${lead.score}%` }}
                        transition={{ delay: 0.2 + index * 0.08, duration: 0.7 }}
                        className="h-full rounded-full bg-lime-300"
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="grid gap-5">
            <div className="rounded-[2rem] border border-zinc-950 bg-lime-100 p-5">
              <div className="flex items-center gap-3">
                <Sparkles aria-hidden="true" className="h-5 w-5" />
                <p className="text-sm font-black uppercase tracking-[0.16em]">
                  GHL opportunities
                </p>
              </div>
              <div className="mt-5 space-y-3">
                {opportunities.length === 0 && (
                  <div className="rounded-2xl bg-white px-4 py-3 text-sm font-bold leading-6 text-zinc-700">
                    Zatím nemám žádné opportunities pro zadaný location.
                  </div>
                )}
                {opportunities.map((opportunity, index) => (
                  <motion.div
                    key={opportunity.id}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.14, duration: 0.45 }}
                    className="rounded-2xl bg-white px-4 py-3 text-sm font-bold leading-6 text-zinc-800"
                  >
                    <span className="mb-1 block text-[0.65rem] font-black uppercase text-zinc-400">
                      {opportunity.status}
                    </span>
                    {opportunity.name}
                    <span className="mt-1 block text-xs text-zinc-500">
                      {opportunity.detail}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-zinc-950/15 bg-white p-5">
              <div className="flex items-center gap-3">
                <ShieldCheck
                  aria-hidden="true"
                  className={data.configured ? "h-5 w-5 text-lime-700" : "h-5 w-5 text-zinc-400"}
                />
                <div>
                  <p className="text-sm font-black uppercase tracking-[0.16em] text-zinc-500">
                    GHL napojení
                  </p>
                  <p className="mt-1 text-lg font-black">
                    {data.configured
                      ? "Serverový PIT token je připojený"
                      : "Chybí nastavení GHL"}
                  </p>
                </div>
              </div>
              <p className="mt-4 text-sm font-bold leading-6 text-zinc-600">
                Dashboard netahá data z frontendu. Všechny GHL requesty běží na
                serveru přes `GHL_PRIVATE_INTEGRATION_TOKEN` a `GHL_LOCATION_ID`.
              </p>
            </div>
          </div>
        </section>

        <section className="grid gap-5 py-5 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[2rem] border border-zinc-950/15 bg-white p-5">
            <p className="text-sm font-black uppercase tracking-[0.16em] text-lime-700">
              Pipeline
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {pipeline.length === 0 && (
                <div className="rounded-[1.3rem] border border-zinc-200 bg-[#fbfff5] p-4 text-sm font-bold text-zinc-600">
                  Pipeline se ukáže po úspěšném načtení opportunities z GHL.
                </div>
              )}
              {pipeline.map(({ title, value, detail }, index) => (
                <motion.div
                  key={title}
                  whileHover={{ y: -4 }}
                  className="rounded-[1.3rem] border border-zinc-200 bg-[#fbfff5] p-4"
                >
                  <p className="text-sm font-black text-zinc-500">{title}</p>
                  <p className="mt-4 text-4xl font-black tracking-tight">{value}</p>
                  <p className="mt-1 text-sm font-bold text-zinc-600">{detail}</p>
                  <motion.div
                    className="mt-4 h-1 rounded-full bg-lime-300"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: index * 0.1, duration: 0.65 }}
                    style={{ transformOrigin: "left" }}
                  />
                </motion.div>
              ))}
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[2rem] border border-zinc-950 bg-[#eff9df] p-5">
            <div className="absolute inset-0 field-grid opacity-50" />
            <div className="relative flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.16em] text-lime-800">
                  Nastavení subaccountu
                </p>
                <h2 className="mt-2 text-3xl font-black tracking-tight">
                  Jeden GHL location = jedna firma.
                </h2>
              </div>
              <Route aria-hidden="true" className="h-8 w-8" />
            </div>
            <div className="relative mt-8 grid gap-3">
              {[
                ["PIT token", data.configured ? "nastavený" : "chybí"],
                ["Location ID", data.error?.includes("GHL_LOCATION_ID") ? "chybí" : "připraveno"],
                ["Zdroj dat", "HighLevel API"],
              ].map(([item, status], index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.12, duration: 0.45 }}
                  className="rounded-2xl border border-zinc-950 bg-white p-4"
                >
                  <Clock3 aria-hidden="true" className="h-5 w-5 text-lime-700" />
                  <p className="mt-4 text-lg font-black">{item}</p>
                  <p className="mt-1 flex items-center gap-2 text-sm font-bold text-zinc-600">
                    <Check aria-hidden="true" className="h-4 w-4" />
                    {status}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <div className="pb-8">
          <a
            href="/"
            className="group inline-flex items-center gap-2 text-sm font-black text-zinc-500 transition hover:text-zinc-950"
          >
            Zpět na landing page
            <ArrowRight
              aria-hidden="true"
              className="h-4 w-4 transition group-hover:translate-x-1"
            />
          </a>
        </div>
      </div>
    </main>
  );
}
