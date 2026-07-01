export type ComplianceViolation = {
  code: string;
  domain: string;
  severity: 'error' | 'warning' | 'info';
  message: string;
  location?: string;
  reason: string;
  recommendedFix: string;
  masReference: string;
  moduleId?: string;
  path?: string;
};

export type ComplianceScoreBreakdown = {
  architecture: number;
  sdkUsage: number;
  documentation: number;
  testing: number;
  security: number;
  observability: number;
  marketplaceReadiness: number;
  overall: number;
};

export type ComplianceModuleReport = {
  moduleId: string;
  version: string;
  type: string;
  passed: boolean;
  scores: ComplianceScoreBreakdown;
  violations: ComplianceViolation[];
  recommendations: string[];
};

export type ComplianceReport = {
  passed: boolean;
  masVersion: string;
  manifestVersion: number;
  sdkVersion: string;
  platformVersion: string;
  scores: ComplianceScoreBreakdown;
  violations: ComplianceViolation[];
  warnings: ComplianceViolation[];
  recommendations: string[];
  moduleReports: ComplianceModuleReport[];
  architectureDrift: boolean;
  duplicateRegistrations: number;
  missingDependencies: number;
  outdatedSdkVersions: number;
  unsupportedPlatformVersions: number;
  validatedAt: string;
};

export type RuntimeComplianceDiagnostics = {
  health: 'healthy' | 'degraded' | 'unhealthy' | 'unknown';
  overallScore: number;
  scores: ComplianceScoreBreakdown;
  errorCount: number;
  warningCount: number;
  violationCount: number;
  architectureDrift: boolean;
  duplicateRegistrations: number;
  missingDependencies: number;
  outdatedSdkVersions: number;
  unsupportedPlatformVersions: number;
  masVersion: string;
  verificationStatus: 'passed' | 'failed' | 'pending' | 'unknown';
};

export type ComplianceValidateModuleInput = {
  moduleId: string;
  version: string;
  projectRoot?: string;
  sourceFiles?: string[];
};

export type ComplianceValidatePlatformInput = {
  strict?: boolean;
};

export interface IComplianceService {
  validateModule(input: ComplianceValidateModuleInput): Promise<ComplianceModuleReport>;
  validatePlatform(input?: ComplianceValidatePlatformInput): Promise<ComplianceReport>;
  getDiagnostics(): RuntimeComplianceDiagnostics;
  listViolations(moduleId?: string): ComplianceViolation[];
  isInstallAllowed(moduleId: string, version: string): Promise<boolean>;
  isPublicationAllowed(moduleId: string, version: string): Promise<boolean>;
}
