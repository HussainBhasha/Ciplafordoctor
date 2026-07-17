import { useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ChevronRight, ChevronDown } from "lucide-react";
import Container from "@/components/ui/Container";
import { Phase2VASChart, Phase2WOMACChart } from "@/components/charts/ClinicalGraphs1";
import { Phase2ICOAPChart } from "@/components/charts/ClinicalGraphs2";
import { Phase2WormsTable, Phase3WOMACChart } from "@/components/charts/ClinicalGraphs3";
import { Phase3VASDecreaseChart, Phase3MRICartilageChart, Phase3IL10Chart, Phase3CTXIIChart } from "@/components/charts/ClinicalGraphs4";

export default function ClinicalTrials() {
  useEffect(() => {
    document.title = "Clinical Trials | Cipla";
  }, []);

  return (
    <div className="min-h-dvh bg-sky-50 selection:bg-sky-200 selection:text-sky-900 font-sans text-slate-800">

      <main className="pb-16 relative">
        {/* Back Button */}
        <div className="fixed top-4 left-4 sm:top-8 sm:left-8 z-50">
          <Link
            to="/doctor"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-white/80 backdrop-blur-md px-4 py-2 text-sm font-semibold text-sky-700 shadow-sm ring-1 ring-sky-200 hover:bg-white hover:text-sky-900 transition-all"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Doctor Home
          </Link>
        </div>

        {/* HERO SECTION */}
        <section className="relative overflow-hidden pt-24 sm:pt-32 pb-16 border-b border-sky-100">
          {/* Subtle Abstract Molecular Lines Background */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #0f172a 0, #0f172a 1px, transparent 0, transparent 50%), repeating-linear-gradient(135deg, #0f172a 0, #0f172a 1px, transparent 0, transparent 50%)', backgroundSize: '60px 60px' }}></div>
          <Container>
            <div className="relative z-10 max-w-4xl mx-auto text-center">
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight text-black mb-6">
                Clinical Trials
              </h1>
              <p className="text-base sm:text-lg md:text-xl leading-relaxed text-slate-600 font-medium">
                Comprehensive clinical evaluation demonstrating the safety, efficacy and cartilage preservation potential of Mesenchymal Stem Cells in Grade II and Grade III Knee Osteoarthritis.
              </p>
            </div>
          </Container>
        </section>

        {/* SECTION 1: Clinical Development Program (Horizontal Timeline) */}
        <section className="py-20 bg-transparent">
          <Container>
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-black mb-12 text-center tracking-tight border-b border-slate-200 pb-4">
                Clinical Development Program
              </h2>

              <div className="relative flex flex-col md:flex-row justify-between items-stretch gap-4 lg:gap-2">
                {[
                  "Preclinical Studies",
                  "Phase I Clinical trial",
                  "Phase II dose finding study",
                  "Phase III Clinical Trial",
                  "Phase 3 Extension Clinical trial",
                  "DCGI/CDSCO",
                  "Post marketing surveillance study"
                ].map((milestone, idx, arr) => (
                  <Fragment key={idx}>
                    <div className="relative flex flex-1 items-stretch justify-center group w-full opacity-0 animate-[fadeInUp_0.8s_ease-out_forwards]" style={{ animationDelay: `${idx * 150}ms` }}>
                      <div className="bg-white border-2 border-sky-200 rounded-2xl flex items-center justify-center p-3 w-full transition-all duration-300 group-hover:border-sky-500 group-hover:shadow-md shadow-sm z-10 min-h-[90px]">
                        <span className="text-[11px] lg:text-xs xl:text-sm font-bold text-slate-800 text-center leading-snug">
                          {milestone}
                        </span>
                      </div>
                    </div>
                    {/* Arrows between nodes */}
                    {idx < arr.length - 1 && (
                      <div className="hidden md:flex items-center justify-center flex-shrink-0 opacity-0 animate-[fadeInUp_0.8s_ease-out_forwards]" style={{ animationDelay: `${idx * 150 + 100}ms` }}>
                        <ChevronRight className="w-5 h-5 lg:w-6 lg:h-6 text-sky-400" />
                      </div>
                    )}
                    {idx < arr.length - 1 && (
                      <div className="md:hidden flex items-center justify-center my-2 opacity-0 animate-[fadeInUp_0.8s_ease-out_forwards]" style={{ animationDelay: `${idx * 150 + 100}ms` }}>
                        <ChevronDown className="w-6 h-6 text-sky-400" />
                      </div>
                    )}
                  </Fragment>
                ))}
              </div>
            </div>
          </Container>
        </section>

        {/* SECTION 2: Phase II Clinical Trial */}
        <section className="py-20 bg-transparent border-y border-sky-100">
          <Container>
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-black mb-10 tracking-tight">
                Phase II Clinical Trial Design
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm transition-all hover:shadow-md">
                  <h3 className="text-sm font-bold tracking-wider text-sky-700 uppercase mb-3">Objective</h3>
                  <p className="text-slate-700 leading-relaxed">To determine the optimal dose and evaluate the safety and efficacy of allogeneic BM-MSCs.</p>
                </div>

                <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm transition-all hover:shadow-md">
                  <h3 className="text-sm font-bold tracking-wider text-sky-700 uppercase mb-3">Study Design</h3>
                  <p className="text-slate-700 leading-relaxed">Randomized, double-blind, multicentric, placebo-controlled, dose-finding study.</p>
                </div>

                <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm transition-all hover:shadow-md">
                  <h3 className="text-sm font-bold tracking-wider text-sky-700 uppercase mb-3">Patient Population</h3>
                  <p className="text-slate-700 leading-relaxed">Patients with diagnosed with Grade II and Grade III Knee Osteoarthritis.</p>
                </div>

                <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm transition-all hover:shadow-md">
                  <h3 className="text-sm font-bold tracking-wider text-sky-700 uppercase mb-3">Dose Groups</h3>
                  <p className="text-slate-700 leading-relaxed">Evaluation across multiple cellular doses vs Placebo arm.</p>
                </div>

                <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm transition-all hover:shadow-md">
                  <h3 className="text-sm font-bold tracking-wider text-sky-700 uppercase mb-3">Primary Endpoints</h3>
                  <p className="text-slate-700 leading-relaxed">Significant reduction in pain and stiffness as measured by WOMAC and VAS scores.</p>
                </div>

                <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm transition-all hover:shadow-md">
                  <h3 className="text-sm font-bold tracking-wider text-sky-700 uppercase mb-3">Follow-up Duration</h3>
                  <p className="text-slate-700 leading-relaxed">Comprehensive follow-up extending beyond 12 months for long-term safety evaluation.</p>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* SECTION 3: Phase II Clinical Results */}
        <section className="py-20">
          <Container>
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-black mb-10 tracking-tight border-b border-slate-200 pb-4">
                Phase II Clinical Results
              </h2>

              <div className="flex flex-col gap-16 mt-12">
                <div>
                  <h3 className="text-2xl font-extrabold text-black mb-6 flex items-center gap-4"><span className="bg-sky-100 text-sky-800 px-3 py-1 rounded-full text-sm">1</span> Visual Analog Scale (VAS) measures pain severity</h3>
                  <Phase2VASChart />
                </div>
                <hr className="border-slate-100" />
                <div>
                  <h3 className="text-2xl font-extrabold text-black mb-6 flex items-center gap-4"><span className="bg-sky-100 text-sky-800 px-3 py-1 rounded-full text-sm">2</span> The WOMAC Total score measures: <span className="text-sky-600 font-normal">pain, stiffness & physical function.</span></h3>
                  <Phase2WOMACChart />
                </div>
                <hr className="border-slate-100" />
                <div>
                  <h3 className="text-2xl font-extrabold text-black mb-6 flex items-start sm:items-center gap-4"><span className="bg-sky-100 text-sky-800 px-3 py-1 rounded-full text-sm shrink-0 mt-1 sm:mt-0">3</span> <span>ICOAP (Intermittent and Constant Osteoarthritis Pain) evaluates both constant and intermittent pain associated with knee osteoarthritis.</span></h3>
                  <Phase2ICOAPChart />
                </div>
                <hr className="border-slate-100" />
                <div>
                  <h3 className="text-2xl font-extrabold text-black mb-6 flex items-start sm:items-center gap-4"><span className="bg-sky-100 text-sky-800 px-3 py-1 rounded-full text-sm shrink-0 mt-1 sm:mt-0">4</span> <span>Whole-Organ Magnetic Resonance Imaging Score (WORMS) MRI-based assessment of structural changes in Knee Osteoarthritis</span></h3>
                  <Phase2WormsTable />
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* SECTION 4: Phase III Clinical Trial */}
        <section className="py-20 border-y border-sky-100">
          <Container>
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-black mb-10 tracking-tight">
                Phase III Clinical Trial Overview
              </h2>

              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <table className="w-full text-left text-sm md:text-base border-collapse">
                  <tbody>
                    <tr className="hover:bg-slate-50 transition-colors">
                      <th className="border border-slate-200 py-5 px-6 font-semibold text-slate-900 w-1/3 bg-slate-50/50">Study Type</th>
                      <td className="border border-slate-200 py-5 px-6 text-slate-700">Randomized, Double Blind, Placebo Controlled</td>
                    </tr>
                    <tr className="hover:bg-slate-50 transition-colors">
                      <th className="border border-slate-200 py-5 px-6 font-semibold text-slate-900 w-1/3 bg-slate-50/50">Study Participants</th>
                      <td className="border border-slate-200 py-5 px-6 text-slate-700">146 (73 Active; 73 Placebo)</td>
                    </tr>
                    <tr className="hover:bg-slate-50 transition-colors">
                      <th className="border border-slate-200 py-5 px-6 font-semibold text-slate-900 w-1/3 bg-slate-50/50">Treatment Arms</th>
                      <td className="border border-slate-200 py-5 px-6 text-slate-700 font-medium leading-relaxed">
                        <span className="text-sky-700">25 Million Allogeneic BMMSCs + Hyaluronic Acid (n=73)</span>
                        <span className="mx-3 text-slate-400 text-xs uppercase font-bold inline-block">vs</span>
                        <span className="text-slate-600">Placebo + Hyaluronic Acid (n=73)</span>
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50 transition-colors">
                      <th className="border border-slate-200 py-5 px-6 font-semibold text-slate-900 w-1/3 bg-slate-50/50">Follow-up</th>
                      <td className="border border-slate-200 py-5 px-6 text-slate-700">24 Months</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </Container>
        </section>

        {/* SECTION 5: Phase III Clinical Results */}
        <section className="py-20">
          <Container>
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-black mb-10 tracking-tight border-b border-slate-200 pb-4">
                Phase III Clinical Results
              </h2>

              <div className="flex flex-col gap-12 mt-12">
                <Phase3WOMACChart />

                <hr className="border-slate-100" />
                <Phase3VASDecreaseChart />

                <hr className="border-slate-100" />
                <Phase3MRICartilageChart />

                <hr className="border-slate-100" />
                <Phase3IL10Chart />

                <hr className="border-slate-100" />
                <Phase3CTXIIChart />
              </div>
            </div>
          </Container>
        </section>


      </main>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
