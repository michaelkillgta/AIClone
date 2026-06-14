/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Gauge, Flame, Terminal, IndianRupee, Activity, Radio, Cpu } from "lucide-react";

// Simulated live views & engagement tracker
const MOCK_TELEMETRY_LOGS = [
  { time: "08:19:42", channel: "YouTube Shorts", event: "Karan's Morning AI Routine", status: "VIRAL 🔥", detail: "385k views (+24.1k likes)" },
  { time: "08:18:11", channel: "Instagram Reel", event: "Why Prompting is a Real Job", status: "EXPLODING 🚀", detail: "1.8M views (+124k likes)" },
  { time: "08:16:04", channel: "YouTube Shorts", event: "Ananya responds to code review", status: "TRENDING ✨", detail: "450k views (+48.9k shares)" },
  { time: "08:12:55", channel: "Instagram Reel", event: "AI Avatar calls team lead", status: "VIRAL 🔥", detail: "920k views (+76.3k likes)" },
  { time: "08:10:14", channel: "TikTok Video", event: "Coding at 3 AM vs 9 AM", status: "SUPERNOVA 🌟", detail: "2.5M views (+382k likes)" }
];

export default function TelemetryMatrix() {
  const [activeLogIndex, setActiveLogIndex] = useState(0);
  const [logs, setLogs] = useState(MOCK_TELEMETRY_LOGS);
  
  // Interactive Simulator States
  const [videoHours, setVideoHours] = useState(50); // slider state
  const [conversionRate, setConversionRate] = useState(1.8); // clickthrough strength multiplier

  // Auto increment viral log items to simulate real-time performance tracking
  useEffect(() => {
    const timer = setInterval(() => {
      const timestamp = new Date().toLocaleTimeString("en-US", { hour12: false });
      const channels = ["YouTube Shorts", "Instagram Reel", "TikTok Video"];
      const titles = [
        "React vs Vue boxing match in Hyderabad",
        "Rohan shows how to skip meetings with video clones",
        "Why standard video production is dead",
        "Testing biometric avatars in public space",
        "Ananya shows extreme vocal cloning hacks",
        "We clone our CEO and post to YouTube",
        "Zero editing viral framework tour"
      ];
      const visualStatuses = ["VIRAL 🔥", "EXPLODING 🚀", "TRENDING ✨", "HOT 📈", "BOOMING 💥"];
      
      const randomChannel = channels[Math.floor(Math.random() * channels.length)];
      const randomTitle = titles[Math.floor(Math.random() * titles.length)];
      const randomStatus = visualStatuses[Math.floor(Math.random() * visualStatuses.length)];
      
      const viewsCount = (Math.floor(80 + Math.random() * 2200)).toString() + "k views";
      const likesCount = "+" + (Math.floor(5 + Math.random() * 150)).toString() + "k likes";

      const newLog = {
        time: timestamp,
        channel: randomChannel,
        event: randomTitle,
        status: randomStatus,
        detail: `${viewsCount} (${likesCount})`
      };

      setLogs((prev) => [newLog, ...prev.slice(0, 4)]);
    }, 3800);

    return () => clearInterval(timer);
  }, []);

  // Compute simulated projections based on interactive HUD slider
  const estimatedViews = (videoHours * 82000 * conversionRate).toLocaleString(undefined, { maximumFractionDigits: 0 });
  const estimatedRevenue = "₹" + (videoHours * 24 * conversionRate * 12.5).toLocaleString("en-IN", {
    maximumFractionDigits: 0
  });

  return (
    <section id="system-telemetry-section" className="min-h-screen py-24 px-6 md:px-16 lg:px-24 flex flex-col justify-center relative z-10 w-full bg-transparent">
      {/* Decorative matrix crosshairs */}
      <div className="absolute top-10 left-10 text-white/5 font-mono text-[10px] hidden lg:block">GRID_SEC // C_SYS_04</div>
      <div className="absolute bottom-10 right-10 text-white/5 font-mono text-[10px] hidden lg:block">SYS_STATUS // SEC_RUNNING</div>

      {/* Main Section Header */}
      <div className="max-w-4xl mb-16">
        <div className="flex items-center gap-2 mb-3">
          <span className="h-[1px] w-8 bg-viral-red" />
          <span className="text-xs font-mono uppercase tracking-widest text-viral-red font-semibold">01 // COMMAND CENTER</span>
        </div>
        <h2 id="flops-headline" className="text-4xl md:text-6xl font-display font-extrabold tracking-tighter text-white uppercase">
          Your Flop Era <br className="md:hidden" /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-viral-red to-rose-400">Ends Here.</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch w-full max-w-7xl mx-auto">
        {/* LEFT INFORMATIONAL PANEL (lg:col-span-6) */}
        <div id="telemetry-info-panel" className="lg:col-span-6 flex flex-col justify-between glass-panel p-6 md:p-10 rounded-2xl border-l-4 border-l-viral-red relative overflow-hidden group">
          {/* Subtle bg glow */}
          <div className="absolute -top-40 -left-40 w-82 h-82 rounded-full bg-viral-red/5 blur-3xl pointer-events-none transition-all group-hover:bg-viral-red/10" />

          <div>
            <span className="font-mono text-[10px] text-gray-500 block mb-2 tracking-widest">PROP_COMMAND_09</span>
            <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-4 leading-tight">
              Stop Doomscrolling. <br />Start Dominating.
            </h3>
            <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-6 max-w-md">
              Our proprietary command center monitors <span className="text-white font-medium">2.4B signals daily</span> to ensure your content hits the algorithm at the exact millisecond of peak efficiency. While amateur creators check their charts, our neural clusters publish automatically from Gachibowli to global grids.
            </p>

            {/* Metric highlight badges requested */}
            <div className="flex flex-col sm:flex-row gap-3.5 mt-8 mb-8">
              <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-4 flex-1 flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-viral-red/10 border border-viral-red/20 text-viral-red">
                  <Activity className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-[10px] font-mono text-gray-400 uppercase tracking-wider">VIRAL PREDICTOR ENGINE</span>
                  <span className="text-lg font-mono font-bold text-viral-red text-glow">94% ACCURACY</span>
                </div>
              </div>

              <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-4 flex-1 flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                  <IndianRupee className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-[10px] font-mono text-gray-400 uppercase tracking-wider">NET REVENUE YOY</span>
                  <span className="text-lg font-mono font-bold text-cyan-400">UP BY 340%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive simulator overlay */}
          <div className="mt-4 pt-6 border-t border-white/[0.05] bg-black/30 p-4 rounded-xl border border-white/[0.03]">
            <div className="flex justify-between items-center mb-3">
              <h4 className="text-xs font-mono font-medium text-white tracking-wider flex items-center gap-1.5 uppercase">
                <Gauge className="w-3.5 h-3.5 text-viral-red animate-pulse" /> Estimate Monthly Impact
              </h4>
              <span className="text-[10px] font-mono text-gray-400">DYNAMIC SIMULATION</span>
            </div>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs font-mono text-gray-400 mb-1">
                  <span>Weekly Stream Hours</span>
                  <span className="text-white font-bold">{videoHours} Hours</span>
                </div>
                <input 
                  type="range" 
                  min="5" 
                  max="168" 
                  value={videoHours} 
                  onChange={(e) => setVideoHours(Number(e.target.value))}
                  className="w-full accent-viral-red bg-white/10 h-1.5 rounded-lg cursor-pointer"
                />
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2 text-center border-t border-white/5">
                <div className="p-2 bg-white/[0.01] rounded border border-white/5">
                  <span className="block text-[9px] font-mono text-gray-500 uppercase">PROJECTED IMPRESSIONS</span>
                  <strong className="text-sm font-mono text-white">{estimatedViews}</strong>
                </div>
                <div className="p-2 bg-white/[0.01] rounded border border-white/5">
                  <span className="block text-[9px] font-mono text-gray-500 uppercase">CREATOR INCOME EST.</span>
                  <strong className="text-sm font-mono text-emerald-400">{estimatedRevenue}</strong>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT TELEMETRY METRICS GRID (lg:col-span-6) */}
        <div id="telemetry-grid-panel" className="lg:col-span-6 flex flex-col justify-between gap-6">
          {/* Transparent Metric counters requested */}
          <div className="grid grid-cols-2 gap-4">
            {/* Metric 1 */}
            <div className="glass-panel p-6 rounded-xl hover:border-viral-red/30 transition-all duration-300 relative group overflow-hidden">
              <div className="absolute right-4 top-4 text-white/5 text-3xl font-display font-black group-hover:text-viral-red/5">01</div>
              <span className="text-xs font-mono text-gray-400 uppercase tracking-widest block mb-2">HOURS GENERATED</span>
              <div className="text-3xl md:text-4xl font-mono font-black text-white mb-1 flex items-baseline">
                184K<span className="text-viral-red text-2xl font-bold">+</span>
              </div>
              <p className="text-[11px] text-gray-500 font-mono tracking-tight uppercase">SYNDICATED TO REELS/YOUTUBE</p>
            </div>

            {/* Metric 2 */}
            <div className="glass-panel p-6 rounded-xl hover:border-viral-red/30 transition-all duration-300 relative group overflow-hidden">
              <div className="absolute right-4 top-4 text-white/5 text-3xl font-display font-black group-hover:text-viral-red/5">02</div>
              <span className="text-xs font-mono text-gray-400 uppercase tracking-widest block mb-2">CREATOR EARNINGS PAID</span>
              <div className="text-3xl md:text-4xl font-mono font-black text-white mb-1 flex items-baseline">
                ₹85.4L
              </div>
              <p className="text-[11px] text-gray-500 font-mono tracking-tight uppercase">DIRECT UPI & RAZORPAY ROUTING</p>
            </div>

            {/* Metric 3 */}
            <div className="glass-panel p-6 rounded-xl hover:border-viral-red/30 transition-all duration-300 relative group overflow-hidden">
              <div className="absolute right-4 top-4 text-white/5 text-3xl font-display font-black group-hover:text-viral-red/5">03</div>
              <span className="text-xs font-mono text-gray-400 uppercase tracking-widest block mb-2">UPTIME RELIABILITY</span>
              <div className="text-3xl md:text-4xl font-mono font-black text-white mb-1 flex items-baseline text-emerald-400">
                99.9%
              </div>
              <p className="text-[11px] text-gray-500 font-mono tracking-tight uppercase">GACHIBOWLI GRID SLAS</p>
            </div>

            {/* Metric 4 */}
            <div className="glass-panel p-6 rounded-xl hover:border-viral-red/30 transition-all duration-300 relative group overflow-hidden">
              <div className="absolute right-4 top-4 text-white/5 text-3xl font-display font-black group-hover:text-viral-red/5">04</div>
              <span className="text-xs font-mono text-gray-400 uppercase tracking-widest block mb-2">AUTOMATED SYNDICATION</span>
              <div className="text-3xl md:text-4xl font-mono font-black text-white mb-1 text-viral-red text-glow">
                24/7
              </div>
              <p className="text-[11px] text-gray-500 font-mono tracking-tight uppercase">SERVER PIPELINE INGEST</p>
            </div>
          </div>

          {/* Running Terminal Pipeline Console Log */}
          <div className="glass-panel p-5 rounded-xl border border-white/5 font-mono text-xs flex-1 flex flex-col justify-between bg-black/40">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-2.5 mb-3.5">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-viral-red" />
                <span className="text-white text-[11px] font-bold tracking-wider uppercase">LIVE_VIRAL_FEED_MONITOR</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] text-emerald-400">REALTIME VIEWS DEPLOYED</span>
              </div>
            </div>

            {/* Scrolling log container */}
            <div className="space-y-2.5 flex-1 min-h-[160px]">
              {logs.map((log, index) => (
                <div key={index} className="flex flex-col sm:flex-row sm:items-center justify-between hover:bg-white/[0.02] p-2 rounded border border-white/[0.03] hover:border-white/10 transition-all text-[11px] gap-2">
                  <div className="flex flex-col gap-1 truncate w-full sm:w-auto">
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] text-gray-500">[{log.time}]</span>
                      <span className={`text-[9px] px-1.5 py-0.2 rounded font-bold uppercase ${
                        log.channel === "YouTube Shorts" 
                          ? "bg-red-600/15 text-red-500 border border-red-500/20" 
                          : log.channel === "Instagram Reel"
                          ? "bg-fuchsia-600/15 text-fuchsia-400 border border-fuchsia-500/20"
                          : "bg-teal-600/15 text-teal-400 border border-teal-500/20"
                      }`}>
                        {log.channel}
                      </span>
                    </div>
                    <span className="text-white font-medium truncate text-xs">
                      {log.event}
                    </span>
                    <span className="text-[#8E8E93] text-[10px] tracking-tight">
                      {log.detail}
                    </span>
                  </div>
                  
                  <span className={`text-[10px] px-2 py-0.5 rounded border ml-auto sm:ml-2 font-bold uppercase self-start sm:self-center shrink-0 ${
                    log.status.includes("VIRAL") || log.status.includes("SUPERNOVA")
                      ? "text-emerald-400 border-emerald-400/20 bg-emerald-400/5"
                      : "text-amber-400 border-amber-400/20 bg-amber-400/5"
                  }`}>
                    {log.status}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2 text-[10px] text-[#8E8E93] border-t border-white/[0.05] pt-2.5 mt-3">
              <Radio className="w-3.5 h-3.5 text-viral-red animate-pulse" />
              <span>ACTIVE DISTRIBUTION: YouTube Shorts, Instagram Reels, TikTok</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
