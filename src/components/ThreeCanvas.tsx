/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { CityNode } from "../types";

// Define the highly precise, authentic boundary of India using vertices
const indiaBoundary = [
  // 1. NORTH PEAK (Kashmir / Ladakh)
  { x: 0.0, y: 3.25 },     // Northernmost tip of Jammu & Kashmir
  { x: -0.15, y: 3.12 },   // Western Gilgit-Baltistan
  { x: -0.32, y: 2.92 },   // Jammu region start
  
  // 2. WESTERN BORDER (Punjab & Rajasthan)
  { x: -0.52, y: 2.76 },   // Punjab / Pakistan border
  { x: -0.68, y: 2.48 },   // Amritsar / Rajasthan junction area
  { x: -0.92, y: 2.15 },   // Bikaner border area
  { x: -1.18, y: 1.76 },   // Jaisalmer westernmost bulge
  { x: -1.36, y: 1.28 },   // Barmer border
  { x: -1.22, y: 0.92 },   // North Gujarat Border
  
  // 3. GUJARAT PENINSULAS DETAILED
  { x: -1.48, y: 0.65 },   // Rann of Kutch northern line
  { x: -1.82, y: 0.42 },   // Kutch western tip
  { x: -1.74, y: 0.22 },   // Gulf of Kutch indentation
  { x: -1.95, y: 0.12 },   // Kathiawar peninsula western tip (Dwarka)
  { x: -1.88, y: -0.16 },  // Diu/Gir southern tip of peninsula
  { x: -1.46, y: -0.32 },  // Gulf of Khambhat coast indentation near Surat

  // 4. DECCAN WEST COAST
  { x: -1.26, y: -0.42 },  // Mumbai Coastline start
  { x: -1.18, y: -0.82 },  // Maharashtra Coast (Ratnagiri)
  { x: -1.04, y: -1.38 },  // Goa Coast
  { x: -0.86, y: -1.98 },  // Karnataka Coast / Mangalore
  { x: -0.62, y: -2.68 },  // Northern Kerala
  { x: -0.38, y: -3.22 },  // Southern Kerala (Kochi)
  
  // 5. SOUTHERN TIP (Kanyakumari)
  { x: -0.15, y: -3.65 },  // Southern tip - Cape Comorin / Kanyakumari
  
  // 6. DECCAN EAST COAST
  { x: 0.04, y: -3.42 },   // Palk Strait / Rameshwaram cut
  { x: 0.08, y: -3.25 },   // Point Calimere
  { x: -0.04, y: -2.95 },  // Pondicherry
  { x: 0.12, y: -2.35 },   // Chennai to Nellore coast
  { x: 0.32, y: -1.82 },   // Andhra Coast (Kakinada / Godavari Delta bulge)
  { x: 0.52, y: -1.45 },   // Visakhapatnam Coastline
  { x: 0.85, y: -1.12 },   // Odisha Coast (Ganjam / Paradip)
  { x: 1.16, y: -0.85 },   // West Bengal / Sundarbans start
  { x: 1.28, y: -0.68 },   // Ganges/Sundarbans outer delta edge
  
  // 7. BANGLADESH INDENTATION / DEEP ENTRY
  { x: 1.25, y: -0.42 },   // West Bengal border with Bangladesh going North
  { x: 1.21, y: -0.12 },   // Kolkata latitude border
  { x: 1.22, y: 0.18 },    // Siliguri Corridor ("Chicken's Neck" - starts narrow)
  
  // 8. NORTHEAST "SISTER STATES" (Wrapping Bangladesh and China borders)
  { x: 1.15, y: 0.42 },    // Southern Bhutan border junction
  { x: 1.42, y: 0.45 },    // Assam North Bank line
  { x: 1.68, y: 0.48 },    // Entrance of Arunachal line
  { x: 1.95, y: 0.62 },    // Northern arc of Arunachal Pradesh
  { x: 2.22, y: 0.74 },    // Easternmost tip of Arunachal Pradesh / China border
  { x: 2.12, y: 0.42 },    // Nagaland border heading down
  { x: 2.01, y: 0.15 },    // Manipur border
  { x: 1.95, y: -0.16 },   // Mizoram Southernmost tip
  { x: 1.76, y: -0.08 },   // Tripura western bulge
  { x: 1.72, y: 0.14 },    // Indent around Bangladesh east boundary
  { x: 1.45, y: 0.16 },    // Meghalaya (Shillong plateau southern border)
  { x: 1.28, y: 0.22 },    // Tura/Assam side mapping Bangladesh north
  { x: 1.22, y: 0.18 },    // Retransit to Chicken's Neck
  
  // 9. SIKKIM, NEPAL & NORTH BORDERS
  { x: 1.05, y: 0.48 },    // Sikkim western edge with Tibet
  { x: 1.08, y: 0.72 },    // Sikkim northernmost peak
  { x: 0.96, y: 0.58 },    // Nepal border start
  { x: 0.62, y: 0.78 },    // Nepal central boundary
  { x: 0.32, y: 1.10 },    // Nepal western border (Mahakali River)
  { x: 0.14, y: 1.48 },    // Uttarakhand border
  { x: 0.18, y: 1.98 },    // Himachal Pradesh border
  { x: 0.06, y: 2.48 },    // Himachal peak
  { x: 0.16, y: 2.96 },    // Eastern Ladakh line heading back
  { x: 0.05, y: 3.18 }     // Reconnecting base in Ladakh
];

