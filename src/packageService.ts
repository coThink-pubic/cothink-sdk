export type PackageValidationIssue = {
  code: string;
  message: string;
  packageId?: string;
  moduleId?: string;
  severity: 'error' | 'warning';
};

export type PackageValidationResult = {
  ok: boolean;
  issues: PackageValidationIssue[];
};

export type PackageInstallParams = {
  tenantId: string;
  packageId: string;
  version: string;
  configuration?: Record<string, unknown>;
};

export type PackageTenantParams = {
  tenantId: string;
  packageId: string;
};

export type PackageUpgradeParams = PackageInstallParams;

export type InstalledPackageRecord = {
  packageId: string;
  version: string;
  tenantId: string;
  status: string;
  enabled: boolean;
  configurationInitialized: boolean;
  publisher: string;
  containedModuleIds: string[];
  previousVersion?: string;
  health?: string;
  installedAt?: string;
};

export type AvailablePackageRecord = {
  packageId: string;
  version: string;
  name: string;
  description: string;
  publisher: string;
  minimumPlatformVersion: string;
  rollbackSupported: boolean;
  upgradeStrategy: string;
  containedModuleIds: string[];
};

export interface IPackageService {
  validate(packageId: string, version: string): Promise<PackageValidationResult>;
  install(params: PackageInstallParams): Promise<void>;
  enable(params: PackageTenantParams): Promise<void>;
  disable(params: PackageTenantParams): Promise<void>;
  uninstall(params: PackageTenantParams): Promise<void>;
  upgrade(params: PackageUpgradeParams): Promise<void>;
  listInstalled(tenantId: string): Promise<InstalledPackageRecord[]>;
  listAvailable(): Promise<AvailablePackageRecord[]>;
}

export function createNoopPackageService(): IPackageService {
  const empty: PackageValidationResult = { ok: true, issues: [] };
  return {
    async validate() {
      return empty;
    },
    async install() {
      return undefined;
    },
    async enable() {
      return undefined;
    },
    async disable() {
      return undefined;
    },
    async uninstall() {
      return undefined;
    },
    async upgrade() {
      return undefined;
    },
    async listInstalled() {
      return [];
    },
    async listAvailable() {
      return [];
    },
  };
}
