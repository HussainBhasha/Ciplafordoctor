import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell, LabelList, Label } from 'recharts';

const colors = {
  blue: "#0284c7", // Placebo
  red: "#dc2626"   // BMMSCs
};

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

// 1. Phase 3 VAS Score (% Decrease)
const vasDecreaseData = [
  { time: '1M', Placebo: -24, BMMSCs: -20 },
  { time: '3M', Placebo: -26, BMMSCs: -26.5 },
  { time: '6M', Placebo: -19, BMMSCs: -17.62, label: "-17.62%" },
  { time: '12M', Placebo: -7, BMMSCs: -41.33, label: "-41.33%" },
  { time: '18M', Placebo: -6, BMMSCs: -48.45, label: "-48.45%" },
  { time: '24M', Placebo: -1, BMMSCs: -64.04, label: "-64.04%" },
];

export function Phase3VASDecreaseChart() {
  return (
    <div className="w-full flex flex-col lg:flex-row gap-8 items-center bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
      <div className="flex-1 w-full relative">
        <h3 className="text-center text-xl font-bold text-slate-900 mb-2">% decrease in VAS score</h3>
        <h4 className="text-center font-semibold text-slate-700 mb-6">VAS - Percentage change</h4>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={vasDecreaseData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }} barGap={2} barSize={20}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="time" tick={{fontSize: 12, fill: '#0f172a', fontWeight: 'bold'}} axisLine={true} tickLine={false} dy={10} />
              <YAxis domain={[-70, 10]} tick={{fontSize: 12, fill: '#0f172a'}} axisLine={false} tickLine={false}>
                <Label value="% decrease in VAS score" angle={-90} position="insideLeft" style={{ textAnchor: 'middle', fill: '#0f172a', fontWeight: 'bold' }} dx={15} />
              </YAxis>
              <Tooltip content={<CustomTooltip />} />
              <Legend iconType="square" wrapperStyle={{ fontSize: '12px', fontWeight: 'bold', paddingTop: '20px' }} />
              <Bar dataKey="Placebo" fill={colors.blue} />
              <Bar dataKey="BMMSCs" fill={colors.red}>
                <LabelList dataKey="label" position="bottom" fill="#0f172a" fontSize={12} fontWeight="bold" />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <div className="w-full lg:w-1/3 flex flex-col gap-8 border-l-2 border-slate-100 pl-8">
        <h3 className="text-2xl font-bold text-slate-900 mb-4">% Pain reduction:</h3>
        <div className="flex flex-col gap-8">
          <div className="flex items-center gap-4">
            <svg className="w-12 h-12 text-red-600" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 21l-9-9h6V3h6v9h6z"/>
            </svg>
            <div className="bg-yellow-300 px-4 py-2 text-lg font-bold text-blue-900 border border-yellow-400">
              41.4% decrease in 1 year
            </div>
          </div>
          <div className="flex items-center gap-4">
            <svg className="w-12 h-12 text-red-600" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 21l-9-9h6V3h6v9h6z"/>
            </svg>
            <div className="bg-yellow-300 px-4 py-2 text-lg font-bold text-blue-900 border border-yellow-400">
              64% decrease in 2 years
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// 2. MRI Cartilage Score
const mriCartilageData = [
  { time: 'Baseline', Placebo: 41, BMMSCs: 38.1 },
  { time: '6M', Placebo: 40.9, BMMSCs: 39.8 },
  { time: '12M', Placebo: 42, BMMSCs: 38.8 },
  { time: '24M', Placebo: 40.4, BMMSCs: 36.3 },
];

export function Phase3MRICartilageChart() {
  return (
    <div className="w-full bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
      <div className="w-full relative">
        <h3 className="text-center text-xl font-bold text-slate-900 mb-6">Average Cartilage Score<br/><span className="text-base font-semibold text-slate-700">(Medial FT compartment)</span></h3>
        <div className="h-[350px] w-full max-w-3xl mx-auto">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={mriCartilageData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }} barGap={0} barSize={40}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="time" tick={{fontSize: 12, fill: '#0f172a', fontWeight: 'bold'}} axisLine={true} tickLine={false} dy={10} />
              <YAxis domain={[35, 43]} tick={{fontSize: 12, fill: '#0f172a'}} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Legend iconType="square" wrapperStyle={{ fontSize: '12px', fontWeight: 'bold', paddingTop: '20px' }} />
              <Bar dataKey="BMMSCs" fill={colors.red}>
                <LabelList dataKey="BMMSCs" position="top" fill="#dc2626" fontSize={12} fontWeight="bold" />
              </Bar>
              <Bar dataKey="Placebo" fill={colors.blue}>
                <LabelList dataKey="Placebo" position="top" fill="#0284c7" fontSize={12} fontWeight="bold" />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <div className="mt-8 flex flex-col gap-4">
        <div className="bg-sky-50/50 rounded-xl p-4 border border-green-400 shadow-[0_4px_20px_-5px_rgba(74,222,128,0.2)] text-center">
          <p className="text-lg font-bold text-slate-800">
            Average Cartilage Score reduced in the Allogenic BMMSC group at 12¹ & 24* months
          </p>
        </div>
        <p className="text-xl md:text-2xl font-bold text-blue-900 text-center tracking-tight">
          Showing maintenance of Cartilage Quality for 2 years*
        </p>
      </div>
    </div>
  );
}