// Check if a point is inside the India polygon definition
function isPointInPolygon(x: number, y: number, polygon: { x: number; y: number }[]): boolean {
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const xi = polygon[i].x, yi = polygon[i].y;
    const xj = polygon[j].x, yj = polygon[j].y;
    
    const intersect = ((yi > y) !== (yj > y))
        && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
    if (intersect) inside = !inside;
  }
  return inside;
}

// Generate circular gradient vector texture for smooth soft star-like glowing particles
function createParticleTexture(): THREE.Texture {
  const canvas = document.createElement("canvas");
  canvas.width = 32;
  canvas.height = 32;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
    gradient.addColorStop(0, "rgba(240, 245, 255, 1.0)");
    gradient.addColorStop(0.2, "rgba(200, 215, 255, 0.8)");
    gradient.addColorStop(0.5, "rgba(255, 59, 48, 0.35)"); // Ambient viral-red tint
    gradient.addColorStop(1, "rgba(0, 0, 0, 0.0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 32, 32);
  }
  const texture = new THREE.Texture(canvas);
  texture.needsUpdate = true;
  return texture;
}

// Region nodes with real-world telemetry parameters
export const REGIONAL_NODES: CityNode[] = [
  { name: "Hyderabad Central (HQ)", id: "HYD_GBL_01", x: -0.2, y: -1.0, z: 0.0, lat: 17.4483, lng: 78.3488, ip: "10.18.4.24", status: "ACTIVE", latency: "1.4ms" },
  { name: "Mumbai West Node", id: "BOM_NX_02", x: -1.1, y: -0.7, z: 0.0, lat: 19.0760, lng: 72.8777, ip: "10.22.1.84", status: "ACTIVE", latency: "6.8ms" },
  { name: "New Delhi North Node", id: "DEL_VLD_04", x: -0.3, y: 1.6, z: 0.0, lat: 28.6139, lng: 77.2090, ip: "10.11.8.89", status: "ACTIVE", latency: "8.1ms" },
  { name: "Bengaluru South Node", id: "BLR_ST_03", x: -0.4, y: -1.7, z: 0.0, lat: 12.9716, lng: 77.5946, ip: "10.34.2.115", status: "STANDBY", latency: "4.2ms" },
  { name: "Chennai Coastal Hub", id: "MAA_OC_05", x: 0.1, y: -1.8, z: 0.0, lat: 13.0827, lng: 80.2707, ip: "10.14.9.41", status: "ACTIVE", latency: "3.9ms" },
  { name: "Kolkata East Server", id: "CCU_HG_06", x: 1.1, y: -0.1, z: 0.0, lat: 22.5726, lng: 88.3639, ip: "10.45.6.77", status: "STANDBY", latency: "12.4ms" }
];

