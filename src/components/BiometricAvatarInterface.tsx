import { useState, useEffect, useRef, ChangeEvent } from "react";
import { 
  Camera, 
  User, 
  Video, 
  Sparkles, 
  UploadCloud, 
  Check, 
  Loader2, 
  Volume2, 
  Play, 
  Pause, 
  RefreshCw,
  Cpu,
  Monitor,
  CheckCircle,
  Network
} from "lucide-react";

// Mock profiles for biometric onboarding
interface FaceProfile {
  name: string;
  role: string;
  income: string;
  imgUrl: string;
  videoUrl?: string;
  labsSharedUrl?: string;
  vectorPoints: number;
}

const PRESET_PROFILES: FaceProfile[] = [
  {
    name: "Karan Singhania",
    role: "Fintech Educator",
    income: "₹18.4L/mo",
    imgUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200&h=200",
    videoUrl: "https://videos.pexels.com/video-files/3253734/3253734-hd_1080_1920_25fps.mp4",
    labsSharedUrl: "https://labs.google/fx/tools/flow/shared/video/feacbeea-aa21-4226-a624-f89cb77e4fb0",
    vectorPoints: 142
  },
  {
    name: "Ananya Deshmukh",
    role: "Lifestyle Creator",
    income: "₹24.8L/mo",
    imgUrl: "https://images.unsplash.com/photo-1621184455862-c163dfb30e0f?auto=format&fit=crop&q=80&w=300&h=300",
    videoUrl: "https://videos.pexels.com/video-files/3910040/3910040-hd_1080_1920_30fps.mp4",
    labsSharedUrl: "https://labs.google/fx/tools/flow/shared/video/feacbeea-aa21-4226-a624-f89cb77e4fb0",
    vectorPoints: 156
  },
  {
    name: "Diya Sharma",
    role: "Fashion Creator",
    income: "₹35.2L/mo",
    imgUrl: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&q=80&w=300&h=300",
    videoUrl: "https://videos.pexels.com/video-files/3752514/3752514-hd_1080_1920_25fps.mp4",
    labsSharedUrl: "https://labs.google/fx/tools/flow/shared/video/feacbeea-aa21-4226-a624-f89cb77e4fb0",
    vectorPoints: 138
  }
];

