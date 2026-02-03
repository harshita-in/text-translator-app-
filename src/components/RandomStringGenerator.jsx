import { useState, useCallback, useEffect } from 'react';

// Custom Icons
const SparklesIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
    </svg>
);

const CopyIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5" />
    </svg>
);

export default function RandomStringGenerator() {
    const [length, setLength] = useState(16);
    const [includeNumbers, setIncludeNumbers] = useState(true);
    const [includeSymbols, setIncludeSymbols] = useState(true);
    const [generatedString, setGeneratedString] = useState('');
    const [copied, setCopied] = useState(false);

    const generateString = useCallback(() => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        const numbers = '0123456789';
        const symbols = '!@#$%^&*()_+~`|}{[]\:;?><,./-=';

        let validChars = chars;
        if (includeNumbers) validChars += numbers;
        if (includeSymbols) validChars += symbols;

        let result = '';
        for (let i = 0; i < length; i++) {
            result += validChars.charAt(Math.floor(Math.random() * validChars.length));
        }
        setGeneratedString(result);
        setCopied(false);
    }, [length, includeNumbers, includeSymbols]);

    useEffect(() => {
        generateString();
    }, [generateString]);

    const handleCopy = () => {
        navigator.clipboard.writeText(generatedString);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="glass-card rounded-3xl p-1 shadow-2xl transition-transform hover:-translate-y-1 duration-500">
            <div className="bg-gradient-to-br from-white/5 to-white/0 rounded-[22px] p-6 h-full flex flex-col">
                {/* Header */}
                <div className="flex items-center gap-3 mb-8 border-b border-white/10 pb-4">
                    <div className="p-3 bg-pink-500/20 rounded-xl text-pink-400">
                        <SparklesIcon />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-white tracking-wide">Key Generator</h2>
                        <p className="text-xs text-gray-400 font-medium tracking-wider uppercase">Secure & Random</p>
                    </div>
                </div>

                <div className="flex flex-col gap-6 flex-1">
                    {/* Display Area */}
                    <div className="relative group">
                        <div className="w-full h-32 bg-black/40 rounded-2xl border border-white/10 flex items-center justify-center p-6 text-center cursor-pointer transition-all hover:border-pink-500/30 hover:shadow-[0_0_20px_rgba(236,72,153,0.15)]" onClick={handleCopy}>
                            <p className="font-mono text-2xl md:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-indigo-300 break-all leading-tight">
                                {generatedString}
                            </p>
                        </div>
                        <button
                            onClick={handleCopy}
                            className="absolute top-3 right-3 p-2 text-gray-400 hover:text-white bg-black/50 hover:bg-black/70 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                        >
                            <CopyIcon />
                        </button>
                        {copied && (
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-green-500/90 text-black text-xs font-bold px-3 py-1 rounded-full shadow-lg pointer-events-none animate-in fade-in zoom-in duration-200">
                                COPIED!
                            </div>
                        )}
                    </div>

                    {/* Controls */}
                    <div className="bg-white/5 rounded-2xl p-5 space-y-5 border border-white/5">
                        <div className="space-y-3">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-300">Length</span>
                                <span className="font-mono text-pink-400">{length}</span>
                            </div>
                            <input
                                type="range"
                                min="6"
                                max="64"
                                value={length}
                                onChange={(e) => setLength(Number(e.target.value))}
                                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-pink-500 hover:accent-pink-400 transition-all"
                            />
                        </div>

                        <div className="flex gap-4">
                            <label className="flex-1 flex items-center justify-between p-3 bg-black/20 rounded-xl border border-white/5 cursor-pointer hover:bg-black/40 transition-colors">
                                <span className="text-sm text-gray-300">Numbers</span>
                                <input
                                    type="checkbox"
                                    checked={includeNumbers}
                                    onChange={(e) => setIncludeNumbers(e.target.checked)}
                                    className="w-5 h-5 rounded border-gray-600 text-pink-500 focus:ring-pink-500 bg-gray-700/50"
                                />
                            </label>
                            <label className="flex-1 flex items-center justify-between p-3 bg-black/20 rounded-xl border border-white/5 cursor-pointer hover:bg-black/40 transition-colors">
                                <span className="text-sm text-gray-300">Symbols</span>
                                <input
                                    type="checkbox"
                                    checked={includeSymbols}
                                    onChange={(e) => setIncludeSymbols(e.target.checked)}
                                    className="w-5 h-5 rounded border-gray-600 text-pink-500 focus:ring-pink-500 bg-gray-700/50"
                                />
                            </label>
                        </div>
                    </div>

                    <button
                        onClick={generateString}
                        className="w-full py-4 bg-gradient-to-r from-pink-600 to-purple-600 rounded-xl font-bold tracking-wider uppercase text-sm shadow-lg shadow-pink-900/40 hover:shadow-pink-900/60 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
                    >
                        Generate New Key
                    </button>
                </div>
            </div>
        </div>
    );
}
