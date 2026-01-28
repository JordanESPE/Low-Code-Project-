import React, { useState, useEffect } from 'react';
import { humanEvalProblems } from '../data/humanEval';
import axios from 'axios';
import { Clock, CheckCircle, Play, Code, Layout, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
    const [student, setStudent] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [activeTask, setActiveTask] = useState(null); // The task currently being worked on
    const [timer, setTimer] = useState(0);
    const [timerInterval, setTimerInterval] = useState(null);
    const [submission, setSubmission] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const stored = localStorage.getItem('student');
        if (!stored) {
            navigate('/');
            return;
        }
        setStudent(JSON.parse(stored));

        // Load Real HumanEval Dataset
        setTasks(humanEvalProblems);
    }, [navigate]);

    useEffect(() => {
        if (activeTask) {
            const interval = setInterval(() => {
                setTimer(t => t + 1);
            }, 1000);
            setTimerInterval(interval);
            return () => clearInterval(interval);
        }
    }, [activeTask]);

    const startTask = (task) => {
        setActiveTask(task);
        setTimer(0);
        // In real app, call backend to log start time
    };

    const submitTask = () => {
        // In real app, call backend to submit
        alert(`Task Submitted!\nTime: ${formatTime(timer)}\nCode Length: ${submission.length}`);
        clearInterval(timerInterval);
        setActiveTask(null);
        setSubmission('');
    };

    const logout = () => {
        localStorage.removeItem('student');
        navigate('/');
    };

    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s < 10 ? '0' : ''}${s}`;
    };

    if (!student) return null;

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
            {/* Header */}
            <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
                <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
                            L
                        </div>
                        <span className="font-semibold text-lg">LcImpact</span>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="hidden md:flex flex-col items-end">
                            <span className="font-medium text-sm">{student.name}</span>
                            <span className="text-xs text-gray-500 uppercase tracking-wider">{student.group} Group</span>
                        </div>
                        <button onClick={logout} className="p-2 hover:bg-gray-100 rounded-full text-gray-500 transition">
                            <LogOut size={20} />
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 py-8">

                {/* Active Task View */}
                {activeTask ? (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-140px)]">
                        {/* Left Panel: Instructions */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col h-full overflow-y-auto">
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-sm font-medium text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
                                    {activeTask.type}
                                </span>
                                <div className="flex items-center gap-2 text-gray-700 font-mono text-xl bg-gray-100 px-3 py-1 rounded-md">
                                    <Clock size={20} />
                                    {formatTime(timer)}
                                </div>
                            </div>
                            <h1 className="text-2xl font-bold mb-4">{activeTask.title}</h1>
                            <div className="prose prose-sm max-w-none text-gray-600 flex-1">
                                <p>{activeTask.description}</p>
                                <h3>Requirements:</h3>
                                <ul>
                                    <li>Complete within {activeTask.durationLimit} minutes.</li>
                                    <li>Ensure functional correctness.</li>
                                </ul>
                                <div className="mt-4 bg-gray-100 p-3 rounded-lg overflow-x-auto">
                                    <pre className="text-xs font-mono text-gray-800">{activeTask.prompt}</pre>
                                </div>
                            </div>
                            <button
                                onClick={() => setActiveTask(null)}
                                className="mt-6 text-gray-500 text-sm hover:underline"
                            >
                                Cancel Task
                            </button>
                        </div>

                        {/* Right Panel: Workspace */}
                        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col h-full">
                            <div className="border-b border-gray-200 px-4 py-3 bg-gray-50 flex items-center justify-between rounded-t-xl">
                                <span className="font-medium text-sm text-gray-600 flex items-center gap-2">
                                    <Code size={16} /> Workspace
                                </span>
                            </div>
                            <div className="flex-1 p-4 bg-gray-900">
                                <textarea
                                    className="w-full h-full bg-transparent text-gray-300 font-mono text-sm resize-none focus:outline-none"
                                    placeholder="// Write your code or solution link here..."
                                    value={submission}
                                    onChange={(e) => setSubmission(e.target.value)}
                                />
                            </div>
                            <div className="border-t border-gray-200 p-4 bg-gray-50 rounded-b-xl flex justify-end">
                                <button
                                    onClick={submitTask}
                                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition flex items-center gap-2"
                                >
                                    <CheckCircle size={18} />
                                    Submit Solution
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    /* Task List View */
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold text-gray-800">Available Tasks</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {tasks.map(task => (
                                <div key={task.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition group">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="bg-blue-100 text-blue-700 p-3 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                                            {task.type === 'LOW_CODE' ? <Layout size={24} /> : <Code size={24} />}
                                        </div>
                                        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                                            {task.durationLimit} Min Limit
                                        </span>
                                    </div>
                                    <h3 className="text-xl font-bold mb-2">{task.title}</h3>
                                    <p className="text-gray-500 text-sm mb-6 line-clamp-2">{task.description}</p>
                                    <button
                                        onClick={() => startTask(task)}
                                        className="w-full py-3 rounded-lg border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 hover:border-gray-300 transition flex items-center justify-center gap-2"
                                    >
                                        <Play size={16} />
                                        Start Assessment
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