export default function BiometricAvatarInterface() {
  const [stage, setStage] = useState<"SELECT" | "SCANNING" | "MAPPING" | "SYNTHESIS">("SELECT");
  const [selectedProfile, setSelectedProfile] = useState<FaceProfile>(PRESET_PROFILES[0]);
  const [scanProgress, setScanProgress] = useState(0);
  const [mappingProgress, setMappingProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [subtitleIndex, setSubtitleIndex] = useState(0);
  const [customImage, setCustomImage] = useState<string | null>(null);
  const [isVoiceSync, setIsVoiceSync] = useState(true);
  const [audioWaves, setAudioWaves] = useState<number[]>([30, 45, 20, 60, 15, 40, 75, 40, 65, 30, 20, 42, 58, 25, 10]);
  const [customLabsUrl, setCustomLabsUrl] = useState("https://labs.google/fx/tools/flow/shared/video/feacbeea-aa21-4226-a624-f89cb77e4fb0");
  const [videoError, setVideoError] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Video timeline variables for the active talking avatar synthesis simulation
  const [videoTime, setVideoTime] = useState(0.0);
  const [isBlinking, setIsBlinking] = useState(false);
  const [isVideoHovered, setIsVideoHovered] = useState(false);

  // Sync play/pause with actual video node
  useEffect(() => {
    if (stage === "SYNTHESIS" && videoRef.current && !videoError) {
      // Force muted and playsInline on the DOM node to robustly satisfy browser autoplay/play policies
      videoRef.current.muted = true;
      videoRef.current.playsInline = true;

      if (isPlaying) {
        const playPromise = videoRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch((err) => {
            console.warn("Play promise was blocked by browser autoplay policy:", err);
            // Sync state with reality so the user sees a valid play button prompt
            setIsPlaying(false);
          });
        }
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying, stage, selectedProfile.videoUrl, videoError]);

  // Telemetry items printed during scanning
  const [logMessages, setLogMessages] = useState<string[]>([]);
  const logPool = [
    "ACQUIRING COGNITIVE FACIAL FRAME...",
    "DETECTING FACIAL OSTEOLOGY STRUCTURE...",
    "NORMALIZING ROTATION AXIS...",
    "EXTRACTING 128-DIMENSION NEURAL DEPLOYMENT MATRIX...",
    "FITTING MUSCLE EXPONENTS...",
    "GENERATING SKELETON WIREFRAME...",
    "MATCHING VOICE PRINT RESONANCE...",
    "CO-ALIGNING SYNTHETIC MOUTH PHONEMES..."
  ];

  // Simulated subtitle track for the generated AI video clone 
  const subtitles = [
    "Hey guys, it's my AI Clone talking. I am literally here 24/7.",
    "Making content, securing sponsorships, and driving traffic...",
    "While the real me is literally chilling, living life, and getting paid.",
    "Our neural rendering operates at 120 FPS studio-grade. No camera fatigue.",
    "Deploy your high-fidelity clone today and secure the bag. No cap."
  ];

  // Dynamic audio waves simulation
  useEffect(() => {
    let anim: number;
    if (stage === "SYNTHESIS" && isPlaying && isVoiceSync) {
      const run = () => {
        setAudioWaves(Array.from({ length: 15 }, () => Math.floor(15 + Math.random() * 75)));
        anim = requestAnimationFrame(run);
      };
      run();
    } else {
      setAudioWaves([20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20]);
    }
    return () => cancelAnimationFrame(anim);
  }, [stage, isPlaying, isVoiceSync]);

  // Keep cycling subtitle stream when speaking (only if no native video is driving updates or video error occurs)
  useEffect(() => {
    let subInterval: NodeJS.Timeout;
    const shouldCycleManually = !selectedProfile.videoUrl || videoError;
    if (stage === "SYNTHESIS" && isPlaying && shouldCycleManually) {
      subInterval = setInterval(() => {
        setSubtitleIndex((prev) => (prev + 1) % subtitles.length);
      }, 3500);
    }
    return () => clearInterval(subInterval);
  }, [stage, isPlaying, selectedProfile.videoUrl, videoError]);

  // Video playback time increments (fallback for image-only profiles or on video error)
  useEffect(() => {
    let videoTimer: NodeJS.Timeout;
    const shouldRunFallbackTimer = !selectedProfile.videoUrl || videoError;
    if (stage === "SYNTHESIS" && isPlaying && shouldRunFallbackTimer) {
      videoTimer = setInterval(() => {
        setVideoTime((prev) => {
          const next = prev + 0.1;
          if (next >= 15.0) {
            setSubtitleIndex(0);
            return 0.0;
          }
          return parseFloat(next.toFixed(1));
        });
      }, 100);
    }
    return () => clearInterval(videoTimer);
  }, [stage, isPlaying, selectedProfile.videoUrl, videoError]);

  // Eye blinking simulation interval
  useEffect(() => {
    let blinkTimer: NodeJS.Timeout;
    if (stage === "SYNTHESIS" && isPlaying) {
      const triggerBlink = () => {
        setIsBlinking(true);
        setTimeout(() => setIsBlinking(false), 140);
        const nextDelay = 2500 + Math.random() * 2500;
        blinkTimer = setTimeout(triggerBlink, nextDelay);
      };
      blinkTimer = setTimeout(triggerBlink, 3000);
    }
    return () => clearTimeout(blinkTimer);
  }, [stage, isPlaying]);

  // Reset video error on profile or URL changes
  useEffect(() => {
    setVideoError(false);
  }, [selectedProfile.videoUrl]);

  // Helpers to format current playing timestamp
  const formatVideoTime = (secs: number) => {
    const mins = Math.floor(secs / 60).toString().padStart(2, "0");
    const seconds = Math.floor(secs % 60).toString().padStart(2, "0");
    const ms = Math.floor((secs % 1) * 10).toString();
    return `${mins}:${seconds}.${ms}`;
  };

  // Synchronize subtitle updates with native video ticks
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const time = videoRef.current.currentTime;
      setVideoTime(parseFloat(time.toFixed(1)));
      let duration = videoRef.current.duration;
      if (isNaN(duration) || !isFinite(duration) || duration <= 0) {
        duration = 15.0;
      }
      const progress = isFinite(time / duration) ? Math.max(0, Math.min(1, time / duration)) : 0;
      setSubtitleIndex(Math.min(subtitles.length - 1, Math.floor(progress * subtitles.length)));
    }
  };

  // Positional coordinates logic for mouth morph placement
  const getMouthCenter = () => {
    const name = selectedProfile.name.toLowerCase();
    if (name.includes("karan")) {
      return { top: "54%", left: "48%" };
    } else if (name.includes("ananya")) {
      return { top: "52.5%", left: "51.5%" };
    } else if (name.includes("diya") || name.includes("rohan")) {
      return { top: "54%", left: "48.2%" };
    }
    return { top: "54%", left: "48.5%" };
  };

  // Positional coordinates logic for eye blinking mesh placement
  const getEyeCenters = () => {
    const name = selectedProfile.name.toLowerCase();
    if (name.includes("karan")) {
      return [
        { top: "38.5%", left: "37.5%" },
        { top: "38.5%", left: "58.8%" }
      ];
    } else if (name.includes("ananya")) {
      return [
        { top: "37.5%", left: "40.5%" },
        { top: "37.5%", left: "62%" }
      ];
    } else if (name.includes("diya") || name.includes("rohan")) {
      return [
        { top: "38.5%", left: "37.5%" },
        { top: "38.5%", left: "58.8%" }
      ];
    }
    return [
      { top: "38.5%", left: "37.5%" },
      { top: "38.5%", left: "58.8%" }
    ];
  };

  // Handle Scan Step Progress animation
  useEffect(() => {
    if (stage === "SCANNING") {
      setScanProgress(0);
      setIsPlaying(true);
      setVideoTime(0.0);
      setLogMessages(["ACQUIRING NEURAL VIDEO PORT..."]);
      
      const interval = setInterval(() => {
        setScanProgress((prev) => {
          const next = prev + 3;
          if (next >= 100) {
            clearInterval(interval);
            setTimeout(() => setStage("MAPPING"), 600);
            return 100;
          }
          
          // Periodically add log messages
          if (next % 15 === 0) {
            const index = Math.floor((next / 100) * logPool.length);
            if (logPool[index]) {
              setLogMessages((logs) => [...logs, logPool[index]]);
            }
          }
          return next;
        });
      }, 70);

      return () => clearInterval(interval);
    }
  }, [stage]);

  // Handle Landmark Point Mapping Progress
  useEffect(() => {
    if (stage === "MAPPING") {
      setMappingProgress(0);
      const interval = setInterval(() => {
        setMappingProgress((prev) => {
          const next = prev + 4;
          if (next >= 100) {
            clearInterval(interval);
            setTimeout(() => setStage("SYNTHESIS"), 600);
            return 100;
          }
          return next;
        });
      }, 50);
      return () => clearInterval(interval);
    }
  }, [stage]);

  // Custom mock file uploader action
  const handlePhotoUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setCustomImage(event.target.result as string);
          const customProfile: FaceProfile = {
            name: "Self Captured Clone",
            role: "Creator Profile",
            income: "₹15.0L/mo est.",
            imgUrl: event.target.result as string,
            vectorPoints: 168
          };
          setSelectedProfile(customProfile);
          setStage("SCANNING");
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const getProfileImage = () => {
    return selectedProfile.imgUrl;
  };

  return (
    <div id="biometric-avatar-widget" className="w-full max-w-[480px] glass-panel rounded-2xl p-6 relative overflow-hidden bg-black/40 border border-white/5 shadow-2xl">
      
      {/* Decorative cyber grid scan elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(255,59,48,0.03),transparent)] pointer-events-none" />


      <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/5">
        <div className="flex items-center gap-2">
          <Cpu className="w-4 h-4 text-viral-red animate-pulse" />
          <span className="text-[11px] font-mono text-white tracking-widest font-bold uppercase">Biometric Avatar Synthesizer</span>
        </div>
        <div className="flex items-center gap-1.5 font-mono text-[9px] text-[#8E8E93]">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>CYBER_READY</span>
        </div>
      </div>

      {/* STAGE 1: PROFILE SELECTION AND IMAGE UPLOAD INTAKE */}
      {stage === "SELECT" && (
        <div id="stage-select-avatar" className="space-y-4 animate-fadeIn">
          <p className="text-[11px] font-mono text-[#8E8E93] uppercase tracking-wide">
            // STEP 01: Select creators or capture your face data
          </p>

          <div className="grid grid-cols-3 gap-2.5">
            {PRESET_PROFILES.map((profile, i) => (
              <button
                key={i}
                onClick={() => {
                  setSelectedProfile(profile);
                  setVideoError(false);
                }}
                className={`flex flex-col items-center p-3 rounded-xl border transition-all duration-300 relative ${
                  selectedProfile.name === profile.name
                    ? "bg-viral-red/10 border-viral-red shadow-lg"
                    : "bg-[#050505] border-white/5 hover:border-white/20"
                }`}
              >
                <div className="w-12 h-12 rounded-full overflow-hidden mb-2 border border-white/10 group-hover:border-viral-red transition-all">
                  <img src={profile.imgUrl} alt={profile.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <span className="text-[10px] font-bold text-white truncate w-full text-center">{profile.name.split(" ")[0]}</span>
                <span className="text-[8px] font-mono text-gray-500 truncate w-full text-center mt-0.5">{profile.role.split(" ")[0]}</span>
                <span className="text-[9px] font-mono text-viral-red font-semibold mt-1">{profile.income}</span>
                
                {selectedProfile.name === profile.name && (
                  <span className="absolute top-1.5 right-1.5 bg-viral-red text-white p-0.5 rounded-full text-[6px]">
                    <Check className="w-2.5 h-2.5" />
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Interactive photo file dropzone block */}
          <label className="border border-dashed border-white/10 hover:border-viral-red/40 bg-neutral-950/60 rounded-xl p-5 flex flex-col items-center justify-center gap-1.5 cursor-pointer transition-all duration-300 group">
            <input type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
            <div className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-viral-red/10 transition-all">
              <UploadCloud className="w-4 h-4 text-gray-400 group-hover:text-viral-red transition-all" />
            </div>
            <div className="text-center">
              <span className="text-[11px] font-semibold text-white block">Drop photos or Upload Portrait</span>
              <span className="text-[9px] font-mono text-gray-500 uppercase mt-0.5 block">Supports PNG, JPG, HEIC up to 10MB</span>
            </div>
          </label>

          {/* Google Labs video connection */}
          <div className="bg-neutral-950/50 p-3 pb-3.5 border border-white/5 rounded-xl space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-[9px] font-mono text-emerald-400 uppercase tracking-wider block font-semibold flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping" />
                Google Labs Pipeline Sync
              </span>
              <span className="text-[8px] font-mono text-gray-500 uppercase">ACTIVE_DEv</span>
            </div>
            <div className="flex gap-2">
              <input 
                type="text" 
                value={customLabsUrl}
                onChange={(e) => setCustomLabsUrl(e.target.value)}
                placeholder="https://labs.google/fx/tools/flow/shared/video/..." 
                className="flex-1 bg-black/60 border border-white/10 rounded-lg px-2.5 py-1.5 text-[10px] font-mono text-gray-300 focus:outline-none focus:border-viral-red/50 transition-all placeholder:text-gray-600"
              />
              <button 
                onClick={() => {
                  // Trigger loading of Google Labs video preset
                  const labsProfile: FaceProfile = {
                    name: "Google Labs Flow Clone",
                    role: "VideoFX Sync Clone",
                    income: "₹45.0L/mo est.",
                    imgUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200&h=200",
                    videoUrl: "https://videos.pexels.com/video-files/3253734/3253734-hd_1080_1920_25fps.mp4", // Pre-loaded beautiful smiling young man matching screenshot!
                    labsSharedUrl: customLabsUrl,
                    vectorPoints: 198
                  };
                  setSelectedProfile(labsProfile);
                  setVideoError(false);
                  setStage("SCANNING");
                }}
                className="bg-viral-red/20 hover:bg-viral-red/35 hover:text-white border border-viral-red/40 px-3 py-1 text-[10px] font-mono font-bold uppercase transition-all tracking-wider text-viral-red cursor-pointer rounded-lg"
              >
                Sync Link
              </button>
            </div>
            <p className="text-[8.5px] font-mono text-gray-500 leading-normal">
              PRE-CONFIGURED WITH YOUR GENERATED VIDEO ID. CLICKS WILL SYNCHRONIZE YOUR LIVE NEURAL TALKING RENDERER AS DEPICTED.
            </p>
          </div>

          <div className="pt-1">
            <button
              onClick={() => setStage("SCANNING")}
              className="w-full bg-viral-red hover:brightness-110 active:scale-95 text-white py-3.5 px-4 rounded-xl text-xs font-mono font-bold uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Camera className="w-4 h-4" />
              Scan and Extract Face Data
            </button>
          </div>
        </div>
      )}

      {/* STAGE 2: HIGH-TECH BIOMETRIC SCANNING EXPERIMENT */}
      {stage === "SCANNING" && (
        <div id="stage-scanning-avatar" className="space-y-4 animate-fadeIn">
          <div className="flex justify-between items-center text-[10px] font-mono">
            <span className="text-viral-red uppercase font-semibold animate-pulse tracking-wide">// ENGAGING BIOMETRIC LASER SCAN</span>
            <span className="text-gray-400">{scanProgress}% SECURED</span>
          </div>

          <div className="h-[210px] w-full bg-black rounded-xl overflow-hidden relative border border-white/5 flex items-center justify-center shadow-inner">
            <img src={getProfileImage()} alt="Scanning face" className="w-full h-full object-cover opacity-60 filter saturate-50" referrerPolicy="no-referrer" />
            
            {/* Real-time high tech horizontal scanning laser beam */}
            <div 
              className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-viral-red to-transparent shadow-[0_0_15px_rgba(255,59,48,0.8)] z-10"
              style={{ 
                top: `${scanProgress}%`,
                transition: "top 0.08s linear"
              }}
            />

            {/* Matrix alignment overlay crosshairs */}
            <div className="absolute inset-x-0 h-[1px] bg-white/10 top-1/2" />
            <div className="absolute inset-y-0 w-[1px] bg-white/10 left-1/2" />
            
            {/* Cyber Corner brackets */}
            <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-viral-red opacity-80" />
            <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-viral-red opacity-80" />
            <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-viral-red opacity-80" />
            <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-viral-red opacity-80" />

            {/* Simulated Live tracking circle overlaying on typical facial areas */}
            {scanProgress > 20 && scanProgress < 85 && (
              <div 
                className="absolute w-12 h-12 rounded-full border border-dashed border-viral-red/60 animate-spin absolute-center z-10"
                style={{ top: "40%", left: "45%" }}
              />
            )}
            {scanProgress > 40 && (
              <div className="absolute p-2 bg-black/80 border border-viral-red/30 rounded font-mono text-[8px] text-viral-red z-20" style={{ top: "15%", right: "10%" }}>
                LANDMARK_MESH: FITTING_OK
              </div>
            )}
          </div>

          {/* Real-time scanning telemetry log printer */}
          <div className="p-3 bg-neutral-950 rounded-lg border border-white/5 font-mono text-[9px] text-[#8E8E93] h-[75px] overflow-hidden space-y-1">
            <div className="text-gray-500 tracking-wider">// SYSTEM OPERATIONS LOG:</div>
            {logMessages.slice(-3).map((msg, idx) => (
              <div key={idx} className="flex gap-1.5 items-center">
                <span className="text-viral-red animate-pulse">❯</span>
                <span className="text-gray-300 font-medium truncate">{msg}</span>
              </div>
            ))}
          </div>

          <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
            <div className="bg-viral-red h-full rounded-full transition-all duration-100" style={{ width: `${scanProgress}%` }} />
          </div>
        </div>
      )}

      {/* STAGE 3: VECTOR LANDMARK ALIGNMENT GRAPH MESH */}
      {stage === "MAPPING" && (
        <div id="stage-mapping-avatar" className="space-y-4 animate-fadeIn">
          <div className="flex justify-between items-center text-[10px] font-mono">
            <span className="text-gray-400 font-semibold uppercase tracking-wider">// STEP 03: FACIAL MESH INTERPOLATION</span>
            <span className="text-viral-red font-mono font-bold animate-pulse">{mappingProgress}% CONNECTED</span>
          </div>

          <div className="h-[210px] w-full bg-[#050505] rounded-xl relative flex items-center justify-center border border-white/5">
            {/* Grid alignment layout */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:16px_16px]" />

            {/* Glowing neural landmarks mapping graph */}
            <svg className="w-40 h-40 text-viral-red/60 relative z-10 animate-pulse" viewBox="0 0 100 100">
              {/* Dynamic face wireframe lines rendering sequentially */}
              <path 
                d="M 50 15 C 32 15 28 35 28 55 C 28 72 38 85 50 85 C 62 85 72 72 72 55 C 72 35 68 15 50 15 Z" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="0.8" 
                strokeDasharray="4 4" 
                className="transition-all"
                style={{ strokeDashoffset: 100 - mappingProgress }}
              />
              
              {/* Eye mappings */}
              {mappingProgress > 20 && (
                <>
                  <circle cx="38" cy="40" r="1.5" className="fill-viral-red animate-pulse" />
                  <circle cx="38" cy="40" r="4" fill="none" stroke="currentColor" strokeWidth="0.3" strokeDasharray="1 1" />
                  <circle cx="62" cy="40" r="1.5" className="fill-viral-red animate-pulse" />
                  <circle cx="62" cy="40" r="4" fill="none" stroke="currentColor" strokeWidth="0.3" strokeDasharray="1 1" />
                </>
              )}

              {/* Nose and mouth mapping structure */}
              {mappingProgress > 45 && (
                <>
                  <line x1="50" y1="35" x2="50" y2="55" stroke="currentColor" strokeWidth="0.5" />
                  <circle cx="50" cy="55" r="1.5" className="fill-viral-red" />
                  <path d="M 38 68 Q 50 74 62 68" fill="none" stroke="currentColor" strokeWidth="0.8" />
                  <circle cx="38" cy="68" r="1" className="fill-viral-red" />
                  <circle cx="62" cy="68" r="1" className="fill-viral-red" />
                </>
              )}

              {/* Geometric connection line bindings */}
              {mappingProgress > 70 && (
                <>
                  <line x1="38" y1="40" x2="50" y2="30" stroke="currentColor" strokeWidth="0.3" strokeOpacity="0.6" />
                  <line x1="62" y1="40" x2="50" y2="30" stroke="currentColor" strokeWidth="0.3" strokeOpacity="0.6" />
                  <line x1="38" y1="40" x2="50" y2="55" stroke="currentColor" strokeWidth="0.3" strokeOpacity="0.6" />
                  <line x1="62" y1="40" x2="50" y2="55" stroke="currentColor" strokeWidth="0.3" strokeOpacity="0.6" />
                  <line x1="38" y1="40" x2="38" y2="68" stroke="currentColor" strokeWidth="0.3" strokeOpacity="0.6" />
                  <line x1="62" y1="40" x2="62" y2="68" stroke="currentColor" strokeWidth="0.3" strokeOpacity="0.6" />
                  <line x1="50" y1="55" x2="50" y2="68" stroke="currentColor" strokeWidth="0.3" strokeOpacity="0.6" />
                </>
              )}
            </svg>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/80 border border-white/5 px-2.5 py-1 rounded text-[8px] font-mono text-gray-400">
              NODAL POINTS: {Math.floor((mappingProgress / 100) * selectedProfile.vectorPoints)} / {selectedProfile.vectorPoints}
            </div>
          </div>

          <div className="flex animate-pulse items-center gap-2 justify-center py-2 text-[11px] font-mono text-viral-red font-semibold">
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
            SYNTHESIZING SECURE VIDEO LIFELIKE AVATAR...
          </div>
        </div>
      )}

      {/* STAGE 4: COMPLETED HIGH-FIDELITY LIVE SYNTHESIS VIDEO CLONE */}
      {stage === "SYNTHESIS" && (
        <div id="stage-synthesis-avatar" className="space-y-4 animate-fadeIn">
          
          <div className="flex justify-between items-center bg-emerald-500/10 border border-emerald-500/20 px-3 py-2 rounded-lg text-[10px] font-mono">
            <div className="flex items-center gap-1 text-emerald-400 font-bold">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
              STATUS: NEURAL AVATAR RENDERED COMPLETE
            </div>
          </div>

          {/* Dynamic generated synthesized video simulation player */}
          <div 
            className="h-[220px] w-full bg-[#030303] rounded-xl overflow-hidden relative border border-white/5 cursor-pointer group"
            onMouseEnter={() => setIsVideoHovered(true)}
            onMouseLeave={() => setIsVideoHovered(false)}
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {/* The generated talking face avatar with live video controls */}
            <div className="w-full h-full relative">
              {selectedProfile.videoUrl && !videoError ? (
                <video
                  key={selectedProfile.videoUrl}
                  ref={videoRef}
                  src={selectedProfile.videoUrl}
                  loop
                  muted
                  playsInline
                  autoPlay
                  onTimeUpdate={handleTimeUpdate}
                  onError={() => {
                    console.warn("Video failed to play: running image fallback sync mode");
                    setVideoError(true);
                  }}
                  className={`w-full h-full object-cover transition-all duration-300 ${
                    isPlaying ? "scale-[1.03] saturate-110 translate-y-[2px]" : "scale-100 saturate-85 opacity-75"
                  }`}
                  style={{
                    transformOrigin: "center center",
                  }}
                />
              ) : (
                <img 
                  src={getProfileImage()} 
                  alt="Talking AI avatar" 
                  className={`w-full h-full object-cover transition-all duration-300 ${
                    isPlaying ? "scale-[1.03] saturate-110 translate-y-[2px]" : "scale-100 saturate-85 opacity-75"
                  }`}
                  referrerPolicy="no-referrer"
                  style={{
                    transformOrigin: "center center",
                  }}
                />
              )}

              {/* --- BIO-SYNTHETIC MOUTH LIP-SYNC INTERACTIVE OVERLAY --- */}
              <div 
                className="absolute z-10 transition-all duration-100 flex items-center justify-center -translate-x-1/2 -translate-y-1/2"
                style={{
                  ...getMouthCenter(),
                  width: "36px",
                  height: "22px"
                }}
                onClick={(e) => e.stopPropagation()} // Prevent double trigger play/pause
              >
                {/* Glowing Morph Lip SVG */}
                <svg className="w-full h-full text-emerald-400 drop-shadow-[0_0_6px_rgba(52,211,153,0.8)] filter" viewBox="0 0 24 12" fill="none">
                  {/* Dynamic phonetic teeth gap */}
                  <rect 
                    x="5" 
                    y={isPlaying ? (6 - (audioWaves[5] || 30) * 0.05).toString() : "5.5"} 
                    width="14" 
                    height={isPlaying ? ((audioWaves[5] || 30) * 0.1).toString() : "1.0"} 
                    fill="#ffffff" 
                    opacity="0.85" 
                    rx="1"
                    className="transition-all duration-100"
                  />
                  {/* Outer glowing matching synthesising lips path */}
                  <path 
                    d={isPlaying 
                      ? `M 2 6 Q 12 ${4 - (audioWaves[4] || 45) * 0.07} 22 6 Q 12 ${8 + (audioWaves[6] || 40) * 0.12} 2 6 Z`
                      : "M 2 6 Q 12 5 22 6 Q 12 7 2 6 Z"
                    } 
                    fill="rgba(16,185,129,0.3)" 
                    stroke="currentColor" 
                    strokeWidth="1.2" 
                    className="transition-all duration-100"
                  />
                  {/* Left-right phoneme corner tags */}
                  <circle cx="2" cy="6" r="1" fill="#10b981" />
                  <circle cx="22" cy="6" r="1" fill="#10b981" />
                </svg>
              </div>

              {/* --- PROC BLINKING EYES CALIBRATION OVERLAYS --- */}
              {getEyeCenters().map((pos, idx) => (
                <div 
                  key={idx}
                  className="absolute z-10 -translate-x-1/2 -translate-y-1/2 transition-all duration-75 flex items-center justify-center pointer-events-none"
                  style={pos}
                >
                  {isBlinking ? (
                    // Flat blink eye vector path
                    <div className="w-3.5 h-[1.5px] bg-emerald-400 shadow-[0_0_4px_rgba(52,211,153,0.9)] rounded" />
                  ) : (
                    // Real active neural eye reticle target
                    <span className="relative flex h-2.5 w-2.5 items-center justify-center">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-40"></span>
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400 shadow-[0_0_3px_#10b981]"></span>
                    </span>
                  )}
                </div>
              ))}

              {/* Subtle tech overlay tracking spline matrix */}
              {isPlaying && (
                <div className="absolute inset-0 z-0 pointer-events-none opacity-45">
                  <svg className="w-full h-full text-viral-red/20" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <line x1="10" y1="20" x2="90" y2="20" stroke="currentColor" strokeWidth="0.1" strokeDasharray="1 3" />
                    <line x1="10" y1="80" x2="90" y2="80" stroke="currentColor" strokeWidth="0.1" strokeDasharray="1 3" />
                    <line x1="20" y1="10" x2="20" y2="90" stroke="currentColor" strokeWidth="0.1" strokeDasharray="1 3" />
                    <line x1="80" y1="10" x2="80" y2="90" stroke="currentColor" strokeWidth="0.1" strokeDasharray="1 3" />
                  </svg>
                </div>
              )}

              {/* Hover/Play Pause State Graphic Overlay */}
              <div 
                className={`absolute inset-0 bg-black/30 flex items-center justify-center z-20 transition-all duration-300 ${
                  isPlaying ? "opacity-0 hover:opacity-100" : "opacity-100"
                }`}
                onClick={() => setIsPlaying(!isPlaying)}
              >
                <div className="w-14 h-14 rounded-full bg-black/80 border border-white/20 flex items-center justify-center backdrop-blur-sm self-center shadow-lg transition-transform duration-300 hover:scale-110">
                  {isPlaying ? (
                    <Pause className="w-5 h-5 text-white fill-current" />
                  ) : (
                    <Play className="w-5 h-5 text-white fill-current translate-x-0.5" />
                  )}
                </div>
              </div>

              {/* Subtitles text overlay mimicking conversational speech real-time translation */}
              <div className="absolute inset-x-3 bottom-10 z-20" onClick={(e) => e.stopPropagation()}>
                <div className="bg-black/95 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-lg text-center shadow-lg">
                  <p className="text-[9px] font-mono text-viral-red uppercase tracking-wider font-extrabold mb-0.5">// CLONE CONVERSION SPEECH</p>
                  <p className="text-[10px] md:text-[11px] text-white font-medium italic leading-snug animate-fadeIn">
                    "{subtitles[subtitleIndex]}"
                  </p>
                </div>
              </div>

              {/* Active Local/Labs Badge */}
              {selectedProfile.labsSharedUrl ? (
                <a 
                  href={selectedProfile.labsSharedUrl}
                  target="_blank" 
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="absolute top-3 left-3 z-20 flex items-center gap-1 bg-emerald-500/90 hover:bg-emerald-500 hover:scale-105 border border-[#10b981]/20 px-2.5 py-0.5 rounded-full text-[8px] font-mono font-bold tracking-wider text-black transition-all"
                  title="Click to view original video in Google Labs FX"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" />
                  GOOG_LABS://feacbeea ↗
                </a>
              ) : (
                <div className="absolute top-3 left-3 z-20 flex items-center gap-1 bg-black/80 border border-white/10 px-2.5 py-0.5 rounded-full text-[8px] font-mono font-semibold tracking-wider text-white">
                  <span className={`w-1.5 h-1.5 rounded-full ${isPlaying ? "bg-[#10b981] animate-pulse" : "bg-gray-400"}`} />
                  {isPlaying ? "STATUS // CONVERTING_VIDEO" : "STATUS // PAUSED_OK"}
                </div>
              )}

              {/* Resolution telemetry tag */}
              <div className="absolute top-3 right-3 z-20 bg-black/85 border border-[#10b981]/20 py-0.5 px-2 rounded font-mono text-[8px] text-emerald-400">
                AI_V_EN_IN // 4K_MIV
              </div>

              {/* VIDEO TIMELINE CONTROL PROGRESS FOOTER GRID (Interactive Seek) */}
              <div 
                className="absolute bottom-0 inset-x-0 h-9 bg-gradient-to-t from-black/95 to-black/30 z-30 flex items-center px-3 justify-between gap-3 text-[10px] font-mono"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Time Display */}
                <span className="text-[9px] text-[#8E8E93]">{formatVideoTime(videoTime)} / 00:15.0</span>

                {/* Clickable horizontal seek progress track */}
                <div 
                  className="flex-1 h-[6px] rounded-full bg-white/10 cursor-pointer relative group-seek"
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const val = (e.clientX - rect.left) / rect.width;
                    let duration = videoRef.current ? videoRef.current.duration : 15.0;
                    if (isNaN(duration) || !isFinite(duration) || duration <= 0) {
                      duration = 15.0;
                    }
                    const rawSec = val * duration;
                    const sec = isFinite(rawSec) && !isNaN(rawSec) 
                      ? Math.max(0.0, Math.min(duration, parseFloat(rawSec.toFixed(1))))
                      : 0.0;
                    setVideoTime(sec);
                    if (videoRef.current && isFinite(sec) && !isNaN(sec)) {
                      videoRef.current.currentTime = sec;
                    }
                    setSubtitleIndex(Math.min(subtitles.length - 1, Math.floor(val * subtitles.length)));
                  }}
                >
                  <div 
                    className="bg-viral-red h-full rounded-full transition-all duration-75 relative select-none"
                    style={{ 
                      width: `${
                        (() => {
                          const duration = videoRef.current ? videoRef.current.duration : 15.0;
                          const safeDuration = isNaN(duration) || !isFinite(duration) || duration <= 0 ? 15.0 : duration;
                          const percent = (videoTime / safeDuration) * 100;
                          return isFinite(percent) && !isNaN(percent) ? Math.max(0, Math.min(100, percent)) : 0;
                        })()
                      }%` 
                    }}
                  >
                    {/* Glowing dragging slider circle indicator handle */}
                    <div className="absolute -right-1.5 -top-1 w-3 h-3 rounded-full bg-white border border-viral-red shadow shadow-black scale-0 group-hover:scale-100 group-seek:scale-100 transition-all" />
                  </div>
                </div>

                <span className="text-[8px] text-emerald-400 px-1 bg-white/5 rounded">120 FPS</span>
              </div>
            </div>
          </div>

          {/* Interactive controls and sound analyzer synthesis parameters */}
          <div className="p-4 rounded-xl border border-white/[0.04] bg-neutral-950/40 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-[9px] font-mono text-gray-500 uppercase">NEURAL HARMONY RESONANCE</span>
              <span className="text-[9.5px] font-mono text-emerald-400 font-semibold flex items-center gap-1">
                <Network className="w-3 h-3" /> DIRECT_PIPELINE: ACTIVE
              </span>
            </div>

            {/* Simulated audio waveform graphics */}
            <div className="h-8 flex items-end justify-between gap-1 px-1">
              {audioWaves.map((wave, index) => (
                <div 
                  key={index} 
                  className="bg-viral-red flex-1 transition-all duration-150 rounded"
                  style={{ 
                    height: `${isPlaying ? wave : 15}%`,
                    opacity: isPlaying ? 1.0 : 0.3
                  }}
                />
              ))}
            </div>

            <div className="flex justify-between items-center pt-1">
              <div className="flex gap-2">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="bg-white/5 border border-white/10 hover:border-viral-red/40 hover:bg-white/10 px-3.5 py-1.5 rounded-lg text-xs font-mono text-white transition-all flex items-center gap-1.5 cursor-pointer uppercase font-bold"
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-3 h-3 text-viral-red fill-current" />
                      Pause Clone Output
                    </>
                  ) : (
                    <>
                      <Play className="w-3 h-3 text-emerald-400 fill-current" />
                      Play Avatar Speech
                    </>
                  )}
                </button>

                <button
                  onClick={() => setIsVoiceSync(!isVoiceSync)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all flex items-center gap-1 cursor-pointer uppercase ${
                    isVoiceSync 
                      ? "bg-viral-red/10 border border-viral-red/30 text-viral-red font-semibold"
                      : "bg-white/5 border border-white/10 text-gray-400"
                  }`}
                >
                  <Volume2 className="w-3 h-3" />
                  {isVoiceSync ? "VOICE SYN LEVEL // OK" : "MUTE CLONE SOUND"}
                </button>
              </div>

              <button
                onClick={() => {
                  setStage("SELECT");
                  setCustomImage(null);
                }}
                className="px-2.5 py-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 text-xs font-mono transition-all flex items-center gap-1 uppercase border border-transparent hover:border-white/10 cursor-pointer"
                title="Process another facial profile"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Reset Synthesizer
              </button>
            </div>
          </div>

          {/* Quick deployed summary logs */}
          <div className="grid grid-cols-2 gap-2 text-[10px] font-mono">
            <div className="bg-white/5 p-2 rounded border border-white/5">
              <span className="text-gray-500 block text-[8px] uppercase">DEPLOYED NETWORKS</span>
              <span className="text-white font-semibold">YT SHORTS, REELS, TIKTOK</span>
            </div>
            <div className="bg-white/5 p-2 rounded border border-white/5">
              <span className="text-gray-500 block text-[8px] uppercase">EST. HOURLY PROFIT</span>
              <span className="text-viral-red font-semibold text-glow">+₹4,250 / HR COED</span>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}
