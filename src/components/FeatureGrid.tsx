/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { motion } from "motion/react";
import { Sparkles, TrendingUp, Cpu, Youtube, MessageSquare, Zap, BarChart2, Check, Flame, Play, Copy } from "lucide-react";

const GEMINI_SCRIPT_SAMPLES: Record<string, { title: string; hook: string; bridge: string; cta: string; tags: string }> = {
  FINANCE: {
    title: "The Silent Bank Account Trap 💸",
    hook: "Stop leaving ₹1 Lakh sitting in a normal bank account! 90% of young Indians are losing ₹6,000 every single year to inflation...",
    bridge: "Normal savings accounts only pay 2.5-3% interest while inflation runs at 6%. Setting up an auto-sweep takes exactly 2 minutes and instantly doubles your earnings safely.",
    cta: "Comment 'AUTO' below and my AI clone will DM you the step-by-step setup guide!",
    tags: "#PersonalFinance #IndiaMoney #WealthCreation"
  },
  TECH: {
    title: "10x Career Hack with AI 🚀",
    hook: "I did the work of a five-person content agency in under 20 minutes last night. No coding, no expensive setup, just this...",
    bridge: "I used Gemini 3.5 Flash to map out 10 viral hooks, then piped them directly into MakeItViral's voice clones to generate high-retention video files at zero cost.",
    cta: "Tap 'Launch Pipeline' on the top right to start your own AI channel!",
    tags: "#TechHacks #AIIndia #CodingTips"
  },
  LIFESTYLE: {
    title: "Hidden Aesthetic Spot in Mumbai 🌸",
    hook: "Stop wasting money at overpriced designer lifestyle stores in Bangalore or Delhi. This hidden vintage market changed everything...",
    bridge: "They buy outstanding hand-woven fabrics directly from regional artisans and retail them at an 80% discount. Look at the stitching on this jacket...",
    cta: "Comment 'SHOPPING' and my cloned assistant will DM you the exact Maps location!",
    tags: "#LifestyleHacks #IndianVibe #BudgetFinds"
  }
};


// Mock trend dataset for our inline interactive SVG chart
const CHART_SAMPLES = [
  { day: "MON", human: 18, clone: 45, trend: "GROK_SIGNAL_UP" },
  { day: "TUE", human: 22, clone: 88, trend: "REELS_ALGO_BOOST" },
  { day: "WED", human: 15, clone: 140, trend: "HASHTAG_MATCH_PEAK" },
  { day: "THU", human: 34, clone: 210, trend: "VEO_PROD_RENDER_LIVE" },
  { day: "FRI", human: 28, clone: 320, trend: "MAX_AUDIENCE_ENGAGE" },
  { day: "SAT", human: 42, clone: 480, trend: "VIRAL_EXP_NOMINAL" },
  { day: "SUN", human: 39, clone: 610, trend: "PEAK_REVENUE_SPIKE" }
];

