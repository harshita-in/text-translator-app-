import Translator from '../components/Translator';
import RandomStringGenerator from '../components/RandomStringGenerator';

export default function Home() {
    return (
        <div className="min-h-screen relative overflow-hidden bg-slate-900">
            {/* Dynamic Background Elements */}
            <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 -left-4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob"></div>
                <div className="absolute top-0 -right-4 w-96 h-96 bg-yellow-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-8 left-20 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob animation-delay-4000"></div>
            </div>

            <div className="container mx-auto px-4 py-8 relative z-10">
                <header className="mb-20 text-center relative">
                    <div className="inline-block relative">
                        <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-4 text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40 animate-float">
                            OMNI<span className="text-pink-500">.</span>TOOL
                        </h1>
                        <div className="h-2 w-full bg-gradient-to-r from-transparent via-pink-500 to-transparent absolute -bottom-2 opacity-50 blur-sm"></div>
                    </div>

                    <p className="text-lg text-slate-400 max-w-2xl mx-auto font-light leading-relaxed">
                        A next-generation suite of utilities for developers and creators.
                        <span className="text-pink-400 font-medium ml-2">Secure. Fast. Beautiful.</span>
                    </p>
                </header>

                <main className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto items-start">
                    <Translator />
                    <div className="lg:mt-12"> {/* Offset effect */}
                        <RandomStringGenerator />
                    </div>
                </main>
            </div>
        </div>
    );
}