// 3. IL-10 Biomarker Analysis
const il10Data = [
  { time: '1 week', Placebo: -0.05, BMMSCs: 0.1 },
  { time: '1M', Placebo: 0.25, BMMSCs: 0.35 },
  { time: '3M', Placebo: -0.3, BMMSCs: 0.3 },
  { time: '6M', Placebo: -0.5, BMMSCs: -0.1 },
  { time: '12M', Placebo: -0.15, BMMSCs: 0.05 },
  { time: '18M', Placebo: -0.9, BMMSCs: 0.5 },
  { time: '24M', Placebo: -0.55, BMMSCs: 0.75 },
];

export function Phase3IL10Chart() {
  return (
    <div className="w-full flex flex-col lg:flex-row gap-8 items-center bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
      <div className="flex-1 w-full relative">
        <h3 className="text-center text-xl font-bold text-slate-900 mb-6">IL-10 (change from baseline)</h3>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={il10Data} margin={{ top: 20, right: 20, bottom: 20, left: 20 }} barGap={0} barSize={25}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="time" tick={{fontSize: 12, fill: '#0f172a', fontWeight: 'bold'}} axisLine={true} tickLine={false} dy={10} />
              <YAxis domain={[-1, 0.8]} tick={{fontSize: 12, fill: '#0f172a'}} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Legend iconType="square" wrapperStyle={{ fontSize: '12px', fontWeight: 'bold', paddingTop: '20px' }} />
              <Bar dataKey="BMMSCs" fill={colors.red} />
              <Bar dataKey="Placebo" fill={colors.blue} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <div className="w-full lg:w-1/3 flex flex-col gap-8">
        <div className="bg-sky-50/50 rounded-tr-3xl rounded-bl-3xl rounded-tl-md rounded-br-md p-8 border border-green-400 shadow-[0_4px_20px_-5px_rgba(74,222,128,0.2)] text-center">
          <p className="text-lg md:text-xl font-bold text-slate-800 leading-relaxed">
            IL-10 levels increased significantly at <span className="text-blue-800">3 & 24 months in the Allogenic BMMSC group</span>
          </p>
        </div>
        <p className="text-xl md:text-2xl font-bold text-blue-900 text-center tracking-tight">
          Showing maintenance of Cartilage Quality for 2 years*
        </p>
      </div>
    </div>
  );
}

// 4. CTX-II Biomarker Analysis
const ctx2Data = [
  { time: 'Baseline', Placebo: 417.8, BMMSCs: 462.1, p: '' },
  { time: 'D7', Placebo: 526.9, BMMSCs: 576.8, p: 'P=0.7725' },
  { time: 'D30', Placebo: 446.7, BMMSCs: 480.3, p: 'P=0.6762' },
  { time: 'D90', Placebo: 510.1, BMMSCs: 433.7, p: 'P=0.1384' },
  { time: 'D180', Placebo: 426.2, BMMSCs: 529.8, p: 'P=0.7952' },
  { time: 'D365', Placebo: 449.4, BMMSCs: 508.6, p: 'P=0.9271' },
  { time: 'D540', Placebo: 369.4, BMMSCs: 486.0, p: 'P=0.7968' },
  { time: 'D730', Placebo: 442.9, BMMSCs: 480.4, p: 'P=0.4062' },
];

