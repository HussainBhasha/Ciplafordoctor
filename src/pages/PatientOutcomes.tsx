import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Phase3WOMACChart } from '@/components/charts/ClinicalGraphs3';
import { Phase3VASDecreaseChart, Phase3MRICartilageChart, Phase3IL10Chart, Phase3CTXIIChart } from '@/components/charts/ClinicalGraphs4';

// Reusable animated section component
const FadeUpSection = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.8, delay, ease: "easeOut" }}
  >
    {children}
  </motion.div>
);

export default function PatientOutcomes() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#EEF8FF] font-sans selection:bg-sky-200">
      
      {/* Fixed Back Button */}
      <button 
        onClick={() => navigate('/doctor')}
        className="fixed top-6 left-6 md:top-8 md:left-8 z-50 bg-white hover:bg-slate-50 text-slate-700 px-5 py-2.5 rounded-full shadow-sm hover:shadow-md transition-all border border-slate-100 font-medium text-sm flex items-center gap-2"
      >
        <span aria-hidden="true">&larr;</span> Back to Doctor Page
      </button>

      <main className="pb-24 pt-32">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">

          {/* SECTION 1: Pain & Functional Improvement */}
          <FadeUpSection delay={0.1}>
            <div className="mb-24">
              <div className="text-center max-w-3xl mx-auto mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Pain & Functional Improvement</h2>
                <p className="text-lg text-slate-600 leading-relaxed">
                  Clinical studies demonstrated statistically significant improvements in pain, stiffness and physical function compared with baseline and placebo over 24 months.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-12">
                <div className="bg-white rounded-3xl p-4 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-shadow">
                  <Phase3WOMACChart />
                </div>
                <div className="bg-white rounded-3xl p-4 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-shadow">
                  <Phase3VASDecreaseChart />
                </div>
              </div>
            </div>
          </FadeUpSection>

          {/* SECTION 2: Cartilage Preservation */}
          <FadeUpSection delay={0.1}>
            <div className="mb-24">
              <div className="text-center max-w-3xl mx-auto mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Cartilage Preservation</h2>
                <p className="text-lg text-slate-600 leading-relaxed">
                  MRI T2 cartilage mapping demonstrated maintenance of cartilage quality over 24 months, indicating structural preservation of the knee joint following treatment.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-12">
                <div className="bg-white rounded-3xl p-4 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-shadow">
                  <Phase3MRICartilageChart />
                </div>
              </div>
            </div>
          </FadeUpSection>

          {/* SECTION 3: Biomarker Outcomes */}
          <FadeUpSection delay={0.1}>
            <div className="mb-24">
              <div className="text-center max-w-3xl mx-auto mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Biomarker Outcomes</h2>
              </div>

              <div className="grid grid-cols-1 gap-12">
                <div className="bg-white rounded-3xl p-4 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-shadow">
                  <Phase3IL10Chart />
                </div>
                <div className="bg-white rounded-3xl p-4 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-shadow">
                  <Phase3CTXIIChart />
                </div>
              </div>
            </div>
          </FadeUpSection>


          {/* SECTION 5: Overall Clinical Benefits */}
          <FadeUpSection delay={0.1}>
            <div className="mb-24">
              <div className="text-center max-w-3xl mx-auto mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Overall Clinical Benefits</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    title: "Pain Reduction",
                    desc: "Significant reduction in pain scores throughout the 24-month follow-up."
                  },
                  {
                    title: "Improved Physical Function",
                    desc: "Improved mobility and functional performance measured by WOMAC."
                  },
                  {
                    title: "Reduced Joint Stiffness",
                    desc: "Meaningful improvement in joint stiffness compared with baseline."
                  },
                  {
                    title: "Cartilage Preservation",
                    desc: "MRI demonstrated maintenance of cartilage quality over two years."
                  },
                  {
                    title: "Improved Quality of Life",
                    desc: "Patients experienced sustained improvements in daily activities and overall function."
                  },
                  {
                    title: "Long-Term Benefit",
                    desc: "Clinical improvements remained consistent through the 24-month follow-up period."
                  }
                ].map((benefit, i) => (
                  <div key={i} className="bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-transparent hover:border-sky-200 hover:shadow-[0_12px_40px_rgb(14_165_233_/_0.15)] hover:-translate-y-1.5 transition-all duration-300">
                    <h3 className="text-xl font-bold text-slate-900 mb-4">{benefit.title}</h3>
                    <p className="text-slate-600 leading-relaxed">{benefit.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeUpSection>

        </div>


      </main>
    </div>
  );
}
