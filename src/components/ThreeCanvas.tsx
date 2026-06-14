/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { CityNode } from "../types";
import gsap from "gsap";

// Region nodes with real-world telemetry parameters
export const REGIONAL_NODES: CityNode[] = [
  { name: "Hyderabad Central (HQ)", id: "HYD_GBL_01", x: -0.2, y: -1.0, z: 0.0, lat: 17.4483, lng: 78.3488, ip: "10.18.4.24", status: "ACTIVE", latency: "1.4ms" },
  { name: "Mumbai West Node", id: "BOM_NX_02", x: -1.1, y: -0.7, z: 0.0, lat: 19.0760, lng: 72.8777, ip: "10.22.1.84", status: "ACTIVE", latency: "6.8ms" },
  { name: "New Delhi North Node", id: "DEL_VLD_04", x: -0.3, y: 1.6, z: 0.0, lat: 28.6139, lng: 77.2090, ip: "10.11.8.89", status: "ACTIVE", latency: "8.1ms" },
  { name: "Bengaluru South Node", id: "BLR_ST_03", x: -0.4, y: -1.7, z: 0.0, lat: 12.9716, lng: 77.5946, ip: "10.34.2.115", status: "STANDBY", latency: "4.2ms" },
  { name: "Chennai Coastal Hub", id: "MAA_OC_05", x: 0.1, y: -1.8, z: 0.0, lat: 13.0827, lng: 80.2707, ip: "10.14.9.41", status: "ACTIVE", latency: "3.9ms" },
  { name: "Kolkata East Server", id: "CCU_HG_06", x: 1.1, y: -0.1, z: 0.0, lat: 22.5726, lng: 88.3639, ip: "10.45.6.77", status: "STANDBY", latency: "12.4ms" }
];

// City positions mapped to percentage coordinates on the image
// These map the HUD overlay positions to the actual image
const CITY_SCREEN_POSITIONS: { [key: string]: { xPct: number; yPct: number } } = {
  "HYD_GBL_01": { xPct: 48.0, yPct: 57.0 },   // Hyderabad
  "BOM_NX_02":  { xPct: 35.8, yPct: 50.0 },   // Mumbai
  "DEL_VLD_04": { xPct: 41.5, yPct: 24.5 },   // Delhi
  "BLR_ST_03":  { xPct: 41.5, yPct: 65.0 },   // Bengaluru
  "MAA_OC_05":  { xPct: 45.8, yPct: 69.0 },   // Chennai
  "CCU_HG_06":  { xPct: 60.5, yPct: 41.0 },   // Kolkata
};

