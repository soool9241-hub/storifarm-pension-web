export type Grade = "A" | "B" | "C" | "D" | "F";

export type FunnelStage =
  | "lead"
  | "diagnosed"
  | "reported"
  | "consulted"
  | "contracted"
  | "maintained"
  | "academy"
  | "partner";

export interface DiagnosticAnswers {
  [itemId: string]: boolean;
}

export interface DiagnosticResult {
  score: number;
  max: number;
  pct: number;
  grade: Grade;
  gradeLabel: string;
  categoryScores: Record<string, { score: number; max: number }>;
}

export interface LeadInput {
  name: string;
  phone: string;
  pension_name?: string;
  region?: string;
}

export type PackageTier = "light" | "standard" | "premium";
export type MaintenancePlan = "basic" | "standard" | "premium";
export type AcademyProduct = "online" | "oneday" | "academy";