export default function FeatureGrid() {
  const [selectedChartDay, setSelectedChartDay] = useState(5); // Saturday active default
  const [activeScriptCategory, setActiveScriptCategory] = useState("FINANCE");
  const [copiedScript, setCopiedScript] = useState(false);

  return (
    <section id="money-moves-section" className="min-h-screen py-24 px-6 md:px-16 lg:px-24 flex flex-col justify-center relative z-10 w-full bg-transparent overflow-hidden">
      {/* Structural system tags in margin */}
      <div className="absolute top-12 left-10 text-white/5 font-mono text-xs hidden lg:block">SYS_SKETCHBOOK_03</div>
      <div className="absolute bottom-12 left-10 text-white/5 font-mono text-xs hidden lg:block">ALGO_DEUX_ACTIVE</div>

      {/* Title */}
      <div className="max-w-4xl mb-16">
        <div className="flex items-center gap-2 mb-3">
          <span className="h-[1px] w-8 bg-viral-red" />
          <span className="text-xs font-mono uppercase tracking-widest text-viral-red font-semibold">02 // STRATEGIC DOMINANCE</span>
        </div>
        <h2 className="text-4xl md:text-6xl font-display font-extrabold tracking-tighter text-white uppercase leading-none">
          THE MONEY MOVES
        </h2>
        <span className="text-xs font-mono text-gray-500 mt-2 block uppercase tracking-wide">SYSTEM INTEGRATION MAP: CORE_TECH_MATRIX</span>
      </div>

      {/* Non-linear overlapping Grid structure */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 max-w-7xl mx-auto w-full items-stretch">
        
        {/* CARD 1: Brand Deals on Autopilot (NODE_03_RE) */}
        <motion.div
          id="node_03_re"
          viewport={{ once: true }}
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.0 }}
          whileHover={{ y: -4 }}
          className="md:col-span-6 lg:col-span-4 glass-panel p-8 rounded-2xl flex flex-col justify-between hover:border-white/10 group transition-all duration-300 relative overflow-hidden"
        >
          <div className="absolute top-4 right-4 text-[9px] font-mono text-viral-red bg-viral-red/10 border border-viral-red/20 px-2 py-0.5 rounded">
            NODE_03_RE
          </div>
          <div>
            <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-viral-red mb-6">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-display font-bold text-white mb-3">Brand Deals on Autopilot</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              We don't just get you views; we get you business. Our AI engine scans your content signature and automatically matches you with premium global brands requesting your exact demographic vibe, generating plug-and-play sponsor briefs immediately.
            </p>
          </div>
          <div className="mt-8 pt-4 border-t border-white/[0.04] text-[10px] font-mono text-gray-500 uppercase flex justify-between items-center">
            <span>AUTOMATED BRIDGES</span>
            <span className="text-emerald-400">ACTIVE DIRECT PIPELINE</span>
          </div>
        </motion.div>

        {/* CARD 2: SoraField & Veo (NODE_02_VX) */}
        <motion.div
          id="node_02_vx"
          viewport={{ once: true }}
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.08 }}
          whileHover={{ y: -4 }}
          className="md:col-span-6 lg:col-span-4 glass-panel p-8 rounded-2xl flex flex-col justify-between hover:border-white/10 group transition-all duration-300 relative overflow-hidden"
        >
          <div className="absolute top-4 right-4 text-[9px] font-mono text-gray-400 bg-white/5 border border-white/10 px-2 py-0.5 rounded">
            NODE_02_VX
          </div>
          <div>
            <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white mb-6">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-display font-bold text-white mb-3">Sora/SoraField & Veo</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Studio-grade high-fidelity synthetic video generation that makes your content look like you had a million-dollar Hollywood camera crew following you around. Powered by localized Pytorch clusters running 24/7 without frame drop boundaries.
            </p>
          </div>
          <div className="mt-8 pt-4 border-t border-white/[0.04] text-[10px] font-mono text-gray-500 uppercase flex justify-between items-center">
            <span>SYNTH_PIPELINE</span>
            <span className="text-gray-400">4K UHD ENCODE</span>
          </div>
        </motion.div>

        {/* CARD 4: Grok & Trends (NODE_04_ST) */}
        <motion.div
          id="node_04_st"
          viewport={{ once: true }}
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.16 }}
          whileHover={{ y: -4 }}
          className="md:col-span-6 lg:col-span-4 glass-panel p-8 rounded-2xl flex flex-col justify-between hover:border-white/10 group transition-all duration-300 relative overflow-hidden"
        >
          <div className="absolute top-4 right-4 text-[9px] font-mono text-gray-400 bg-white/5 border border-white/10 px-2 py-0.5 rounded">
            NODE_04_ST
          </div>
          <div>
            <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white mb-6">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-display font-bold text-white mb-3">Grok & Trends</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              We spot the tea before it spills. By syncing directly into high-frequency global trending layers, we craft responsive video reactions within minutes of a signal rising, ensuring your neural clone is always riding the absolute crest of the traffic wave.
            </p>
          </div>
          <div className="mt-8 pt-4 border-t border-white/[0.04] text-[10px] font-mono text-gray-500 uppercase flex justify-between items-center">
            <span>REAL_TIME_INTEL</span>
            <span className="text-viral-red">MONITOR_ACTIVE</span>
          </div>
        </motion.div>

        {/* CARD 3 (CENTER ANCHOR): The AI Content Multiplier */}
        <motion.div
          id="core_am_001"
          viewport={{ once: true }}
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.12 }}
          className="md:col-span-12 lg:col-span-8 p-1 rounded-2xl bg-gradient-to-br from-viral-red/40 via-transparent to-red-950/20 shadow-[0_0_50px_-12px_rgba(255,59,48,0.3)] relative overflow-hidden min-h-[480px] flex flex-col justify-between"
        >
          {/* Subtle inside grid and noise overlays */}
          <div className="absolute inset-0 bg-black/90 rounded-2xl z-0" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-viral-red/10 via-transparent to-transparent z-0 pointer-events-none" />

          <div className="p-8 md:p-10 z-10 relative flex flex-col sm:flex-row gap-8 justify-between items-start">
            <div className="max-w-md">
              <span className="text-[10px] font-mono text-viral-red bg-viral-red/10 border border-viral-red/20 px-2 py-0.5 rounded uppercase tracking-wider font-semibold inline-block mb-3">
                AIS_CENTRAL // INDIA CLONE MULTIPLIER
              </span>
              <h3 className="text-2xl md:text-4xl font-display font-extrabold text-white uppercase tracking-tight mb-2">
                AI Content Multiplier
              </h3>
              <h4 className="text-xs font-mono text-viral-red/90 mb-4 uppercase tracking-widest font-semibold flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-viral-red animate-pulse" />
                Hinglish & English Video Pipeline
              </h4>
              <p className="text-sm text-gray-300 leading-relaxed">
                No camera anxiety, no expensive studio equipment. Your AI clone drafts highly relatable Hinglish & English short scripts, generates human-like Indian accents, matches trendy visual assets, and schedules posts on Instagram & YouTube automatically. Keep growing your digital presence 24/7 without burning out.
              </p>
            </div>

            {/* Localized details panel */}
            <div className="bg-black/50 border border-white/5 rounded-xl p-4 text-[11px] font-mono text-gray-400 space-y-1.5 min-w-[200px] w-full sm:w-auto">
              <div className="text-white text-[10px] font-bold border-b border-white/5 pb-1 mb-1 text-center uppercase flex items-center gap-1.5">
                <BarChart2 className="w-3.5 h-3.5 text-viral-red" />
                Indian Creator Pipeline
              </div>
              <div className="flex justify-between gap-4">
                <span>SUPPORTED VIBES:</span>
                <span className="text-white">Hindi, Hinglish, English</span>
              </div>
              <div className="flex justify-between gap-4">
                <span>VOICE PATTERN:</span>
                <span className="text-white">Natural Indian Accent</span>
              </div>
              <div className="flex justify-between gap-4">
                <span>GENERATION SPEED:</span>
                <span className="text-emerald-400">&lt; 45 Seconds</span>
              </div>
              <div className="flex justify-between gap-4">
                <span>ROUTING SUPPORT:</span>
                <span className="text-viral-red text-glow">Direct UPI & Razorpay</span>
              </div>
            </div>
          </div>

          {/* Interactive SVG bar chart visualization of traffic multiplier */}
          <div className="px-8 pb-8 z-10 relative">
            <div className="bg-white/[0.01]/10 backdrop-blur-md rounded-xl p-4 border border-white/[0.05] bg-black/60">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <span className="text-[9px] font-mono text-gray-400 uppercase tracking-widest">INTERACTIVE TRAFFIC VISUALIZER</span>
                  <h4 className="text-xs font-mono text-white font-bold uppercase">Estimated Creator Views (AI Clone vs Human Limit)</h4>
                </div>
                <div className="flex gap-4 text-[9px] font-mono">
                  <div className="flex items-center gap-1.5 text-gray-500">
                    <span className="w-2.5 h-2.5 rounded bg-gray-600 inline-block" />
                    <span>HUMAN LIMIT</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-viral-red">
                    <span className="w-2.5 h-2.5 rounded bg-viral-red inline-block text-glow" />
                    <span>AI EMPIRE FLOW</span>
                  </div>
                </div>
              </div>

              {/* Chart Grid */}
              <div className="grid grid-cols-7 gap-2 items-end h-[110px] pt-4 relative">
                {/* Horizontal reference lines */}
                <div className="absolute inset-x-0 top-0 border-t border-white/[0.03] pointer-events-none" />
                <div className="absolute inset-x-0 top-1/2 border-t border-white/[0.03] pointer-events-none" />

                {CHART_SAMPLES.map((sample, idx) => {
                  const isActive = idx === selectedChartDay;
                  // Compute heights as %
                  const humanHeight = (sample.human / 610) * 100;
                  const cloneHeight = (sample.clone / 610) * 100;

                  return (
                    <div 
                      key={sample.day} 
                      className="flex flex-col items-center justify-end h-full cursor-pointer group/bar"
                      onClick={() => setSelectedChartDay(idx)}
                    >
                      {/* Bars overlay */}
                      <div className="w-full flex justify-center items-end gap-[3px] h-full relative px-1">
                        {/* Human Bar */}
                        <div 
                          className="w-2.5 md:w-4 bg-gray-700/60 transition-all rounded-t-sm group-hover/bar:bg-gray-500"
                          style={{ height: `${Math.max(5, humanHeight)}%` }}
                        />
                        {/* Clone Bar */}
                        <div 
                          className={`w-2.5 md:w-4 transition-all rounded-t-sm text-glow ${
                            isActive ? "bg-viral-red shadow-[0_0_12px_#ff3b30]" : "bg-viral-red/40 group-hover/bar:bg-viral-red/80"
                          }`}
                          style={{ height: `${Math.max(10, cloneHeight)}%` }}
                        />
                      </div>
                      
                      <span className={`text-[9px] font-mono mt-2 block tracking-tighter ${isActive ? "text-viral-red font-bold" : "text-gray-500"}`}>
                        {sample.day}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Active Day Selected Telemetry Info */}
              <div id="chart-telemetry-tag" className="mt-3.5 pt-2 border-t border-white/5 flex flex-col sm:flex-row justify-between items-start sm:items-center text-[10px] font-mono text-gray-400 gap-1.5">
                <div className="flex items-center gap-1.5 text-white">
                  <span className="w-2 h-2 rounded-full bg-viral-red animate-pulse" />
                  <span>ALGO FEEDBACK: {CHART_SAMPLES[selectedChartDay].trend}</span>
                </div>
                <div className="flex gap-3">
                  <span>HUMAN VIEWS CAP: <span className="text-white">{(CHART_SAMPLES[selectedChartDay].human * 10).toFixed(0)}K/day</span></span>
                  <span>AI EMPIRE REACH: <span className="text-viral-red font-semibold text-glow">{(CHART_SAMPLES[selectedChartDay].clone * 10).toFixed(0)}K/day</span></span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CARD 5: Gemini 3.5 Flash Scripts (NODE_01_GA) */}
        <motion.div
          id="node_01_ga"
          viewport={{ once: true }}
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="md:col-span-12 lg:col-span-4 glass-panel p-6 rounded-2xl flex flex-col justify-between hover:border-white/10 group transition-all duration-300 relative overflow-hidden"
        >
          <div className="absolute top-4 right-4 text-[9px] font-mono text-gray-400 bg-white/5 border border-white/10 px-2 py-0.5 rounded">
            NODE_01_GA
          </div>

          <div className="flex flex-col h-full justify-between">
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-8 h-8 rounded-lg bg-viral-red/10 border border-viral-red/20 flex items-center justify-center text-viral-red">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-display font-bold text-white leading-tight">Gemini 3.5 Flash Scripts</h3>
                  <p className="text-[10px] text-viral-red font-mono uppercase tracking-wider font-semibold">Micro-second Script Draft Engine</p>
                </div>
              </div>

              <p className="text-xs text-gray-400 leading-relaxed mb-4">
                We pipeline <strong>Gemini 3.5 Flash</strong> to write highly addictive localized video scripts instantly. They include instant viral hook templates, retention buffers, and smart CTAs for high click retention.
              </p>

              {/* Tab Selector */}
              <div className="flex bg-black/60 border border-white/5 rounded-lg p-1 mb-3.5 text-[10px] font-mono gap-1">
                {(["FINANCE", "TECH", "LIFESTYLE"] as const).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setActiveScriptCategory(cat);
                      setCopiedScript(false);
                    }}
                    className={`flex-1 py-1 rounded text-center transition-all cursor-pointer uppercase ${
                      activeScriptCategory === cat
                        ? "bg-viral-red text-white font-bold"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Dynamic script text box styled like code compiler block */}
              <div className="bg-black/80 border border-white/5 rounded-xl p-3.5 text-[11px] font-mono text-gray-300 relative min-h-[170px] flex flex-col justify-between">
                <div className="space-y-2 select-text">
                  <div className="text-[10px] text-viral-red font-bold border-b border-white/5 pb-1 flex justify-between items-center">
                    <span>{GEMINI_SCRIPT_SAMPLES[activeScriptCategory].title}</span>
                    <span className="text-gray-500 text-[8px] uppercase">GEMINI_3.5_FLASH</span>
                  </div>
                  <p className="leading-relaxed">
                    <strong className="text-amber-400 uppercase tracking-widest block text-[9px] mb-0.5">🔥 Hook (0-3s):</strong>
                    "{GEMINI_SCRIPT_SAMPLES[activeScriptCategory].hook}"
                  </p>
                  <p className="leading-relaxed">
                    <strong className="text-cyan-400 uppercase tracking-widest block text-[9px] mb-0.5">🧠 Bridge (3-15s):</strong>
                    "{GEMINI_SCRIPT_SAMPLES[activeScriptCategory].bridge}"
                  </p>
                  <p className="leading-relaxed">
                    <strong className="text-emerald-400 uppercase tracking-widest block text-[9px] mb-0.5">⚡ Call to Action:</strong>
                    "{GEMINI_SCRIPT_SAMPLES[activeScriptCategory].cta}"
                  </p>
                  <div className="text-[10px] text-gray-500 pt-1 border-t border-white/5 font-mono italic">
                    {GEMINI_SCRIPT_SAMPLES[activeScriptCategory].tags}
                  </div>
                </div>

                <div className="mt-3 pt-2 border-t border-white/5 flex justify-between items-center text-[10px]">
                  <span className="text-gray-500 uppercase flex items-center gap-1">
                    <Flame className="w-3 h-3 text-amber-500" /> Auto-Optimized
                  </span>
                  
                  <button
                    onClick={() => {
                      const fullText = `[${GEMINI_SCRIPT_SAMPLES[activeScriptCategory].title}]\n\nHook: "${GEMINI_SCRIPT_SAMPLES[activeScriptCategory].hook}"\n\nBridge: "${GEMINI_SCRIPT_SAMPLES[activeScriptCategory].bridge}"\n\nCTA: "${GEMINI_SCRIPT_SAMPLES[activeScriptCategory].cta}"\n\nTags: ${GEMINI_SCRIPT_SAMPLES[activeScriptCategory].tags}`;
                      navigator.clipboard.writeText(fullText);
                      setCopiedScript(true);
                      setTimeout(() => setCopiedScript(false), 2000);
                    }}
                    className="flex items-center gap-1.5 px-2 py-1 rounded bg-white/5 hover:bg-white/10 text-white font-mono transition-all border border-white/5 hover:border-white/10 cursor-pointer"
                  >
                    {copiedScript ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span className="text-emerald-400">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3 text-gray-400" />
                        <span>Copy Script</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-white/[0.04] text-[10px] font-mono text-gray-500 uppercase flex justify-between items-center">
              <span>ENGAGEMENT_ENGINE</span>
              <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                GEMINI 3.5 FLASH ACTIVE
              </span>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