export function Phase3CTXIIChart() {
  return (
    <div className="w-full flex flex-col items-center bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
      <div className="w-full relative mb-8">
        <h3 className="text-center text-2xl font-bold text-slate-900 mb-2">CTX – II (urine)</h3>
        <p className="absolute top-0 right-4 text-sm font-semibold text-slate-600">Normal: 65 – 618 pg/ml</p>
        <div className="h-[350px] w-full max-w-5xl mx-auto">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={ctx2Data} margin={{ top: 30, right: 20, bottom: 0, left: 20 }} barGap={0} barSize={35}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="time" tick={{fontSize: 12, fill: '#0f172a', fontWeight: 'bold'}} axisLine={true} tickLine={false} dy={10} />
              <YAxis domain={[0, 600]} tick={{fontSize: 12, fill: '#0f172a'}} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Legend iconType="square" wrapperStyle={{ fontSize: '12px', fontWeight: 'bold', paddingTop: '20px' }} />
              <Bar dataKey="BMMSCs" fill={colors.red}>
                <LabelList dataKey="BMMSCs" position="center" fill="#fff" fontSize={10} fontWeight="bold" />
              </Bar>
              <Bar dataKey="Placebo" fill={colors.blue}>
                <LabelList dataKey="p" position="top" fill="#0f172a" fontSize={11} fontWeight="bold" dy={-10} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      {/* Primary Data Table */}
      <div className="w-full max-w-5xl overflow-x-auto mb-8 border border-slate-200 shadow-sm">
        <table className="w-full text-sm text-center whitespace-nowrap">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="py-3 px-4 font-bold text-slate-700 text-left">Group</th>
              {ctx2Data.map((d) => <th key={d.time} className="py-3 px-4 font-bold text-slate-700">{d.time}</th>)}
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-slate-200">
              <td className="py-3 px-4 font-bold text-red-700 text-left flex items-center gap-2">
                <span className="w-3 h-3 bg-red-600 block rounded-sm"></span> BMSC arm
              </td>
              {ctx2Data.map((d) => <td key={d.time} className="py-3 px-4 text-slate-800">{d.BMMSCs}</td>)}
            </tr>
            <tr>
              <td className="py-3 px-4 font-bold text-blue-700 text-left flex items-center gap-2">
                <span className="w-3 h-3 bg-blue-600 block rounded-sm"></span> Placebo
              </td>
              {ctx2Data.map((d) => <td key={d.time} className="py-3 px-4 text-slate-800">{d.Placebo}</td>)}
            </tr>
          </tbody>
        </table>
      </div>

      <p className="text-xs text-slate-500 mb-6 text-center max-w-4xl">
        *The fragment of C-terminal cross-linked telopeptide of type II collagen (CTX-II) is released into circulation and subsequently secreted into urine and indicative of disease progression
      </p>

      {/* Secondary Table */}
      <div className="w-full max-w-3xl overflow-x-auto mb-8 border-2 border-slate-700">
        <table className="w-full text-base text-center">
          <thead>
            <tr className="border-b-2 border-slate-700">
              <th className="py-3 px-4"></th>
              <th className="py-3 px-4 font-bold text-slate-900 border-l-2 border-slate-700">Estimate (95% CI)</th>
              <th className="py-3 px-4 font-bold text-slate-900 border-l-2 border-slate-700">p Value</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b-2 border-slate-700">
              <td className="py-3 px-4 font-medium text-slate-700">Time</td>
              <td className="py-3 px-4 text-slate-800 border-l-2 border-slate-700">-0.46 (-0.99, 0.06)</td>
              <td className="py-3 px-4 text-slate-800 border-l-2 border-slate-700">0.082</td>
            </tr>
            <tr>
              <td className="py-3 px-4 font-medium text-slate-700">Group (BMSC)</td>
              <td className="py-3 px-4 text-slate-800 border-l-2 border-slate-700">-7.79 (-96.18, 80.60)</td>
              <td className="py-3 px-4 text-slate-800 border-l-2 border-slate-700">0.863</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="text-center max-w-5xl">
        <p className="text-lg md:text-xl font-bold text-blue-900 leading-relaxed">
          CTX II levels decreases in BMSC arm till D90 of injection...GEE method of analysis shows 
          BMSC arm has 7.79 units decrease in average CTX II values as compared to placebo arm 
          irrespective of time till one year follow up
        </p>
      </div>
    </div>
  );
}
