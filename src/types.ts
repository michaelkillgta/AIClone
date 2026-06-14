/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface CityNode {
  name: string;
  id: string;
  x: number;
  y: number;
  z: number;
  lat: number;
  lng: number;
  ip: string;
  status: "ACTIVE" | "STANDBY" | "OVERLOAD";
  latency: string;
}

export interface MetricItem {
  value: string;
  label: string;
  subText: string;
  color: string;
}

export interface FeatureCard {
  id: string;
  title: string;
  subHeader?: string;
  copy: string;
  accent: boolean;
  gridClass: string;
  indicator: string;
}

export interface WorkflowStep {
  stepNum: string;
  title: string;
  detail: string;
  badge: string;
}

export interface FaceProfile {
  name: string;
  role: string;
  income: string;
  imgUrl: string;
  videoUrl?: string;
  labsSharedUrl?: string;
  vectorPoints: number;
  objectPosition?: string;
}

export const PRESET_PROFILES: FaceProfile[] = [
  {
    name: "Ananya Deshmukh",
    role: "Lifestyle Creator",
    income: "₹24.8L/mo",
    imgUrl: "/ananya.png?v=2.0.1",
    videoUrl: "/Lip_sync_video_hand_moments_202606150303.mp4",
    vectorPoints: 156,
    objectPosition: "center 12%"
  },
  {
    name: "Diya Sharma",
    role: "Fashion Creator",
    income: "₹35.2L/mo",
    imgUrl: "/diya.png?v=2.0.1",
    videoUrl: "/Lipsync_and_handmoments_202606150312.mp4",
    vectorPoints: 138,
    objectPosition: "center 12%"
  }
];
