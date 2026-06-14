/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Camera, RefreshCw, Smartphone, Check, Loader2, ArrowRight, Play, Sparkles } from "lucide-react";

export default function InteractiveWorkflow() {
  const [activeStep, setActiveStep] = useState(0);

  // Step 1: Scan Simulation State
  const [scanning, setScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);

  // Step 2: Asset Gen Simulator State
  const [topicInput, settopicInput] = useState("Explain how AI clones will democratize content creation in 2026");
  const [generatedHook, setGeneratedHook] = useState("");
  const [loadingAssets, setLoadingAssets] = useState(false);

  // Step 3: Deployment Simulator State
  const [deploymentActive, setDeploymentActive] = useState(false);
  const [deployStates, setDeployStates] = useState({
    tiktok: "PENDING",
    reels: "PENDING",
    shorts: "PENDING"
  });
  const [viewsCounter, setViewsCounter] = useState(0);

  // Step 1 scanning effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (scanning) {
      interval = setInterval(() => {
        setScanProgress((prev) => {
          if (prev >= 100) {
            setScanning(false);
            return 100;
          }
          return prev + 5;
        });
      }, 100);
    } else {
      setScanProgress(0);
    }
    return () => clearInterval(interval);
  }, [scanning]);

  // Step 2 generation trigger
  const handleGenerateAssets = () => {
    setLoadingAssets(true);
    setGeneratedHook("");
    setTimeout(() => {
      setLoadingAssets(false);
      const scripts = [
        "💥 HOOK: 'I stopped recording videos 6 months ago, but I made $15k last week. Here is why the old creator economy is dead...' 🎬 TRANSITION: [Soft zoom, cinematic background grid shifts to crimson] 📝 CAPTION: Secure your clone now while others are still recording. #MakeItViral",
        "🚨 HOOK: 'The biggest lie in creators is that you need camera face time. My neural proxy posts 24/7 in Gachibowli while I Sleep...' 🎬 TRANSITION: [3D pan, digital India map glows in absolute red] 📝 CAPTION: Passive scale is real. #MakeItViral #GrokTrends",
        "✨ HOOK: 'You are still doomscrolling, while your favorite creators cloned themselves in under 2 minutes...' 🎬 TRANSITION: [Fast cut, biometric face scan indicator] 📝 CAPTION: Deploy your neural footprint now and automate sponsorships #neural #tech"
      ];
      setGeneratedHook(scripts[Math.floor(Math.random() * scripts.length)]);
    }, 1500);
  };

  // Step 3 deployment simulation
  const handleTriggerDeploy = () => {
    setDeploymentActive(true);
    setViewsCounter(0);
    setDeployStates({ tiktok: "UPLOADING...", reels: "QUEUED", shorts: "QUEUED" });

    setTimeout(() => {
      setDeployStates((prev) => ({ ...prev, tiktok: "SYNC_NOMINAL" }));
      setDeployStates((prev) => ({ ...prev, reels: "UPLOADING..." }));
    }, 1200);

    setTimeout(() => {
      setDeployStates((prev) => ({ ...prev, reels: "SYNC_NOMINAL" }));
      setDeployStates((prev) => ({ ...prev, shorts: "UPLOADING..." }));
    }, 2400);

    setTimeout(() => {
      setDeployStates((prev) => ({ ...prev, shorts: "SYNC_NOMINAL" }));
    }, 3600);
  };

  // Views tick animation when deployed
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (deploymentActive && deployStates.shorts === "SYNC_NOMINAL") {
      timer = setInterval(() => {
        setViewsCounter((prev) => prev + Math.floor(Math.random() * 2100) + 400);
      }, 500);
    }
    return () => clearInterval(timer);
  }, [deploymentActive, deployStates]);

  const stepsData = [
    {
      num: "01",
      title: "Upload face data",
      detail: "Securely ingest 2 minutes of video and audio. Our neural engine creates your unique digital DNA.",
      badge: "[ 01 ]"
    },
    {
      num: "02",
      title: "Project assets & generate",
      detail: "Input a topic or link. We generate scripts, visual assets, and high-fidelity video clones instantly.",
      badge: "[ 02 ]"
    },
    {
      num: "03",
      title: "Clone handles publishing",
      detail: "One-click deployment to your linked accounts. Watch the analytics skyrocket in real-time.",
      badge: "[ 03 ]"
    }
  ];

  return (
    <section id="workflow-section" className="min-h-screen py-24 px-6 md:px-16 lg:px-24 flex flex-col justify-center relative z-10 w-full bg-transparent">
      
      {/* Decorative markings */}
      <div className="absolute top-12 right-12 text-white/5 font-mono text-[10px] hidden lg:block">SYS_STEP_PIPELINE // SEC_RE_05</div>

      {/* Header */}
      <div className="max-w-4xl mb-16 text-left">
        <div className="flex items-center gap-2 mb-3">
          <span className="h-[1px] w-8 bg-viral-red" />
          <span className="text-xs font-mono uppercase tracking-widest text-viral-red font-semibold">03 // ATOMIC ONBOARDING</span>
        </div>
        <h2 className="text-4xl md:text-6xl font-display font-extrabold tracking-tighter text-white uppercase leading-none">
          How It Works
        </h2>
        <span className="text-xs font-mono text-gray-500 mt-2 block uppercase tracking-wider">
          FROM ZERO TO VIRAL IN 3 ATOMIC STEPS
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start w-full max-w-7xl mx-auto">
        
        {/* Step Cards Col (lg:col-span-6) */}
        <div className="lg:col-span-5 space-y-4">
          {stepsData.map((step, idx) => {
            const isActive = activeStep === idx;
            return (
              <div
                id={`step-container-${step.num}`}
                key={step.num}
                onClick={() => {
                  setActiveStep(idx);
                  // Reset simulation items to matching step
                  if (idx === 0) { setScanProgress(0); setScanning(false); }
                  if (idx === 1) { setGeneratedHook(""); }
                  if (idx === 2) { setDeploymentActive(false); setViewsCounter(0); }
                }}
                className={`cursor-pointer transition-all duration-300 rounded-xl p-5 border text-left flex gap-4 items-start ${
                  isActive 
                    ? "glass-panel-glow border-viral-red bg-white/[0.02]" 
                    : "glass-panel border-white/[0.04] opacity-50 hover:opacity-85"
                }`}
              >
                <span className="font-mono text-xs text-viral-red px-2 py-1 rounded bg-viral-red/15 border border-viral-red/20 leading-none mt-1">
                  {step.badge}
                </span>

                <div className="space-y-1.5 flex-1">
                  <h4 className="text-lg font-display font-bold text-white group-hover:text-viral-red transition-colors">
                    {step.title}
                  </h4>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    {step.detail}
                  </p>
                </div>

                <div className="h-full flex items-center">
                  <ArrowRight className={`w-4 h-4 text-viral-red transition-all ${isActive ? "translate-x-1 opacity-100" : "opacity-0"}`} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Dynamic Interactive Sandbox Interface (lg:col-span-7) */}
        <div className="lg:col-span-7 glass-panel rounded-2xl p-6 md:p-8 bg-black/50 border border-white/5 h-full min-h-[460px] flex flex-col justify-between relative overflow-hidden">
          
          {/* Subtle design framework grid overlay inside sandbox */}
          <div className="absolute inset-x-0 h-[1px] bg-white/[0.03] top-1/4" />
          <div className="absolute inset-x-0 h-[1px] bg-white/[0.03] top-1/2" />
          <div className="absolute inset-y-0 w-[1px] bg-white/[0.03] left-1/3" />
          <div className="absolute inset-y-0 w-[1px] bg-white/[0.03] left-2/3" />

          {/* Sandbox Header */}
          <div className="flex items-center justify-between pb-4 border-b border-white/[0.06] mb-6 z-10 relative">
            <span className="text-[10px] font-mono text-gray-500 tracking-wider">
              SANDBOX_SIMULATION // LAYER {activeStep + 1}
            </span>
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-viral-red animate-ping" />
              <span className="text-[9px] font-mono text-viral-red uppercase font-semibold">INTEGRATION PREVIEW</span>
            </div>
          </div>

          <div className="flex-1 flex flex-col justify-center z-10 relative">
            
            {/* SIMULATION 1: Upload Face Data Screen */}
            {activeStep === 0 && (
              <div id="sim-face-scan" className="space-y-6 text-center">
                <div className="max-w-[280px] h-[190px] mx-auto bg-black border border-white/10 rounded-xl relative overflow-hidden shadow-2xl flex flex-col items-center justify-center">
                  
                  {/* Camer Simulation view overlay */}
                  <div className="absolute inset-0 bg-radial-gradient from-transparent to-black/80 pointer-events-none" />
                  
                  {/* Cyber Face HUD Grid bounds */}
                  <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-viral-red" />
                  <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-viral-red" />
                  <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-viral-red" />
                  <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-viral-red" />

                  {scanning ? (
                    <>
                      {/* Active scanning bar moving down */}
                      <motion.div 
                        initial={{ y: 0 }}
                        animate={{ y: 190 }}
                        transition={{ repeat: Infinity, duration: 1.8, ease: "linear" }}
                        className="absolute inset-x-0 h-0.5 bg-viral-red shadow-[0_0_8px_#ff3b30] z-20 pointer-events-none" 
                      />
                      
                      <div className="text-center z-10 px-4 space-y-1">
                        <Camera className="w-8 h-8 text-viral-red mx-auto animate-pulse mb-2" />
                        <span className="block text-[10px] font-mono text-gray-400">ANALYZING SIGNAL VECTOR</span>
                        <span className="block text-lg font-mono font-bold text-white text-glow">{scanProgress}%</span>
                      </div>
                    </>
                  ) : scanProgress >= 100 ? (
                    <div className="text-center z-10 px-4 animate-scaleUp">
                      <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto mb-2 text-emerald-400">
                        <Check className="w-5 h-5" />
                      </div>
                      <span className="block text-[10px] font-mono text-emerald-400 uppercase font-semibold">DNA VECTOR CREATED</span>
                      <span className="block text-[11px] font-mono text-gray-400 mt-1">HQ voice & facial clone synced</span>
                    </div>
                  ) : (
                    <div className="text-center z-10 px-4 space-y-2">
                      <Camera className="w-10 h-10 text-gray-600 mx-auto" />
                      <span className="block text-xs font-mono text-gray-400 max-w-[200px]">Simulate 2-minute dynamic scan</span>
                    </div>
                  )}
                </div>

                <div className="flex justify-center">
                  <button
                    onClick={() => {
                      setScanning(true);
                      setScanProgress(0);
                    }}
                    disabled={scanning}
                    className="bg-viral-red text-white font-mono text-xs font-bold px-6 py-2.5 rounded-full hover:bg-neutral-100 hover:text-black transition-all flex items-center gap-2 border border-viral-red cursor-pointer"
                  >
                    {scanning ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        SCANNING...
                      </>
                    ) : (
                      <>
                        <Play className="w-3 h-3 fill-current" />
                        INJECT 2-MIN AUDIO DATA
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* SIMULATION 2: Assets & Generate */}
            {activeStep === 1 && (
              <div id="sim-prompt-generation" className="space-y-4">
                <div className="space-y-1.5 text-left">
                  <label className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block">NEURAL CORE PROMPT INPUT</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={topicInput}
                      onChange={(e) => settopicInput(e.target.value)}
                      className="bg-white/[0.02] border border-white/10 rounded-lg p-2.5 font-mono text-xs text-white flex-1 focus:outline-none focus:border-viral-red transition-all"
                    />
                    <button
                      onClick={handleGenerateAssets}
                      disabled={loadingAssets}
                      className="bg-viral-red hover:bg-white hover:text-black hover:border-white text-white font-mono text-xs font-bold px-4 rounded-lg flex items-center justify-center transition-all cursor-pointer border border-viral-red"
                    >
                      {loadingAssets ? <Loader2 className="w-4 h-4 animate-spin" /> : "COMPILE"}
                    </button>
                  </div>
                </div>

                <div className="border border-white/[0.05] bg-black/40 rounded-xl p-4 min-h-[120px] flex flex-col justify-between text-left">
                  {loadingAssets ? (
                    <div className="flex-1 flex flex-col items-center justify-center gap-2 text-center text-xs font-mono text-gray-500 h-full py-8">
                      <RefreshCw className="w-5 h-5 text-viral-red animate-spin" />
                      <span>Gemini is compiling hook hooks & render variables...</span>
                    </div>
                  ) : generatedHook ? (
                    <div className="space-y-2.5 animate-fadeIn">
                      <div className="flex items-center gap-1 text-[9px] font-mono text-viral-red font-semibold bg-viral-red/10 border border-viral-red/20 px-1.5 py-0.5 rounded w-max">
                        <Sparkles className="w-3 h-3 text-viral-red" />
                        ENGAGEMENT CONFIRMED
                      </div>
                      <p className="text-xs font-mono text-gray-200 leading-relaxed italic">
                        {generatedHook}
                      </p>
                    </div>
                  ) : (
                    <div className="flex-1 flex items-center justify-center text-center text-xs font-mono text-gray-500 py-6">
                      Click COMPILE to simulate Gemini Pro instant script pipeline rendering
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* SIMULATION 3: One Click Publishing */}
            {activeStep === 2 && (
              <div id="sim-publishing" className="space-y-4">
                <div className="grid grid-cols-3 gap-2.5">
                  
                  {/* Tiktok status */}
                  <div className="bg-black/40 border border-white/5 rounded-xl p-3 text-center">
                    <span className="text-[10px] font-mono text-gray-500 block mb-1">TIKTOK API</span>
                    <strong className={`text-xs font-mono ${
                      deployStates.tiktok === "SYNC_NOMINAL" ? "text-emerald-400" : deployStates.tiktok.startsWith("UP") ? "text-viral-red animate-pulse" : "text-gray-500"
                    }`}>
                      {deployStates.tiktok}
                    </strong>
                  </div>

                  {/* Reels status */}
                  <div className="bg-black/40 border border-white/5 rounded-xl p-3 text-center">
                    <span className="text-[10px] font-mono text-gray-500 block mb-1">IG REELS</span>
                    <strong className={`text-xs font-mono ${
                      deployStates.reels === "SYNC_NOMINAL" ? "text-emerald-400" : deployStates.reels.startsWith("UP") ? "text-viral-red animate-pulse" : "text-gray-500"
                    }`}>
                      {deployStates.reels}
                    </strong>
                  </div>

                  {/* Shorts status */}
                  <div className="bg-black/40 border border-white/5 rounded-xl p-3 text-center">
                    <span className="text-[10px] font-mono text-gray-500 block mb-1">YT SHORTS</span>
                    <strong className={`text-xs font-mono ${
                      deployStates.shorts === "SYNC_NOMINAL" ? "text-emerald-400" : deployStates.shorts.startsWith("UP") ? "text-viral-red animate-pulse" : "text-gray-500"
                    }`}>
                      {deployStates.shorts}
                    </strong>
                  </div>
                </div>

                <div className="bg-black/50 border border-white/[0.05] rounded-xl p-4 text-center min-h-[90px] flex flex-col justify-center items-center">
                  {!deploymentActive ? (
                    <button
                      onClick={handleTriggerDeploy}
                      className="bg-viral-red text-white font-mono text-xs font-bold px-6 py-2.5 rounded-full hover:bg-neutral-100 hover:text-black transition-all border border-viral-red cursor-pointer flex items-center gap-1.5 uppercase"
                    >
                      <Smartphone className="w-3.5 h-3.5" />
                      AUTO-POST COMPILATION NOW
                    </button>
                  ) : (
                    <div className="animate-scaleUp">
                      <span className="text-[11px] font-mono text-gray-500 block uppercase mb-1">CUMULATIVE NEURAL ENGAGEMENT</span>
                      <strong className="text-2xl md:text-3xl font-mono text-viral-red text-glow tracking-wider">
                        {viewsCounter.toLocaleString()} <span className="text-xs text-white">VIEWS</span>
                      </strong>
                    </div>
                  )}
                </div>
              </div>
            )}

          </div>

          {/* Sandbox Footer */}
          <div className="border-t border-white/[0.06] pt-4 mt-6 flex items-center justify-between text-[10px] font-mono text-gray-500 z-10 relative uppercase">
            <span>PLATFORM CORE: SEC_V2_HLA</span>
            <span>GACHIBOWLI STATUS: OK</span>
          </div>

        </div>

      </div>
    </section>
  );
}
