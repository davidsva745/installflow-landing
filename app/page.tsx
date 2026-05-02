"use client";

import { useRef, useState, type ReactNode } from "react";
import Script from "next/script";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  Bot,
  CalendarCheck,
  CalendarDays,
  CalendarX,
  Check,
  ChevronRight,
  CircleDollarSign,
  Clock3,
  Database,
  Gauge,
  MapPin,
  MessageSquareText,
  MousePointerClick,
  PhoneCall,
  PhoneIncoming,
  PhoneMissed,
  ShieldCheck,
  Sparkles,
  Star,
  Zap,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 34, filter: "blur(10px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};

const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

function Section({
  children,
  className = "",
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <motion.section
      id={id}
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-120px" }}
      className={`relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8 ${className}`}
    >
      {children}
    </motion.section>
  );
}

function FadeIn({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      variants={fadeUp}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function PrimaryButton({
  children,
  href = "#contact",
  className = "",
}: {
  children: ReactNode;
  href?: string;
  className?: string;
}) {
  return (
    <motion.a
      href={href}
      whileHover={{ y: -3, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`group inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-lime-300 px-7 text-sm font-black text-zinc-950 shadow-[0_18px_45px_rgba(132,204,22,0.28)] ring-1 ring-lime-200 transition hover:bg-lime-200 focus:outline-none focus:ring-2 focus:ring-lime-400 focus:ring-offset-2 focus:ring-offset-white ${className}`}
    >
      {children}
      <ArrowRight
        aria-hidden="true"
        className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
      />
    </motion.a>
  );
}

function SecondaryButton({ children }: { children: ReactNode }) {
  return (
    <motion.a
      href="#how"
      whileHover={{ y: -3, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full border border-zinc-200 bg-white px-7 text-sm font-black text-zinc-950 shadow-sm transition hover:border-zinc-950 hover:bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-zinc-300 focus:ring-offset-2 focus:ring-offset-white"
    >
      {children}
      <ChevronRight aria-hidden="true" className="h-4 w-4" />
    </motion.a>
  );
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed left-0 top-0 z-[60] h-1 w-full origin-left bg-lime-300 shadow-[0_0_22px_rgba(132,204,22,0.75)]"
    />
  );
}

function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-zinc-200/70 bg-white/82 backdrop-blur-2xl">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8">
        <a href="#" className="flex items-center gap-3" aria-label="InstallFlow">
          <span className="grid h-10 w-10 place-items-center rounded-xl border border-lime-300 bg-lime-100 text-zinc-950 shadow-[0_10px_30px_rgba(132,204,22,0.22)]">
            <Zap aria-hidden="true" className="h-5 w-5" />
          </span>
          <span className="text-xl font-black tracking-tight text-zinc-950">
            InstallFlow
          </span>
        </a>
        <div className="hidden items-center gap-2 md:flex">
          <a
            href="#features"
            className="rounded-full px-4 py-2 text-sm font-bold text-zinc-600 transition hover:bg-zinc-100 hover:text-zinc-950"
          >
            Funkce
          </a>
          <a
            href="#pricing"
            className="rounded-full px-4 py-2 text-sm font-bold text-zinc-600 transition hover:bg-zinc-100 hover:text-zinc-950"
          >
            Ceník
          </a>
          <a
            href="https://app.installflow.cz"
            className="rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-black text-zinc-950 shadow-sm transition hover:border-lime-300 hover:bg-lime-50"
          >
            Login
          </a>
          <a
            href="#contact"
            className="rounded-full bg-zinc-950 px-5 py-2.5 text-sm font-black text-white shadow-[0_16px_35px_rgba(24,24,27,0.18)] transition hover:-translate-y-0.5 hover:bg-lime-300 hover:text-zinc-950"
          >
            Chci ukázku
          </a>
        </div>
        <a
          href="#contact"
          className="rounded-full bg-lime-300 px-4 py-2 text-sm font-black text-zinc-950 md:hidden"
        >
          Ukázka
        </a>
      </nav>
    </header>
  );
}

function StatPill({
  icon,
  value,
  label,
}: {
  icon: ReactNode;
  value: string;
  label: string;
}) {
  const floatDelay = (label.length % 3) * 0.28;

  return (
    <motion.div
      animate={{ y: [0, -4, 0] }}
      transition={{
        duration: 4.2,
        repeat: Infinity,
        ease: "easeInOut",
        delay: floatDelay,
      }}
      whileHover={{ y: -4, rotate: -1 }}
      className="rounded-2xl border border-zinc-200 bg-white/88 p-4 shadow-[0_18px_50px_rgba(24,24,27,0.08)] backdrop-blur"
    >
      <div className="mb-3 grid h-9 w-9 place-items-center rounded-xl bg-lime-100 text-zinc-950">
        {icon}
      </div>
      <p className="text-2xl font-black tracking-tight text-zinc-950">{value}</p>
      <p className="mt-1 text-xs font-bold uppercase text-zinc-500">{label}</p>
    </motion.div>
  );
}

function AnimatedHeadline() {
  const lines = [
    ["Méně", "zmeškaných"],
    ["poptávek."],
    ["Více", "obhlídek."],
  ];

  return (
    <h1 className="text-balance mt-7 max-w-5xl text-5xl font-black leading-[0.88] tracking-tight text-zinc-950 sm:text-7xl lg:text-8xl xl:text-[6.4rem]">
      {lines.map((line, lineIndex) => (
        <span key={line.join(" ")} className="block overflow-hidden pb-2">
          {line.map((part, partIndex) => {
            const highlight = part === "obhlídek.";
            return (
              <motion.span
                key={part}
                initial={{ y: "115%", rotate: 4, opacity: 0 }}
                animate={{ y: "0%", rotate: 0, opacity: 1 }}
                transition={{
                  delay: 0.08 + lineIndex * 0.12 + partIndex * 0.08,
                  duration: 0.78,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={`mr-3 inline-block sm:mr-5 ${
                  highlight
                    ? "rounded-[0.22em] bg-zinc-950 px-3 py-1 text-lime-300"
                    : ""
                }`}
              >
                {part}
              </motion.span>
            );
          })}
        </span>
      ))}
    </h1>
  );
}

function LeadStream() {
  const items = [
    "SMS zachycena",
    "lead kvalifikován",
    "termín vybrán",
    "CRM karta hotová",
    "recenze připravena",
  ];

  return (
    <div className="pointer-events-none relative z-10 mx-auto mt-12 max-w-7xl overflow-hidden rounded-[1.2rem] border-y border-zinc-950 bg-zinc-950 py-3 text-lime-300 shadow-[0_22px_70px_rgba(24,24,27,0.18)] rotate-[-1.2deg]">
      <div className="marquee-track flex gap-4 whitespace-nowrap">
        {[...items, ...items, ...items].map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="inline-flex items-center gap-4 text-sm font-black uppercase tracking-[0.18em]"
          >
            <span>{item}</span>
            <span className="h-2 w-2 rounded-full bg-lime-300" />
          </span>
        ))}
      </div>
    </div>
  );
}

function SignalBoard() {
  const lanes = [
    ["Příchozí", "12 leadů", "SMS / web / telefon"],
    ["AI práce", "9 kvalifikací", "lokalita + služba + čas"],
    ["Kalendář", "5 obhlídek", "volné sloty doplněny"],
  ];

  return (
    <FadeIn className="mt-10">
      <div className="relative overflow-hidden rounded-[2rem] border border-zinc-950 bg-zinc-950 p-4 text-white shadow-[0_35px_110px_rgba(24,24,27,0.22)]">
        <div className="absolute inset-y-0 left-1/2 w-px bg-lime-300/40" />
        <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(190,242,100,.22)_1px,transparent_1px),linear-gradient(90deg,rgba(190,242,100,.16)_1px,transparent_1px)] [background-size:42px_42px]" />
        <div className="relative grid gap-3 lg:grid-cols-3">
          {lanes.map(([title, value, detail], index) => (
            <motion.div
              key={title}
              initial={{ clipPath: "inset(0 100% 0 0)" }}
              whileInView={{ clipPath: "inset(0 0% 0 0)" }}
              viewport={{ once: true }}
              transition={{
                delay: index * 0.14,
                duration: 0.85,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="relative overflow-hidden rounded-[1.4rem] border border-white/10 bg-white/[0.06] p-5"
            >
              <motion.div
                aria-hidden="true"
                className="absolute inset-x-4 top-0 h-px bg-lime-300"
                animate={{ x: ["-120%", "120%"] }}
                transition={{
                  duration: 2.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: index * 0.2,
                }}
              />
              <p className="text-xs font-black uppercase tracking-[0.18em] text-lime-300">
                {title}
              </p>
              <p className="mt-5 text-4xl font-black tracking-tight">{value}</p>
              <p className="mt-2 text-sm font-bold text-zinc-300">{detail}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </FadeIn>
  );
}

function FieldOpsVisual() {
  const routePoints = [
    { label: "SMS", x: "14%", y: "24%" },
    { label: "Brno", x: "42%", y: "52%" },
    { label: "9:30", x: "72%", y: "34%" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 40, rotate: 2 }}
      animate={{ opacity: 1, x: 0, rotate: 0 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="relative min-h-[34rem] overflow-hidden rounded-[2rem] border border-zinc-950 bg-[#eff9df] shadow-[0_34px_100px_rgba(24,24,27,0.16)]"
    >
      <div className="absolute inset-0 field-grid opacity-70" />
      <div className="absolute left-8 top-8 z-10 flex items-center gap-3 rounded-full border border-zinc-950 bg-white px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-zinc-950">
        <span className="pulse-dot h-2.5 w-2.5 rounded-full bg-lime-400" />
        instalační dispečink
      </div>

      <svg
        aria-hidden="true"
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 760 560"
        preserveAspectRatio="none"
      >
        <path
          className="ops-route-base"
          d="M92 156 C198 82 268 336 396 272 C510 216 546 134 658 204"
        />
        <path
          className="ops-route-live"
          d="M92 156 C198 82 268 336 396 272 C510 216 546 134 658 204"
        />
      </svg>

      {routePoints.map((point, index) => (
        <motion.div
          key={point.label}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            delay: 0.45 + index * 0.18,
            type: "spring",
            stiffness: 260,
            damping: 20,
          }}
          className="absolute z-20 grid h-16 w-16 place-items-center rounded-full border border-zinc-950 bg-white text-sm font-black text-zinc-950 shadow-[0_16px_40px_rgba(24,24,27,0.14)]"
          style={{ left: point.x, top: point.y }}
        >
          {point.label}
        </motion.div>
      ))}

      <motion.div
        animate={{ y: [0, -10, 0], rotate: [-2, 1, -2] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-10 left-8 z-10 w-56 rounded-[1.4rem] border border-zinc-950 bg-white p-4"
      >
        <p className="text-xs font-black uppercase tracking-[0.16em] text-zinc-500">
          montér v terénu
        </p>
        <p className="mt-3 text-3xl font-black tracking-tight text-zinc-950">
          na střeše
        </p>
        <p className="mt-2 text-sm font-bold leading-6 text-zinc-600">
          Telefon nezvedá. Systém mezitím kvalifikuje lead.
        </p>
      </motion.div>

      <motion.div
        animate={{ x: [0, 18, 0] }}
        transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-16 right-8 z-10 w-64 rounded-[1.4rem] border border-zinc-950 bg-zinc-950 p-4 text-white"
      >
        <p className="text-xs font-black uppercase tracking-[0.16em] text-lime-300">
          výsledek
        </p>
        <p className="mt-3 text-3xl font-black tracking-tight">
          obhlídka 9:30
        </p>
        <div className="mt-4 grid grid-cols-3 gap-2">
          {["8:00", "9:30", "11:00"].map((time) => (
            <span
              key={time}
              className={`rounded-full px-3 py-2 text-center text-xs font-black ${
                time === "9:30"
                  ? "bg-lime-300 text-zinc-950"
                  : "bg-white/10 text-zinc-300"
              }`}
            >
              {time}
            </span>
          ))}
        </div>
      </motion.div>

      <motion.div
        aria-hidden="true"
        animate={{ rotate: 360 }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        className="absolute right-16 top-20 h-32 w-32 rounded-full border border-dashed border-zinc-950/30"
      />
    </motion.div>
  );
}

function FlowStepCard({
  step,
  title,
  icon,
  children,
  accent = false,
}: {
  step: string;
  title: string;
  icon: ReactNode;
  children: ReactNode;
  accent?: boolean;
}) {
  const pulseDelay = (Number(step) - 1) * 0.45;

  return (
      <motion.div
        whileHover={{ y: -6 }}
        className={`kinetic-scan relative min-h-56 overflow-hidden rounded-[1.4rem] border p-4 shadow-[0_18px_55px_rgba(24,24,27,0.08)] ${
        accent
          ? "border-lime-300 bg-lime-100"
          : "border-zinc-200 bg-white"
      }`}
    >
      <div className="mb-5 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span
            className={`grid h-10 w-10 place-items-center rounded-2xl ${
              accent ? "bg-zinc-950 text-lime-300" : "bg-lime-100 text-zinc-950"
            }`}
          >
            {icon}
          </span>
          <div>
            <p className="text-xs font-black uppercase text-lime-700">{step}</p>
            <p className="text-base font-black text-zinc-950">{title}</p>
          </div>
        </div>
      </div>
      {children}
      <motion.div
        className="absolute inset-x-5 bottom-0 h-1 rounded-full bg-lime-400"
        style={{ transformOrigin: "left" }}
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: [0, 1, 0], opacity: [0, 0.85, 0] }}
        transition={{
          duration: 3.2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: pulseDelay,
        }}
      />
    </motion.div>
  );
}

function ProductFlowMockup() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [36, -28]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-1.5, 1.5]);

  return (
    <motion.div
      ref={ref}
      style={{ y, rotate }}
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="relative mx-auto max-w-[68rem] rounded-[2rem] border border-zinc-950 bg-white p-3 shadow-[0_35px_110px_rgba(24,24,27,0.16)]"
    >
      <div className="pointer-events-none absolute -inset-4 -z-10 rounded-[2.5rem] border border-lime-300/70 opacity-80" />
      <div className="overflow-hidden rounded-[1.55rem] border border-zinc-200 bg-[#fbfff5]">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-200 bg-white px-4 py-3">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-zinc-950 text-lime-200">
              <Zap aria-hidden="true" className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm font-black text-zinc-950">
                Tok jedné poptávky
              </p>
              <p className="text-xs font-bold text-lime-700">
                od první zprávy po hotovou schůzku
              </p>
            </div>
          </div>
          <span className="rounded-full bg-lime-100 px-3 py-1 text-xs font-black text-zinc-950">
            automaticky
          </span>
        </div>

        <div className="relative p-4">
          <svg
            aria-hidden="true"
            className="absolute inset-0 hidden h-full w-full lg:block"
            viewBox="0 0 1100 560"
            preserveAspectRatio="none"
          >
            <path
              className="dispatch-route-base"
              d="M155 150 C320 70 410 240 545 188 C720 120 765 365 944 310"
            />
            <path
              className="dispatch-route-pulse"
              d="M155 150 C320 70 410 240 545 188 C720 120 765 365 944 310"
            />
          </svg>
          <div className="grid gap-3 sm:grid-cols-2">
            <FlowStepCard
              step="01"
              title="Poptávka"
              icon={<MessageSquareText aria-hidden="true" className="h-5 w-5" />}
            >
              <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-3">
                <p className="text-sm font-bold leading-6 text-zinc-800">
                  Dobrý den, zajímá mě tepelné čerpadlo pro rodinný dům u Brna.
                </p>
              </div>
              <p className="mt-3 text-xs font-black uppercase text-zinc-400">
                SMS / web / telefon
              </p>
            </FlowStepCard>

            <FlowStepCard
              step="02"
              title="AI kvalifikace"
              icon={<Bot aria-hidden="true" className="h-5 w-5" />}
              accent
            >
              <div className="space-y-2">
                {["lokalita", "služba", "čas obhlídky"].map((item, index) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.45 + index * 0.16, duration: 0.4 }}
                    className="flex items-center gap-2 rounded-xl bg-white px-3 py-2 text-sm font-black text-zinc-950"
                  >
                    <Check aria-hidden="true" className="h-4 w-4 text-lime-700" />
                    {item}
                  </motion.div>
                ))}
              </div>
            </FlowStepCard>

            <FlowStepCard
              step="03"
              title="Termín"
              icon={<CalendarCheck aria-hidden="true" className="h-5 w-5" />}
            >
              <div className="grid grid-cols-3 gap-2">
                {["8:00", "9:30", "11:00"].map((time) => (
                  <span
                    key={time}
                    className={`rounded-full px-3 py-2 text-center text-xs font-black ${
                      time === "9:30"
                        ? "bg-zinc-950 text-white"
                        : "bg-lime-100 text-zinc-700"
                    }`}
                  >
                    {time}
                  </span>
                ))}
              </div>
              <p className="mt-4 rounded-2xl bg-lime-100 px-3 py-3 text-sm font-black text-lime-900">
                Obhlídka potvrzena v úterý 9:30
              </p>
            </FlowStepCard>

            <FlowStepCard
              step="04"
              title="CRM karta"
              icon={<Database aria-hidden="true" className="h-5 w-5" />}
              accent
            >
              <div className="space-y-2">
                {[
                  ["Služba", "TČ"],
                  ["Lokalita", "Brno"],
                  ["Stav", "Schůzka"],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="flex items-center justify-between rounded-xl bg-white px-3 py-2"
                  >
                    <span className="text-[0.65rem] font-black uppercase text-zinc-400">
                      {label}
                    </span>
                    <span className="text-sm font-black text-zinc-950">
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </FlowStepCard>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <StatPill
              icon={<PhoneIncoming aria-hidden="true" className="h-5 w-5" />}
              value="+38 %"
              label="více zachycených leadů"
            />
            <StatPill
              icon={<Clock3 aria-hidden="true" className="h-5 w-5" />}
              value="24/7"
              label="odpovědi bez čekání"
            />
            <StatPill
              icon={<CalendarDays aria-hidden="true" className="h-5 w-5" />}
              value="9:30"
              label="schůzka v CRM"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function HeroMockup() {
  return (
    <div className="relative min-h-0 pb-4 md:min-h-[39rem] md:pb-0 lg:min-h-[44rem]">
      <motion.div
        animate={{ y: [0, -12, 0], rotate: [-1, 1, -1] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-8 left-0 z-20 hidden w-64 rounded-3xl border border-zinc-200 bg-white p-4 shadow-[0_25px_70px_rgba(24,24,27,0.12)] sm:block"
      >
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-2xl bg-lime-100 text-zinc-950">
            <MessageSquareText aria-hidden="true" className="h-5 w-5" />
          </span>
          <div>
            <p className="text-sm font-black text-zinc-950">Nová SMS</p>
            <p className="text-xs font-bold text-zinc-500">před 8 sekundami</p>
          </div>
        </div>
        <p className="mt-4 text-sm font-semibold leading-6 text-zinc-700">
          Zdravím, poptávám FVE a baterii pro dům u Olomouce.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 44, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 mx-auto max-w-[40rem] rounded-[2rem] border border-zinc-200 bg-white p-3 shadow-[0_35px_110px_rgba(24,24,27,0.13)] md:absolute md:inset-x-0 md:top-20"
      >
        <div className="overflow-hidden rounded-[1.55rem] border border-zinc-200 bg-[#fbfff5]">
          <div className="flex items-center justify-between border-b border-zinc-200 bg-white px-4 py-3">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-2xl bg-zinc-950 text-lime-200">
                <Bot aria-hidden="true" className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-black text-zinc-950">AI Dispečer</p>
                <p className="text-xs font-bold text-lime-700">
                  4 úkoly dokončeny automaticky
                </p>
              </div>
            </div>
            <span className="rounded-full bg-lime-100 px-3 py-1 text-xs font-black text-zinc-950">
              Live
            </span>
          </div>

          <div className="grid gap-4 p-4 md:grid-cols-[0.95fr_1.05fr]">
            <div className="space-y-3">
              <MessageBubble align="left">
                Dobrý den, zajímá mě tepelné čerpadlo pro rodinný dům u Brna.
              </MessageBubble>
              <MessageBubble align="right">
                Rád pomůžu. Jak velký je dům a kdy by se vám hodila krátká obhlídka?
              </MessageBubble>
              <MessageBubble align="left">
                160 m², ideálně příští úterý dopoledne.
              </MessageBubble>
              <MessageBubble align="right">
                Výborně. Našel jsem volný termín v úterý 9:30.
              </MessageBubble>
            </div>

            <div className="relative rounded-3xl border border-zinc-200 bg-white p-4">
              <div className="route-line" />
              <div className="mb-4 flex items-center justify-between">
                <p className="text-sm font-black text-zinc-950">Karta zakázky</p>
                <span className="rounded-full bg-lime-100 px-3 py-1 text-xs font-black text-lime-800">
                  Kvalifikováno
                </span>
              </div>
              <div className="space-y-3">
                {[
                  ["Služba", "Tepelné čerpadlo"],
                  ["Lokalita", "Brno-venkov"],
                  ["Termín", "Úterý 9:30"],
                  ["Stav", "Schůzka vytvořena"],
                ].map(([label, value], index) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, x: 18 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.15, duration: 0.5 }}
                    className="flex items-center justify-between rounded-2xl border border-zinc-200 bg-zinc-50 px-3 py-3"
                  >
                    <span className="text-xs font-bold uppercase text-zinc-500">
                      {label}
                    </span>
                    <span className="text-sm font-black text-zinc-950">
                      {value}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [0, 14, 0], rotate: [1, -1, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-16 right-0 z-20 hidden w-64 rounded-3xl border border-lime-200 bg-lime-100 p-4 shadow-[0_25px_70px_rgba(132,204,22,0.22)] lg:block xl:-right-5"
      >
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-2xl bg-white text-zinc-950">
            <CalendarCheck aria-hidden="true" className="h-5 w-5" />
          </span>
          <div>
            <p className="text-sm font-black text-zinc-950">Obhlídka potvrzena</p>
            <p className="text-xs font-bold text-lime-800">úterý 9:30</p>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2">
          {["8:00", "9:30", "11:00"].map((time) => (
            <div
              key={time}
              className={`rounded-2xl px-3 py-2 text-center text-xs font-black ${
                time === "9:30"
                  ? "bg-zinc-950 text-white"
                  : "bg-white/70 text-zinc-700"
              }`}
            >
              {time}
            </div>
          ))}
        </div>
      </motion.div>

      <div className="mt-4 grid gap-3 sm:grid-cols-3 md:absolute md:bottom-0 md:left-4 md:right-4 md:mt-0">
        <StatPill
          icon={<PhoneIncoming aria-hidden="true" className="h-5 w-5" />}
          value="+38 %"
          label="více zachycených leadů"
        />
        <StatPill
          icon={<Clock3 aria-hidden="true" className="h-5 w-5" />}
          value="24/7"
          label="odpovědi bez čekání"
        />
        <StatPill
          icon={<CalendarDays aria-hidden="true" className="h-5 w-5" />}
          value="9:30"
          label="schůzka v CRM"
        />
      </div>
    </div>
  );
}

function MessageBubble({
  children,
  align,
}: {
  children: ReactNode;
  align: "left" | "right";
}) {
  const isRight = align === "right";

  return (
    <motion.div
      initial={{ opacity: 0, y: 14, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.45 }}
      className={`flex ${isRight ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`max-w-[86%] rounded-2xl px-4 py-3 text-sm font-semibold leading-relaxed ${
          isRight
            ? "bg-lime-300 text-zinc-950"
            : "border border-zinc-200 bg-white text-zinc-800"
        }`}
      >
        {children}
      </div>
    </motion.div>
  );
}

function ProblemCard({
  icon,
  title,
  text,
  index,
}: {
  icon: ReactNode;
  title: string;
  text: string;
  index: string;
}) {
  return (
    <FadeIn>
      <motion.div
        whileHover={{ x: 10 }}
        className="group relative grid overflow-hidden border-t border-zinc-950/15 py-7 md:grid-cols-[9rem_1fr_1.2fr] md:items-center"
      >
        <span className="text-5xl font-black tracking-tighter text-zinc-200 transition group-hover:text-lime-300">
          {index}
        </span>
        <div className="mt-4 flex items-center gap-4 md:mt-0">
          <div className="grid h-12 w-12 place-items-center rounded-full border border-zinc-950 bg-white text-zinc-950 transition group-hover:bg-lime-300">
            {icon}
          </div>
          <h3 className="text-2xl font-black tracking-tight text-zinc-950">
            {title}
          </h3>
        </div>
        <p className="mt-4 text-base font-semibold leading-7 text-zinc-600 md:mt-0">
          {text}
        </p>
        <div className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-lime-300 transition duration-500 group-hover:scale-x-100" />
      </motion.div>
    </FadeIn>
  );
}

function LeadTicker() {
  const leads = [
    "zmeškaný hovor · Praha-východ",
    "TČ vzduch-voda · Brno",
    "FVE + baterie · Olomouc",
    "servis měniče · Plzeň",
  ];

  return (
    <div className="mt-8 rounded-3xl border border-zinc-200 bg-white p-3 shadow-sm">
      <div className="mb-3 flex items-center gap-2 px-1">
        <span className="pulse-dot h-2.5 w-2.5 rounded-full bg-lime-400" />
        <span className="text-xs font-black uppercase text-zinc-500">
          Live vstupy do CRM
        </span>
      </div>
      <div className="grid gap-2 sm:grid-cols-2">
        {leads.map((lead, index) => (
          <motion.div
            key={lead}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.1, duration: 0.45 }}
            className="rounded-2xl border border-lime-200 bg-lime-50 px-4 py-2 text-sm font-black text-zinc-950"
          >
            {lead}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function MiniChat() {
  return (
    <div className="mt-8">
      <div className="grid gap-4 lg:grid-cols-[1fr_0.8fr]">
        <div className="rounded-[1.6rem] border border-zinc-200 bg-white p-4">
          <div className="mb-4 flex items-center gap-2">
            <span className="pulse-dot h-3 w-3 rounded-full bg-lime-400" />
            <span className="text-xs font-black uppercase text-zinc-500">
              Živá konverzace
            </span>
          </div>
          <div className="space-y-3">
            <div className="w-4/5 rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm font-semibold text-zinc-800">
              Potřebujeme FVE pro dům v Plzni.
            </div>
            <div className="ml-auto w-5/6 rounded-2xl bg-lime-300 px-4 py-3 text-sm font-black text-zinc-950">
              Zjistím pár detailů a nabídnu termín obhlídky.
            </div>
            <div className="ml-auto flex w-fit items-center gap-2 rounded-2xl border border-lime-300 bg-lime-50 px-4 py-3 text-sm font-black text-lime-900">
              <Check aria-hidden="true" className="h-4 w-4" />
              Lead kvalifikován
            </div>
          </div>
        </div>
        <div className="rounded-[1.6rem] border border-zinc-200 bg-zinc-950 p-4 text-white">
          <p className="text-xs font-black uppercase text-lime-200">
            Automatizace
          </p>
          <div className="mt-5 space-y-4">
            {["SMS odpověď", "Kvalifikace", "Kalendář", "CRM karta"].map(
              (item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0.45 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: index * 0.18, duration: 0.45 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-3"
                >
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-lime-300 text-xs font-black text-zinc-950">
                    {index + 1}
                  </span>
                  <span className="text-sm font-bold">{item}</span>
                </motion.div>
              ),
            )}
          </div>
        </div>
      </div>
      <div className="mt-5 rounded-[1.4rem] border border-lime-200 bg-white/72 p-4">
        <div className="grid grid-cols-4 gap-2 text-center text-[0.68rem] font-black uppercase text-zinc-500">
          {["Zpráva", "Otázky", "Termín", "CRM"].map((label) => (
            <span key={label}>{label}</span>
          ))}
        </div>
        <div className="mt-3 overflow-hidden rounded-full bg-lime-200">
          <motion.div
            className="h-2 w-1/3 rounded-full bg-zinc-950"
            animate={{ x: ["-100%", "310%"] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        {[
          ["Zmeškaný hovor", "SMS odeslána za 18 s"],
          ["Starý lead", "reaktivace připravena"],
          ["Obhlídka", "jen kvalifikovaný zájem"],
        ].map(([label, value]) => (
          <div
            key={label}
            className="rounded-2xl border border-lime-200 bg-white/80 p-3"
          >
            <p className="text-[0.68rem] font-black uppercase text-zinc-400">
              {label}
            </p>
            <p className="mt-1 text-sm font-black text-zinc-950">{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function Stars() {
  return (
    <div className="mt-8">
      <div className="flex gap-2">
        {Array.from({ length: 5 }).map((_, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0, y: 12, rotate: -8 }}
            whileInView={{ opacity: 1, y: 0, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08, duration: 0.45 }}
          >
            <Star
              aria-hidden="true"
              className="h-8 w-8 fill-amber-300 text-amber-300"
            />
          </motion.span>
        ))}
      </div>
      <div className="mt-5 rounded-2xl border border-zinc-200 bg-white p-4">
        <p className="text-sm font-bold text-zinc-700">
          Děkujeme za instalaci. Recenzi jsme odeslali automaticky po dokončení
          zakázky.
        </p>
      </div>
    </div>
  );
}

function LineChart() {
  return (
    <div className="mt-8 rounded-[1.6rem] border border-zinc-200 bg-white p-5">
      <div className="mb-4 flex items-center justify-between gap-3">
        <span className="rounded-full bg-zinc-950 px-3 py-1 text-xs font-black text-white">
          Excel 2024
        </span>
        <ArrowRight aria-hidden="true" className="h-4 w-4 text-zinc-400" />
        <span className="rounded-full bg-lime-200 px-3 py-1 text-xs font-black text-zinc-950">
          nové schůzky
        </span>
      </div>
      <div className="h-32">
        <div className="flex h-full items-end gap-2">
          {[20, 34, 28, 46, 58, 72, 88].map((height, index) => (
            <div
              key={height}
              className="flex h-full flex-1 flex-col items-center justify-end gap-2"
            >
              <motion.div
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.08,
                  duration: 0.7,
                  ease: "easeOut",
                }}
                className={`w-full rounded-t-xl ${
                  index > 4 ? "bg-lime-300" : "bg-zinc-950"
                }`}
                style={{ height: `${height}%`, transformOrigin: "bottom" }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Kanban() {
  const columns = [
    ["Nová poptávka", "FVE 10 kWp", "TČ Brno"],
    ["Obhlídka", "Sobota 10:00", "Plzeň"],
    ["Smlouva", "Podepsat", "98 000 Kč"],
  ];

  return (
    <div className="mt-8 grid gap-3 sm:grid-cols-3">
      {columns.map(([title, first, second], columnIndex) => (
        <motion.div
          key={title}
          whileHover={{ y: -6 }}
          className="min-h-40 rounded-[1.35rem] border border-zinc-200 bg-white p-3"
        >
          <div className="mb-3 text-xs font-black uppercase text-zinc-500">
            {title}
          </div>
          <div className="space-y-2">
            {[first, second].map((item, itemIndex) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: columnIndex * 0.08 + itemIndex * 0.1,
                  duration: 0.45,
                }}
                className={`rounded-xl border p-3 text-sm font-black ${
                  itemIndex === 0
                    ? "border-zinc-200 bg-zinc-50 text-zinc-950"
                    : "border-lime-200 bg-lime-50 text-lime-900"
                }`}
              >
                {item}
              </motion.div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function BentoCard({
  title,
  text,
  children,
  className = "",
  accent = "white",
}: {
  title: string;
  text: string;
  children: ReactNode;
  className?: string;
  accent?: "white" | "lime" | "black";
}) {
  const styles = {
    white:
      "border-zinc-950/20 bg-white text-zinc-950",
    lime:
      "border-zinc-950 bg-lime-100 text-zinc-950",
    black:
      "border-zinc-950 bg-zinc-950 text-white",
  };

  return (
    <FadeIn className={className}>
      <motion.div
        whileHover={{ y: -5 }}
        className={`kinetic-scan group relative h-full overflow-hidden rounded-[1.35rem] border p-6 transition shadow-[0_18px_55px_rgba(24,24,27,0.07)] ${styles[accent]}`}
      >
        <div className="absolute inset-y-6 left-0 w-1 origin-top scale-y-0 bg-lime-300 transition duration-500 group-hover:scale-y-100" />
        <h3 className="text-2xl font-black tracking-tight">{title}</h3>
        <p
          className={`mt-3 max-w-2xl text-base font-semibold leading-7 ${
            accent === "black" ? "text-zinc-300" : "text-zinc-600"
          }`}
        >
          {text}
        </p>
        {children}
      </motion.div>
    </FadeIn>
  );
}

function Step({
  number,
  title,
  icon,
}: {
  number: string;
  title: string;
  icon: ReactNode;
}) {
  return (
    <FadeIn>
      <motion.div
        whileHover={{ y: -4 }}
        className="group grid grid-cols-[auto_1fr] gap-5 rounded-[1.6rem] border border-zinc-200 bg-white p-5 shadow-[0_18px_55px_rgba(24,24,27,0.06)]"
      >
        <div className="grid h-14 w-14 place-items-center rounded-2xl bg-lime-100 text-zinc-950 ring-1 ring-lime-200 transition group-hover:bg-lime-300">
          {icon}
        </div>
        <div>
          <p className="text-sm font-black text-lime-700">{number}</p>
          <p className="mt-1 text-xl font-black tracking-tight text-zinc-950 sm:text-2xl">
            {title}
          </p>
        </div>
      </motion.div>
    </FadeIn>
  );
}

function PricingCard({
  title,
  price,
  period,
  billingNote,
  features,
  highlighted = false,
}: {
  title: string;
  price: string;
  period: string;
  billingNote?: string;
  features: string[];
  highlighted?: boolean;
}) {
  return (
    <FadeIn>
      <motion.div
        whileHover={{ y: -10 }}
        className={`relative overflow-hidden rounded-[2rem] border p-6 ${
          highlighted
            ? "border-zinc-950 bg-zinc-950 text-white shadow-[0_35px_90px_rgba(24,24,27,0.22)]"
            : "border-zinc-950/80 bg-white text-zinc-950 shadow-[0_30px_80px_rgba(24,24,27,0.16)]"
        }`}
      >
        <div
          className={`absolute inset-x-0 top-0 h-2 ${
            highlighted ? "bg-lime-300" : "bg-zinc-950"
          }`}
        />
        {!highlighted && (
          <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-lime-200/70 blur-3xl" />
        )}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-2xl font-black tracking-tight">{title}</h3>
            <div className="mt-4 flex flex-wrap items-end gap-2">
              <span className="text-4xl font-black tracking-tight">{price}</span>
              <span
                className={`pb-1 text-sm font-bold ${
                  highlighted ? "text-zinc-300" : "text-zinc-500"
                }`}
              >
                {period}
              </span>
            </div>
          </div>
          {highlighted && (
            <span className="rounded-full bg-lime-300 px-3 py-1 text-xs font-black text-zinc-950">
              Nejlepší volba
            </span>
          )}
        </div>
        {billingNote && (
          <p
            className={`mt-3 text-sm font-black ${
              highlighted ? "text-lime-200" : "text-lime-700"
            }`}
          >
            {billingNote}
          </p>
        )}
        <ul className="mt-8 space-y-4">
          {features.map((feature) => (
            <li key={feature} className="flex items-center gap-3">
              <span className="grid h-6 w-6 place-items-center rounded-full bg-lime-300 text-zinc-950">
                <Check aria-hidden="true" className="h-4 w-4" />
              </span>
              <span
                className={`text-sm font-bold ${
                  highlighted ? "text-zinc-100" : "text-zinc-700"
                }`}
              >
                {feature}
              </span>
            </li>
          ))}
        </ul>
        <a
          href="#contact"
          className={`mt-9 inline-flex min-h-12 w-full items-center justify-center rounded-full px-5 text-sm font-black transition ${
            highlighted
              ? "bg-lime-300 text-zinc-950 hover:bg-lime-200"
              : "border border-zinc-200 bg-zinc-950 text-white hover:bg-lime-300 hover:text-zinc-950"
          }`}
        >
          Začít s InstallFlow
        </a>
      </motion.div>
    </FadeIn>
  );
}

export default function Home() {
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");
  const isYearly = billing === "yearly";

  return (
    <main className="min-h-screen overflow-hidden bg-[#f7faf4] text-zinc-950">
      <ScrollProgress />
      <div className="paper-grid" />
      <Navbar />

      <Section className="kinetic-shell pt-28 sm:pt-36 lg:pt-40">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <FadeIn className="relative z-20 min-w-0">
            <div className="inline-flex items-center gap-2 rounded-full border border-lime-300 bg-white px-4 py-2 text-sm font-black text-zinc-950 shadow-sm">
              <Sparkles aria-hidden="true" className="h-4 w-4 text-lime-700" />
              Dispečink pro FVE a tepelná čerpadla
            </div>
            <AnimatedHeadline />
            <p className="mt-7 max-w-2xl text-lg font-semibold leading-8 text-zinc-600 sm:text-xl">
              InstallFlow bere zmeškané hovory, SMS a staré excelové poptávky a
              mění je na kvalifikované obhlídky v kalendáři. Žádný obecný CRM
              dashboard. Jen tok práce, který instalační firma opravdu řeší.
            </p>
            <div className="mt-10 flex flex-col items-start gap-3 sm:flex-row">
              <PrimaryButton className="w-full sm:w-auto">
                Vyzkoušet na 14 dní zdarma
              </PrimaryButton>
              <SecondaryButton>Jak to funguje?</SecondaryButton>
            </div>
            <FadeIn delay={0.18} className="max-w-2xl">
              <LeadTicker />
            </FadeIn>
          </FadeIn>
          <FieldOpsVisual />
        </div>
        <LeadStream />
        <SignalBoard />
      </Section>

      <Section className="pt-28 sm:pt-36">
        <div className="max-w-4xl">
          <FadeIn>
            <p className="text-sm font-black uppercase text-lime-700">
              Problém
            </p>
            <h2 className="mt-4 text-balance text-4xl font-black tracking-tight text-zinc-950 sm:text-6xl">
              Ztrácíte zakázky, zatímco jste na střeše?
            </h2>
          </FadeIn>
          <FadeIn>
            <p className="mt-5 max-w-2xl text-lg font-semibold leading-8 text-zinc-600">
              InstallFlow zachytí poptávky v okamžiku, kdy váš tým pracuje v
              terénu. Každý dotaz se změní na strukturovanou příležitost.
            </p>
          </FadeIn>
        </div>
        <div className="mt-12 grid gap-3">
          <ProblemCard
            index="01"
            icon={<PhoneMissed aria-hidden="true" className="h-6 w-6" />}
            title="Nezvednuté telefony"
            text="Zákazník volá, vy montujete. Volá konkurenci."
          />
          <ProblemCard
            index="02"
            icon={<Database aria-hidden="true" className="h-6 w-6" />}
            title="Mrtvá databáze"
            text="Stovky starých poptávek v Excelu, které nikdo neobvolal."
          />
          <ProblemCard
            index="03"
            icon={<CalendarX aria-hidden="true" className="h-6 w-6" />}
            title="Ztracený čas"
            text="Jezdíte na obhlídky k lidem, kteří chtějí jen vědět cenu."
          />
        </div>
      </Section>

      <Section id="features" className="pt-28 sm:pt-36">
        <div className="max-w-4xl">
          <FadeIn>
            <p className="text-sm font-black uppercase text-lime-700">
              Funkce
            </p>
            <h2 className="mt-4 text-4xl font-black tracking-tight text-zinc-950 sm:text-6xl">
              Jeden tok práce od první zprávy po smlouvu.
            </h2>
          </FadeIn>
          <FadeIn className="mt-8 grid max-w-xl grid-cols-2 gap-3 text-left">
            <div className="rounded-3xl bg-zinc-950 p-5 text-white">
              <Gauge aria-hidden="true" className="h-6 w-6 text-lime-300" />
              <p className="mt-4 text-3xl font-black">do 60 s</p>
              <p className="text-sm font-bold text-zinc-300">první odpověď</p>
            </div>
            <div className="rounded-3xl bg-lime-100 p-5">
              <CircleDollarSign aria-hidden="true" className="h-6 w-6" />
              <p className="mt-4 text-3xl font-black">FVE/TČ</p>
              <p className="text-sm font-bold text-zinc-600">pipeline bez Excelu</p>
            </div>
          </FadeIn>
        </div>
        <div className="mt-12 grid gap-4 lg:grid-cols-2">
          <BentoCard
            title="AI Dispečer 24/7"
            text="Odpovídá, kvalifikuje a posouvá zákazníka k termínu i mimo pracovní dobu."
            className="lg:col-span-2"
            accent="lime"
          >
            <MiniChat />
          </BentoCard>
          <BentoCard
            title="Automatické recenze"
            text="Po dokončení zakázky systém požádá zákazníka o hodnocení."
            className=""
          >
            <Stars />
          </BentoCard>
          <BentoCard
            title="Reaktivace starých leadů"
            text="Znovu otevře poptávky, které čekaly v tabulce."
            className=""
            accent="black"
          >
            <LineChart />
          </BentoCard>
          <BentoCard
            title="Přehledné CRM"
            text="Každý obchod vidíte v jasné pipeline od nové poptávky po smlouvu."
            className="lg:col-span-2"
          >
            <Kanban />
          </BentoCard>
        </div>
      </Section>

      <Section id="how" className="pt-28 sm:pt-36">
        <div className="mx-auto grid max-w-5xl gap-8">
          <FadeIn>
            <div className="rounded-[2rem] border border-zinc-200 bg-white p-6 text-center shadow-[0_24px_80px_rgba(24,24,27,0.08)]">
              <p className="text-sm font-black uppercase text-lime-700">
                Jak to funguje
              </p>
              <h2 className="mx-auto mt-4 max-w-3xl text-4xl font-black tracking-tight text-zinc-950 sm:text-6xl">
                Od dotazu ke schůzce bez ručního nahánění.
              </h2>
              <div className="mx-auto mt-8 max-w-xl rounded-3xl bg-zinc-950 p-5 text-left text-white">
                <div className="flex items-center gap-3">
                  <ShieldCheck
                    aria-hidden="true"
                    className="h-5 w-5 text-lime-300"
                  />
                  <span className="text-sm font-bold">
                    Váš tým má vždy kontrolu nad kalendářem i pipeline.
                  </span>
                </div>
              </div>
            </div>
          </FadeIn>
          <div className="grid gap-4 sm:grid-cols-2">
            <Step
              number="01"
              title="Zákazník napíše SMS nebo zavolá."
              icon={<PhoneCall aria-hidden="true" className="h-6 w-6" />}
            />
            <Step
              number="02"
              title="AI asistent zjistí lokalitu, službu a termín."
              icon={<MapPin aria-hidden="true" className="h-6 w-6" />}
            />
            <Step
              number="03"
              title="Systém pošle odkaz na kalendář."
              icon={<MousePointerClick aria-hidden="true" className="h-6 w-6" />}
            />
            <Step
              number="04"
              title="Vy vidíte hotovou schůzku v CRM."
              icon={<CalendarCheck aria-hidden="true" className="h-6 w-6" />}
            />
          </div>
        </div>
      </Section>

      <Section id="pricing" className="pt-28 sm:pt-36">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-black uppercase text-lime-700">Ceník</p>
          <h2 className="mt-4 text-4xl font-black tracking-tight text-zinc-950 sm:text-6xl">
            Jednoduché ceny pro růst montážní firmy.
          </h2>
          <div className="mx-auto mt-8 grid w-fit grid-cols-2 rounded-full border border-zinc-200 bg-white p-1 shadow-sm">
            {[
              ["monthly", "Měsíčně"],
              ["yearly", "Ročně"],
            ].map(([value, label]) => (
              <button
                key={value}
                onClick={() => setBilling(value as "monthly" | "yearly")}
                className={`relative rounded-full px-5 py-2 text-sm font-black transition ${
                  billing === value ? "text-zinc-950" : "text-zinc-500"
                }`}
              >
                {billing === value && (
                  <motion.span
                    layoutId="billing-pill"
                    className="absolute inset-0 rounded-full bg-lime-300"
                    transition={{ type: "spring", stiffness: 430, damping: 34 }}
                  />
                )}
                <span className="relative z-10">{label}</span>
              </button>
            ))}
          </div>
          <p className="mt-4 text-sm font-bold text-zinc-500">
            Roční platba je výhodnější než 12 měsíců zvlášť.
          </p>
        </FadeIn>
        <div className="mx-auto mt-12 grid max-w-5xl gap-4 lg:grid-cols-2">
          <PricingCard
            title="Start"
            price={isYearly ? "24 000 Kč" : "2 500 Kč"}
            period={isYearly ? "/ rok" : "/ měsíc"}
            billingNote={isYearly ? "Ušetříte 6 000 Kč ročně" : undefined}
            features={["Základní CRM", "SMS upozornění"]}
          />
          <PricingCard
            title="Pro"
            price={isYearly ? "47 000 Kč" : "4 900 Kč"}
            period={isYearly ? "/ rok" : "/ měsíc"}
            billingNote={isYearly ? "Ušetříte 11 800 Kč ročně" : undefined}
            highlighted
            features={[
              "AI Asistent",
              "Automatické domlouvání schůzek",
              "Reaktivace",
              "Recenze",
            ]}
          />
        </div>
      </Section>

      <Section id="contact" className="py-28 sm:py-36">
        <div className="overflow-hidden rounded-[2.5rem] border border-zinc-200 bg-white p-4 shadow-[0_35px_100px_rgba(24,24,27,0.1)]">
          <div className="grid gap-8 rounded-[2rem] bg-lime-100 p-6 sm:p-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            <FadeIn>
              <p className="text-sm font-black uppercase text-lime-800">
                Kontakt
              </p>
              <h2 className="mt-4 text-4xl font-black tracking-tight text-zinc-950 sm:text-6xl">
                Připraveni na víc zakázek?
              </h2>
              <p className="mt-6 max-w-xl text-lg font-semibold leading-8 text-zinc-700">
                Vložte externí formulář nebo rezervační widget přímo do
                připraveného prostoru.
              </p>
            </FadeIn>
            <FadeIn>
              <motion.div
                whileHover={{ scale: 1.005 }}
                className="relative overflow-hidden rounded-[2rem] border border-zinc-950 bg-white p-3 shadow-[0_28px_80px_rgba(24,24,27,0.16)]"
              >
                <div className="overflow-hidden rounded-[1.5rem] border border-zinc-200 bg-white">
                  <iframe
                    src="https://api.leadconnectorhq.com/widget/form/n9BKLHw10jvhbbQbXOPj"
                    style={{
                      width: "100%",
                      height: "926px",
                      border: "none",
                      borderRadius: "8px",
                    }}
                    id="inline-n9BKLHw10jvhbbQbXOPj"
                    data-layout="{'id':'INLINE'}"
                    data-trigger-type="alwaysShow"
                    data-trigger-value=""
                    data-activation-type="alwaysActivated"
                    data-activation-value=""
                    data-deactivation-type="neverDeactivate"
                    data-deactivation-value=""
                    data-form-name="Form"
                    data-height="926"
                    data-layout-iframe-id="inline-n9BKLHw10jvhbbQbXOPj"
                    data-form-id="n9BKLHw10jvhbbQbXOPj"
                    title="Form"
                  />
                </div>
              </motion.div>
            </FadeIn>
          </div>
        </div>
      </Section>

      <Script
        src="https://link.msgsndr.com/js/form_embed.js"
        strategy="afterInteractive"
      />

      <footer className="relative z-10 border-t border-zinc-200 bg-white px-5 py-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-sm font-bold text-zinc-500 sm:flex-row">
          <p>Copyright 2026 InstallFlow</p>
          <div className="flex items-center gap-6">
            <a href="#" className="transition hover:text-zinc-950">
              Privacy Policy
            </a>
            <a href="#" className="transition hover:text-zinc-950">
              Terms of Service
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
