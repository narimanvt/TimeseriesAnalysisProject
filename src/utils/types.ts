// Type definitions for time series analysis

export interface TimeSeriesData {
  values: number[];
  labels: string[];
}

export interface AnalysisResults {
  autocorrelations: { lag: number; value: number }[];
  pacf: Array<{ lag: number; value: number }>;
  trendCoefficient: number;
  hasTrend: boolean;
  aiFeedback?: string;
}

