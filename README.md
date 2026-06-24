# MakeItViral.ai — Programmatic AI Influence & Creator Clones

> Next-generation synthetic influencer matrix and real-time telemetry control panel. Compile creator voice, appearance, and script generation pipelines into multi-million viewer campaigns with zero fatigue.

---

## ⚡ Core Features

### 🗺️ 1. Interactive 3D India Server Matrix
An immersive 3D geographic network display powered by **Three.js** and **GSAP**. Coordinates mouse-tracking tilt interactions and renders glowing regional nodes (Hyderabad Central HQ, Mumbai West Core, Bengaluru South Edge, etc.) with real-time status signals.

### 🧬 2. Biometric Onboarding & Laser Mesh Synthesizer
A high-tech onboarding pipeline that simulates biometric face scanning and landmark coordinate mapping. 
- Custom image upload or selection of preset creator profiles (Ananya Deshmukh & Diya Sharma).
- Interactive laser-scan line overlays, vector point extraction counters, and audio wave speech sync testing.

### ✍️ 3. Automated Gemini 3.5 Flash Script Engine
Micro-second scripting pipeline powered by the **Google Gemini 2.5 Flash** API. Generates high-retention, localized scripts divided into:
- **Hook (0-3s)**: High-impact emotional trigger.
- **Bridge (3-15s)**: Contextual connection and core value.
- **CTA**: Psychological engagement and conversion actions.
- Automatically adjusts topic and tone (e.g., fashion-centric for Diya, lifestyle-centric for Ananya).

### 📱 4. Dynamic Lip-Sync Clone Simulator
A portrait smartphone mockup viewport playing realistic creator video outputs. Plays active voice/lip-sync files centered and styled appropriately, showing live social engagement statistics (Views, Likes, Comments) that scale in real-time.

### 🎛️ 5. Control Panel & Telemetry Matrix
An operations dashboard showing:
- Active ingestion channels and database status indicators.
- Live scrolling logs simulating neural network checks and node synchronization.
- Voice sync level adjustments and audio clone output toggles.

---

## 🛠️ Technology Stack

- **Frontend Core**: [React 19](https://react.dev/), [TypeScript](https://www.typescriptlang.org/), [Vite 6](https://vite.dev/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/) (using curated HSL gradients and glassmorphism)
- **3D & Motion**: [Three.js](https://threejs.org/) (for WebGL point clouds), [GSAP](https://gsap.com/) (for 3D map tilts), [Framer Motion](https://www.framer.com/motion/) (for UI transitions)
- **Backend & AI Ingestion**: [Node.js](https://nodejs.org/), [Express](https://expressjs.com/), [@google/genai](https://www.npmjs.com/package/@google/genai)

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher recommended)
- **NPM** (v9 or higher)

### Installation

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/michaelkillgta/AIClone.git
   cd AIClone
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the root directory and add your Google Gemini API Key:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   PORT=3000
   ```

4. **Start the Development Server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## 📦 Build & Production

To bundle the application and compile the server for production deployment:

1. **Generate Production Bundle:**
   ```bash
   npm run build
   ```
   This will bundle frontend assets using Vite and transpile the Express `server.ts` into a standalone CommonJS bundle at `dist/server.cjs`.

2. **Start Production Server:**
   ```bash
   npm start
   ```

---

## 🔒 Ingestion & Compliance
All neural ingestions and synthetic voice maps are secured under **AES-256 encrypted creator DNA databases**, ensuring brand safety, compliance, and complete protection of biometric rights.