export default function ThreeCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mountRef = useRef<HTMLDivElement>(null);
  const scrollYRef = useRef<number>(0);
  const smoothScrollRef = useRef<number>(0);
  const [hudCoordinates, setHudCoordinates] = useState<{ [key: string]: { x: number; y: number; visible: boolean } }>({});
  const [activeCityAlert, setActiveCityAlert] = useState<CityNode | null>(REGIONAL_NODES[0]);

  // Handle scrolling
  useEffect(() => {
    const handleScroll = () => {
      scrollYRef.current = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!mountRef.current) return;

    // Viewport Dim
    let width = mountRef.current.clientWidth;
    let height = mountRef.current.clientHeight;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    // Initial camera position (Wide View of India)
    camera.position.set(0, -0.5, 6.0);
    camera.lookAt(0, -0.5, 0);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    // Dynamic grid in background
    const gridHelper = new THREE.GridHelper(30, 30, 0x111111, 0x070707);
    gridHelper.position.z = -1.5;
    gridHelper.rotation.x = Math.PI / 2;
    scene.add(gridHelper);

    // Ambient minimal lighting to see 3D spline volumes if needed
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xff3b30, 1.5, 10);
    pointLight.position.set(-0.2, -1.0, 1.0); // Focus on Hyderabad
    scene.add(pointLight);

    // ==========================================
    // 3D INDIA MAP POINT CLOUD GENERATION
    // ==========================================
    const pointsGeometry = new THREE.BufferGeometry();
    const particleCount = 12000;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const initialYOffsets = new Float32Array(particleCount);
    const speeds = new Float32Array(particleCount);

    let idx = 0;
    let fallbackCount = 0;

    // Boundary limits of our India polygon coordinates to limit search scope
    const minX = -2.2, maxX = 2.5;
    const minY = -4.0, maxY = 3.6;

    while (idx < particleCount && fallbackCount < 100000) {
      fallbackCount++;
      const rx = minX + Math.random() * (maxX - minX);
      const ry = minY + Math.random() * (maxY - minY);

      if (isPointInPolygon(rx, ry, indiaBoundary)) {
        // Position X, Y, Z
        positions[idx * 3] = rx;
        positions[idx * 3 + 1] = ry;
        positions[idx * 3 + 2] = -0.25 + Math.random() * 0.5; // subtle 3D thickness

        // Base Color - Cyan-Blue Landmass with soft amber density variations
        const blendRatio = Math.random();
        if (blendRatio > 0.95) {
          // 5% particles glow golden-amber for active hub centers
          colors[idx * 3] = 0.98;     // R
          colors[idx * 3 + 1] = 0.70; // G
          colors[idx * 3 + 2] = 0.15; // B
        } else {
          // Rest are beautiful deep translucent cyan/blue matching the inspiration image
          const brightness = 0.35 + Math.random() * 0.55;
          colors[idx * 3] = brightness * 0.06;
          colors[idx * 3 + 1] = brightness * 0.65;
          colors[idx * 3 + 2] = brightness * 0.90;
        }

        initialYOffsets[idx] = Math.random() * Math.PI * 2;
        speeds[idx] = 0.05 + Math.random() * 0.12;

        idx++;
      }
    }

    pointsGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    pointsGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const particleTexture = createParticleTexture();
    const pointsMaterial = new THREE.PointsMaterial({
      size: 0.082,
      map: particleTexture,
      vertexColors: true,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const pointCloud = new THREE.Points(pointsGeometry, pointsMaterial);
    scene.add(pointCloud);

    // ==========================================
    // HYDERABAD PULSING HUBS (3D Rings)
    // ==========================================
    const hydPos = new THREE.Vector3(-0.2, -1.0, 0.05);

    // Add glowing rings
    const ringGeom1 = new THREE.RingGeometry(0.12, 0.14, 32);
    const ringGeom2 = new THREE.RingGeometry(0.04, 0.05, 32);
    const ringMat1 = new THREE.MeshBasicMaterial({ color: 0xff3b30, side: THREE.DoubleSide, transparent: true, opacity: 0.8 });
    const ringMat2 = new THREE.MeshBasicMaterial({ color: 0xff3b30, side: THREE.DoubleSide, transparent: true, opacity: 0.9 });

    const ring1 = new THREE.Mesh(ringGeom1, ringMat1);
    ring1.position.copy(hydPos);
    scene.add(ring1);

    const ring2 = new THREE.Mesh(ringGeom2, ringMat2);
    ring2.position.copy(hydPos);
    scene.add(ring2);

    // Static secondary nodes (cities) circular accents in gold-yellow to match the connection arcs
    const cityMeshGroup = new THREE.Group();
    REGIONAL_NODES.forEach((node) => {
      if (node.id === "HYD_GBL_01") return; // Gachibowli is handled separately
      const nodeGeom = new THREE.RingGeometry(0.03, 0.05, 16);
      const nodeMat = new THREE.MeshBasicMaterial({
        color: node.status === "ACTIVE" ? 0xf59e0b : 0x4b5563, // Glowing gold yellow / gray
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.75
      });
      const nodeMesh = new THREE.Mesh(nodeGeom, nodeMat);
      nodeMesh.position.set(node.x, node.y, 0.03);
      cityMeshGroup.add(nodeMesh);
    });
    scene.add(cityMeshGroup);

    // ==========================================
    // OUTBOUND ROUTING SPLINES & MOTION FLOW (Amber/Cyan)
    // ==========================================
    const splineLines: THREE.Line[] = [];
    const splinePaths: THREE.QuadraticBezierCurve3[] = [];
    const dataPackets: { mesh: THREE.Mesh; path: THREE.QuadraticBezierCurve3; progress: number; speed: number }[] = [];

    const packetGeom = new THREE.SphereGeometry(0.024, 8, 8);
    const packetMat = new THREE.MeshBasicMaterial({ color: 0x22d3ee }); // Crisp glowing cyan data packets

    REGIONAL_NODES.forEach((node) => {
      if (node.id === "HYD_GBL_01") return;

      const pStart = hydPos.clone();
      const pEnd = new THREE.Vector3(node.x, node.y, 0.03);

      // Create a gorgeous arch in 3D: mid point is raised along the Z-axis
      const distance = pStart.distanceTo(pEnd);
      const pControl = new THREE.Vector3()
        .addVectors(pStart, pEnd)
        .multiplyScalar(0.5);
      pControl.z += distance * 0.45; // Height of arch proportional to distance

      const curve = new THREE.QuadraticBezierCurve3(pStart, pEnd, pControl);
      splinePaths.push(curve);

      // Generate points for drawing the spline line
      const points = curve.getPoints(50);
      const lineGeom = new THREE.BufferGeometry().setFromPoints(points);
      const lineMat = new THREE.LineBasicMaterial({
        color: 0xf59e0b, // Amber gold curves exactly like the reference map
        transparent: true,
        opacity: 0.45,
        blending: THREE.AdditiveBlending
      });
      const line = new THREE.Line(lineGeom, lineMat);
      scene.add(line);
      splineLines.push(line);

      // Add a dynamic flowing data packet
      const packetMesh = new THREE.Mesh(packetGeom, packetMat);
      packetMesh.position.copy(pStart);
      scene.add(packetMesh);
      dataPackets.push({
        mesh: packetMesh,
        path: curve,
        progress: Math.random(), // randomize starting offsets
        speed: 0.01 + Math.random() * 0.015
      });
    });

    // ==========================================
    // ANIMATION & INTERPOLATION FRAME LOOP
    // ==========================================
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const time = clock.getElapsedTime();

      // Slow elegant rotation of India point cloud
      pointCloud.rotation.z = Math.sin(time * 0.03) * 0.05;
      cityMeshGroup.rotation.z = pointCloud.rotation.z;

      // Animate point cloud particles with a soft wave variation
      const posAttr = pointsGeometry.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < particleCount; i++) {
        // Access position indices
        const yIndex = i * 3 + 1;
        const zIndex = i * 3 + 2;

        const originalY = positions[yIndex];
        const offset = initialYOffsets[i];
        const spd = speeds[i];

        // Soft ripple wave along Y axis using sound-like frequency variation
        posAttr.setY(i, originalY + Math.sin(time * spd * 1.5 + offset) * 0.015);
      }
      posAttr.needsUpdate = true;

      // Pulse Gachibowli target nodes
      const pulseScale = 1.0 + Math.sin(time * 6.0) * 0.15;
      ring1.scale.set(pulseScale, pulseScale, 1);
      ring2.scale.set(1.0 - Math.sin(time * 6.0) * 0.1, 1.0 - Math.sin(time * 6.0) * 0.1, 1);

      // Animate pipeline data packets moving along splines
      dataPackets.forEach((packet) => {
        packet.progress += packet.speed;
        if (packet.progress > 1.0) {
          packet.progress = 0.0;
        }
        const point = packet.path.getPointAt(packet.progress);
        packet.mesh.position.copy(point);
      });

      // ==========================================
      // STABILIZED ANCHORED SCROLL CAMERA CONTROL
      // ==========================================
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      let targetScrollPct = 0;
      if (scrollHeight > 0) {
        targetScrollPct = scrollYRef.current / scrollHeight;
      }

      // Smooth interpolation of scroll percentage
      smoothScrollRef.current += (targetScrollPct - smoothScrollRef.current) * 0.06;

      const p = smoothScrollRef.current;

      // Pure stabilized isometric-style view (Upright, recognizable, comfortable!)
      let camX = 0;
      let camY = -0.3;
      let camZ = 5.2;
      let fovZ = 45;
      let lookX = 0;
      let lookY = -0.4;
      let lookZ = 0;

      // Elegant, subtle linear sliding parallax that shifts slightly as you scroll down
      // This is extremely steady and provides a gorgeous sense of depth without any motion disturbance
      camY -= p * 0.6;
      lookY -= p * 0.6;

      // Smoothly update camera coordinates
      camera.position.set(camX, camY, camZ);
      camera.lookAt(lookX, lookY, lookZ);

      // Render Three.js scene
      renderer.render(scene, camera);

      // ==========================================
      // PROJECT 3D CITY COORDINATES TO HTML OVERLAYS
      // ==========================================
      const tempCoords: { [key: string]: { x: number; y: number; visible: boolean } } = {};
      const tempV = new THREE.Vector3();

      REGIONAL_NODES.forEach((node) => {
        tempV.set(node.x, node.y, 0.05);
        if (node.id === "HYD_GBL_01") {
          tempV.set(-0.2, -1.0, 0.05); // ensure accurate coordinates
        }
        
        tempV.project(camera);

        // Check if node is within visible frustum
        const isBehind = tempV.z > 1.0;
        
        // Convert projected coordinates to percentage
        const xPercent = (tempV.x * 0.5 + 0.5) * 100;
        const yPercent = (-(tempV.y) * 0.5 + 0.5) * 100;

        // Visual threshold limiting alerts
        const isNearEdg = xPercent < 5 || xPercent > 95 || yPercent < 5 || yPercent > 95;

        tempCoords[node.id] = {
          x: xPercent,
          y: yPercent,
          visible: !isBehind && !isNearEdg
        };
      });

      setHudCoordinates(tempCoords);
    };

    animate();

    // Handle Resize
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

    // Dynamic rotation to trigger simulation alerts in intervals
    const intervalId = setInterval(() => {
      const idx = Math.floor(Math.random() * REGIONAL_NODES.length);
      setActiveCityAlert(REGIONAL_NODES[idx]);
    }, 4500);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      clearInterval(intervalId);
      cancelAnimationFrame(animationFrameId);

      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }

      pointsGeometry.dispose();
      pointsMaterial.dispose();
      gridHelper.dispose();
      ringGeom1.dispose();
      ringGeom2.dispose();
      ringMat1.dispose();
      ringMat2.dispose();
      packetGeom.dispose();
      packetMat.dispose();
      
      splineLines.forEach(l => l.geometry.dispose());
      dataPackets.forEach(p => p.mesh.geometry.dispose());
      
      renderer.dispose();
    };
  }, []);

  return (
    <div id="three-layer-container" ref={containerRef} className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
      {/* GL Context mounting element */}
      <div id="three-visual-mount" ref={mountRef} className="w-full h-full" />

      {/* HTML Projection Overlay System */}
      <div id="hud-city-markers" className="absolute inset-0 z-10 w-full h-full overflow-hidden">
        {REGIONAL_NODES.map((city) => {
          const coords = hudCoordinates[city.id];
          if (!coords || !coords.visible) return null;

          const isHQ = city.id === "HYD_GBL_01";

          return (
            <div
              id={`marker-${city.id}`}
              key={city.id}
              className="absolute pointer-events-auto transition-all duration-300 transform -translate-x-1/2 -translate-y-1/2 group"
              style={{ left: `${coords.x}%`, top: `${coords.y}%` }}
            >
              {/* Radial Core Node marker */}
              <div 
                className={`w-3 h-3 rounded-full flex items-center justify-center transition-all ${
                  isHQ 
                    ? "bg-viral-red ring-4 ring-viral-red/40 neon-glow animate-pulse" 
                    : "bg-white ring-2 ring-white/10"
                }`}
              >
                {isHQ && <span className="absolute w-6 h-6 rounded-full border border-viral-red animate-ping-subtle" />}
              </div>

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
  );
}
