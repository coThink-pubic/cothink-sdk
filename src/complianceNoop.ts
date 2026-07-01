import type { IComplianceService } from './compliance.js';

export function createNoopComplianceService(): IComplianceService {
  const emptyScores = {
    architecture: 0,
    sdkUsage: 0,
    documentation: 0,
    testing: 0,
    security: 0,
    observability: 0,
    marketplaceReadiness: 0,
    overall: 0,
  };
  return {
    async validateModule() {
      return {
        moduleId: 'unknown',
        version: '0.0.0',
        type: 'package',
        passed: false,
        scores: emptyScores,
        violations: [],
        recommendations: ['Platform runtime disabled'],
      };
    },
    async validatePlatform() {
      return {
        passed: false,
        masVersion: '1.0.0',
        manifestVersion: 1,
        sdkVersion: '0.0.0',
        platformVersion: '0.0.0',
        scores: emptyScores,
        violations: [],
        warnings: [],
        recommendations: ['Platform runtime disabled'],
        moduleReports: [],
        architectureDrift: false,
        duplicateRegistrations: 0,
        missingDependencies: 0,
        outdatedSdkVersions: 0,
        unsupportedPlatformVersions: 0,
        validatedAt: new Date().toISOString(),
      };
    },
    getDiagnostics() {
      return {
        health: 'unknown',
        overallScore: 0,
        scores: emptyScores,
        errorCount: 0,
        warningCount: 0,
        violationCount: 0,
        architectureDrift: false,
        duplicateRegistrations: 0,
        missingDependencies: 0,
        outdatedSdkVersions: 0,
        unsupportedPlatformVersions: 0,
        masVersion: '1.0.0',
        verificationStatus: 'unknown',
      };
    },
    listViolations() {
      return [];
    },
    async isInstallAllowed() {
      return false;
    },
    async isPublicationAllowed() {
      return false;
    },
  };
}
