import type { PlatformContext } from './index.js';

export type MarketplaceCatalogItem = {
  catalogId: string;
  itemType: string;
  moduleId: string;
  version: string;
  name: string;
  description: string;
  publisher: string;
  category: string;
  tags: string[];
  capabilities: string[];
  permissions: string[];
  dependencies: string[];
  minimumPlatformVersion: string;
  pricing: { model: string; currency?: string; amount?: number; billingScope?: string };
  license?: { type: string; label?: string; organizationScoped?: boolean; workspaceScoped?: boolean; userScoped?: boolean; trialDays?: number };
  trust: {
    publisherVerified: boolean;
    trustedPublisher: boolean;
    signatureStatus: string;
    securityAdvisories: string[];
    deprecationNotice?: string;
  };
  visibility: string;
  releaseNotes?: string;
  documentationUrl?: string;
  screenshots: string[];
  ratingsAverage: number;
  ratingsCount: number;
  installCount: number;
  featured: boolean;
  requiresAdminApproval: boolean;
  signatureStatus: string;
  containedModuleIds: string[];
};

export type MarketplaceSearchQuery = {
  text?: string;
  category?: string;
  itemType?: string;
  tags?: string[];
  tenantId?: string;
  visibility?: string[];
  trustedOnly?: boolean;
  limit?: number;
};

export type MarketplaceInstallRequest = {
  tenantId: string;
  packageId: string;
  version: string;
  scope?: 'global' | 'organization' | 'workspace' | 'user';
  workspaceId?: string;
  userId?: string;
  approvedByUserId?: string;
  configuration?: Record<string, unknown>;
  pinVersion?: boolean;
  autoUpdate?: boolean;
};

export type MarketplaceUpdateInfo = {
  packageId: string;
  currentVersion: string;
  availableVersion?: string;
  pinned: boolean;
  autoUpdate: boolean;
  rollbackSupported: boolean;
  previousVersion?: string;
  compatibilityOk: boolean;
  validationIssues: string[];
};

export type MarketplaceLicenseStatus = {
  packageId: string;
  tenantId: string;
  licenseType: string;
  status: 'active' | 'trial' | 'expired' | 'pending' | 'denied';
  scope: 'global' | 'organization' | 'workspace' | 'user';
  workspaceId?: string;
  userId?: string;
  expiresAt?: string;
};

export type MarketplaceCapabilityRequirement = {
  capabilities: string[];
  permissions: string[];
  dependencies: string[];
};

export type MarketplaceInstallPreview = MarketplaceCapabilityRequirement & {
  packageId: string;
  version: string;
  name: string;
  publisher: string;
  requiresAdminApproval: boolean;
  trustStatus: string;
};

export type MarketplaceRecommendation = {
  catalogId: string;
  packageId: string;
  name: string;
  reason: string;
  score: number;
};

export interface IPackageCatalog {
  list(query?: MarketplaceSearchQuery): Promise<MarketplaceCatalogItem[]>;
  get(catalogId: string): Promise<MarketplaceCatalogItem | undefined>;
  getByPackageId(packageId: string, version?: string): Promise<MarketplaceCatalogItem | undefined>;
  categories(): Promise<string[]>;
  recentlyUpdated(limit?: number): Promise<MarketplaceCatalogItem[]>;
  mostInstalled(limit?: number): Promise<MarketplaceCatalogItem[]>;
  highestRated(limit?: number): Promise<MarketplaceCatalogItem[]>;
  recommend(ctx: PlatformContext, intent: string, limit?: number): Promise<MarketplaceRecommendation[]>;
}

export interface ILicenseService {
  getStatus(tenantId: string, packageId: string): Promise<MarketplaceLicenseStatus | undefined>;
  listForTenant(tenantId: string): Promise<MarketplaceLicenseStatus[]>;
  activate(request: MarketplaceInstallRequest): Promise<MarketplaceLicenseStatus>;
  revoke(tenantId: string, packageId: string): Promise<void>;
}

export interface IUpdateService {
  listAvailableUpdates(tenantId: string): Promise<MarketplaceUpdateInfo[]>;
  pinVersion(tenantId: string, packageId: string, version: string): Promise<void>;
  setAutoUpdate(tenantId: string, packageId: string, enabled: boolean): Promise<void>;
  rollback(tenantId: string, packageId: string): Promise<void>;
  getVersionHistory(tenantId: string, packageId: string): Promise<string[]>;
}

export interface ITrustService {
  verifyPackage(packageId: string, version: string): Promise<{ ok: boolean; status: string; issues: string[] }>;
  isTrustedPublisher(publisher: string): Promise<boolean>;
  listSecurityAdvisories(packageId: string, version?: string): Promise<string[]>;
}

export interface IMarketplaceService {
  search(query: MarketplaceSearchQuery): Promise<MarketplaceCatalogItem[]>;
  previewInstall(request: MarketplaceInstallRequest): Promise<MarketplaceInstallPreview>;
  install(request: MarketplaceInstallRequest): Promise<void>;
  enable(tenantId: string, packageId: string, scope?: MarketplaceInstallRequest['scope']): Promise<void>;
  disable(tenantId: string, packageId: string): Promise<void>;
  uninstall(tenantId: string, packageId: string): Promise<void>;
  upgrade(tenantId: string, packageId: string, version: string): Promise<void>;
  resolveIntent(ctx: PlatformContext, intent: string): Promise<MarketplaceRecommendation[]>;
}
