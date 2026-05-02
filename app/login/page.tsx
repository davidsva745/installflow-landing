"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, LockKeyhole, Route, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("demo@installflow.cz");
  const [password, setPassword] = useState("demo1234");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    setLoading(false);

    if (!response.ok) {
      const data = (await response.json().catch(() => ({}))) as {
        message?: string;
      };
      setError(data.message ?? "Přihlášení se nepovedlo.");
      return;
    }

    router.push("/dashboard");
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#f7faf4] text-zinc-950">
      <div className="paper-grid" />
      <section className="relative z-10 mx-auto grid min-h-screen max-w-7xl gap-10 px-5 py-8 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:px-8">
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-3 text-sm font-black uppercase tracking-[0.16em] text-zinc-500 transition hover:text-zinc-950"
          >
            <span className="grid h-9 w-9 place-items-center rounded-xl border border-zinc-950 bg-lime-300">
              IF
            </span>
            InstallFlow
          </Link>
          <motion.h1
            initial={{ y: 28, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mt-12 max-w-3xl text-5xl font-black leading-[0.9] tracking-tight sm:text-7xl"
          >
            Přihlášení pro instalační tým.
          </motion.h1>
          <p className="mt-6 max-w-xl text-lg font-semibold leading-8 text-zinc-600">
            Jedno místo pro nové poptávky, AI odpovědi, obhlídky a staré leady,
            které se dají znovu probudit.
          </p>
          <div className="mt-10 grid max-w-2xl gap-3 sm:grid-cols-3">
            {[
              ["AI inbox", "odpovědi bez čekání"],
              ["Kalendář", "volné sloty pro obhlídky"],
              ["CRM", "pipeline bez Excelu"],
            ].map(([title, text]) => (
              <div
                key={title}
                className="border-t border-zinc-950/20 pt-4"
              >
                <p className="text-base font-black text-zinc-950">{title}</p>
                <p className="mt-1 text-sm font-bold text-zinc-500">{text}</p>
              </div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ x: 40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden rounded-[2rem] border border-zinc-950 bg-white p-4 shadow-[0_34px_100px_rgba(24,24,27,0.16)]"
        >
          <div className="absolute inset-0 field-grid opacity-40" />
          <div className="relative rounded-[1.5rem] border border-zinc-200 bg-white p-6 sm:p-8">
            <div className="mb-8 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.14em] text-lime-700">
                  Demo přístup
                </p>
                <h2 className="mt-2 text-3xl font-black tracking-tight">
                  InstallFlow App
                </h2>
              </div>
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-zinc-950 text-lime-300">
                <LockKeyhole aria-hidden="true" className="h-6 w-6" />
              </span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <label className="block">
                <span className="text-xs font-black uppercase tracking-[0.14em] text-zinc-500">
                  E-mail
                </span>
                <input
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="mt-2 h-14 w-full rounded-2xl border border-zinc-200 bg-[#fbfff5] px-4 text-base font-bold outline-none transition focus:border-zinc-950"
                  type="email"
                  autoComplete="email"
                />
              </label>
              <label className="block">
                <span className="text-xs font-black uppercase tracking-[0.14em] text-zinc-500">
                  Heslo
                </span>
                <input
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="mt-2 h-14 w-full rounded-2xl border border-zinc-200 bg-[#fbfff5] px-4 text-base font-bold outline-none transition focus:border-zinc-950"
                  type="password"
                  autoComplete="current-password"
                />
              </label>

              {error && (
                <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-bold text-red-700">
                  {error}
                </p>
              )}

              <button
                disabled={loading}
                className="group inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-full bg-lime-300 px-6 text-sm font-black text-zinc-950 transition hover:bg-lime-200 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Přihlašuji..." : "Vstoupit do dashboardu"}
                <ArrowRight
                  aria-hidden="true"
                  className="h-4 w-4 transition group-hover:translate-x-1"
                />
              </button>
            </form>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl bg-zinc-950 p-4 text-white">
                <ShieldCheck aria-hidden="true" className="h-5 w-5 text-lime-300" />
                <p className="mt-3 text-sm font-bold text-zinc-300">
                  API token zůstává jen na serveru.
                </p>
              </div>
              <div className="rounded-2xl bg-lime-100 p-4">
                <Route aria-hidden="true" className="h-5 w-5" />
                <p className="mt-3 text-sm font-bold text-zinc-700">
                  Demo ukazuje tok leadu bez míchání firemních dat.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
