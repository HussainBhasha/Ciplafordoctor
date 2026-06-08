import MarketingNavbar from "@/components/layout/MarketingNavbar";
import Footer from "@/components/layout/Footer";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import stemcellImage from "@/assets/stemcell.png";
import doctorLandingImage from "@/assets/doctor landing page.png";
import cartilageDegenerationImage from "@/assets/Cartilage Degeneration.png";
import inflammatoryChangesImage from "@/assets/Inflammatory Changes.png";
import mobilityChallengesImage from "@/assets/Mobility Challenges.png";
import kneeVsOaImage from "@/assets/knee vs OA.png";
import orthopaedicRegenerationImage from "@/assets/Orthopaedic Regeneration.png";
import mechanismIllustrationImage from "@/assets/mechanism illustration.png";
import advancedCellularTherapyImage from "@/assets/Advanced Cellular Therapy.png";
import clinicalTrialsImage from "@/assets/Clinical Trials.png";
import safetyProfileImage from "@/assets/Safety Profile.png";
import patientOutcomesImage from "@/assets/Patient Outcomes.png";
import scientificPublicationsImage from "@/assets/scientific publications.png";
import ciplobottleImage from "@/assets/ciplobottle.png";
import { Activity, ArrowRight, ChevronDown, Droplet, Pill, Stethoscope } from "lucide-react";
import { useEffect, useRef, useState } from "react";
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

function PlaceholderImage({
  label,
  className,
  src,
  imgClassName,
}: {
  label: string;
  className?: string;
  src?: string;
  imgClassName?: string;
}) {
  return (
    <div
      role="img"
      aria-label={label}
      className={cn(
        src
          ? "relative overflow-hidden rounded-[28px]"
          : "relative overflow-hidden rounded-[28px] bg-white/80 ring-1 ring-sky-200/60 shadow-soft-xl backdrop-blur",
        className,
      )}
    >
      {src ? (
        <img
          src={src}
          alt={label}
          className={cn("h-full w-full", imgClassName ?? "object-contain")}
          decoding="async"
          loading="lazy"
        />
      ) : (
        <>
          <div className="absolute inset-0 bg-[radial-gradient(900px_circle_at_20%_20%,rgba(56,189,248,0.18),transparent_55%)]" />
          <div className="absolute inset-0 opacity-60 hero-dots" />
          <div className="relative grid h-full w-full place-items-center px-6 text-center text-xs font-semibold tracking-[0.18em] text-sky-700/80">
            {label}
          </div>
        </>
      )}
    </div>
  );
}

