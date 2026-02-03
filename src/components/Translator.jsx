import { useState, useEffect } from 'react';
import { ArrowsRightLeftIcon, LanguageIcon, KeyIcon } from '@heroicons/react/24/outline'; // Need to install heroicons or use SVGs

// Custom SVG Icons to avoid installing new package if not needed, but for "More UI" let's use refined standard SVGs
const SwapIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
    </svg>
);

const TranslatorIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="m10.5 21 5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 0 1 6-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 0 1-3.827-5.802" />
    </svg>
);

export default function Translator() {
    const [text, setText] = useState('');
    const [translatedText, setTranslatedText] = useState('');
    const [sourceLang, setSourceLang] = useState('en');
    const [targetLang, setTargetLang] = useState('es');
    const [isLoading, setIsLoading] = useState(false);
    const [apiKey, setApiKey] = useState('');
    const [error, setError] = useState('');

    // Debounce
    useEffect(() => {
        const timer = setTimeout(() => {
            if (text && apiKey) handleTranslate();
        }, 1200);
        return () => clearTimeout(timer);
    }, [text, sourceLang, targetLang]);

    const handleTranslate = async () => {
        if (!text || !apiKey) return;
        setIsLoading(true);
        setError('');

        const options = {
            method: 'POST',
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'X-RapidAPI-Key': apiKey,
                'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com'
            },
            body: new URLSearchParams({ q: text, target: targetLang, source: sourceLang })
        };

        try {
            const response = await fetch('https://google-translate1.p.rapidapi.com/language/translate/v2', options);
            const data = await response.json();
            if (response.ok) {
                setTranslatedText(data.data.translations[0].translatedText);
            } else {
                setError(data.message || 'Translation failed');
            }
        } catch (err) {
            setError('Check Internet or API Key');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="glass-card rounded-3xl p-1 shadow-2xl transition-transform hover:-translate-y-1 duration-500">
            <div className="bg-gradient-to-br from-white/5 to-white/0 rounded-[22px] p-6 h-full flex flex-col">
                {/* Header */}
                <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4">
                    <div className="p-3 bg-blue-500/20 rounded-xl text-blue-400">
                        <TranslatorIcon />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-white tracking-wide">AI Translator</h2>
                        <p className="text-xs text-gray-400 font-medium tracking-wider uppercase">Powered by Google Cloud</p>
                    </div>
                </div>

                {/* API Key Input */}
                <div className="relative mb-6 group">
                    <input
                        type="password"
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
                        className="w-full bg-black/40 border border-white/5 rounded-lg pl-10 pr-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500/50 transition-colors"
                        placeholder="Paste RapidAPI Key here..."
                    />
                    <div className="absolute left-3 top-2.5 text-gray-500 group-focus-within:text-blue-400 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                            <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
                        </svg>
                    </div>
                </div>

                {/* Translation Body */}
                <div className="flex flex-col gap-4 flex-1">
                    {/* Language Controls */}
                    <div className="grid grid-cols-[1fr,auto,1fr] gap-3 items-center">
                        <div className="relative">
                            <select
                                value={sourceLang}
                                onChange={(e) => setSourceLang(e.target.value)}
                                className="w-full appearance-none bg-blue-500/10 border border-blue-500/20 rounded-xl px-4 py-3 text-sm font-medium text-blue-200 focus:outline-none hover:bg-blue-500/20 cursor-pointer transition-colors"
                            >
                                <option className="bg-slate-800" value="en">English</option>
                                <option className="bg-slate-800" value="es">Spanish</option>
                                <option className="bg-slate-800" value="fr">French</option>
                                <option className="bg-slate-800" value="de">German</option>
                            </select>
                        </div>

                        <button
                            onClick={() => { const t = sourceLang; setSourceLang(targetLang); setTargetLang(t); }}
                            className="p-2.5 bg-white/5 rounded-full text-gray-400 hover:text-white hover:bg-white/10 hover:rotate-180 transition-all duration-300"
                        >
                            <SwapIcon />
                        </button>

                        <div className="relative">
                            <select
                                value={targetLang}
                                onChange={(e) => setTargetLang(e.target.value)}
                                className="w-full appearance-none bg-purple-500/10 border border-purple-500/20 rounded-xl px-4 py-3 text-sm font-medium text-purple-200 focus:outline-none hover:bg-purple-500/20 cursor-pointer transition-colors"
                            >
                                <option className="bg-slate-800" value="es">Spanish</option>
                                <option className="bg-slate-800" value="en">English</option>
                                <option className="bg-slate-800" value="fr">French</option>
                                <option className="bg-slate-800" value="de">German</option>
                            </select>
                        </div>
                    </div>

                    {/* Input/Output Group */}
                    <div className="flex flex-col gap-0.5 rounded-2xl overflow-hidden border border-white/10">
                        <textarea
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            placeholder="Type something to translate..."
                            className="w-full h-32 bg-black/30 p-5 text-gray-300 placeholder-gray-600 focus:outline-none focus:bg-black/50 transition-colors resize-none"
                        />
                        <div className="h-[1px] bg-white/10 w-full"></div>
                        <div className="relative h-32 bg-black/40">
                            {isLoading ? (
                                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-purple-400/80">
                                    <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                                    <span className="text-xs font-mono uppercase tracking-widest">Translating</span>
                                </div>
                            ) : (
                                <textarea
                                    readOnly
                                    value={translatedText}
                                    placeholder="Translation..."
                                    className="w-full h-full bg-transparent p-5 text-purple-200 placeholder-purple-900/40 focus:outline-none resize-none"
                                />
                            )}
                        </div>
                    </div>

                    {error && (
                        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-red-400 animate-pulse"></div>
                            <span className="text-xs text-red-200">{error}</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
