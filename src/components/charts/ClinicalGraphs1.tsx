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

const vasDataC1 = [
  { time: 'Baseline', "25M": 60.9, "50M": 73.7, "P1": 61 },
  { time: '1M', "25M": 38.7, "50M": 38.4, "P1": 48 },
  { time: '3M', "25M": 27.1, "50M": 47.3, "P1": 40.2 },
  { time: '6M', "25M": 24.4, "50M": 45.6, "P1": 45.3 },
  { time: '12M', "25M": 20.6, "50M": 43.4, "P1": 39.7 },
];

const vasDataC2 = [
  { time: 'Baseline', "75M": 57.4, "150M": 46.6, "P2": 65.3 },
  { time: '1M', "75M": 63.6, "150M": 42.3, "P2": 49.5 },
  { time: '3M', "75M": 51.7, "150M": 33.1, "P2": 48.3 },
  { time: '6M', "75M": 37.1, "150M": 43.6, "P2": 43.4 },
  { time: '12M', "75M": 38.3, "150M": 46.6, "P2": 40.5 },
];

export function Phase2VASChart() {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm relative group">
          <h4 className="text-center font-bold text-slate-700 mb-4">VAS (C1)</h4>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={vasDataC1} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="time" tick={{fontSize: 12, fill: '#64748b'}} axisLine={false} tickLine={false} />
                <YAxis domain={[0, 100]} tick={{fontSize: 12, fill: '#64748b'}} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '20px' }} />
                <Line type="monotone" dataKey="25M" stroke={colors.blue} strokeWidth={3} dot={{ r: 4, fill: colors.blue }} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="50M" stroke={colors.orange} strokeWidth={3} dot={{ r: 4, fill: colors.orange }} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="P1" stroke={colors.gray} strokeWidth={3} dot={{ r: 4, fill: colors.gray }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
          <h4 className="text-center font-bold text-slate-700 mb-4">VAS (C2)</h4>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={vasDataC2} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="time" tick={{fontSize: 12, fill: '#64748b'}} axisLine={false} tickLine={false} />
                <YAxis domain={[0, 100]} tick={{fontSize: 12, fill: '#64748b'}} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '20px' }} />
                <Line type="monotone" dataKey="75M" stroke={colors.blue} strokeWidth={3} dot={{ r: 4, fill: colors.blue }} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="150M" stroke={colors.orange} strokeWidth={3} dot={{ r: 4, fill: colors.orange }} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="P2" stroke={colors.gray} strokeWidth={3} dot={{ r: 4, fill: colors.gray }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      <div className="mt-8 bg-sky-50/50 rounded-2xl p-6 border border-sky-100/50 flex flex-col items-center">
        <p className="text-lg md:text-xl font-bold text-slate-800 text-center leading-relaxed">
          Significant <span className="text-sky-600">improvement in pain reduction</span> was noted in the group treated with <span className="text-sky-600">25M Stempeucel/Mesenchymal Stem Cells dose</span> @ 3, 6 & 12 months
        </p>
        <div className="mt-4 inline-block bg-white px-6 py-2 rounded-full border border-sky-100 shadow-sm">
          <p className="text-sky-700 font-bold"><span className="text-xl">67.4% reduction</span> in the 25M group @ 12 months</p>
        </div>
      </div>
    </div>
  );
}

const womacDataC1 = [
  { time: 'Baseline', "25M": 1300, "50M": 1500, "P1": 1200 },
  { time: '1M', "25M": 1050, "50M": 1050, "P1": 850 },
  { time: '3M', "25M": 950, "50M": 950, "P1": 1000 },
  { time: '6M', "25M": 750, "50M": 1100, "P1": 1000 },
  { time: '12M', "25M": 600, "50M": 1150, "P1": 1000 },
];

const womacDataC2 = [
  { time: 'Baseline', "75M": 1450, "150M": 1400, "P2": 1400 },
  { time: '1M', "75M": 1300, "150M": 1100, "P2": 1200 },
  { time: '3M', "75M": 1200, "150M": 900, "P2": 1100 },
  { time: '6M', "75M": 1000, "150M": 1050, "P2": 1000 },
  { time: '12M', "75M": 800, "150M": 1150, "P2": 1050 },
];

export function Phase2WOMACChart() {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm relative group">
          <div className="absolute top-2 left-4 text-2xl font-bold text-slate-900">a</div>
          <h4 className="text-center font-bold text-slate-700 mb-4">WOMAC Composite (C1)</h4>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={womacDataC1} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="time" tick={{fontSize: 12, fill: '#64748b'}} axisLine={false} tickLine={false} />
                <YAxis domain={[0, 2500]} tick={{fontSize: 12, fill: '#64748b'}} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '20px' }} />
                <Line type="monotone" dataKey="25M" stroke={colors.blue} strokeWidth={3} dot={{ r: 4, fill: colors.blue }} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="50M" stroke={colors.orange} strokeWidth={3} dot={{ r: 4, fill: colors.orange }} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="P1" stroke={colors.gray} strokeWidth={3} dot={{ r: 4, fill: colors.gray }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm relative">
          <div className="absolute top-2 left-4 text-2xl font-bold text-slate-900">b</div>
          <h4 className="text-center font-bold text-slate-700 mb-4">WOMAC Composite (C2)</h4>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={womacDataC2} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="time" tick={{fontSize: 12, fill: '#64748b'}} axisLine={false} tickLine={false} />
                <YAxis domain={[0, 2500]} tick={{fontSize: 12, fill: '#64748b'}} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '20px' }} />
                <Line type="monotone" dataKey="75M" stroke={colors.blue} strokeWidth={3} dot={{ r: 4, fill: colors.blue }} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="150M" stroke={colors.orange} strokeWidth={3} dot={{ r: 4, fill: colors.orange }} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="P2" stroke={colors.gray} strokeWidth={3} dot={{ r: 4, fill: colors.gray }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      <div className="mt-8 bg-sky-50/50 rounded-2xl p-6 border border-sky-100/50 flex flex-col items-center">
        <p className="text-lg md:text-xl font-bold text-slate-800 text-center leading-relaxed">
          Patients receiving the <span className="text-sky-600">25 million Stempeucel (BMMSC) dose</span> demonstrated significant <span className="text-sky-600">improvements in pain, stiffness, and physical function</span> at 3, 6, and 12 months.
        </p>
      </div>
    </div>
  );
}
