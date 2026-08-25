import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, AlertTriangle, Info } from "lucide-react";
import Container from "@/components/ui/Container";
import MarketingNavbar from "@/components/layout/MarketingNavbar";
import Footer from "@/components/layout/Footer";

export default function Disclaimer() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Disclaimer - Cipla";
  }, []);

  return (
    <div className="min-h-dvh bg-sky-50 flex flex-col">
      <MarketingNavbar />
      
      <main className="pt-24 pb-20 flex-grow">
        <Container>
          <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-soft-xl border border-sky-100 overflow-hidden">
            <div className="p-8 sm:p-12 md:p-16">
              
              <button
                onClick={() => navigate(-1)}
                className="inline-flex items-center gap-2 text-sky-600 hover:text-sky-700 transition-colors mb-10 font-medium bg-sky-50 px-4 py-2 rounded-full hover:bg-sky-100"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </button>

              <div className="flex flex-col sm:flex-row sm:items-center gap-6 mb-10 pb-8 border-b border-slate-100">
                <div className="h-16 w-16 rounded-2xl bg-amber-50 text-amber-500 flex items-center justify-center shrink-0 border border-amber-100 shadow-sm">
                  <AlertTriangle className="h-8 w-8" />
                </div>
                <div>
                  <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
                    Disclaimer
                  </h1>
                  <p className="text-slate-500 mt-2">Important information regarding scientific content.</p>
                </div>
              </div>

              <div className="prose prose-slate prose-sky max-w-none">
                <ul className="space-y-5 text-slate-700 text-lg">
                  <li className="flex gap-4 items-start">
                    <span className="text-sky-500 font-bold mt-1 text-xl">•</span>
                    <span className="leading-relaxed">The scientific content and information provided is intended strictly for Registered Medical Practitioners only.</span>
                  </li>
                  <li className="flex gap-4 items-start">
                    <span className="text-sky-500 font-bold mt-1 text-xl">•</span>
                    <span className="leading-relaxed">While Cipla makes every effort to present accurate and reliable information, Cipla does not endorse, warrant, or assume any legal liability or responsibility for the accuracy or completeness of any information provided.</span>
                  </li>
                  <li className="flex gap-4 items-start">
                    <span className="text-sky-500 font-bold mt-1 text-xl">•</span>
                    <div className="leading-relaxed">
                      Cipla disclaims all warranties regarding the contents of these materials, including, without limitation, warranties of:
                      <ul className="list-disc pl-6 mt-2 space-y-1">
                        <li>Title</li>
                        <li>Non-infringement</li>
                        <li>Merchantability</li>
                        <li>Fitness for a particular purpose</li>
                      </ul>
                    </div>
                  </li>
                  <li className="flex gap-4 items-start">
                    <span className="text-sky-500 font-bold mt-1 text-xl">•</span>
                    <span className="leading-relaxed">The information provided is not intended or implied to be a substitute for professional medical advice.</span>
                  </li>
                  <li className="flex gap-4 items-start">
                    <span className="text-sky-500 font-bold mt-1 text-xl">•</span>
                    <span className="leading-relaxed">The inclusion or exclusion of any product does not mean that the publisher, author, or contributor recommends or rejects its use, either generally or in any particular field.</span>
                  </li>
                  <li className="flex gap-4 items-start">
                    <span className="text-sky-500 font-bold mt-1 text-xl">•</span>
                    <span className="leading-relaxed">Any advice regarding the management of any medical condition is entirely at the discretion of the Registered Medical Practitioner.</span>
                  </li>
                  <li className="flex gap-4 items-start">
                    <span className="text-sky-500 font-bold mt-1 text-xl">•</span>
                    <span className="leading-relaxed">Prescription of any drug is the prerogative of the Registered Medical Practitioner, at their sole discretion.</span>
                  </li>
                  <li className="flex gap-4 items-start">
                    <span className="text-sky-500 font-bold mt-1 text-xl">•</span>
                    <span className="leading-relaxed">Copying, reproduction, or circulation of the information published in any form or by any means—whether mechanically, in print, or electronically—without prior consent from Cipla Ltd. is strictly prohibited.</span>
                  </li>
                  <li className="flex gap-4 items-start">
                    <span className="text-sky-500 font-bold mt-1 text-xl">•</span>
                    <span className="leading-relaxed">Any unauthorised person having possession of this document should discard it or inform, notify, or return it to Cipla Ltd.</span>
                  </li>
                </ul>

                {/* Document Information Box */}
                <div className="mt-10 rounded-2xl border border-sky-400 bg-sky-50/20 p-6 not-prose">
                  <div className="flex items-center gap-3 mb-4">
                    <Info className="h-5 w-5 text-sky-500 shrink-0" />
                    <h3 className="text-base sm:text-lg font-semibold text-sky-600 m-0">Document Information</h3>
                  </div>

                  <div className="rounded-xl border border-slate-200 bg-white overflow-hidden text-sm sm:text-base">
                    <div className="grid grid-cols-1 sm:grid-cols-[240px_1fr] border-b border-slate-200">
                      <div className="px-5 py-3.5 text-slate-600 font-normal sm:border-r border-slate-200">
                        Document Code
                      </div>
                      <div className="px-5 py-3.5 font-semibold text-slate-800">
                        IN-IL-NP-SO-2026-0008
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-[240px_1fr]">
                      <div className="px-5 py-3.5 text-slate-600 font-normal sm:border-r border-slate-200">
                        Designed and Developed
                      </div>
                      <div className="px-5 py-3.5 font-semibold text-slate-800">
                        Aug 2026
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
            </div>
          </div>
        </Container>
      </main>

      <Footer />
    </div>
  );
}

