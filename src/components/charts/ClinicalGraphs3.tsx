import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const colors = {
  blue: "#3b82f6",
  orange: "#f97316",
  gray: "#9ca3af",
  red: "#ef4444"
};

export function Phase2WormsTable() {
  const data = [
    { time: 'Baseline', "25M": "67.0 (19.8)", "50M": "78.8 (40.9)", P1: "76.5 (23.5)", p1: "–", "75M": "71.3 (21.4)", "150M": "62.0 (17.9)", P2: "70.8 (14.7)", p2: "–" },
    { time: '6 months', "25M": "67.5 (20.5)", "50M": "77.9 (41.2)", P1: "74.9 (22.4)", p1: "0.5521", "75M": "71.4 (20.9)", "150M": "62.0 (17.7)", P2: "69.9 (14.3)", p2: "0.7360" },
    { time: '12 months', "25M": "66.1 (19.2)", "50M": "78.0 (41.1)", P1: "74.9 (22.5)", p1: "0.5310", "75M": "67.0 (20.9)", "150M": "60.6 (15.7)", P2: "72.3 (15.2)", p2: "0.0609" },
  ];

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full overflow-x-auto pb-4">
        <table className="w-full text-sm text-left whitespace-nowrap min-w-[700px] border-collapse">
          <thead>
            <tr className="bg-slate-50">
              <th className="border border-slate-300 py-5 px-6 font-semibold text-slate-700">WORMS</th>
              <th className="border-[3px] border-green-500 py-5 px-6 font-bold text-sky-700 bg-green-50/50">
                25 M
              </th>
              <th className="border border-slate-300 py-5 px-6 font-semibold text-slate-700">50 M</th>
              <th className="border border-slate-300 py-5 px-6 font-semibold text-slate-700">P1</th>
              <th className="border border-slate-300 py-5 px-6 font-semibold text-slate-700 italic">P value</th>
              <th className="border border-slate-300 py-5 px-6 font-semibold text-slate-700">75 M</th>
              <th className="border border-slate-300 py-5 px-6 font-semibold text-slate-700">150 M</th>
              <th className="border border-slate-300 py-5 px-6 font-semibold text-slate-700">P2</th>
              <th className="border border-slate-300 py-5 px-6 font-semibold text-slate-700 italic">P value</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, idx) => (
              <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                <td className="border border-slate-300 py-5 px-6 font-medium text-slate-800">{row.time}</td>
                <td className="border-[3px] border-green-500 py-5 px-6 text-slate-800 font-medium bg-yellow-100/30">
                  {row['25M']}
                </td>
                <td className="border border-slate-300 py-5 px-6 text-slate-700">{row['50M']}</td>
                <td className="border border-slate-300 py-5 px-6 text-slate-700">{row.P1}</td>
                <td className="border border-slate-300 py-5 px-6 text-slate-700">{row.p1}</td>
                <td className="border border-slate-300 py-5 px-6 text-slate-700">{row['75M']}</td>
                <td className="border border-slate-300 py-5 px-6 text-slate-700">{row['150M']}</td>
                <td className="border border-slate-300 py-5 px-6 text-slate-700">{row.P2}</td>
                <td className="border border-slate-300 py-5 px-6 text-slate-700">{row.p2}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="mt-8 text-center max-w-3xl mx-auto px-4">
        <p className="text-sm md:text-base text-slate-700 font-normal leading-relaxed">
          No significant change in WORMS scores was observed from baseline to follow-up across all treatment groups, indicating stable structural joint features with no detectable progression of cartilage damage or other MRI-assessed abnormalities.
        </p>
      </div>
    </div>
  );
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-slate-200 shadow-lg rounded-lg">
        <p className="font-semibold text-slate-900 mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-sm font-medium" style={{ color: entry.color }}>
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const phase3Womac = [
  { time: 'Baseline', BMMSCs: 1400, Placebo: 1350 },
  { time: '1M', BMMSCs: 1150, Placebo: 1050 },
  { time: '3M', BMMSCs: 1000, Placebo: 1000 },
  { time: '6M', BMMSCs: 850, Placebo: 1200 },
  { time: '12M', BMMSCs: 750, Placebo: 1350 },
  { time: '18M', BMMSCs: 600, Placebo: 1300 },
  { time: '24M', BMMSCs: 500, Placebo: 1450 },
];

export function Phase3WOMACChart() {
  return (
    <div className="w-full flex flex-col gap-8">
      <div className="w-full flex flex-col lg:flex-row items-center gap-8 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
      <div className="flex-1 w-full relative">
        <h3 className="text-center text-xl font-bold text-slate-900 mb-6 flex flex-col gap-1">
          <span>WOMAC Total Score</span>
          <span className="font-semibold text-slate-700 text-lg">Assessment of Pain, Stiffness & Physical Function</span>
        </h3>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={phase3Womac} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="time" tick={{fontSize: 14, fill: '#0f172a', fontWeight: 'bold'}} axisLine={false} tickLine={false} dy={10} />
              <YAxis domain={[-500, 2500]} tick={{fontSize: 12, fill: '#0f172a', fontWeight: 'bold'}} axisLine={false} tickLine={false} label={{ value: 'WOMAC Total Score', angle: -90, position: 'insideLeft', fontWeight: 'bold' }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend iconType="circle" wrapperStyle={{ fontSize: '14px', fontWeight: 'bold', paddingTop: '30px' }} />
              <Line type="monotone" dataKey="BMMSCs" stroke={colors.red} strokeWidth={4} dot={{ r: 6, fill: colors.red }} activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="Placebo" stroke={colors.blue} strokeWidth={4} dot={{ r: 6, fill: colors.blue }} activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <p className="mt-6 text-xs text-slate-500 text-center px-4 leading-relaxed max-w-2xl mx-auto">
          <span className="font-semibold">WOMAC:</span> Western Ontario and McMaster Universities Osteoarthritis Index – a validated questionnaire used to assess pain, stiffness, and physical function in patients with knee osteoarthritis.
        </p>
      </div>
      
      <div className="w-full lg:w-1/3 flex flex-col gap-12 border-l-2 border-sky-200 pl-8">
        <div className="flex items-center gap-4">
          <svg className="w-16 h-16 text-red-600" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 21l-9-9h6V3h6v9h6z"/>
          </svg>
          <div className="bg-yellow-300 px-4 py-2 text-xl font-bold text-slate-900">
            45.4% decrease in 1 year
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <svg className="w-16 h-16 text-red-600" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 21l-9-9h6V3h6v9h6z"/>
          </svg>
          <div className="bg-yellow-300 px-4 py-2 text-xl font-bold text-slate-900">
            71.4% decrease in 2 years
          </div>
        </div>
      </div>
    </div>
      
    <div className="bg-sky-50/50 rounded-2xl p-6 border border-sky-100/50 text-center max-w-4xl mx-auto px-4 w-full">
      <p className="text-sm md:text-base text-slate-700 font-medium leading-relaxed">
        A progressive reduction in WOMAC Total Score was observed in the BMMSC-treated group throughout the 24-month follow-up, reflecting sustained improvements in pain, stiffness, and physical function compared with the placebo group. Lower WOMAC scores indicate improved patient outcomes.
      </p>
    </div>
  </div>
);
}
