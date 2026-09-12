import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';

export default function AiModels({ auth, models, currentModelId, flash }) {
    const [submitting, setSubmitting] = useState(false);

    const selectModel = (id) => {
        setSubmitting(id);
        router.post(route('ai-models.select'), { ai_model_id: id }, {
            preserveScroll: true,
            onFinish: () => {
                setSubmitting(false);
                localStorage.removeItem('ai_quota_reset_time');
            },
        });
    };

    return (
        <AuthenticatedLayout auth={auth}>
            <Head title="AI Models" />
            <div className="py-12 bg-gray-50/50 dark:bg-gray-900/50 min-h-screen">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-10 text-center">
                        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-3">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">AI Model Library</span>
                        </h1>
                        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                            Select the intelligence engine powering your VIRA experience. Upgrading or switching models will immediately apply to all new tasks.
                        </p>
                    </div>

                    {flash?.success && (
                        <div className="mb-8 p-4 bg-green-50/80 backdrop-blur-md border border-green-200 text-green-700 rounded-2xl animate-fade-in-down w-full max-w-md mx-auto text-center shadow-lg">
                            {flash.success}
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {models.map((model) => {
                            // If currentModelId is null, we assume the first available model might be default, but let's just use exact match
                            const isCurrent = currentModelId === model.id;
                            const isDisabled = !model.is_available;

                            return (
                                <div
                                    key={model.id}
                                    className={`relative group rounded-3xl overflow-hidden transition-all duration-500 will-change-transform
                                        ${isDisabled ? 'opacity-60 cursor-not-allowed grayscale-[40%]' : 'hover:-translate-y-2 cursor-pointer'} 
                                        ${isCurrent ? 'ring-2 ring-indigo-500 ring-offset-4 dark:ring-offset-gray-900 shadow-xl shadow-indigo-200/50 dark:shadow-indigo-900/50' : 'hover:shadow-2xl hover:shadow-gray-200/50 dark:hover:shadow-black/50'}
                                    `}
                                    onClick={() => {
                                        if (!isDisabled && !isCurrent && !submitting) {
                                            selectModel(model.id);
                                        }
                                    }}
                                >
                                    {/* Glassmorphism Background */}
                                    <div className="absolute inset-0 bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border border-white/20 dark:border-gray-700/30"></div>
                                    
                                    {/* Gradient Hover Glow */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                                    <div className="relative p-8 h-full flex flex-col">
                                        <div className="flex justify-between items-start mb-6">
                                            <div className="flex items-center space-x-3">
                                                <div className="bg-indigo-100 dark:bg-indigo-900/50 p-3 rounded-2xl text-indigo-600 dark:text-indigo-400">
                                                    {model.provider.toLowerCase() === 'google' ? (
                                                        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                                        </svg>
                                                    ) : model.provider.toLowerCase() === 'openai' ? (
                                                        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                                                        </svg>
                                                    ) : (
                                                        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                                                        </svg>
                                                    )}
                                                </div>
                                                <div>
                                                    <span className="text-xs font-bold uppercase tracking-wider text-indigo-500 dark:text-indigo-400">
                                                        {model.provider}
                                                    </span>
                                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white capitalize">
                                                        {model.name}
                                                    </h3>
                                                </div>
                                            </div>
                                            
                                            {isCurrent && (
                                                <span className="flex items-center text-xs font-semibold text-green-700 dark:text-green-400 bg-green-100/80 dark:bg-green-900/30 px-3 py-1 rounded-full border border-green-200 dark:border-green-800/50 shadow-sm backdrop-blur-sm">
                                                    Active
                                                </span>
                                            )}
                                        </div>
                                        
                                        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-8 flex-grow">
                                            {model.description || 'Advanced generative model for dynamic problem solving.'}
                                        </p>

                                        <div className="mt-auto border-t border-gray-100 dark:border-gray-700/50 pt-6">
                                            {isDisabled ? (
                                                <div className="text-gray-500 dark:text-gray-400 text-sm font-medium flex items-center justify-center bg-gray-100/50 dark:bg-gray-800/50 rounded-xl py-3 border border-gray-200 dark:border-gray-700 backdrop-blur-sm">
                                                    <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                                                    {model.disabled_reason || 'Not available'}
                                                </div>
                                            ) : (
                                                <button 
                                                    className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 ${
                                                        isCurrent 
                                                            ? 'bg-transparent text-indigo-600 dark:text-indigo-400 border-2 border-indigo-200 dark:border-indigo-800/50' 
                                                            : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-600/30 hover:shadow-indigo-600/50'
                                                    }`}
                                                    disabled={isCurrent || submitting === model.id}
                                                >
                                                    {submitting === model.id ? 'Connecting...' : isCurrent ? 'Currently Active' : 'Select Model'}
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
