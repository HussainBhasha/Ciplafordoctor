import Container from "@/components/ui/Container";
import MarketingNavbar from "@/components/layout/MarketingNavbar";
import Footer from "@/components/layout/Footer";
import Button from "@/components/ui/Button";
import patientLandingBg from "@/assets/patient landing.png";
import oaComparisonImage from "@/assets/OA.png";
import postInjectionImage from "@/assets/postinjection.png";
import symptomsImage from "@/assets/symptoms.png";
import gradeStage1Image from "@/assets/stage 1.png";
import gradeStage2Image from "@/assets/stage 2.png";
import gradeStage3Image from "@/assets/stage 3.png";
import gradeStage4Image from "@/assets/stage 4.png";
import selfHelpImage from "@/assets/self help.png";
import informationImage from "@/assets/information.png";
import nonSurgicalImage from "@/assets/non surgical.png";
import advancedImage from "@/assets/advanced.png";
import surgicalImage from "@/assets/surgical.png";
import stemcellImage from "@/assets/stemcell.png";
import { Activity, Armchair, ArrowRight, BadgeCheck, ClipboardList, Droplets, Footprints, TrendingUp, Stethoscope, Pill } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useInView } from "@/hooks/useInView";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type RevealWordsProps = {
  text: string;
  active: boolean;
  stagger?: number;
  delay?: number;
};

function RevealWords({ text, active, stagger = 0.04, delay = 0 }: RevealWordsProps) {
  const words = text.split(" ").filter(Boolean);
  return (
    <span aria-label={text} role="text">
      {words.map((word, idx) => (
        <span
          key={`${word}-${idx}`}
          className={cn("reveal-word", active && "reveal-word-visible")}
          style={active ? { animationDelay: `${delay + idx * stagger}s` } : undefined}
        >
          {word}
          {idx < words.length - 1 ? "\u00A0" : null}
        </span>
      ))}
    </span>
  );
}

const oaSymptomHighlights = [
  {
    title: "Pain While Walking",
    text: "Discomfort or pain in the knee while walking, especially on longer distances.",
    icon: <Footprints className="h-6 w-6" />,
  },
  {
    title: "Difficulty Climbing Stairs",
    text: "Pain or difficulty while climbing up or down stairs.",
    icon: <TrendingUp className="h-6 w-6" />,
  },
  {
    title: "Getting Up from a Chair",
    text: "Pain or stiffness when standing up after sitting for a while.",
    icon: <Armchair className="h-6 w-6" />,
  },
  {
    title: "Stiffness & Swelling",
    text: "Morning stiffness, knee swelling, or a feeling of buckling.",
    icon: <Droplets className="h-6 w-6" />,
  },
];

const grades = [
  { k: "Grade I", title: "Mild changes", text: "Early cartilage irritation with minimal pain.", image: gradeStage1Image },
  { k: "Grade II", title: "Moderate changes", text: "Cartilage damage begins; pain may increase with activity.", image: gradeStage2Image },
  { k: "Grade III", title: "Advanced changes", text: "Noticeable cartilage loss and inflammation; mobility reduces.", image: gradeStage3Image },
  { k: "Grade IV", title: "Severe changes", text: "Joint-space narrowing; significant pain and stiffness.", image: gradeStage4Image },
];

const journey = [
  {
    icon: <Pill className="h-7 w-7" />,
    title: "Self-help",
    text: "Simple painkillers, external applications, supplements",
    image: selfHelpImage,
  },
  {
    icon: <ClipboardList className="h-7 w-7" />,
    title: "Information and advice",
    text: "Education, weight loss, exercise, lifestyle changes",
    image: informationImage,
  },
  {
    icon: <Activity className="h-7 w-7" />,
    title: "Simple non-surgical options",
    text: "Prescribed oral painkillers, physiotherapy, supporting devices",
    image: nonSurgicalImage,
  },
  {
    icon: <Stethoscope className="h-7 w-7" />,
    title: "Advanced non-surgical options",
    text: "Intra articular injections",
    image: advancedImage,
  },
  {
    icon: <BadgeCheck className="h-7 w-7" />,
    title: "Surgical options",
    text: "Repair/partial or total joint replacement",
    image: surgicalImage,
  },
];

