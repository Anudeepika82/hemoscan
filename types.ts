
export type Tab = 'dashboard' | 'scanner' | 'concepts' | 'strategy';

export interface PatientData {
  hemoglobin: number;
  rbcCount: number;
  fatigueLevel: number;
  age: number;
  gender: 'male' | 'female';
}

export interface AnalysisResult {
  riskScore: number;
  category: 'Low' | 'Moderate' | 'High';
  recommendations: string[];
  marketingAngle?: string;
}

export interface MarketingConcept {
  id: number;
  title: string;
  description: string;
  marketingFocus: string;
  message: string;
  icon: string;
}
