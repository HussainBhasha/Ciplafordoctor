import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const colors = {
  blue: "#3b82f6",
  orange: "#f97316",
  gray: "#9ca3af",
  red: "#ef4444"
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

const icoapConstantC1 = [
  { time: 'Baseline', "25M": 50, "50M": 65, "P1": 50 },
  { time: '1M', "25M": 40, "50M": 40, "P1": 38 },
  { time: '3M', "25M": 30, "50M": 45, "P1": 45 },
  { time: '6M', "25M": 30, "50M": 45, "P1": 45 },
  { time: '12M', "25M": 20, "50M": 45, "P1": 40 },
];

const icoapConstantC2 = [
  { time: 'Baseline', "75M": 50, "150M": 45, "P2": 65 },
  { time: '1M', "75M": 48, "150M": 40, "P2": 45 },
  { time: '3M', "75M": 45, "150M": 30, "P2": 45 },
  { time: '6M', "75M": 35, "150M": 40, "P2": 38 },
  { time: '12M', "75M": 35, "150M": 50, "P2": 38 },
];

const icoapIntermittentC1 = [
  { time: 'Baseline', "25M": 45, "50M": 55, "P1": 48 },
  { time: '1M', "25M": 38, "50M": 45, "P1": 38 },
  { time: '3M', "25M": 30, "50M": 40, "P1": 40 },
  { time: '6M', "25M": 32, "50M": 50, "P1": 45 },
  { time: '12M', "25M": 28, "50M": 48, "P1": 42 },
];

const icoapIntermittentC2 = [
  { time: 'Baseline', "75M": 62, "150M": 48, "P2": 55 },
  { time: '1M', "75M": 55, "150M": 40, "P2": 50 },
  { time: '3M', "75M": 55, "150M": 35, "P2": 50 },
  { time: '6M', "75M": 52, "150M": 48, "P2": 45 },
  { time: '12M', "75M": 38, "150M": 45, "P2": 45 },
];

export function Phase2ICOAPChart() {
  const renderChart = (data: any[], title: string, letter: string, isC1: boolean) => (
    <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm relative group">
      <div className="absolute top-2 left-4 text-xl font-bold text-slate-900">{letter}</div>
      <h4 className="text-center font-bold text-slate-700 mb-4">{title}</h4>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis dataKey="time" tick={{fontSize: 12, fill: '#64748b'}} axisLine={false} tickLine={false} />
            <YAxis domain={[-10, 100]} tick={{fontSize: 12, fill: '#64748b'}} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '20px' }} />
            <Line type="monotone" dataKey={isC1 ? "25M" : "75M"} stroke={colors.blue} strokeWidth={3} dot={{ r: 4, fill: colors.blue }} activeDot={{ r: 6 }} />
            <Line type="monotone" dataKey={isC1 ? "50M" : "150M"} stroke={colors.orange} strokeWidth={3} dot={{ r: 4, fill: colors.orange }} activeDot={{ r: 6 }} />
            <Line type="monotone" dataKey={isC1 ? "P1" : "P2"} stroke={colors.gray} strokeWidth={3} dot={{ r: 4, fill: colors.gray }} activeDot={{ r: 6 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

    </div>
  );

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {renderChart(icoapConstantC1, 'ICOAP Constant C1', 'c', true)}
        {renderChart(icoapConstantC2, 'ICOAP Constant C2', 'd', false)}
        {renderChart(icoapIntermittentC1, 'ICOAP Intermittent C1', 'e', true)}
        {renderChart(icoapIntermittentC2, 'ICOAP Intermittent C2', 'f', false)}
      </div>
      
      <div className="mt-8 bg-sky-50/50 rounded-2xl p-6 border border-sky-100/50 flex flex-col md:flex-row items-center justify-around gap-6">
        <div className="flex-1 max-w-lg text-center mx-auto">
          <h5 className="font-bold text-slate-900 mb-4 text-center">Similar trend seen in ICOAP subscores:</h5>
          <ul className="space-y-3 inline-block text-left">
            <li className="flex items-center justify-center gap-3 font-semibold text-slate-700">
              <svg className="w-5 h-5 text-sky-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              <span>Constant pain reduced by 26.5 ± 25.3</span>
            </li>
            <li className="flex items-center justify-center gap-3 font-semibold text-slate-700">
              <svg className="w-5 h-5 text-sky-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              <span>Intermittent pain reduced by 17.1 ± 28.4</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
