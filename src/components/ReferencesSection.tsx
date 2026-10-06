const references = [
  "Bioengineering (Basel). 2025 Feb 07;12(2):161.",
  "Gupta P.K. et al. The American Journal of Sports Medicine. 2023;51(9):2254–2266.",
  "Am J Orthop (Belle Mead NJ). 2016;45(5):280–326.",
  "Appl. Sci. 2023, 13, 10617.",
  "J Clin Orthop Trauma. 2022 Feb 9;26:101804; Transplantation. 2015;99:1681–1690.",
  "Stempeutics Research Pvt. Ltd. Data on File.",
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
