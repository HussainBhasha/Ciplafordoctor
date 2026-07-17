import React from 'react';

const milestones = [
  {
    year: "2009-2011",
    title: "Pre-clinical safety & tolerability studies",
    description: "",
  },
  {
    year: "2011-2012",
    title: "Pre-clinical efficacy studies",
    description: "",
  },
  {
    year: "2009-10",
    title: "Phase I Clinical Trial for human safety",
    description: "",
  },
  {
    year: "2011-14",
    title: "Phase II Clinical Trial",
    description: "Dose finding study proves 25 million Allogeneic BMMSC is the appropriate dose for Grade II & III Knee OA",
  },
  {
    year: "2019-2022",
    title: "Phase III Clinical Trial for Safety & Efficacy",
    description: "Significant symptom control & cartilage preservation for 12 months compared to Placebo",
  },
  {
    year: "2022",
    title: "DCGI approval",
    description: "DCGI approved Allogeneic BMMSCs for Knee OA in non-obese patients",
  },
  {
    year: "2023-24",
    title: "Phase III Extension Clinical Trial 2 year follow-up",
    description: "Significant sustained symptom control & cartilage preservation for 24 months compared to Placebo",
  },
  {
    year: "2025",
    title: "Post-marketing surveillance study",
    description: "Ongoing Follow-up for 3 years",
  },
];

