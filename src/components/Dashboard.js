import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const Dashboard = ({ jobs }) => {
    const statusData = [
        { name: 'Applied', value: jobs.filter(j => j.status === 'Applied').length },
        { name: 'Interviewing', value: jobs.filter(j => j.status === 'Interviewing').length },
        { name: 'Offer', value: jobs.filter(j => j.status === 'Offer').length },
        { name: 'Rejected', value: jobs.filter(j => j.status === 'Rejected').length },
        { name: 'Wishlist', value: jobs.filter(j => j.status === 'Wishlist').length },
    ].filter(d => d.value > 0);

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF'];

    const applicationsByMonth = jobs.reduce((acc, job) => {
        if (job.dateApplied) {
            const month = new Date(job.dateApplied).toLocaleString('default', { month: 'short', year: 'numeric' });
            if (!acc[month]) {
                acc[month] = 0;
            }
            acc[month]++;
        }
        return acc;
    }, {});

    const barChartData = Object.keys(applicationsByMonth).map(month => ({
        name: month,
        applications: applicationsByMonth[month]
    })).sort((a, b) => new Date(a.name) - new Date(b.name));


    if (jobs.length === 0) {
        return (
            <div className="text-center text-gray-500 p-10">
                <h2 className="text-2xl font-semibold mb-2">Welcome to your Dashboard!</h2>
                <p>No job applications added yet. Add a job to see your stats here.</p>
            </div>
        );
    }

    return (
        <div className="p-4 md:p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h2>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-md">
                    <h3 className="text-xl font-semibold text-gray-700 mb-4">Application Status</h3>
                    <div style={{ width: '100%', height: 300 }}>
                        <ResponsiveContainer>
                            <PieChart>
                                <Pie data={statusData} cx="50%" cy="50%" labelLine={false} outerRadius={100} fill="#8884d8" dataKey="value" nameKey="name" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                                    {statusData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                <div className="lg:col-span-3 bg-white p-6 rounded-xl shadow-md">
                    <h3 className="text-xl font-semibold text-gray-700 mb-4">Application Timeline</h3>
                    <div style={{ width: '100%', height: 300 }}>
                        <ResponsiveContainer>
                            <BarChart data={barChartData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis allowDecimals={false} />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="applications" fill="#82ca9d" name="Applications per month" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
