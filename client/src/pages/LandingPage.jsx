import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function LandingPage() {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            // Use localhost:3000 for now, assumes proxy or CORS setup
            const res = await axios.post('http://localhost:3000/api/auth/login', { email, name });
            localStorage.setItem('student', JSON.stringify(res.data));
            navigate('/dashboard');
        } catch (err) {
            console.error(err);
            // Fallback for prototype without backend running
            localStorage.setItem('student', JSON.stringify({ name, email, group: 'EXPERIMENTAL', id: 'mock-id' }));
            navigate('/dashboard');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 text-white p-4">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-blue-500/10 rounded-full blur-[100px]" />
                <div className="absolute top-[40%] -right-[10%] w-[40%] h-[40%] bg-purple-500/10 rounded-full blur-[100px]" />
            </div>

            <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 z-10">
                <div className="space-y-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm">
                        <Sparkles size={16} />
                        <span>Scientific Experiment Platform</span>
                    </div>
                    <h1 className="text-5xl font-bold leading-tight">
                        Software Engineering <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                            Impact Evaluation
                        </span>
                    </h1>
                    <p className="text-gray-400 text-lg">
                        Participate in our study to measure productivity and quality differences between development methodologies.
                        Your contribution helps shape the future of software tools.
                    </p>
                </div>

                <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 p-8 rounded-2xl shadow-xl">
                    <h2 className="text-2xl font-semibold mb-6">Student Registration</h2>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">Full Name</label>
                            <input
                                type="text"
                                required
                                className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                                placeholder="John Doe"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">University Email</label>
                            <input
                                type="email"
                                required
                                className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                                placeholder="jordan@university.edu"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 rounded-lg transition transform active:scale-95 flex items-center justify-center gap-2"
                        >
                            {loading ? 'Processing...' : 'Start Session'}
                            {!loading && <ArrowRight size={18} />}
                        </button>
                    </form>
                    <p className="mt-4 text-xs text-center text-gray-500">
                        By continuing, you consent to the recording of performance metrics for research purposes.
                    </p>
                </div>
            </div>
        </div>
    );
}
