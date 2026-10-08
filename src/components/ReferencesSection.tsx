const references = [
  "Lana JF, de Brito GC, Kruel A, et al. Evolution and Innovations in Bone Marrow Cellular Therapy for Musculoskeletal Disorders: Tracing the Historical Trajectory and Contemporary Advances. Bioengineering (Basel). 2024 Sep 28;11(10):979. doi: 10.3390/bioengineering11100979.",
  "Gupta PK, Maheshwari S, Cherian JJ, et al. Efficacy and Safety of Stempeucel in Osteoarthritis of the Knee: A Phase 3 Randomized, Double-Blind, Multicenter, Placebo-Controlled Study. Am J Sports Med. 2023 Jul;51(9):2254-2266. doi: 10.1177/03635465231180323.",
  "Saltzman BM, Kuhns BD, Weber AE, Yanke A, Nho SJ. Stem Cells in Orthopedics: A Comprehensive Guide for the General Orthopedist. Am J Orthop (Belle Mead NJ). 2016 Jul-Aug;45(5):280-326.",
  "Gherghel, R.; Macovei, L.A.; Burlui, M.-A.; et al. Osteoarthritis—The Role of Mesenchymal Stem Cells in Cartilage Regeneration. Appl. Sci. 2023, 13, 10617. doi: 10.3390/app131910617",
  "Pandey V, Madi S, Gupta P. The promising role of autologous and allogeneic mesenchymal stromal cells in managing knee osteoarthritis. What is beyond Mesenchymal stromal cells? J Clin Orthop Trauma. 2022 Feb 9;26:101804. doi: 10.1016/j.jcot.2022.",
  "Stempeutics Research Pvt Ltd. Home | Stempeutics [Internet]. Bengaluru (India): Stempeutics Research Pvt Ltd.; [cited 2026 Oct 8]. Available from: https://www.stempeutics.com/ (accessed on: 2026 Oct 8).",
  "Gupta PK, Maheshwari S, Cherian JJ, et al. Two years efficacy and safety outcomes of using allogeneic, pooled mesenchymal stromal cells for osteoarthritis of knee in a double-blind randomized placebo-controlled phase 3 study. Osteoarthr Cartil Open. 2025 Dec 11;8(1):100723. doi: 10.1016/j.ocarto.2025.100723.",
];

export default function ReferencesSection() {
  return (
    <section className="bg-[#e0f2fe] border-t border-sky-200 py-10 sm:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <h2 className="text-2xl font-bold text-[#0b3a66] sm:text-3xl">
          References:
        </h2>
        <div className="mt-3 h-px w-full bg-slate-300" />

        {/* Numbered list */}
        <ol className="mt-6 space-y-3 list-none">
          {references.map((ref, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <span className="mt-0.5 flex-none text-sm font-semibold text-[#0b3a66] leading-relaxed min-w-[1.5rem]">
                {idx + 1}.
              </span>
              <span className="text-sm leading-relaxed text-slate-700 sm:text-[15px]">
                {ref}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