export default function Doctor() {
  const { ref: heroRef, inView: heroInView } = useInView({ threshold: 0.2, rootMargin: "0px 0px -10% 0px" });
  const { ref: overviewRef, inView: overviewInView } = useInView({ threshold: 0.2, rootMargin: "0px 0px -10% 0px" });
  const { ref: gapRef, inView: gapInView } = useInView({ threshold: 0.2, rootMargin: "0px 0px -10% 0px" });
  const { ref: orthoRef, inView: orthoInView } = useInView({ threshold: 0.2, rootMargin: "0px 0px -10% 0px" });
  const { ref: mscRef, inView: mscInView } = useInView({ threshold: 0.18, rootMargin: "0px 0px -10% 0px" });
  const { ref: moaRef, inView: moaInView } = useInView({ threshold: 0.18, rootMargin: "0px 0px -10% 0px" });
  const { ref: techRef, inView: techInView } = useInView({ threshold: 0.18, rootMargin: "0px 0px -10% 0px" });
  const { ref: evidenceRef, inView: evidenceInView } = useInView({ threshold: 0.18, rootMargin: "0px 0px -10% 0px" });
  const { ref: resourcesRef, inView: resourcesInView } = useInView({ threshold: 0.18, rootMargin: "0px 0px -10% 0px" });
  const { ref: ctaRef, inView: ctaInView } = useInView({ threshold: 0.18, rootMargin: "0px 0px -10% 0px" });
  const [openTreatment, setOpenTreatment] = useState<string | null>(null);
  const [openMoaStep, setOpenMoaStep] = useState<string | null>(null);
  const [overviewStep, setOverviewStep] = useState(0);
  const [evidenceStep, setEvidenceStep] = useState(0);
  const [resourcesStep, setResourcesStep] = useState(0);

  const heroBgRef = useRef<HTMLImageElement | null>(null);
  const mscVisualRef = useRef<HTMLDivElement | null>(null);
  const moaVisualRef = useRef<HTMLDivElement | null>(null);
  const treatmentVisualRef = useRef<HTMLDivElement | null>(null);
  const pageRef = useRef<HTMLDivElement | null>(null);
  const overviewScrollRef = useRef<HTMLDivElement | null>(null);
  const evidenceScrollRef = useRef<HTMLDivElement | null>(null);
  const resourcesScrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    if (prefersReduced) return;

    gsap.registerPlugin(ScrollTrigger);

    const heroEl = heroBgRef.current;
    if (!heroEl) return;

    const ctx = gsap.context(() => {
      gsap.to(heroEl, {
        yPercent: 6,
        ease: "none",
        scrollTrigger: {
          trigger: heroEl,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, heroEl);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const prefersReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    if (prefersReduced) return;

    gsap.registerPlugin(ScrollTrigger);

    const mscEl = mscVisualRef.current;
    if (!mscEl) return;

    const ctx = gsap.context(() => {
      const sectionEl = mscRef.current;
      gsap.set(mscEl, { transformOrigin: "50% 50%" });
      if (sectionEl) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionEl,
            start: "top 90%",
            end: "bottom 20%",
            scrub: 1.2,
          },
        });

        tl.fromTo(
          mscEl,
          { x: -780, y: -140, opacity: 0, scale: 0.84 },
          { x: 0, y: 0, opacity: 1, scale: 1, ease: "none", duration: 0.55 },
        ).to(mscEl, { x: -780, y: -140, opacity: 0, scale: 0.84, ease: "none", duration: 0.45 });
      }

      gsap.to(mscEl, {
        rotation: 360,
        duration: 40,
        repeat: -1,
        ease: "none",
      });
    }, mscEl);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const prefersReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    if (prefersReduced) return;

    gsap.registerPlugin(ScrollTrigger);

    const moaEl = moaVisualRef.current;
    if (!moaEl) return;

    const ctx = gsap.context(() => {
      gsap.to(moaEl, {
        y: -18,
        ease: "none",
        scrollTrigger: {
          trigger: moaEl,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, moaEl);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const prefersReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    if (prefersReduced) return;

    gsap.registerPlugin(ScrollTrigger);

    const visualEl = treatmentVisualRef.current;
    if (!visualEl) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        visualEl,
        { opacity: 0, y: 18, scale: 0.94 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: visualEl,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      );

      gsap.to(visualEl, {
        y: -18,
        scale: 1.03,
        ease: "none",
        scrollTrigger: {
          trigger: visualEl,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, visualEl);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const prefersReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    if (prefersReduced) return;

    gsap.registerPlugin(ScrollTrigger);

    const scope = pageRef.current;
    if (!scope) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".js-scroll-card");
      if (!cards.length) return;

      ScrollTrigger.batch(cards, {
        start: "top 85%",
        onEnter: (batch) => {
          gsap.fromTo(
            batch,
            { autoAlpha: 0, y: 22 },
            { autoAlpha: 1, y: 0, duration: 0.7, ease: "power3.out", stagger: 0.12, overwrite: true },
          );
        },
        onEnterBack: (batch) => {
          gsap.fromTo(
            batch,
            { autoAlpha: 0, y: 18 },
            { autoAlpha: 1, y: 0, duration: 0.6, ease: "power3.out", stagger: 0.1, overwrite: true },
          );
        },
      });
    }, scope);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const el = overviewScrollRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const raw = (vh * 0.6 - rect.top) / Math.max(1, rect.height);
      const t = Math.max(0, Math.min(1, raw));
      let next = 0;
      if (t > 0.18) next = 1;
      if (t > 0.52) next = 2;
      if (t > 0.82) next = 3;
      setOverviewStep(next);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const el = evidenceScrollRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const raw = (vh * 0.6 - rect.top) / Math.max(1, rect.height);
      const t = Math.max(0, Math.min(1, raw));
      let next = 0;
      if (t > 0.18) next = 1;
      if (t > 0.52) next = 2;
      if (t > 0.7) next = 3;
      setEvidenceStep(next);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const el = resourcesScrollRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const raw = (vh * 0.6 - rect.top) / Math.max(1, rect.height);
      const t = Math.max(0, Math.min(1, raw));
      let next = 0;
      if (t > 0.12) next = 1;
      if (t > 0.35) next = 2;
      if (t > 0.62) next = 3;
      if (t > 0.86) next = 4;
      setResourcesStep(next);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div ref={pageRef} className="min-h-dvh bg-[#EAF7FF]">
      <MarketingNavbar />
      <main className="pt-20">
        <section
          ref={(node) => { heroRef.current = node; }}
          className="relative h-[calc(100dvh-5rem)] overflow-hidden"
        >
          <img
            ref={heroBgRef}
            src={doctorLandingImage}
            alt=""
            className="pointer-events-none absolute inset-0 h-full w-full object-cover object-right will-change-transform sm:object-center"
            decoding="async"
            loading="eager"
            fetchPriority="high"
            aria-hidden="true"
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#EAF7FF] to-transparent" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white/70 via-white/30 to-transparent" />
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-[12%] top-[26%] h-2 w-2 rounded-full bg-sky-400/35 blur-[1px] node-pulse" />
            <div className="absolute left-[22%] top-[64%] h-1.5 w-1.5 rounded-full bg-sky-300/30 blur-[1px] node-pulse" />
            <div className="absolute right-[18%] top-[22%] h-2.5 w-2.5 rounded-full bg-sky-300/30 blur-[1px] node-pulse" />
            <div className="absolute right-[10%] top-[58%] h-2 w-2 rounded-full bg-sky-400/30 blur-[1px] node-pulse" />
          </div>

          <Container>
            <div className="mx-auto flex h-[calc(100dvh-5rem)] max-w-6xl items-center">
              <div className="relative max-w-xl py-12 sm:py-16">
                <div className={cn("text-[11px] font-semibold tracking-[0.32em] text-sky-700/90 reveal-fade", heroInView && "reveal-fade-visible")}>
                  FOR DOCTORS
                </div>
                <div className="mt-5 font-display font-semibold tracking-[-0.03em] leading-[1.05] text-slate-900 drop-shadow-[0_10px_30px_rgba(255,255,255,0.85)] text-[clamp(2.25rem,5.2vw,4.5rem)]">
                  <RevealWords text="Advancing Knee Care Through Regenerative Science" active={heroInView} />
                </div>
                <div className={cn("mt-4 font-semibold text-sky-700 drop-shadow-[0_10px_26px_rgba(255,255,255,0.8)] reveal-fade text-[clamp(1rem,1.5vw,1.25rem)]", heroInView && "reveal-fade-visible")}>
                  Evidence-based cellular therapy solutions for Knee Osteoarthritis management
                </div>
                <p className={cn("mt-4 leading-relaxed text-slate-700 drop-shadow-[0_10px_24px_rgba(255,255,255,0.75)] reveal-fade text-[clamp(0.95rem,1.1vw,1.05rem)]", heroInView && "reveal-fade-visible")}>
                  Explore the science behind Mesenchymal Stem Cells, clinical evidence, and regenerative approaches designed to support improved
                  joint health.
                </p>

                <div className={cn("mt-8 flex flex-wrap gap-3 reveal-fade", heroInView && "reveal-fade-visible")}>
                  <Button
                    type="button"
                    onClick={() => document.getElementById("science")?.scrollIntoView({ behavior: "smooth", block: "start" })}
                  >
                    Explore Science <ArrowRight className="h-4 w-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => document.getElementById("evidence")?.scrollIntoView({ behavior: "smooth", block: "start" })}
                  >
                    Clinical Evidence
                  </Button>
                </div>
              </div>
            </div>
          </Container>
        </section>

        <section ref={(node) => { overviewRef.current = node; }} className="py-14 sm:py-20">
          <Container>
            <div className="mx-auto max-w-6xl">
              <div className="max-w-3xl">
                <div className="font-display text-4xl font-semibold tracking-[-0.03em] text-slate-900 sm:text-5xl">
                  <RevealWords text="Understanding Knee Osteoarthritis" active={overviewInView} />
                </div>
                <p className={cn("mt-4 text-sm leading-relaxed text-slate-600 sm:text-base reveal-fade", overviewInView && "reveal-fade-visible")}>
                  Knee Osteoarthritis is a chronic progressive joint condition where cartilage gradually deteriorates, leading to pain,
                  stiffness, inflammation and reduced mobility.
                </p>
              </div>

              <div ref={overviewScrollRef} className="mt-10 grid gap-6 md:grid-cols-3">
                {[
                  {
                    title: "Cartilage Degeneration",
                    text: "Progressive breakdown of articular cartilage affects smooth joint movement.",
                    placeholder: "Knee cartilage anatomy image",
                    image: cartilageDegenerationImage,
                  },
                  {
                    title: "Inflammatory Changes",
                    text: "Chronic inflammation contributes to joint damage progression.",
                    placeholder: "Inflammation cell illustration",
                    image: inflammatoryChangesImage,
                  },
                  {
                    title: "Mobility Challenges",
                    text: "Knee OA affects daily activities and quality of life.",
                    placeholder: "Patient movement image",
                    image: mobilityChallengesImage,
                  },
                ].map((card, idx) => (
                  <div
                    key={card.title}
                    className={cn(
                      "rounded-[28px] bg-white/70 p-7 ring-1 ring-sky-200/60 shadow-soft-xl backdrop-blur-xl transition-all duration-700 ease-out",
                      overviewInView && overviewStep >= idx + 1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none",
                    )}
                    style={{ transitionDelay: `${idx * 90}ms` }}
                  >
                    <div className="text-base font-semibold text-slate-900">{card.title}</div>
                    <div className="mt-2 text-sm leading-relaxed text-slate-600">{card.text}</div>
                    <div className="mt-6 overflow-hidden rounded-[22px]">
                      <img
                        src={card.image}
                        alt={card.placeholder}
                        className="h-[220px] w-full object-contain sm:h-[240px]"
                        decoding="async"
                        loading="lazy"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>

        <section ref={(node) => { gapRef.current = node; }} className="relative overflow-hidden bg-sky-50/60 py-14 sm:py-20">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_circle_at_20%_20%,rgba(56,189,248,0.18),transparent_55%)]" />
          <Container>
            <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_520px] lg:items-start">
              <div>
                <div className="font-display text-4xl font-semibold tracking-[-0.03em] text-slate-900 sm:text-5xl">
                  <RevealWords text="Current Treatment Landscape" active={gapInView} />
                </div>

                <div className="mt-8 grid gap-4 max-w-xl">
                  {[
                    {
                      key: "Lifestyle Management",
                      icon: "🏃",
                      iconLabel: "Lifestyle Optimization",
                      text:
                        "Lifestyle management focuses on improving knee health through weight control, physical activity, physiotherapy and strengthening exercises. These approaches help reduce stress on the joint, improve mobility and support daily function.",
                    },
                    {
                      key: "Pain Management",
                      icon: "💊",
                      iconLabel: "Symptom Management",
                      text:
                        "Pain management approaches aim to reduce discomfort and improve quality of life using medications, activity modification and supportive therapies. These methods primarily focus on symptom control.",
                    },
                    {
                      key: "Injections",
                      icon: "💉",
                      iconLabel: "Injection Therapy",
                      text:
                        "Injection-based treatments including corticosteroids, viscosupplementation and biological therapies may provide temporary relief by targeting pain and inflammation within the knee joint.",
                    },
                    {
                      key: "Surgical Intervention",
                      icon: "🦴",
                      iconLabel: "Surgical Approach",
                      text:
                        "Surgical procedures such as knee replacement may be considered in advanced osteoarthritis cases when conservative treatments no longer provide sufficient improvement.",
                    },
                  ].map((item, idx) => {
                    const isOpen = openTreatment === item.key;
                    const contentId = `treatment-${idx}`;
                    return (
                      <div
                        key={item.key}
                        className={cn(
                          "rounded-[22px] bg-gradient-to-br from-white/80 to-sky-50/30 ring-1 ring-sky-200/60 shadow-soft-xl backdrop-blur-xl transition-all duration-500 ease-out hover:-translate-y-0.5 hover:ring-sky-400/70 hover:shadow-[0_22px_70px_rgba(2,132,199,0.18)]",
                          isOpen && "from-white/90 to-sky-100/35 ring-sky-400/70 shadow-[0_22px_85px_rgba(56,189,248,0.24)]",
                          "js-scroll-card",
                          gapInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
                        )}
                        style={{ transitionDelay: `${idx * 90}ms` }}
                      >
                        <button
                          type="button"
                          aria-expanded={isOpen}
                          aria-controls={contentId}
                          className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left"
                          onClick={() => setOpenTreatment((v) => (v === item.key ? null : item.key))}
                        >
                          <div className="flex min-w-0 items-center gap-3">
                            <div className="grid h-9 w-9 flex-none place-items-center rounded-xl bg-sky-50 text-base ring-1 ring-sky-100 text-sky-800">
                              <span aria-label={item.iconLabel} role="img">
                                {item.icon}
                              </span>
                            </div>
                            <div className="min-w-0">
                              <div className="truncate text-sm font-semibold text-slate-900">{item.key}</div>
                            </div>
                          </div>
                          <div className="grid h-10 w-10 flex-none place-items-center rounded-full bg-white/70 ring-1 ring-sky-200/70 text-sky-700 shadow-soft-xl transition active:scale-95">
                            <ChevronDown className={cn("h-5 w-5 transition-transform duration-300", isOpen && "rotate-180")} />
                          </div>
                        </button>

                        <div
                          className={cn(
                            "grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                            isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                          )}
                        >
                          <div className="overflow-hidden">
                            <div
                              id={contentId}
                              className={cn(
                                "mx-6 mb-6 rounded-[18px] bg-gradient-to-br from-white/65 to-sky-50/50 p-5 ring-1 ring-sky-100/80 shadow-[0_16px_45px_rgba(2,132,199,0.10)] backdrop-blur-xl transition-opacity duration-300",
                                isOpen ? "opacity-100" : "opacity-0",
                              )}
                            >
                              <div className="flex items-start gap-3">
                                <div className="mt-0.5 grid h-8 w-8 flex-none place-items-center rounded-xl bg-white/70 text-base ring-1 ring-sky-100 text-sky-800">
                                  <span aria-hidden="true">{item.icon}</span>
                                </div>
                                <div className="text-sm leading-relaxed text-slate-600">{item.text}</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div
                className={cn(
                  "transition-all duration-700 ease-out lg:self-start lg:mt-20",
                  gapInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
                )}
              >
                <div className="flex items-center justify-center">
                  <div ref={treatmentVisualRef} className="flex flex-col items-center">
                    <div className="relative">
                      <div className="pointer-events-none absolute -inset-10 rounded-full bg-sky-400/18 blur-3xl glow-pulse" />
                      <div className="h-[260px] w-[260px] overflow-hidden rounded-full sm:h-[320px] sm:w-[320px] lg:h-[420px] lg:w-[420px]">
                        <img
                          src={kneeVsOaImage}
                          alt="Healthy knee vs damaged knee comparison"
                          className="h-full w-full select-none object-cover animate-floaty"
                          decoding="async"
                          loading="lazy"
                        />
                      </div>
                      <div className="pointer-events-none absolute inset-0">
                        <div className="absolute left-[18%] top-[20%] h-1.5 w-1.5 rounded-full bg-sky-400/60 blur-[1px] animate-floaty" />
                        <div className="absolute left-[62%] top-[18%] h-2 w-2 rounded-full bg-sky-300/55 blur-[1px] animate-floaty" />
                        <div className="absolute left-[72%] top-[58%] h-1.5 w-1.5 rounded-full bg-sky-500/55 blur-[1px] animate-floaty" />
                        <div className="absolute left-[34%] top-[70%] h-2 w-2 rounded-full bg-sky-400/55 blur-[1px] animate-floaty" />
                      </div>
                    </div>
                    <div className="mt-4 max-w-xs text-center text-sm font-semibold text-sky-700/90">
                      From symptom management to advanced regenerative approaches
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>

        <section ref={(node) => { orthoRef.current = node; }} className="py-14 sm:py-20">
          <Container>
            <div className="mx-auto grid max-w-6xl gap-10 lg:min-h-[70vh] lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
              <div className={cn("transition-all duration-700 ease-out", orthoInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4")}>
                <div className="flex items-center justify-center">
                  <div className="flex w-full max-w-[920px] aspect-[16/9] items-center justify-center overflow-hidden rounded-[32px]">
                    <img
                      src={orthopaedicRegenerationImage}
                      alt="Regenerative medicine / stem cell"
                      className="h-full w-full object-contain rounded-[32px]"
                      decoding="async"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>

              <div>
                <div className="font-display text-4xl font-semibold tracking-[-0.03em] text-slate-900 sm:text-5xl">
                  <RevealWords text="The Future of Orthopaedic Regeneration" active={orthoInView} />
                </div>
                <p className={cn("mt-4 text-sm leading-relaxed text-slate-600 sm:text-base reveal-fade", orthoInView && "reveal-fade-visible")}>
                  Orthobiologics use biological substances and cellular therapies to support tissue repair, healing and restoration.
                </p>

                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  {[
                    { title: "Blood Derived Therapies", items: ["PRP", "GFC", "ACS"] },
                    { title: "Cell Based Therapies", items: ["Mesenchymal Stem Cells", "Tissue regeneration"] },
                  ].map((card, idx) => (
                    <div
                      key={card.title}
                      className={cn(
                        "rounded-[24px] bg-white/75 p-6 ring-1 ring-sky-300/70 shadow-[0_18px_60px_rgba(2,132,199,0.14)] backdrop-blur-xl transition-all duration-700 ease-out hover:-translate-y-0.5 hover:ring-sky-400/80 hover:shadow-[0_22px_70px_rgba(2,132,199,0.20)]",
                        "js-scroll-card",
                        orthoInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
                      )}
                      style={{ transitionDelay: `${idx * 90}ms` }}
                    >
                      <div className="text-sm font-semibold text-slate-900">{card.title}</div>
                      <div className="mt-3 space-y-2 text-sm text-slate-600">
                        {card.items.map((x) => (
                          <div key={x} className="flex items-start gap-3">
                            <div className="mt-1.5 h-2 w-2 flex-none rounded-full bg-sky-600" />
                            <div className="min-w-0">{x}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Container>
        </section>

        <section
          id="science"
          ref={(node) => { mscRef.current = node; }}
          className="relative overflow-hidden bg-sky-50/60 py-14 sm:py-20"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_circle_at_70%_30%,rgba(56,189,248,0.18),transparent_55%)]" />
          <div className="pointer-events-none absolute inset-0 opacity-70 hero-dots" />

          <Container>
            <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:items-center">
              <div>
                <div className="font-display text-4xl font-semibold tracking-[-0.03em] text-slate-900 sm:text-5xl">
                  <RevealWords text="Mesenchymal Stem Cells (MSCs)" active={mscInView} />
                </div>
                <p className={cn("mt-4 text-sm leading-relaxed text-slate-600 sm:text-base reveal-fade", mscInView && "reveal-fade-visible")}>
                  MSCs are unique cells with self-renewal ability, differentiation potential and immunomodulatory properties.
                </p>

                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  {[
                    { title: "🧬 Self Renewal", text: "Maintains cell population" },
                    { title: "🔬 Differentiation", text: "Supports tissue repair" },
                    { title: "🛡 Immunomodulation", text: "Helps regulate inflammatory response" },
                    { title: "🔥 Anti-inflammatory Action", text: "Supports inflammatory balance" },
                  ].map((x, idx) => (
                    <div
                      key={x.title}
                      className={cn(
                        "rounded-[24px] bg-white/70 p-6 ring-1 ring-sky-200/60 shadow-soft-xl backdrop-blur-xl transition-all duration-700 ease-out",
                        "js-scroll-card",
                        mscInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
                      )}
                      style={{ transitionDelay: `${idx * 90}ms` }}
                    >
                      <div className="text-sm font-semibold text-slate-900">{x.title}</div>
                      <div className="mt-2 text-sm leading-relaxed text-slate-600">{x.text}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div
                ref={mscVisualRef}
                className={cn(
                  "relative mx-auto max-w-[520px] will-change-transform",
                )}
              >
                <div className="absolute -inset-12 rounded-full bg-sky-400/15 blur-3xl glow-pulse" />
                <div className="relative">
                  <img
                    src={stemcellImage}
                    alt="3D Stem Cell Image"
                    className="mx-auto w-full max-w-[460px] select-none animate-floaty object-contain"
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
          </Container>
        </section>

        <section ref={(node) => { moaRef.current = node; }} className="py-14 sm:py-20">
          <Container>
            <div className="mx-auto max-w-6xl">
              <div className="font-display text-4xl font-semibold tracking-[-0.03em] text-slate-900 sm:text-5xl">
                <RevealWords text="How Stem Cells Support Knee Health" active={moaInView} />
              </div>

              <div className="mt-10 grid gap-10 lg:min-h-[70vh] lg:grid-cols-[1fr_720px] lg:items-center">
                <div className="grid max-w-xl gap-4">
                  {[
                    {
                      key: "stem-cells",
                      title: "Stem Cells",
                      icon: "🧬",
                      iconLabel: "Cell regeneration",
                      description:
                        "Mesenchymal Stem Cells (MSCs) are specialized cells with regenerative and immunomodulatory properties. They interact with the damaged joint environment and support the body's natural repair mechanisms.",
                    },
                    {
                      key: "reduce-inflammation",
                      title: "Reduce Inflammation",
                      icon: "🔥",
                      iconLabel: "Anti-inflammatory response",
                      description:
                        "Stem cells release biological signals that help regulate inflammatory responses. This may create a healthier environment inside the knee joint and support recovery.",
                    },
                    {
                      key: "support-cartilage",
                      title: "Support Cartilage Environment",
                      icon: "🦵",
                      iconLabel: "Cartilage protection",
                      description:
                        "MSCs help maintain a supportive joint environment by promoting beneficial cellular activity and protecting the cartilage surrounding the knee joint.",
                    },
                    {
                      key: "promote-tissue-repair",
                      title: "Promote Tissue Repair",
                      icon: "🔬",
                      iconLabel: "Tissue regeneration",
                      description:
                        "Stem cells communicate with surrounding tissues and release growth factors that support tissue maintenance and natural healing processes.",
                    },
                    {
                      key: "improve-joint-function",
                      title: "Improve Joint Function",
                      icon: "⚡",
                      iconLabel: "Improved mobility",
                      description:
                        "By supporting joint health and reducing inflammatory factors, regenerative approaches aim to improve mobility, comfort, and overall knee function.",
                    },
                  ].map((step, idx) => {
                    const isOpen = openMoaStep === step.key;
                    const contentId = `moa-step-${step.key}`;

                    return (
                      <div
                        key={step.key}
                        className={cn(
                          "rounded-[22px] bg-white/70 px-6 py-4 ring-1 ring-sky-200/60 shadow-soft-xl backdrop-blur-xl transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_22px_70px_rgba(2,132,199,0.16)]",
                          isOpen && "ring-sky-400/70 shadow-[0_22px_85px_rgba(56,189,248,0.25)]",
                          "js-scroll-card",
                          moaInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
                        )}
                        style={{ transitionDelay: `${idx * 90}ms` }}
                      >
                        <button
                          type="button"
                          aria-expanded={isOpen}
                          aria-controls={contentId}
                          onClick={() => setOpenMoaStep((v) => (v === step.key ? null : step.key))}
                          className="flex w-full items-center justify-between gap-4 text-left"
                        >
                          <div className="flex min-w-0 items-center gap-3">
                            <div className="grid h-9 w-9 flex-none place-items-center rounded-xl bg-sky-50 text-base ring-1 ring-sky-100 text-sky-800">
                              <span aria-label={step.iconLabel} role="img">
                                {step.icon}
                              </span>
                            </div>
                            <div className="min-w-0">
                              <div className="truncate text-sm font-semibold text-slate-900">{step.title}</div>
                            </div>
                          </div>
                          <ChevronDown className={cn("h-5 w-5 flex-none text-sky-700 transition-transform duration-300", isOpen && "rotate-180")} />
                        </button>

                        <div
                          className={cn(
                            "grid transition-[grid-template-rows] duration-500 ease-out",
                            isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                          )}
                        >
                          <div className="overflow-hidden">
                            <div
                              id={contentId}
                              className={cn(
                                "mt-4 rounded-[18px] bg-sky-50/70 p-4 ring-1 ring-sky-100 transition-opacity duration-300",
                                isOpen ? "opacity-100" : "opacity-0",
                              )}
                            >
                              <div className="text-sm leading-relaxed text-slate-600">{step.description}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className={cn("transition-all duration-700 ease-out", moaInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4")}>
                  <div className="flex items-center justify-center">
                    <div
                      ref={moaVisualRef}
                      className="relative flex w-full max-w-[920px] aspect-[16/9] items-center justify-center overflow-hidden rounded-[32px]"
                    >
                      <div className="pointer-events-none absolute -inset-10 rounded-full bg-sky-400/15 blur-3xl glow-pulse" />
                      <div className="pointer-events-none absolute inset-0">
                        <div className="absolute left-[12%] top-[26%] h-1.5 w-1.5 rounded-full bg-sky-400/55 blur-[1px] animate-floaty" />
                        <div className="absolute left-[40%] top-[18%] h-2 w-2 rounded-full bg-sky-300/45 blur-[1px] animate-floaty" />
                        <div className="absolute left-[70%] top-[34%] h-1.5 w-1.5 rounded-full bg-sky-500/50 blur-[1px] animate-floaty" />
                        <div className="absolute left-[58%] top-[72%] h-2 w-2 rounded-full bg-sky-400/45 blur-[1px] animate-floaty" />
                        <div className="absolute left-[22%] top-[78%] h-1.5 w-1.5 rounded-full bg-sky-300/45 blur-[1px] animate-floaty" />
                      </div>
                      <img
                        src={mechanismIllustrationImage}
                        alt="Stem cell mechanism illustration"
                        className="relative h-full w-full select-none object-contain animate-floaty rounded-[32px]"
                        decoding="async"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>

        <section ref={(node) => { techRef.current = node; }} className="relative overflow-hidden bg-sky-50/60 py-14 sm:py-20">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_circle_at_25%_20%,rgba(56,189,248,0.18),transparent_55%)]" />
          <Container>
            <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_680px] lg:items-center">
              <div>
                <div className="font-display text-4xl font-semibold tracking-[-0.03em] text-slate-900 sm:text-5xl">
                  <RevealWords text="Ciplostem — Advanced Cellular Therapy" active={techInView} />
                </div>
                <p className={cn("mt-4 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base reveal-fade", techInView && "reveal-fade-visible")}>
                  Ciplostem is an adult human bone marrow-derived, expanded, cultured and pooled allogenic mesenchymal stromal cell therapy.
                </p>

                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  {[
                    "Allogenic MSC Technology",
                    "Standardized Cell Preparation",
                    "GMP Manufacturing",
                    "Off-the-Shelf Availability",
                    "Clinical Development Support",
                  ].map((x, idx, arr) => (
                    <div
                      key={x}
                      className={cn(
                        "rounded-[24px] bg-gradient-to-br from-white/85 to-sky-50/35 p-6 ring-1 ring-sky-200/70 shadow-[0_18px_60px_rgba(2,132,199,0.12)] backdrop-blur-xl transition-all duration-500 ease-out hover:-translate-y-0.5 hover:ring-sky-400/80 hover:shadow-[0_22px_70px_rgba(2,132,199,0.18)]",
                        "js-scroll-card",
                        idx === arr.length - 1 && "sm:col-span-2 sm:mx-auto sm:max-w-[520px]",
                        techInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
                      )}
                      style={{ transitionDelay: `${idx * 70}ms` }}
                    >
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5 grid h-7 w-7 flex-none place-items-center rounded-full bg-sky-50 text-sky-700 ring-1 ring-sky-100">
                          ✓
                        </div>
                        <div className="text-sm font-semibold text-slate-900">{x}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className={cn("transition-all duration-700 ease-out", techInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4")}>
                <PlaceholderImage label="Advanced Cellular Therapy" src={advancedCellularTherapyImage} className="aspect-[16/9]" />
              </div>
            </div>
          </Container>
        </section>

        <section id="evidence" ref={(node) => { evidenceRef.current = node; }} className="py-14 sm:py-20">
          <Container>
            <div className="mx-auto max-w-6xl">
              <div className="font-display text-4xl font-semibold tracking-[-0.03em] text-slate-900 sm:text-5xl">
                <RevealWords text="Clinical Evidence & Research" active={evidenceInView} />
              </div>

              <div ref={evidenceScrollRef} className="mt-10 grid gap-6 md:grid-cols-3 md:items-stretch">
                {[
                  { title: "Clinical Trials", text: "Phase II and Phase III clinical evaluation", image: clinicalTrialsImage },
                  { title: "Safety Profile", text: "Clinical safety monitoring and evaluation", image: safetyProfileImage },
                  { title: "Patient Outcomes", text: "Assessment through pain, function and cartilage quality parameters", image: patientOutcomesImage },
                ].map((x, idx) => (
                  <div
                    key={x.title}
                    className={cn(
                      "flex h-full min-h-[420px] flex-col overflow-hidden rounded-[32px] bg-white/70 p-8 ring-1 ring-sky-200/70 shadow-soft-xl backdrop-blur-xl transition-all duration-700 ease-out sm:min-h-[480px]",
                      evidenceInView && evidenceStep >= idx + 1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none",
                    )}
                    style={{ transitionDelay: `${idx * 90}ms` }}
                  >
                    <div className="text-base font-semibold text-slate-900">{x.title}</div>
                    <div className="mt-2 text-sm leading-relaxed text-slate-600">{x.text}</div>
                    <div className="mt-6 -mx-8 -mb-8 h-[240px] sm:h-[290px]">
                      <img
                        src={x.image}
                        alt={x.title}
                        className="h-full w-full object-contain"
                        decoding="async"
                        loading="lazy"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>

        <section ref={(node) => { resourcesRef.current = node; }} className="bg-sky-50/60 py-14 sm:py-20">
          <Container>
            <div className="mx-auto max-w-6xl">
              <div className="font-display text-4xl font-semibold tracking-[-0.03em] text-slate-900 sm:text-5xl">
                <RevealWords text="Doctor Knowledge Center" active={resourcesInView} />
              </div>

              <div ref={resourcesScrollRef} className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-2">
                {[
                  { image: scientificPublicationsImage, label: "Scientific Publications" },
                  { image: clinicalTrialsImage, label: "Clinical Trial Data" },
                  { image: mechanismIllustrationImage, label: "Mechanism of Action" },
                  { image: ciplobottleImage, label: "Product Information" },
                ].map((x, idx) => (
                  <div
                    key={x.label}
                    className={cn(
                      "transition-all duration-700 ease-out",
                      resourcesInView && resourcesStep >= idx + 1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none",
                    )}
                    style={{ transitionDelay: `${idx * 90}ms` }}
                  >
                  <div className="text-center text-sm font-semibold text-slate-900">{x.label}</div>
                  <div
                    className={cn(
                      "mt-4 relative aspect-[16/9] overflow-hidden rounded-[22px]",
                      x.label === "Product Information" && "p-3",
                    )}
                  >
                      <img
                        src={x.image}
                        alt={x.label}
                        className={cn(
                          "absolute inset-0 h-full w-full",
                          x.label === "Product Information" ? "object-contain" : "object-cover",
                          x.label === "Scientific Publications" ? "object-[center_40%]" : "object-center",
                        )}
                        decoding="async"
                        loading="lazy"
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className={cn("mt-10 flex justify-center transition-all duration-700 ease-out", resourcesInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4")}>
                <Button type="button" className="px-8">
                  Download Scientific Information <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Container>
        </section>

        <section ref={(node) => { ctaRef.current = node; }} className="relative overflow-hidden py-14 sm:py-20">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1000px_circle_at_50%_0%,rgba(56,189,248,0.22),transparent_60%)]" />
          <Container>
            <div
              className={cn(
                "mx-auto max-w-6xl rounded-[36px] bg-white/70 p-10 ring-1 ring-sky-200/60 shadow-soft-xl backdrop-blur-xl transition-all duration-700 ease-out sm:p-14",
                "js-scroll-card",
                ctaInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
              )}
            >
              <div className="mx-auto max-w-3xl text-center">
                <div className="font-display text-4xl font-semibold tracking-[-0.03em] text-slate-900 sm:text-5xl">
                  <RevealWords text="Partnering With Doctors In The Future Of Regenerative Medicine" active={ctaInView} />
                </div>
                <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
                  Explore advanced cellular therapy approaches for the evolving management of knee osteoarthritis.
                </p>
                <div className="mt-8 flex justify-center">
                  <Button type="button">
                    Connect With Our Medical Team <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </div>
  );
}