export default function ThreeCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mountRef = useRef<HTMLDivElement>(null);
  const scrollYRef = useRef<number>(0);
  const mapWrapperRef = useRef<HTMLDivElement>(null);
  const mapImageRef = useRef<HTMLDivElement>(null);
  const mapMarkersRef = useRef<HTMLDivElement>(null);
  const [activeCityAlert, setActiveCityAlert] = useState<CityNode | null>(REGIONAL_NODES[0]);

  // Handle scrolling for parallax
  useEffect(() => {
    const handleScroll = () => {
      scrollYRef.current = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // GSAP 3D Interactive Map Animations
  useEffect(() => {
    // Entrance animations
    if (mapImageRef.current) {
      gsap.fromTo(mapImageRef.current, 
        { opacity: 0, scale: 0.8, rotateX: -15, rotateY: 15 },
        { opacity: 0.85, scale: 1, rotateX: 0, rotateY: 0, duration: 1.8, ease: "power3.out" }
      );
    }
    
    gsap.fromTo(".hud-marker-node",
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.8, stagger: 0.12, ease: "back.out(1.7)", delay: 0.4 }
    );

    // Mouse tilt effect
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      const xNorm = (clientX / innerWidth) - 0.5;
      const yNorm = (clientY / innerHeight) - 0.5;
      
      // Rotate wrapper in 3D
      const xRotation = -yNorm * 12; // Tilts up/down
      const yRotation = xNorm * 12;  // Tilts left/right
      
      // Translate slightly for depth
      const xTranslate = -xNorm * 20;
      const yTranslate = -yNorm * 20;
      
      if (mapImageRef.current && mapMarkersRef.current) {
        gsap.to(mapImageRef.current, {
          rotateX: xRotation,
          rotateY: yRotation,
          x: xTranslate,
          y: yTranslate,
          duration: 0.8,
          ease: "power2.out",
          overwrite: "auto",
        });
        
        gsap.to(mapMarkersRef.current, {
          rotateX: xRotation,
          rotateY: yRotation,
          x: xTranslate * 1.3,
          y: yTranslate * 1.3,
          duration: 0.8,
          ease: "power2.out",
          overwrite: "auto",
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Three.js ambient background particles
  useEffect(() => {
    if (!mountRef.current) return;

    let width = mountRef.current.clientWidth;
    let height = mountRef.current.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 5);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    // Create floating ambient golden dust particles in the background
    const dustCount = 2000;
    const dustGeometry = new THREE.BufferGeometry();
    const dustPositions = new Float32Array(dustCount * 3);
    const dustColors = new Float32Array(dustCount * 3);
    const dustSpeeds = new Float32Array(dustCount);

    for (let i = 0; i < dustCount; i++) {
      dustPositions[i * 3] = (Math.random() - 0.5) * 12;
      dustPositions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      dustPositions[i * 3 + 2] = (Math.random() - 0.5) * 4 - 1;

      const brightness = 0.15 + Math.random() * 0.35;
      dustColors[i * 3] = brightness;
      dustColors[i * 3 + 1] = brightness * 0.6;
      dustColors[i * 3 + 2] = brightness * 0.08;

      dustSpeeds[i] = 0.1 + Math.random() * 0.3;
    }

    dustGeometry.setAttribute("position", new THREE.BufferAttribute(dustPositions, 3));
    dustGeometry.setAttribute("color", new THREE.BufferAttribute(dustColors, 3));

    // Create soft glow texture
    const canvas = document.createElement("canvas");
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
      gradient.addColorStop(0, "rgba(255, 200, 80, 1.0)");
      gradient.addColorStop(0.3, "rgba(255, 180, 50, 0.5)");
      gradient.addColorStop(0.7, "rgba(200, 140, 20, 0.1)");
      gradient.addColorStop(1, "rgba(0, 0, 0, 0.0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 32, 32);
    }
    const dustTexture = new THREE.Texture(canvas);
    dustTexture.needsUpdate = true;

    const dustMaterial = new THREE.PointsMaterial({
      size: 0.04,
      map: dustTexture,
      vertexColors: true,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      opacity: 0.5,
    });

    const dustPoints = new THREE.Points(dustGeometry, dustMaterial);
    scene.add(dustPoints);

    // Subtle background grid
    const gridHelper = new THREE.GridHelper(20, 20, 0x080805, 0x040402);
    gridHelper.position.z = -3;
    gridHelper.rotation.x = Math.PI / 2;
    scene.add(gridHelper);

    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      // Drift ambient dust particles
      const posAttr = dustGeometry.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < dustCount; i++) {
        const yIdx = i * 3 + 1;
        const xIdx = i * 3;
        posAttr.array[yIdx] += dustSpeeds[i] * 0.003;
        posAttr.array[xIdx] += Math.sin(time * 0.2 + i) * 0.0005;

        // Wrap around
        if (posAttr.array[yIdx] > 5) posAttr.array[yIdx] = -5;
      }
      posAttr.needsUpdate = true;

      // Subtle parallax with scroll
      const scrollPct = scrollYRef.current / (document.documentElement.scrollHeight - window.innerHeight || 1);
      camera.position.y = -scrollPct * 0.5;
      camera.lookAt(0, -scrollPct * 0.5, 0);

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!mountRef.current) return;
      width = mountRef.current.clientWidth;
      height = mountRef.current.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    window.addEventListener("resize", handleResize);

    // Rotate active city alerts
    const intervalId = setInterval(() => {
      const idx = Math.floor(Math.random() * REGIONAL_NODES.length);
      setActiveCityAlert(REGIONAL_NODES[idx]);
    }, 4500);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearInterval(intervalId);
      cancelAnimationFrame(animationFrameId);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      dustGeometry.dispose();
      dustMaterial.dispose();
      dustTexture.dispose();
      gridHelper.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div id="three-layer-container" ref={containerRef} className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
      {/* Three.js ambient dust layer */}
      <div id="three-visual-mount" ref={mountRef} className="w-full h-full absolute inset-0" />

      {/* 3D PERSPECTIVE WRAPPER CONTAINER */}
      <div 
        ref={mapWrapperRef}
        className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none"
        style={{
          perspective: "1200px",
          transformStyle: "preserve-3d",
        }}
      >
        <div 
          className="relative w-full h-full max-w-[1150px] max-h-[100vh] flex items-center justify-center"
          style={{
            transformStyle: "preserve-3d",
          }}
        >
          {/* Map Image Layer */}
          <div 
            ref={mapImageRef}
            className="w-full h-full absolute flex items-center justify-center"
            style={{
              transformStyle: "preserve-3d",
              transform: "translateZ(0px)",
            }}
          >
            <img
              src="/india-network-map.svg"
              alt="India Server Network Map"
              className="w-full h-full object-contain opacity-85 select-none animate-indiaPulse"
              style={{
                filter: "brightness(1.1) contrast(1.15)",
                mixBlendMode: "screen",
              }}
              draggable={false}
            />
          </div>

          {/* LEFT SIDE content-protection overlay: keeps hero text readable on the far left without covering the map */}
          <div
            className="absolute top-0 left-0 bottom-0 pointer-events-none z-20"
            style={{
              width: "45%",
              background: "linear-gradient(to right, rgba(2,2,2,0.6) 0%, rgba(2,2,2,0.3) 30%, transparent 100%)",
            }}
          />

          {/* HUD Markers Layer (floats in front with translateZ) */}
          <div 
            ref={mapMarkersRef}
            className="absolute inset-0 z-30 w-full h-full pointer-events-none"
            style={{
              transformStyle: "preserve-3d",
              transform: "translateZ(40px)",
            }}
          >
            {REGIONAL_NODES.map((city) => {
              const screenPos = CITY_SCREEN_POSITIONS[city.id];
              if (!screenPos) return null;

              const isHQ = city.id === "HYD_GBL_01";

              return (
                <div
                  id={`marker-${city.id}`}
                  key={city.id}
                  className="absolute pointer-events-auto transition-all duration-300 transform -translate-x-1/2 -translate-y-1/2 group hud-marker-node"
                  style={{ left: `${screenPos.xPct}%`, top: `${screenPos.yPct}%` }}
                >
                  {/* Radial Core Node marker - Redesigned as pulsing 3D holographs */}
                  {isHQ ? (
                    <div className="relative w-6 h-6 flex items-center justify-center">
                      <div className="absolute inset-0 rounded-full border border-viral-red/40 bg-viral-red/5 animate-ping" style={{ animationDuration: "2s" }} />
                      <div className="absolute w-4 h-4 rounded-full border border-viral-red/60 animate-ping-subtle" />
                      <div className="w-4 h-4 rounded-full border border-viral-red/50 bg-black/50 flex items-center justify-center backdrop-blur-sm shadow-[0_0_15px_rgba(255,59,48,0.4)] group-hover:border-viral-red transition-colors">
                        <div className="w-2 h-2 rounded-full bg-viral-red shadow-[0_0_10px_#ff3b30]" />
                      </div>
                    </div>
                  ) : (
                    <div className="relative w-5 h-5 flex items-center justify-center">
                      <div className="absolute inset-0 rounded-full border border-white/20 bg-white/5 animate-ping opacity-25" style={{ animationDuration: "3s" }} />
                      <div className="w-3.5 h-3.5 rounded-full border border-white/30 bg-black/40 flex items-center justify-center backdrop-blur-sm group-hover:border-white/60 transition-colors">
                        <div className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
                      </div>
                    </div>
                  )}

                  {/* Dynamic Telemetry HUD Popup tag on hover or always for HQ */}
                  <div
                    className={`absolute left-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none min-w-[200px] glass-panel p-2.5 rounded border border-white/10 ${
                      isHQ ? "opacity-100 border-viral-red/30 bg-black/60" : "bg-black/80"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-1 mb-1">
                      <span className={`text-[10px] font-mono tracking-wider ${isHQ ? "text-viral-red font-semibold" : "text-gray-300"}`}>
                        {city.id}
                      </span>
                      <span className={`text-[9px] font-mono px-1 border border-current rounded ${
                        city.status === "ACTIVE" ? "text-emerald-400 border-emerald-400/20" : "text-amber-400 border-amber-400/20"
                      }`}>
                        {city.status}
                      </span>
                    </div>

                    <h4 className="text-[11px] font-semibold text-white truncate">{city.name}</h4>

                    <div className="grid grid-cols-2 gap-x-1 gap-y-0.5 mt-1 pt-0.5 border-t border-white/5 text-[9px] font-mono text-gray-400">
                      <span>IP: {city.ip}</span>
                      <span className="text-right">PING: {city.latency}</span>
                      <span>LAT: {city.lat.toFixed(4)}</span>
                      <span className="text-right">LNG: {city.lng.toFixed(4)}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>

      {/* CSS animation for the glow pulse */}
      <style>{`
        @keyframes indiaPulse {
          0% { opacity: 0.82; filter: brightness(1.05) contrast(1.1); }
          50% { opacity: 0.92; filter: brightness(1.2) contrast(1.2); }
          100% { opacity: 0.82; filter: brightness(1.05) contrast(1.1); }
        }
        .animate-indiaPulse {
          animation: indiaPulse 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
