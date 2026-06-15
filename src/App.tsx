/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { 
  Server, 
  Cpu, 
  Globe, 
  LineChart, 
  Layers, 
  RefreshCw, 
  Flame, 
  ChevronRight, 
  Lock,
  Volume2,
  ShieldCheck,
  CheckCircle,
  Clock
} from "lucide-react";
import ThreeCanvas from "./components/ThreeCanvas";
import TelemetryMatrix from "./components/TelemetryMatrix";
import FeatureGrid from "./components/FeatureGrid";
import InteractiveWorkflow from "./components/InteractiveWorkflow";
import BiometricAvatarInterface from "./components/BiometricAvatarInterface";
import BrandLogo from "./components/BrandLogo";
import { FaceProfile, PRESET_PROFILES } from "./types";

export default function App() {
  const [selectedProfile, setSelectedProfile] = useState<FaceProfile>(PRESET_PROFILES[0]);
  const [latencyTime, setLatencyTime] = useState("1.4ms");
  const [currentUtcTime, setCurrentUtcTime] = useState("");
  const [voiceSyncing, setVoiceSyncing] = useState(false);
  const [audioWaves, setAudioWaves] = useState<number[]>([30, 45, 20, 60, 15, 40, 75, 40, 65, 30, 20, 42, 58, 25, 10]);

  // Handle UTC tracker time and latency shifts
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentUtcTime(now.toISOString().replace("T", " // ").substring(0, 21));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);

    const latencyInterval = setInterval(() => {
      const randomLatency = (1.2 + Math.random() * 0.5).toFixed(1);
      setLatencyTime(`${randomLatency}ms`);
    }, 4000);

    return () => {
      clearInterval(interval);
      clearInterval(latencyInterval);
    };
  }, []);

  // Sync vocal frequency waveform oscillations
  useEffect(() => {
    let wavesInterval: NodeJS.Timeout;
    if (voiceSyncing) {
      wavesInterval = setInterval(() => {
        setAudioWaves(Array.from({ length: 15 }, () => Math.floor(10 + Math.random() * 80)));
      }, 120);
    } else {
      setAudioWaves([20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20]);
    }
    return () => clearInterval(wavesInterval);
  }, [voiceSyncing]);

  return (
    <div className="relative min-h-screen bg-[#020202] text-[#F5F5F7] overflow-x-hidden selection:bg-viral-red selection:text-white font-sans antialiased">
      
      {/* 3D WEBGL GRAPHICS CANVAS BACKGROUND */}
      <ThreeCanvas />

      {/* BACKGROUND POINT-CLOUD SIMULATION DEPTH LAYER */}
      <div className="absolute inset-0 z-0 point-cloud opacity-40 pointer-events-none" />

      {/* FIXED GLASS HUD NAV BLOCK */}
      <header className="fixed top-0 inset-x-0 z-50 glass-panel border-b border-white/[0.04] bg-black/60 backdrop-blur-md px-6 md:px-12 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Logo Brand Anchor */}
          <a href="#" className="flex items-center hover:opacity-90 transition-opacity">
            <BrandLogo size="md" />
          </a>

          {/* Center navigation links matching landing architecture */}
          <nav className="hidden lg:flex items-center gap-8 text-[11px] font-mono tracking-widest text-gray-400 uppercase">
            <a href="#three-layer-container" className="hover:text-viral-red transition-all duration-300">SYSTEMAP</a>
            <a href="#system-telemetry-section" className="hover:text-viral-red transition-all duration-300">TELEMETRY</a>
            <a href="#money-moves-section" className="hover:text-viral-red transition-all duration-300">ADVANTAGE</a>
            <a href="#workflow-section" className="hover:text-viral-red transition-all duration-300">WORKFLOW</a>
          </nav>

          {/* Right hand HUD system statistics tags */}
          <div className="flex items-center gap-4 text-[10px] font-mono">
            <a 
              href="#workflow-section"
              className="bg-viral-red/10 border border-viral-red/30 px-4 py-2 rounded font-bold text-white hover:bg-neutral-100 hover:text-black hover:border-white transition-all cursor-pointer text-[10px]"
            >
              LAUNCH PIPELINE
            </a>
          </div>

        </div>
      </header>

      {/* OVERLAY SCROLLABLE LAYOUT CONTENT (Z-INDEX: 10) */}
      <main className="relative z-10 w-full">
        
        {/* SECTION A: THE SPLIT-SCREEN HERO VIEWPORT */}
        <section className="min-h-screen pt-32 pb-20 flex items-center relative overflow-hidden">
          
          {/* Subtle grid helper overlay */}
          <div className="absolute inset-0 bg-transparent bg-[radial-gradient(circle_at_30%_30%,rgba(255,59,48,0.02),transparent)] z-0 pointer-events-none" />

          {/* Responsive 12-column Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center px-6 md:px-12 lg:px-24 gap-12 relative w-full h-full max-w-7xl mx-auto z-10">
            
            {/* CONTENT AREA (lg:col-span-5) */}
            <div className="lg:col-span-5 flex flex-col items-start text-left space-y-6">
              
              {/* Monospace Tags wrapped in thin red borders */}
              <div className="flex flex-wrap gap-2 animate-fadeIn">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-viral-red border border-viral-red/40 px-3 py-1 rounded bg-viral-red/5">
                  [SHOUTOUT.TOOL.AI]
                </span>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-viral-red border border-viral-red/40 px-3 py-1 rounded bg-viral-red/5">
                  [SHORTFORM.PROD]
                </span>
              </div>

              {/* Headline from image_37ce06.jpg */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-extrabold tracking-tighter text-white uppercase leading-none">
                Your AI Clone Posts. <br />
                <span className="text-viral-red text-glow">You Get Paid.</span> <br />
                No Cap.
              </h1>

              {/* Robust high-performance descriptive paragraphs */}
              <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-lg">
                We don't just clone you; we build your empire. Deploy high-fidelity neural avatars that work 24/7 across every major platform representing your brand and style, capturing high-impact sponsorship opportunities while you live your life.
              </p>

              {/* CTA Action button capsule with smooth swipe color layer transition on hover */}
              <div className="w-full sm:w-auto pt-4">
                <a
                  href="#workflow-section"
                  className="group relative w-full sm:w-auto inline-flex items-center justify-center overflow-hidden rounded-full border border-viral-red p-0.5 font-bold text-white transition-all duration-300"
                >
                  {/* Hover swipe layer accent */}
                  <span className="absolute inset-0 h-full w-full bg-gradient-to-r from-red-600 to-viral-red opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
                  
                  <span className="relative block w-full sm:w-auto bg-[#020202] rounded-full px-8 py-4 text-xs font-mono uppercase tracking-widest text-center transition-all group-hover:bg-transparent">
                    CLONE YOURSELF & SECURE THE BAG &gt;
                  </span>
                </a>
              </div>

              {/* Embedded numeric micro status panel */}
              <div id="hero-quick-stats" className="grid grid-cols-3 gap-6 pt-8 mt-6 border-t border-white/5 w-full font-mono text-[11px] text-gray-500">
                <div className="space-y-1">
                  <span className="block uppercase text-[9px] text-gray-600">INJECT_SUB_OK</span>
                  <strong className="text-white">6 CITY CORES</strong>
                </div>
                <div className="space-y-1">
                  <span className="block uppercase text-[9px] text-gray-600">ACTIVE PROXIES</span>
                  <strong className="text-white">100% NOMINAL</strong>
                </div>
                <div className="space-y-1">
                  <span className="block uppercase text-[9px] text-gray-600">SYNC CYCLE</span>
                  <strong className="text-viral-red text-glow">24/7 AUTO</strong>
                </div>
              </div>

            </div>

            {/* VISUAL PANEL AREA (lg:col-span-7) */}
            {/* Renders interactive biometric mesh coordinate mock & neural synthesizer simulation */}
            <div className="lg:col-span-7 w-full flex justify-center">
              <BiometricAvatarInterface selectedProfile={selectedProfile} setSelectedProfile={setSelectedProfile} />
            </div>

          </div>
        </section>

        {/* SECTION B: REAL-TIME OPERATIONS RUNTIME TICKER */}
        <div id="operations-marquee" className="w-full bg-viral-red py-3 relative overflow-hidden z-20">
          <div className="flex whitespace-nowrap overflow-hidden">
            
            {/* Double copies to generate infinite continuous marquee loop */}
            <div className="flex gap-16 text-xs font-mono font-black tracking-widest text-[#020202] uppercase animate-marquee shrink-0">
              <span>SCRIPT GENERATION</span>
              <span>◆</span>
              <span>HIGH-FIDELITY AUDIO CLONING</span>
              <span>◆</span>
              <span>AUTOMATED VIDEO EDITING ENGINE</span>
              <span>◆</span>
              <span>MULTI-CHANNEL AUTO-SCHEDULING</span>
              <span>◆</span>
              <span>PROGRAMMATIC BRAND MATCHMAKING</span>
              <span>◆</span>
              <span>24/7 NETWORK DEPLOYMENT</span>
              <span>◆</span>
              <span>SCALE WITHOUT CAMERA FATIGUE</span>
              <span>◆</span>
            </div>

            <div className="flex gap-16 text-xs font-mono font-black tracking-widest text-[#020202] uppercase animate-marquee shrink-0">
              <span>SCRIPT GENERATION</span>
              <span>◆</span>
              <span>HIGH-FIDELITY AUDIO CLONING</span>
              <span>◆</span>
              <span>AUTOMATED VIDEO EDITING ENGINE</span>
              <span>◆</span>
              <span>MULTI-CHANNEL AUTO-SCHEDULING</span>
              <span>◆</span>
              <span>PROGRAMMATIC BRAND MATCHMAKING</span>
              <span>◆</span>
              <span>24/7 NETWORK DEPLOYMENT</span>
              <span>◆</span>
              <span>SCALE WITHOUT CAMERA FATIGUE</span>
              <span>◆</span>
            </div>

          </div>
        </div>

        {/* SECTION C: SYSTEM TELEMETRY & APP CONTROL PANEL */}
        <TelemetryMatrix />

        {/* SECTION D: "THE MONEY MOVES" ASYMMETRIC FLUID GRID */}
        <FeatureGrid />

        {/* SECTION E: THE 3-STEP ATOMIC WORKFLOW PIPELINE */}
        <InteractiveWorkflow selectedProfile={selectedProfile} />

        {/* SECTION F: BRAND STACK & COMPLIANCE FOOTER */}
        
        {/* CLOSING BANNER JAW DROPPER */}
        <section className="py-8 px-6 md:px-16 text-center relative z-10 w-full bg-transparent overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,59,48,0.03),transparent)] pointer-events-none" />
          
          <div className="max-w-4xl mx-auto glass-panel p-8 md:p-16 rounded-2xl relative border-t-4 border-t-viral-red mt-2">
            <span className="text-[10px] font-mono text-viral-red font-bold uppercase tracking-widest block mb-4">
              [ SECURE ACCESS VECTOR ]
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-extrabold text-white uppercase tracking-tighter mb-4">
              The Future Won't Post Itself.
            </h2>
            <p className="text-sm md:text-base text-gray-400 max-w-xl mx-auto mb-8">
              Take complete control of your timeline. Outperform standard creation bottlenecks and deploy high-fidelity clones across YouTube, Reels, and TikTok instantly.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#workflow-section"
                className="bg-viral-red text-white py-4 px-10 rounded-full font-mono text-xs font-black tracking-widest hover:bg-neutral-100 hover:text-black hover:border-white border border-viral-red transition-all cursor-pointer shadow-[0_0_20px_#ff3b3030]"
              >
                SECURE YOUR AI CLONE NOW
              </a>
            </div>
            
            <div className="flex justify-center items-center gap-2 mt-8 text-[10px] font-mono text-gray-500">
              <Lock className="w-3.5 h-3.5" />
              <span>SECURED INGESTION // AES-256 ENCRYED DNA DATABASES</span>
            </div>
          </div>
        </section>

        {/* COMPLIANCE FOOTER */}
        <footer className="w-full bg-[#030303] border-t border-white/[0.04] py-16 px-6 md:px-12 lg:px-24 relative z-10">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 text-left">
            
            {/* Col 1: Brand & Desc */}
            <div className="md:col-span-4 space-y-4">
              <div className="flex items-center">
                <BrandLogo size="md" />
              </div>
              <p className="text-xs text-gray-500 leading-relaxed max-w-sm">
                Next-generation synthetic influencer matrix. We compile your voice, look, and intellect into multi-million viewer pipelines, delivering scalable programmatic brand presence with no fatigue.
              </p>
            </div>

            {/* Col 2: Badges for core frameworks requested */}
            <div className="md:col-span-5 space-y-4">
              <h4 className="text-[10px] font-mono text-gray-400 uppercase tracking-widest font-semibold pb-1 border-b border-white/5">
                CORE FRAMEWORK ENGINES
              </h4>
              <div className="flex flex-wrap gap-2 pt-1">
                <span className="text-[10px] font-mono text-gray-400 bg-white/[0.03] border border-white/[0.08] px-2.5 py-1 rounded">
                  NEXT.JS
                </span>
                <span className="text-[10px] font-mono text-gray-400 bg-white/[0.03] border border-white/[0.08] px-2.5 py-1 rounded">
                  TAILWIND
                </span>
                <span className="text-[10px] font-mono text-gray-400 bg-white/[0.03] border border-white/[0.08] px-2.5 py-1 rounded">
                  THREE.JS
                </span>
                <span className="text-[10px] font-mono text-gray-400 bg-white/[0.03] border border-white/[0.08] px-2.5 py-1 rounded">
                  PYTORCH
                </span>
                <span className="text-[10px] font-mono text-gray-400 bg-white/[0.03] border border-white/[0.08] px-2.5 py-1 rounded">
                  OPENAI
                </span>
                <span className="text-[10px] font-mono text-gray-400 bg-white/[0.03] border border-white/[0.08] px-2.5 py-1 rounded">
                  GSAP
                </span>
              </div>
            </div>

            {/* Col 3: Legal & Corporate Address details requested */}
            <div className="md:col-span-3 space-y-4">
              <h4 className="text-[10px] font-mono text-gray-400 uppercase tracking-widest font-semibold pb-1 border-b border-white/5">
                CORPORATE REGISTER
              </h4>
              <div className="space-y-2 text-[11px] font-mono text-gray-500 leading-relaxed">
                <p className="text-gray-300 font-semibold">MakeItViral Media Tech Pvt. Ltd.</p>
                <p>
                  Corporate Address: 703-A Plaza, Financial District, Gachibowli, Hyderabad, Telangana
                </p>
                <p>
                  Contact Interface:{" "}
                  <a href="mailto:contact@makeitviral.ai" className="text-viral-red hover:underline">
                    contact@makeitviral.ai
                  </a>
                </p>
              </div>
            </div>

          </div>

          <div className="max-w-7xl mx-auto border-t border-white/5 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center text-[10px] font-mono text-gray-500 gap-4">
            <div>
              <span>SYS.DATE // 2026. MAKEITVIRAL.AI. ALL SYSTEMS NOMINAL.</span>
            </div>
            <div className="flex gap-4">
              <a href="#" className="hover:text-white transition-colors">SECURITY ENVELOPE</a>
              <span>•</span>
              <a href="#" className="hover:text-white transition-colors">ALGORITHM AGREEMENT</a>
            </div>
          </div>
        </footer>

      </main>
    </div>
  );
}