export const RoadmapSection: React.FC = () => {
  return (
    <section className="relative w-full pt-16 sm:pt-20 md:pt-24 pb-6 px-3 sm:px-4 overflow-x-hidden bg-[#e0f2fe]">
      {/* Global Animations */}
      <style>{`
        @keyframes float { 
          0%,100%{transform:translateY(0) rotate(0);} 
          50%{transform:translateY(-15px) rotate(3deg);} 
        }
        @keyframes pulseGlow {
          0%,100%{opacity:0.3;transform:scale(1);}
          50%{opacity:0.7;transform:scale(1.08);} 
        }
        @keyframes connectorDraw { 
          from { stroke-dashoffset: 100; } 
          to { stroke-dashoffset: 0; } 
        }
        .animate-float-slow{animation:float 8s ease-in-out infinite;}
        .animate-float-delayed{animation:float 10s ease-in-out infinite;animation-delay:2s;}
        .animate-pulse-glow{animation:pulseGlow 4s ease-in-out infinite;}
        .milestone-hover:hover { 
          transform: scale(1.08) !important; 
          filter: drop-shadow(0 0 12px rgba(52, 188, 212, 0.6)); 
        }
        .card-hover:hover { 
          transform: translateY(-4px) !important; 
        }
        .roadmap-connector { 
          animation: connectorDraw 1.5s ease-out forwards; 
        }
      `}</style>

      <div className="relative w-full mx-auto z-10">
        {/* Title */}
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-[#2F5FCF] via-[#34BCD4] to-[#2F5FCF] bg-clip-text text-transparent">
            Milestones
          </h2>
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className="h-[2px] w-16 sm:w-24 bg-gradient-to-r from-transparent to-[#34BCD4]" />
            <div className="w-3 h-3 rounded-full border-2 border-[#34BCD4] bg-white flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-[#2F5FCF]" />
            </div>
            <div className="w-2 h-2 rounded-full bg-[#2F5FCF]" />
            <div className="w-3 h-3 rounded-full border-2 border-[#34BCD4] bg-white flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-[#2F5FCF]" />
            </div>
            <div className="h-[2px] w-16 sm:w-24 bg-gradient-to-l from-transparent to-[#34BCD4]" />
          </div>
        </div>

        {/* DESKTOP VERSION - Hidden on mobile/tablet */}
        <div className="hidden lg:block w-full max-w-[1600px] mx-auto pb-12 pt-8">
          <div className="relative w-full aspect-[2.2/1] min-h-[550px] max-h-[700px] mx-auto">
            {/* ROAD - Rendered FIRST so it appears behind */}
            <svg
              viewBox="0 0 1000 500"
              className="absolute top-0 left-0 w-full h-full"
              style={{ zIndex: 1 }}
            >
              {/* Glow */}
              <path
                d="M -50 250 C 0 250, 0 250, 60 250 C 110 250, 135 300, 185 300 C 235 300, 260 200, 310 200 C 360 200, 385 300, 435 300 C 485 300, 510 200, 560 200 C 610 200, 635 300, 685 300 C 735 300, 760 200, 810 200 C 860 200, 885 300, 935 300 C 985 300, 1010 250, 1050 250"
                stroke="#34BCD4"
                strokeWidth="50"
                opacity="0.15"
                fill="none"
              />
              {/* Border PATH */}
              <path
                d="M -50 250 C 0 250, 0 250, 60 250 C 110 250, 135 300, 185 300 C 235 300, 260 200, 310 200 C 360 200, 385 300, 435 300 C 485 300, 510 200, 560 200 C 610 200, 635 300, 685 300 C 735 300, 760 200, 810 200 C 860 200, 885 300, 935 300 C 985 300, 1010 250, 1050 250"
                stroke="#CBD5E1"
                strokeWidth="40"
                fill="none"
              />
              {/* Main Road */}
              <path
                d="M -50 250 C 0 250, 0 250, 60 250 C 110 250, 135 300, 185 300 C 235 300, 260 200, 310 200 C 360 200, 385 300, 435 300 C 485 300, 510 200, 560 200 C 610 200, 635 300, 685 300 C 735 300, 760 200, 810 200 C 860 200, 885 300, 935 300 C 985 300, 1010 250, 1050 250"
                stroke="#0B1635"
                strokeWidth="34"
                fill="none"
                strokeLinecap="round"
              />
              {/* White Dashed Line */}
              <path
                d="M -50 250 C 0 250, 0 250, 60 250 C 110 250, 135 300, 185 300 C 235 300, 260 200, 310 200 C 360 200, 385 300, 435 300 C 485 300, 510 200, 560 200 C 610 200, 635 300, 685 300 C 735 300, 760 200, 810 200 C 860 200, 885 300, 935 300 C 985 300, 1010 250, 1050 250"
                stroke="white"
                strokeWidth="2"
                fill="none"
                strokeDasharray="8 8"
              />
            </svg>

            {/* MILESTONES - Rendered AFTER so dots appear on top */}
            <div className="absolute inset-0" style={{ zIndex: 10 }}>
              {milestones.map((item, index) => {
                const positions = [
                  { left: 6, roadDotTop: 50 },
                  { left: 18.5, roadDotTop: 60 },
                  { left: 31, roadDotTop: 40 },
                  { left: 43.5, roadDotTop: 60 },
                  { left: 56, roadDotTop: 40 },
                  { left: 68.5, roadDotTop: 60 },
                  { left: 81, roadDotTop: 40 },
                  { left: 93.5, roadDotTop: 60 },
                ];

                const position = positions[index];
                const cardAbove = position.roadDotTop <= 50;

                return (
                  <div
                    key={item.year}
                    className="absolute z-10"
                    style={{
                      left: `${position.left}%`,
                      top: `${position.roadDotTop}%`,
                    }}
                  >
                    {/* ROAD DOT (Center) */}
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 xl:w-8 xl:h-8 rounded-full bg-white border-[4px] xl:border-[5px] border-[#1E5EFF] flex items-center justify-center shadow-md z-20">
                      <div className="w-2 h-2 xl:w-3 xl:h-3 rounded-full bg-[#14B8C4]" />
                    </div>

                    {/* YEAR IN CIRCLE */}
                    <div
                      className={`absolute left-1/2 -translate-x-1/2 flex flex-col items-center ${!cardAbove ? 'bottom-[60px] xl:bottom-[70px]' : 'top-[60px] xl:top-[70px]'}`}
                    >
                      <div className="w-20 h-20 xl:w-24 xl:h-24 rounded-full bg-white border-[3px] xl:border-[4px] border-[#1E5EFF] flex items-center justify-center shadow-lg relative z-10">
                        <span className="text-[#2F5FCF] font-bold text-xs xl:text-sm text-center leading-tight px-1">{item.year}</span>
                      </div>
                      {/* Connector line */}
                      <div className={`absolute left-1/2 -translate-x-1/2 w-[2px] bg-[#14B8C4] -z-10 ${!cardAbove ? 'bottom-[-60px] xl:bottom-[-70px] h-[60px] xl:h-[70px]' : 'top-[-60px] xl:top-[-70px] h-[60px] xl:h-[70px]'}`} />
                    </div>

                    {/* CARD */}
                    <div
                      className={`absolute left-1/2 -translate-x-1/2 w-[180px] xl:w-[220px] ${cardAbove ? 'bottom-[60px] xl:bottom-[70px]' : 'top-[60px] xl:top-[70px]'}`}
                    >
                      {/* Connector line for Card */}
                      <div className={`absolute left-1/2 -translate-x-1/2 w-[2px] bg-[#14B8C4] -z-10 ${cardAbove ? 'bottom-[-60px] xl:bottom-[-70px] h-[60px] xl:h-[70px]' : 'top-[-60px] xl:top-[-70px] h-[60px] xl:h-[70px]'}`} />
                      
                      <div className="relative bg-white rounded-xl xl:rounded-[20px] p-3 xl:p-4 shadow-xl border-b-[4px] xl:border-b-[6px] border-[#1E5EFF] transition-all duration-300 hover:scale-105">
                        <div className={`absolute left-1/2 -translate-x-1/2 w-0 h-0
                          border-l-[10px] xl:border-l-[14px]
                          border-r-[10px] xl:border-r-[14px]
                          border-l-transparent
                          border-r-transparent
                          ${cardAbove 
                            ? '-bottom-3 xl:-bottom-4 border-t-[10px] xl:border-t-[14px] border-t-white' 
                            : '-top-3 xl:-top-4 border-b-[10px] xl:border-b-[14px] border-b-white'}`}
                        />
                        <h4 className="font-bold text-[#0B1635] text-[13px] xl:text-base leading-tight">{item.title}</h4>
                        <div className="w-8 xl:w-12 h-[2px] xl:h-[3px] bg-[#14B8C4] my-2" />
                        <p className="text-slate-600 text-[11px] xl:text-sm leading-snug">{item.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* MOBILE VERSION - Vertical Timeline (shown on mobile/tablet) */}
        <div className="lg:hidden max-w-2xl mx-auto px-4">
          <div className="relative">
            {/* Milestones */}
            <div className="space-y-8 md:space-y-12">
              {milestones.map((item, index) => {
                return (
                  <div key={item.year} className="relative flex items-start gap-6 md:gap-8 group">
                    {/* Year Circle & Down Arrow */}
                    <div className="relative flex-shrink-0 z-10 flex flex-col items-center">
                      <div className="w-[70px] h-[70px] sm:w-[80px] sm:h-[80px] rounded-full bg-gradient-to-br from-[#1E5EFF] to-[#2F5FCF] border-[4px] sm:border-[5px] border-white shadow-lg flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:shadow-xl relative z-10">
                        <span className="text-white font-bold text-[11px] sm:text-sm text-center leading-tight px-1">{item.year}</span>
                      </div>
                      
                      {/* Downward Arrow connecting to next item */}
                      {index !== milestones.length - 1 && (
                        <div className="flex flex-col items-center absolute top-[70px] sm:top-[80px] left-1/2 -translate-x-1/2 h-8 md:h-12 w-6 pt-1 pb-1 z-0">
                          <div className="w-[3px] flex-grow bg-gradient-to-b from-[#2F5FCF] to-[#14B8C4]" />
                          <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-t-[8px] border-l-transparent border-r-transparent border-t-[#14B8C4]" />
                        </div>
                      )}
                    </div>

                    {/* Content Card */}
                    <div className="flex-1 pb-2">
                      <div className="relative bg-white rounded-[16px] sm:rounded-[20px] p-4 sm:p-6 shadow-lg border-b-[4px] sm:border-b-[5px] border-[#1E5EFF] transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1">
                        {/* Arrow pointing to circle */}
                        <div className="absolute left-0 top-6 -translate-x-full w-0 h-0
                          border-t-[10px] border-t-transparent
                          border-b-[10px] border-b-transparent
                          border-r-[12px] border-r-white
                        "/>

                        <h4 className="font-bold text-[#0B1635] text-base sm:text-lg mb-2 group-hover:text-[#2F5FCF] transition-colors">
                          {item.title}
                        </h4>
                        <div className="w-12 h-[3px] bg-[#14B8C4] mb-3" />
                        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};