export default function Patient() {
  const { ref: oaRef, inView: oaInView } = useInView({ threshold: 0.18, rootMargin: "0px 0px -10% 0px" });
  const { ref: symptomsRef, inView: symptomsInView } = useInView({ threshold: 0.18, rootMargin: "0px 0px -10% 0px" });
  const { ref: gradeRef, inView: gradeInView } = useInView({ threshold: 0.18, rootMargin: "0px 0px -10% 0px" });
  const { ref: journeyRef, inView: journeyInView } = useInView({ threshold: 0.18, rootMargin: "0px 0px -10% 0px" });
  const stemSectionRef = useRef<HTMLElement | null>(null);
  const stemVisualRef = useRef<HTMLDivElement | null>(null);
  const [step, setStep] = useState(1);
  const totalSteps = 4;
  const [frequency, setFrequency] = useState<string | null>(null);
  const [pain, setPain] = useState(5);
  const [stiffness, setStiffness] = useState<string | null>(null);
  const [swelling, setSwelling] = useState<string | null>(null);
  const [cracking, setCracking] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [result, setResult] = useState<{ score: number; max: number; label: string } | null>(null);
  const [postPreviewOpen, setPostPreviewOpen] = useState(false);

  useEffect(() => {
    if (!postPreviewOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPostPreviewOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [postPreviewOpen]);

  useEffect(() => {
    const section = stemSectionRef.current;
    const visual = stemVisualRef.current;
    if (!section || !visual) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.set(visual, { x: -140, opacity: 0 });

      const enter = () => {
        gsap.to(visual, {
          x: 0,
          opacity: 1,
          duration: 0.85,
          ease: "power3.out",
          overwrite: true,
        });
      };

      const leave = () => {
        gsap.to(visual, {
          x: -140,
          opacity: 0,
          duration: 0.6,
          ease: "power3.in",
          overwrite: true,
        });
      };

      ScrollTrigger.create({
        trigger: section,
        start: "top 75%",
        end: "bottom 25%",
        onEnter: enter,
        onEnterBack: enter,
        onLeave: leave,
        onLeaveBack: leave,
        onRefresh: (self) => {
          if (self.isActive) enter();
          else leave();
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const percent = useMemo(() => Math.round((step / totalSteps) * 100), [step]);

  const scoreMax = 22;

  const calcScore = () => {
    const freqScore =
      frequency === "Daily"
        ? 3
        : frequency === "Several times a week"
          ? 2
          : frequency === "Occasionally"
            ? 1
            : 0;
    const stiffScore =
      stiffness === "Severe" ? 3 : stiffness === "Moderate" ? 2 : stiffness === "Mild" ? 1 : 0;
    const swellScore =
      swelling === "Constant" ? 3 : swelling === "Frequent" ? 2 : swelling === "Occasional" ? 1 : 0;
    const crackScore =
      cracking === "Always" ? 3 : cracking === "Often" ? 2 : cracking === "Sometimes" ? 1 : 0;
    const total = freqScore + pain + stiffScore + swellScore + crackScore;
    const label = total <= 7 ? "Low" : total <= 14 ? "Moderate" : "High";
    return { total, label };
  };

  const validate = (targetStep: number) => {
    const nextErrors: Record<string, string> = {};
    if (targetStep >= 1) {
      if (!frequency) nextErrors.frequency = "Select one option to continue.";
    }
    if (targetStep >= 3) {
      if (!stiffness) nextErrors.stiffness = "Select stiffness to continue.";
      if (!swelling) nextErrors.swelling = "Select swelling to continue.";
    }
    if (targetStep >= 4) {
      if (!cracking) nextErrors.cracking = "Select one option to continue.";
      if (!name.trim()) nextErrors.name = "Name is required.";
      const ageNum = Number(age);
      if (!age.trim() || !Number.isFinite(ageNum) || ageNum < 1 || ageNum > 120) nextErrors.age = "Enter a valid age.";
      const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
      if (!emailOk) nextErrors.email = "Enter a valid email.";
    }
    return nextErrors;
  };

  const goNext = () => {
    const nextErrors = validate(step);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }
    setErrors({});
    setStep((s) => Math.min(totalSteps, s + 1));
  };

  const goBack = () => {
    setErrors({});
    setStep((s) => Math.max(1, s - 1));
  };

  const submit = () => {
    const nextErrors = validate(4);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }
    const { total, label } = calcScore();
    setResult({ score: total, max: scoreMax, label });
  };

  const reset = () => {
    setResult(null);
    setStep(1);
    setFrequency(null);
    setPain(5);
    setStiffness(null);
    setSwelling(null);
    setCracking(null);
    setName("");
    setAge("");
    setEmail("");
    setErrors({});
  };

  return (
    <div className="min-h-dvh bg-sky-50">
      <MarketingNavbar />
      <main className="pt-20">
        <section className="relative h-[calc(100dvh-5rem)] w-full overflow-hidden">
          <img
            src={patientLandingBg}
            alt=""
            className="h-full w-full object-cover object-center"
            decoding="async"
            loading="eager"
            fetchPriority="high"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white/85 via-white/45 to-transparent" />
          <Container>
            <div className="absolute inset-0">
              <div className="h-full flex items-center">
                <div className="max-w-3xl pl-6 sm:pl-10 md:pl-14 -translate-y-4 sm:translate-y-0">
                <div className="font-display text-5xl sm:text-6xl font-semibold tracking-[-0.04em] text-[#0b3a66]">
                  Knee Osteoarthritis (OA)
                </div>
                <p className="mt-4 max-w-2xl text-sm sm:text-base leading-relaxed text-slate-700">
                  Osteoarthritis is a common joint condition where knee cartilage gradually wears down, causing pain, stiffness, and reduced
                  mobility. Early awareness and assessment can help you understand your knee health better.
                </p>
                <div className="mt-6">
                  <button
                    type="button"
                    className="inline-flex items-center justify-center rounded-full bg-sky-600 px-5 py-2.5 text-sm font-semibold text-white shadow-button transition hover:brightness-110"
                    onClick={() => {
                      const el = document.getElementById("assessment");
                      el?.scrollIntoView({ behavior: "smooth", block: "start" });
                    }}
                  >
                    Start Assessment
                  </button>
                </div>
                </div>
              </div>
            </div>
          </Container>
        </section>

        <section ref={(node) => { oaRef.current = node; }} className="relative py-14 sm:py-20">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_circle_at_22%_0%,rgba(56,189,248,0.16),transparent_60%)]" />
          <Container>
            <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)] md:items-center">
              <div
                className={cn(
                  "transition-all duration-700 ease-out",
                  oaInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
                )}
              >
                <div className="font-display text-4xl sm:text-5xl font-semibold tracking-[-0.03em] text-slate-900">
                  Understanding Knee Osteoarthritis
                </div>
                <div className="mt-4 text-sm sm:text-base font-medium text-slate-600">
                  Know the difference between a healthy knee and an osteoarthritic knee
                </div>
                <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-600">
                  Knee Osteoarthritis is a chronic joint condition where the protective cartilage between bones gradually wears down. This can
                  lead to pain, stiffness, swelling, and reduced movement.
                </p>

                <div className="mt-8 grid gap-4">
                  <div className="rounded-[24px] bg-white/85 p-6 ring-1 ring-sky-200/60 shadow-soft-xl">
                    <div className="text-sm font-semibold text-slate-900">Healthy Knee</div>
                    <div className="mt-2 text-sm leading-relaxed text-slate-600">
                      Smooth cartilage, healthy joint space, and flexible movement support normal knee function.
                    </div>
                  </div>

                  <div className="rounded-[24px] bg-white/85 p-6 ring-1 ring-sky-200/60 shadow-soft-xl">
                    <div className="text-sm font-semibold text-slate-900">Osteoarthritis Knee</div>
                    <div className="mt-2 text-sm leading-relaxed text-slate-600">
                      Cartilage breakdown, bone changes, and inflammation may cause pain and reduced mobility.
                    </div>
                  </div>
                </div>

              </div>

              <div
                className={cn(
                  "transition-all duration-700 ease-out delay-100",
                  oaInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
                )}
              >
                <div className="relative h-[360px] overflow-hidden rounded-[28px] bg-white ring-1 ring-sky-200/60 shadow-soft-xl sm:h-[440px] lg:h-[520px]">
                  <img
                    src={oaComparisonImage}
                    alt="Healthy knee vs osteoarthritis comparison"
                    className="relative h-full w-full object-contain"
                    decoding="async"
                    loading="eager"
                    fetchPriority="high"
                  />
                </div>
              </div>
            </div>
          </Container>
        </section>

        <section ref={(node) => { symptomsRef.current = node; }} className="relative py-14 sm:py-20">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_circle_at_15%_20%,rgba(56,189,248,0.14),transparent_55%)]" />
          <Container>
            <div className="mx-auto max-w-6xl">
              <div className="max-w-xl">
                <div className={cn("text-sm font-semibold text-sky-700 reveal-fade", symptomsInView && "reveal-fade-visible")}>
                  Knee OA: Symptoms
                </div>
                <div className="mt-3 font-display text-3xl font-semibold tracking-[-0.03em] text-slate-900 sm:text-4xl">
                  <RevealWords text="Signs Your Knee May Be Telling You" active={symptomsInView} />
                </div>
                <p className={cn("mt-4 text-sm leading-relaxed text-slate-600 reveal-fade", symptomsInView && "reveal-fade-visible")}>
                  Knee osteoarthritis symptoms often develop gradually and can impact your daily activities. Recognizing them early can help
                  you take the right steps towards better joint health.
                </p>
              </div>

              <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:items-stretch">
                <div className="grid content-start gap-4">
                  {oaSymptomHighlights.map((item, idx) => (
                    <div
                      key={item.title}
                      className={cn(
                        "flex items-start gap-4 rounded-[24px] bg-white/90 p-6 ring-1 ring-sky-200/60 shadow-soft-xl transition-all duration-700 ease-out",
                        symptomsInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
                      )}
                      style={{ transitionDelay: `${idx * 90}ms` }}
                    >
                      <div className="grid h-12 w-12 flex-none place-items-center rounded-2xl bg-sky-50 text-sky-700 ring-1 ring-sky-100">
                        {item.icon}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-baseline gap-3">
                          <div className="text-sm font-semibold text-sky-700">
                            {String(idx + 1).padStart(2, "0")}
                          </div>
                          <div className="text-sm font-semibold text-slate-900">{item.title}</div>
                        </div>
                        <div className="mt-2 text-sm leading-relaxed text-slate-600">{item.text}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className={cn("flex items-center justify-center lg:self-start transition-all duration-700 ease-out", symptomsInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4")}>
                  <img
                    src={symptomsImage}
                    alt="Knee OA symptoms"
                    className="h-auto w-full max-w-[520px] object-contain lg:max-h-[440px] lg:max-w-[440px]"
                    decoding="async"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </Container>
        </section>

        <section ref={(node) => { gradeRef.current = node; }} className="bg-sky-50/60 py-14 sm:py-20">
          <Container>
            <div className="text-center">
              <div className="font-display text-4xl font-semibold tracking-[-0.03em] text-[#0b3a66] sm:text-5xl">
                <RevealWords text="Stages of Knee OA - Severity" active={gradeInView} />
              </div>
              <div className="mt-3 font-display text-3xl font-semibold tracking-[-0.03em] text-slate-900 sm:text-4xl">
                <RevealWords text="Kellgren-Lawrence Classification" active={gradeInView} delay={0.15} />
              </div>
            </div>

            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {grades.map((g, idx) => (
                <div
                  key={g.k}
                  className={cn(
                    "overflow-hidden rounded-[26px] bg-white/90 ring-1 ring-sky-200/70 shadow-soft-xl transition-all duration-700 ease-out",
                    gradeInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
                  )}
                  style={{ transitionDelay: `${idx * 90}ms` }}
                >
                  <div
                    className={cn(
                      "h-56 w-full bg-white sm:h-64",
                    )}
                  >
                    <img
                      src={g.image}
                      alt={`${g.k} illustration`}
                      className="h-full w-full object-cover"
                      decoding="async"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-7">
                    <div className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-700">{g.k}</div>
                    <div className="mt-2 text-lg font-semibold text-slate-900">{g.title}</div>
                    <div className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">{g.text}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 text-center text-sm text-slate-600">Progression of Knee OA from Grade I to Grade IV</div>
          </Container>
        </section>

        <section ref={(node) => { stemSectionRef.current = node; }} className="relative overflow-hidden bg-sky-50/60 py-14 sm:py-20">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_circle_at_20%_20%,rgba(56,189,248,0.18),transparent_55%)]" />
          <div className="pointer-events-none absolute inset-0 opacity-70 hero-dots" />
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-[12%] top-[24%] h-2 w-2 rounded-full bg-sky-400/40 blur-[1px] node-pulse" />
            <div className="absolute left-[18%] top-[62%] h-1.5 w-1.5 rounded-full bg-sky-300/35 blur-[1px] node-pulse" />
            <div className="absolute right-[18%] top-[22%] h-2.5 w-2.5 rounded-full bg-sky-300/35 blur-[1px] node-pulse" />
            <div className="absolute right-[12%] top-[58%] h-2 w-2 rounded-full bg-sky-400/35 blur-[1px] node-pulse" />
          </div>

          <Container>
            <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2 md:items-center">
              <div className="order-2 md:order-1">
                <div
                  ref={stemVisualRef}
                  className="relative mx-auto max-w-[520px] opacity-0 md:mx-0"
                >
                  <div className="absolute -inset-10 rounded-full bg-sky-400/15 blur-3xl glow-pulse" />
                  <div className="relative">
                    <img
                      src={stemcellImage}
                      alt="3D stem cell visual"
                      className="mx-auto w-full max-w-[420px] select-none animate-floaty animate-rotate-slow object-contain"
                      decoding="async"
                      loading="lazy"
                    />
                    <div className="pointer-events-none absolute inset-0">
                      <div className="absolute left-[18%] top-[22%] h-1.5 w-1.5 rounded-full bg-sky-400/60 blur-[1px] animate-floaty" />
                      <div className="absolute left-[62%] top-[18%] h-2 w-2 rounded-full bg-sky-300/55 blur-[1px] animate-floaty" />
                      <div className="absolute left-[72%] top-[58%] h-1.5 w-1.5 rounded-full bg-sky-500/55 blur-[1px] animate-floaty" />
                      <div className="absolute left-[34%] top-[68%] h-2 w-2 rounded-full bg-sky-400/55 blur-[1px] animate-floaty" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="order-1 md:order-2">
                <div className="font-display text-4xl font-semibold tracking-[-0.03em] text-slate-900 sm:text-5xl">
                  Advanced Stem Cell Therapy for Knee Regeneration
                </div>
                <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-600 sm:text-base">
                  Stem cell technology supports the body's natural healing process by helping regenerate damaged tissues, improve joint
                  function, and promote better mobility.
                </p>

                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  {[
                    {
                      title: "Cell Regeneration",
                      text: "Supports natural tissue repair and recovery.",
                    },
                    {
                      title: "Knee Cartilage Support",
                      text: "Helps maintain healthy joint structure and movement.",
                    },
                    {
                      title: "Mobility Enhancement",
                      text: "Designed to support flexibility and comfortable movement.",
                    },
                  ].map((card) => (
                    <div
                      key={card.title}
                      className="rounded-[24px] bg-white/60 p-6 ring-1 ring-sky-200/60 shadow-soft-xl backdrop-blur-xl"
                    >
                      <div className="text-sm font-semibold text-slate-900">{card.title}</div>
                      <div className="mt-2 text-sm leading-relaxed text-slate-600">{card.text}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Container>
        </section>

        <section ref={(node) => { journeyRef.current = node; }} className="py-14 sm:py-20">
          <Container>
            <div className="text-center">
              <div className="text-h2 text-slate-900">
                <RevealWords text="This is what your OA treatment journey could look like" active={journeyInView} />
              </div>
            </div>

            <div className="mx-auto mt-10 max-w-6xl">
              <div className="hidden items-center justify-between gap-6 lg:flex">
                <div className="text-sm font-semibold text-slate-900">Mild OA</div>
                <div className="h-px flex-1 bg-slate-200" />
                <div className="text-sm font-semibold text-slate-900">Disease Progression</div>
                <div className="h-px flex-1 bg-slate-200" />
                <div className="text-sm font-semibold text-slate-900">Severe OA</div>
              </div>

              <div className="mt-10 grid gap-10 md:grid-cols-2 lg:grid-cols-5 lg:gap-0">
                {journey.map((j, idx) => (
                  <div
                    key={j.title}
                    className={cn(
                      "border-t border-slate-200 pt-8 transition-all duration-700 ease-out lg:border-t-0 lg:border-l lg:px-6 lg:pt-0 lg:first:border-l-0 lg:first:pl-0 lg:last:pr-0",
                      journeyInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
                    )}
                    style={{ transitionDelay: `${idx * 90}ms` }}
                  >
                    <div className="relative mx-auto h-44 w-44 overflow-hidden rounded-full bg-white ring-1 ring-sky-100 shadow-soft-xl sm:h-48 sm:w-48">
                      {"image" in j && j.image ? (
                        <img
                          src={j.image}
                          alt={`${j.title} illustration`}
                          className="h-full w-full object-cover"
                          decoding="async"
                          loading="lazy"
                        />
                      ) : (
                        <div className="h-full w-full bg-[radial-gradient(circle_at_30%_20%,rgba(56,189,248,0.20),transparent_55%)]" />
                      )}

                    </div>
                    <div className="mt-10 text-center text-base font-semibold text-sky-700">{j.title}</div>
                    <div className="mt-2 text-center text-sm leading-relaxed text-slate-600">{j.text}</div>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>

        <section className="bg-sky-50/70 py-14 sm:py-20">
          <Container>
            <div className="grid items-stretch gap-10 lg:grid-cols-2">
              <button
                type="button"
                className="flex h-full items-center justify-center overflow-hidden border border-slate-200 bg-sky-100/70"
                onClick={() => setPostPreviewOpen(true)}
              >
                <img
                  src={postInjectionImage}
                  alt="Post injection precautions"
                  className="h-full w-full object-contain"
                  decoding="async"
                  loading="eager"
                  fetchPriority="high"
                />
              </button>

              <div className="h-full">
                <div className="font-display text-3xl font-semibold tracking-[-0.03em] text-sky-700 sm:text-4xl">
                  Post-injection care precautions
                </div>
                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-sky-700/70">
                  Follow your doctor’s instructions. These are general do’s and don’ts to help protect the treated area and support recovery.
                </p>

                <div className="mt-8 space-y-10">
                  <div className="border-t border-slate-200 pt-8">
                    <div className="text-sm font-semibold text-sky-800">0–3 days</div>
                    <div className="mt-5 grid gap-8 sm:grid-cols-2">
                      <div>
                        <div className="text-sm font-semibold text-emerald-800">Do’s</div>
                        <div className="mt-3 space-y-2 text-sm text-slate-700">
                          {[
                            "Rest for 24 hours (except washroom breaks)",
                            "Use only a cold pack if needed",
                            "Take a lukewarm bath after 24 hours",
                            "Stay hydrated and eat healthy",
                          ].map((x) => (
                            <div key={x} className="flex items-start gap-3">
                              <div className="mt-1.5 h-2 w-2 flex-none rounded-full bg-emerald-600" />
                              <div className="min-w-0">{x}</div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <div className="text-sm font-semibold text-rose-800">Don’ts</div>
                        <div className="mt-3 space-y-2 text-sm text-slate-700">
                          {[
                            "Avoid overstraining/weight-bearing early",
                            "Do not take medicines unless prescribed",
                            "Avoid massage or hot pack on the area",
                            "Avoid very hot baths",
                          ].map((x) => (
                            <div key={x} className="flex items-start gap-3">
                              <div className="mt-1.5 h-2 w-2 flex-none rounded-full bg-rose-600" />
                              <div className="min-w-0">{x}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-slate-200 pt-8">
                    <div className="text-sm font-semibold text-sky-800">3–14 days</div>
                    <div className="mt-5 grid gap-8 sm:grid-cols-2">
                      <div>
                        <div className="text-sm font-semibold text-emerald-800">Do’s</div>
                        <div className="mt-3 space-y-2 text-sm text-slate-700">
                          {["Gradually return to normal activities", "Follow rehab plan recommended by your doctor"].map((x) => (
                            <div key={x} className="flex items-start gap-3">
                              <div className="mt-1.5 h-2 w-2 flex-none rounded-full bg-emerald-600" />
                              <div className="min-w-0">{x}</div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <div className="text-sm font-semibold text-rose-800">Don’ts</div>
                        <div className="mt-3 space-y-2 text-sm text-slate-700">
                          {["Avoid smoking and alcohol (first 7 days)", "Avoid aggressive exercise unless advised"].map((x) => (
                            <div key={x} className="flex items-start gap-3">
                              <div className="mt-1.5 h-2 w-2 flex-none rounded-full bg-rose-600" />
                              <div className="min-w-0">{x}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 border-l-4 border-sky-200 pl-4 text-sm text-slate-700">
                      If you have severe swelling, fever, or worsening pain, contact your doctor immediately.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {postPreviewOpen ? (
          <div
            className="fixed inset-0 z-50 grid place-items-center bg-slate-950/70 px-4 py-6"
            onClick={() => setPostPreviewOpen(false)}
          >
            <div className="max-h-[92vh] max-w-[95vw] overflow-hidden rounded-2xl bg-sky-100/70 shadow-soft-xl">
              <img
                src={postInjectionImage}
                alt="Post injection precautions"
                className="max-h-[92vh] w-auto max-w-[95vw] object-contain"
                decoding="async"
                loading="eager"
              />
            </div>
          </div>
        ) : null}

        <section id="assessment" className="bg-sky-50/60 py-14 sm:py-20">
          <Container>
            <div className="text-center">
              <div className="text-[11px] font-semibold tracking-[0.32em] text-sky-700/80">SELF-ASSESSMENT</div>
              <div className="mt-5 font-display text-4xl font-semibold tracking-[-0.03em] text-slate-900 sm:text-6xl">
                Understand your <span className="text-sky-700">knee health</span>.
              </div>
              <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-600">A 4-step quiz. Private. Takes under 2 minutes.</p>
            </div>

            <div className="mx-auto mt-10 max-w-5xl border border-slate-200 bg-white px-6 py-8 sm:px-10 sm:py-10">
              {result ? (
                <div className="text-center">
                  <div className="text-[11px] font-semibold tracking-[0.32em] text-sky-700/80">RESULT</div>
                  <div className="mt-4 font-display text-4xl font-semibold tracking-[-0.03em] text-slate-900 sm:text-5xl">
                    Assessment complete
                  </div>
                  <div className="mt-6 text-sm text-slate-600">Your score</div>
                  <div className="mt-2 font-display text-6xl font-semibold tracking-[-0.04em] text-sky-700 sm:text-7xl">
                    {result.score}
                    <span className="text-2xl text-slate-400">/{result.max}</span>
                  </div>
                  <div className="mt-4 inline-flex items-center rounded-full bg-sky-50 px-5 py-2 text-sm font-semibold text-sky-800 ring-1 ring-sky-100">
                    Risk level: {result.label}
                  </div>
                  <div className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-slate-600">
                    This result is a quick screening indicator. For medical decisions, consult an orthopedic specialist.
                  </div>
                  <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                    <Button onClick={reset}>Start again</Button>
                    <Button variant="secondary" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                      Back to top
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-600">
                    <div>STEP {step} / {totalSteps}</div>
                    <div>{percent}%</div>
                  </div>
                  <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-slate-100">
                    <div className="h-full bg-gradient-to-r from-sky-700 to-sky-400" style={{ width: `${percent}%` }} />
                  </div>

                  {step === 1 ? (
                    <div className="mt-10">
                      <div className="text-h2 text-slate-900">
                        How often do you experience knee pain?
                      </div>
                      <div className="mt-6 grid gap-4">
                        {["Daily", "Several times a week", "Occasionally", "Rarely"].map((opt) => (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => {
                              setFrequency(opt);
                              setErrors((e) => ({ ...e, frequency: "" }));
                            }}
                            className={[
                              "w-full rounded-2xl border px-6 py-5 text-left text-base font-medium transition-colors",
                              frequency === opt
                                ? "border-sky-400 bg-sky-50 text-slate-900"
                                : "border-slate-200 bg-white text-slate-800 hover:border-sky-200",
                            ].join(" ")}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                      {errors.frequency ? <div className="mt-3 text-xs text-rose-600">{errors.frequency}</div> : null}
                    </div>
                  ) : null}

                  {step === 2 ? (
                    <div className="mt-10">
                      <div className="text-h2 text-slate-900">
                        Pain intensity
                      </div>
                      <div className="mt-1 text-sm text-slate-600">0 = none, 10 = severe</div>

                      <div className="mt-10 text-center font-display text-7xl font-semibold tracking-[-0.04em] text-sky-700">
                        {pain}
                      </div>

                      <div className="mt-8">
                        <input
                          type="range"
                          min={0}
                          max={10}
                          value={pain}
                          onChange={(e) => setPain(Number(e.target.value))}
                          className="w-full accent-sky-700"
                        />
                        <div className="mt-2 flex items-center justify-between text-sm text-slate-600">
                          <div>Mild</div>
                          <div>Severe</div>
                        </div>
                      </div>
                    </div>
                  ) : null}

                  {step === 3 ? (
                    <div className="mt-10">
                      <div className="text-h2 text-slate-900">
                        Joint stiffness?
                      </div>
                      <div className="mt-5 grid gap-4 sm:grid-cols-2">
                        {["None", "Mild", "Moderate", "Severe"].map((opt) => (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => {
                              setStiffness(opt);
                              setErrors((e) => ({ ...e, stiffness: "" }));
                            }}
                            className={[
                              "rounded-2xl border px-6 py-4 text-center text-sm font-semibold transition-colors",
                              stiffness === opt
                                ? "border-sky-400 bg-sky-50 text-slate-900"
                                : "border-slate-200 bg-white text-slate-800 hover:border-sky-200",
                            ].join(" ")}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                      {errors.stiffness ? <div className="mt-3 text-xs text-rose-600">{errors.stiffness}</div> : null}

                      <div className="mt-10 text-h2 text-slate-900">
                        Swelling around the joint?
                      </div>
                      <div className="mt-5 grid gap-4 sm:grid-cols-2">
                        {["None", "Occasional", "Frequent", "Constant"].map((opt) => (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => {
                              setSwelling(opt);
                              setErrors((e) => ({ ...e, swelling: "" }));
                            }}
                            className={[
                              "rounded-2xl border px-6 py-4 text-center text-sm font-semibold transition-colors",
                              swelling === opt
                                ? "border-sky-400 bg-sky-50 text-slate-900"
                                : "border-slate-200 bg-white text-slate-800 hover:border-sky-200",
                            ].join(" ")}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                      {errors.swelling ? <div className="mt-3 text-xs text-rose-600">{errors.swelling}</div> : null}
                    </div>
                  ) : null}

                  {step === 4 ? (
                    <div className="mt-10">
                      <div className="text-h2 text-slate-900">
                        Cracking sounds when moving?
                      </div>
                      <div className="mt-5 grid gap-4 sm:grid-cols-2">
                        {["No", "Sometimes", "Often", "Always"].map((opt) => (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => {
                              setCracking(opt);
                              setErrors((e) => ({ ...e, cracking: "" }));
                            }}
                            className={[
                              "rounded-2xl border px-6 py-4 text-center text-sm font-semibold transition-colors",
                              cracking === opt
                                ? "border-sky-400 bg-sky-50 text-slate-900"
                                : "border-slate-200 bg-white text-slate-800 hover:border-sky-200",
                            ].join(" ")}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                      {errors.cracking ? <div className="mt-3 text-xs text-rose-600">{errors.cracking}</div> : null}

                      <div className="mt-8 border-t border-slate-200 pt-6">
                        <div className="text-sm text-slate-600">Tell us a bit about you so we can share your score.</div>
                        <div className="mt-5 grid gap-4 sm:grid-cols-2">
                          <div>
                            <input
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              placeholder="Name"
                              className="w-full rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm outline-none ring-sky-200 focus:ring-2"
                            />
                            {errors.name ? <div className="mt-2 text-xs text-rose-600">{errors.name}</div> : null}
                          </div>
                          <div>
                            <input
                              value={age}
                              onChange={(e) => setAge(e.target.value)}
                              placeholder="Age"
                              inputMode="numeric"
                              className="w-full rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm outline-none ring-sky-200 focus:ring-2"
                            />
                            {errors.age ? <div className="mt-2 text-xs text-rose-600">{errors.age}</div> : null}
                          </div>
                        </div>
                        <div className="mt-4">
                          <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                            inputMode="email"
                            className="w-full rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm outline-none ring-sky-200 focus:ring-2"
                          />
                          {errors.email ? <div className="mt-2 text-xs text-rose-600">{errors.email}</div> : null}
                        </div>
                      </div>
                    </div>
                  ) : null}

                  <div className="mt-10 flex items-center justify-between">
                    <Button variant="secondary" onClick={goBack} disabled={step === 1}>
                      Back
                    </Button>
                    {step === 4 ? (
                      <Button onClick={submit}>
                        See my result <ArrowRight className="h-4 w-4" />
                      </Button>
                    ) : (
                      <Button onClick={goNext}>
                        Next <ArrowRight className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </>
              )}
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </div>
  );
}
