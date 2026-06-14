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
