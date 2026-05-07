'use client'
import React, { useState, useEffect } from 'react';
import { 
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
    PieChart, Pie, Cell, AreaChart, Area, Legend 
} from 'recharts';
import { 
    Calendar, 
    Download, 
    TrendingUp, 
    TrendingDown, 
    PieChart as PieIcon,
    BarChart3,
    ArrowUpRight,
    ArrowDownRight,
    Wallet,
    Landmark
} from 'lucide-react';
import { formatCurrency } from '@/utils/formatCurrency';
import { baseUrl } from '@/utils/api-url';

const ReportsPage = () => {
    const [dateRange, setDateRange] = useState('This Month');
    const [reportData, setReportData] = useState<any>(null);
    const [distribution, setDistribution] = useState<any[]>([]);
    const [cashFlowData, setCashFlowData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchReports = async () => {
        setLoading(true);
        try {
            const [summaryRes, distRes, flowRes] = await Promise.all([
                fetch(`${baseUrl}/reports/summary`, { credentials: 'include' }),
                fetch(`${baseUrl}/reports/distribution`, { credentials: 'include' }),
                fetch(`${baseUrl}/reports/cashflow`, { credentials: 'include' })
            ]);
            
            const summaryResult = await summaryRes.json();
            const distResult = await distRes.json();
            const flowResult = await flowRes.json();

            if (summaryResult.success) setReportData(summaryResult.data);
            if (distResult.success) setDistribution(distResult.data);
            if (flowResult.success) setCashFlowData(flowResult.data);
        } catch (error) {
            console.error("Error fetching reports:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReports();
    }, [dateRange]);

    const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444'];

    if (loading && !reportData) return (
        <div className="flex items-center justify-center min-h-[60vh]">
            <div className="w-12 h-12 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
        </div>
    );

    return (
        <div className="min-h-screen pb-20 bg-slate-50/30">
            <div className="mx-auto w-full max-w-7xl">
                
                {/* Modern Header Section */}
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-12 gap-6">
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
                            <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">Analytics Dashboard</span>
                        </div>
                        <h1 className="text-4xl font-black text-gray-900 tracking-tighter">
                            Financial <span className="text-indigo-600">Intelligence</span>
                        </h1>
                        <p className="text-gray-500 font-medium mt-1">Deep dive into your portfolio performance and cash flow dynamics.</p>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-3">
                        <div className="flex items-center gap-1 p-1.5 bg-white rounded-2xl border border-gray-100 shadow-sm">
                            {['This Month', 'Last Month', 'This Year'].map((range) => (
                                <button
                                    key={range}
                                    onClick={() => setDateRange(range)}
                                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                                        dateRange === range 
                                        ? 'bg-indigo-600 text-white shadow-lg' 
                                        : 'text-gray-400 hover:text-gray-600'
                                    }`}
                                >
                                    {range}
                                </button>
                            ))}
                        </div>
                        <button className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-100 rounded-2xl shadow-sm text-sm font-bold text-gray-600 hover:bg-gray-50 transition-all">
                            <Download size={18} />
                            Export Data
                        </button>
                    </div>
                </div>

                {/* Performance Snapshot Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    <ReportCard 
                        title="Net Revenue" 
                        value={formatCurrency(reportData?.netCashFlow || 0)} 
                        trend={reportData?.netCashFlow >= 0 ? "+Live" : "-Low"}
                        trendType={reportData?.netCashFlow >= 0 ? "up" : "down"}
                        icon={<Wallet size={20} />} 
                        color="indigo"
                    />
                    <ReportCard 
                        title="Total Inflow" 
                        value={formatCurrency(reportData?.income || 0)} 
                        trend="Total Income"
                        trendType="up"
                        icon={<TrendingUp size={20} />} 
                        color="emerald"
                    />
                    <ReportCard 
                        title="Total Outflow" 
                        value={formatCurrency(reportData?.expense || 0)} 
                        trend="Total Expenses"
                        trendType="down"
                        icon={<TrendingDown size={20} />} 
                        color="rose"
                    />
                    <ReportCard 
                        title="Recovery Rate" 
                        value={reportData?.totalDisbursed ? `${Math.round((reportData.totalCollected / reportData.totalDisbursed) * 100)}%` : "0%"} 
                        trend="Collection"
                        trendType="neutral"
                        icon={<BarChart3 size={20} />} 
                        color="amber"
                    />
                </div>

                {/* Charts & Visualization Section */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    
                    {/* Cash Flow Analysis Chart */}
                    <div className="lg:col-span-8 bg-white rounded-[2.5rem] shadow-xl border border-gray-50 p-10">
                        <div className="flex items-center justify-between mb-10">
                            <div>
                                <h3 className="text-xl font-black text-gray-900 tracking-tight">Cash Flow Dynamics</h3>
                                <p className="text-sm text-gray-400 font-medium">Monthly Inflow vs Outflow analysis</p>
                            </div>
                            <div className="flex items-center gap-6">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 bg-indigo-500 rounded-full"></div>
                                    <span className="text-xs font-bold text-gray-500">Inflow</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 bg-rose-400 rounded-full"></div>
                                    <span className="text-xs font-bold text-gray-500">Outflow</span>
                                </div>
                            </div>
                        </div>
                        <div className="h-[400px] w-full">
                            {cashFlowData.length > 0 ? (
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={cashFlowData}>
                                        <defs>
                                            <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                                                <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                                            </linearGradient>
                                            <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#fb7185" stopOpacity={0.1}/>
                                                <stop offset="95%" stopColor="#fb7185" stopOpacity={0}/>
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                        <XAxis 
                                            dataKey="name" 
                                            axisLine={false} 
                                            tickLine={false} 
                                            tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 600}} 
                                            dy={10}
                                        />
                                        <YAxis 
                                            axisLine={false} 
                                            tickLine={false} 
                                            tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 600}}
                                        />
                                        <Tooltip 
                                            contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                                        />
                                        <Area type="monotone" dataKey="income" stroke="#6366f1" strokeWidth={4} fillOpacity={1} fill="url(#colorIncome)" />
                                        <Area type="monotone" dataKey="expense" stroke="#fb7185" strokeWidth={4} fillOpacity={1} fill="url(#colorExpense)" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            ) : (
                                <div className="h-full flex items-center justify-center text-gray-400 italic">No historical data available yet</div>
                            )}
                        </div>
                    </div>

                    {/* Loan Distribution Side Section */}
                    <div className="lg:col-span-4 flex flex-col gap-8">
                        
                        {/* Status Distribution Pie */}
                        <div className="bg-white rounded-[2.5rem] shadow-xl border border-gray-50 p-8 flex-1">
                            <h3 className="text-lg font-black text-gray-900 tracking-tight mb-8">Portfolio Health</h3>
                            <div className="h-[200px] w-full relative">
                                {distribution.length > 0 ? (
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={distribution}
                                                innerRadius={60}
                                                outerRadius={80}
                                                paddingAngle={8}
                                                dataKey="count"
                                            >
                                                {distribution.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                ))}
                                            </Pie>
                                            <Tooltip />
                                        </PieChart>
                                    </ResponsiveContainer>
                                ) : (
                                    <div className="h-full flex items-center justify-center text-gray-300"><PieIcon size={48} /></div>
                                )}
                                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                                    <span className="text-2xl font-black text-gray-900">{reportData?.loanCount || 0}</span>
                                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Total Loans</span>
                                </div>
                            </div>
                            <div className="space-y-3 mt-8">
                                {distribution.map((item, index) => (
                                    <div key={item._id} className="flex items-center justify-between p-3 bg-slate-50/50 rounded-2xl border border-white">
                                        <div className="flex items-center gap-3">
                                            <div className="w-2 h-2 rounded-full" style={{backgroundColor: COLORS[index % COLORS.length]}}></div>
                                            <span className="text-xs font-bold text-gray-600">{item._id}</span>
                                        </div>
                                        <span className="text-xs font-black text-gray-900">{item.count}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Liquidity Comparison Card */}
                        <div className="bg-indigo-600 rounded-[2.5rem] shadow-xl p-8 text-white relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-150 duration-700"></div>
                            
                            <h3 className="text-lg font-bold mb-6 relative z-10 flex items-center gap-2">
                                <Landmark size={20} />
                                Liquidity Ratio
                            </h3>
                            
                            <div className="space-y-4 relative z-10">
                                <div>
                                    <div className="flex justify-between text-xs font-bold mb-2 opacity-80 uppercase tracking-widest">
                                        <span>Capital Recovered</span>
                                        <span>{reportData?.totalDisbursed ? Math.round((reportData.totalCollected / reportData.totalDisbursed) * 100) : 0}%</span>
                                    </div>
                                    <div className="h-2 w-full bg-white/20 rounded-full overflow-hidden">
                                        <div 
                                            className="h-full bg-white rounded-full" 
                                            style={{width: `${reportData?.totalDisbursed ? (reportData.totalCollected / reportData.totalDisbursed) * 100 : 0}%`}}
                                        ></div>
                                    </div>
                                </div>
                                
                                <div className="pt-4 border-t border-white/10 flex justify-between items-center">
                                    <div className="text-[10px] font-black uppercase tracking-widest opacity-60">Status</div>
                                    <div className="px-3 py-1 bg-white/20 rounded-full text-[10px] font-black tracking-widest uppercase">
                                        {reportData?.totalDisbursed && (reportData.totalCollected / reportData.totalDisbursed) > 0.8 ? 'Excellent' : 'Healthy'}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const ReportCard = ({ title, value, trend, trendType, icon, color }: any) => {
    const colors: any = {
        indigo: "bg-indigo-50 text-indigo-600 border-indigo-100",
        emerald: "bg-emerald-50 text-emerald-600 border-emerald-100",
        rose: "bg-rose-50 text-rose-600 border-rose-100",
        amber: "bg-amber-50 text-amber-600 border-amber-100",
    };

    return (
        <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-gray-50 transition-all duration-500 hover:shadow-2xl relative overflow-hidden group">
            <div className={`absolute top-0 right-0 w-24 h-24 -mr-8 -mt-8 rounded-full opacity-5 transition-transform group-hover:scale-150 duration-700 ${colors[color].split(' ')[0]}`}></div>
            
            <div className="flex items-center justify-between mb-6 relative z-10">
                <div className={`p-4 rounded-2xl ${colors[color]}`}>
                    {icon}
                </div>
                {trend && (
                    <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                        trendType === 'up' ? 'bg-emerald-50 text-emerald-600' : 
                        trendType === 'down' ? 'bg-rose-50 text-rose-600' : 'bg-gray-50 text-gray-400'
                    }`}>
                        {trendType === 'up' ? <ArrowUpRight size={12} /> : trendType === 'down' ? <ArrowDownRight size={12} /> : null}
                        {trend}
                    </div>
                )}
            </div>

            <div className="relative z-10">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{title}</p>
                <p className="text-3xl font-black text-gray-900 tracking-tighter">{value}</p>
            </div>
        </div>
    );
};

export default ReportsPage;