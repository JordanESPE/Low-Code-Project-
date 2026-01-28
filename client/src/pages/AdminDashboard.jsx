import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Users, Timer, CheckCircle } from 'lucide-react';

const mockData = [
    { name: 'Task 1 (Simple)', highCode: 25, lowCode: 10 },
    { name: 'Task 2 (Complex)', highCode: 45, lowCode: 15 },
    { name: 'Task 3 (Data)', highCode: 30, lowCode: 12 },
];

export default function AdminDashboard() {
    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 font-sans p-8">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Experiment Results</h1>
                <p className="text-gray-500">Comparative analysis of Low-Code vs. High-Code impact.</p>
            </header>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex items-center gap-4">
                    <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
                        <Users size={24} />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 font-medium">Total Participants</p>
                        <p className="text-2xl font-bold">24</p>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex items-center gap-4">
                    <div className="p-3 bg-green-100 text-green-600 rounded-lg">
                        <Timer size={24} />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 font-medium">Avg. Time Saved</p>
                        <p className="text-2xl font-bold text-green-600">65%</p>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex items-center gap-4">
                    <div className="p-3 bg-purple-100 text-purple-600 rounded-lg">
                        <CheckCircle size={24} />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 font-medium">Completion Rate</p>
                        <p className="text-2xl font-bold">92%</p>
                    </div>
                </div>
            </div>

            {/* Main Chart */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-8">
                <h2 className="text-xl font-bold mb-6">Productivity Comparison (Minutes per Task)</h2>
                <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={mockData}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip
                                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                            />
                            <Legend />
                            <Bar dataKey="highCode" name="High-Code (Traditional)" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                            <Bar dataKey="lowCode" name="Low-Code (Experimental)" fill="#10b981" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Recent Submissions Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                    <h2 className="text-lg font-bold">Recent Submissions</h2>
                </div>
                <table className="w-full text-left">
                    <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                        <tr>
                            <th className="px-6 py-3">Student</th>
                            <th className="px-6 py-3">Group</th>
                            <th className="px-6 py-3">Task</th>
                            <th className="px-6 py-3">Time</th>
                            <th className="px-6 py-3">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        <tr>
                            <td className="px-6 py-4 font-medium">Jordan Guaman</td>
                            <td className="px-6 py-4"><span className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-xs">Low-Code</span></td>
                            <td className="px-6 py-4">Truncate Number</td>
                            <td className="px-6 py-4">4m 12s</td>
                            <td className="px-6 py-4 text-green-600 text-sm">Completed</td>
                        </tr>
                        <tr>
                            <td className="px-6 py-4">Maria Rodriguez</td>
                            <td className="px-6 py-4"><span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">High-Code</span></td>
                            <td className="px-6 py-4">Has Close Elements</td>
                            <td className="px-6 py-4">12m 45s</td>
                            <td className="px-6 py-4 text-green-600 text-sm">Completed</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
