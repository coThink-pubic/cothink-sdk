import type { IAiRuntime } from './aiRuntime.js';
import type { IComplianceService } from './compliance.js';
import type {
  ILicenseService,
  IMarketplaceService,
  IPackageCatalog,
  ITrustService,
  IUpdateService,
} from './marketplace.js';
import type { IPackageService } from './packageService.js';

export type PlatformContext = {
  tenantId: string;
  workspaceId?: string;
  userId: string;
  correlationId: string;
};

export type PlatformEvent = {
  name: string;
  source: string;
  payload: Record<string, unknown>;
  occurredAt: string;
  context?: Partial<PlatformContext>;
};

export type EventFilter = {
  name?: string;
  source?: string;
};

export type EventHandler = (event: PlatformEvent) => void | Promise<void>;

export type Unsubscribe = () => void;

export type MetricLabels = Record<string, string>;

export type RuntimeAuditEventInput = {
  action:
    | 'runtime.module.install'
    | 'runtime.module.uninstall'
    | 'runtime.module.enable'
    | 'runtime.module.disable'
    | 'runtime.module.upgrade'
    | 'runtime.configuration.mutate'
    | 'runtime.package.install'
    | 'runtime.package.enable'
    | 'runtime.package.disable'
    | 'runtime.package.upgrade'
    | 'runtime.package.remove'
    | 'runtime.package.validation_failure'
    | 'runtime.package.dependency_failure';
  moduleId: string;
  moduleType: 'engine' | 'application' | 'connector' | 'package' | 'extension';
  moduleVersion?: string;
  tenantId?: string;
  workspaceId?: string;
  userId?: string;
  actor: {
    actorType: 'system' | 'platform_admin' | 'tenant_admin' | 'service';
    actorId?: string;
    actorEmail?: string;
  };
  success: boolean;
  reason?: string;
  configurationKey?: string;
  before?: unknown;
  after?: unknown;
  metadata?: Record<string, unknown>;
  occurredAt?: string;
};

export interface IConfigurationService {
  get<T>(moduleId: string, key: string, ctx: PlatformContext): Promise<T | undefined>;
  getResolved<T>(moduleId: string, key: string, ctx: PlatformContext): Promise<T | undefined>;
}

export interface IEventService {
  publish(event: PlatformEvent): Promise<void>;
  subscribe(filter: EventFilter, handler: EventHandler): Unsubscribe;
}

export interface ILoggingService {
  debug(message: string, metadata?: Record<string, unknown>): void;
  info(message: string, metadata?: Record<string, unknown>): void;
  warn(message: string, metadata?: Record<string, unknown>): void;
  error(message: string, metadata?: Record<string, unknown>): void;
}

export interface IPermissionService {
  hasPermission(ctx: PlatformContext, permission: string): Promise<boolean>;
}

export interface IMetricsService {
  increment(name: string, labels?: MetricLabels, value?: number): void;
  observe(name: string, value: number, labels?: MetricLabels): void;
}

export interface IStorageService {
  getObject(key: string, ctx: PlatformContext): Promise<Uint8Array | null>;
  putObject(key: string, data: Uint8Array, ctx: PlatformContext): Promise<void>;
  deleteObject(key: string, ctx: PlatformContext): Promise<void>;
}

export interface INotificationService {
  notify(
    ctx: PlatformContext,
    notification: { title: string; body: string; metadata?: Record<string, unknown> },
  ): Promise<void>;
}

export interface IAiService {
  invoke(
    ctx: PlatformContext,
    request: { prompt: string; metadata?: Record<string, unknown> },
  ): Promise<{ output: string; metadata?: Record<string, unknown> }>;
}

export interface ISearchService {
  search(
    ctx: PlatformContext,
    query: { text: string; scope?: string; limit?: number },
  ): Promise<Array<{ id: string; title: string; metadata?: Record<string, unknown> }>>;
}

export interface IIdentityService {
  resolveContext(ctx: PlatformContext): Promise<PlatformContext>;
}

export interface IAuditService {
  /** Phase 0 contract — record audit intent; persistence may be deferred. */
  recordIntent(event: RuntimeAuditEventInput): Promise<void>;
}

export interface PlatformSDK {
  configuration: IConfigurationService;
  events: IEventService;
  logging: ILoggingService;
  permissions: IPermissionService;
  metrics: IMetricsService;
  storage: IStorageService;
  notifications: INotificationService;
  ai: IAiService;
  search: ISearchService;
  identity: IIdentityService;
  audit: IAuditService;
  packages: IPackageService;
  /** Phase 6 — AI orchestration, discovery, routing, and tool execution. */
  aiRuntime: IAiRuntime;
  /** Phase 7 — Marketplace catalog, installation, licensing, updates, and trust. */
  marketplace: IMarketplaceService;
  catalog: IPackageCatalog;
  licenses: ILicenseService;
  updates: IUpdateService;
  trust: ITrustService;
  /** Platform Compliance — MAS validation and architectural governance. */
  compliance: IComplianceService;
}

export type {
  IAiRuntime,
  IAiTool,
  IAiParticipant,
  IContextProvider,
  IMemoryProvider,
  IPromptProvider,
  IWorkflowProvider,
  IModelRouter,
  RegisteredAiTool,
  RegisteredAiParticipant,
  RegisteredPrompt,
  RegisteredContextProvider,
  RegisteredMemoryProvider,
  RegisteredWorkflow,
  RegisteredModelProvider,
  AiContextBundle,
  AiToolExecutionInput,
  AiToolExecutionResult,
  ModelRouteRequest,
  ModelRoute,
  AiExecutionStats,
} from './aiRuntime.js';

export type { IPackageService } from './packageService.js';
export { createNoopPackageService } from './packageService.js';
export { createNoopAiRuntime } from './aiRuntimeNoop.js';
export { createNoopMarketplaceServices } from './marketplaceNoop.js';
export { createNoopComplianceService } from './complianceNoop.js';

export type {
  IComplianceService,
  ComplianceValidateModuleInput,
  ComplianceValidatePlatformInput,
  ComplianceViolation,
  ComplianceScoreBreakdown,
  ComplianceModuleReport,
  ComplianceReport,
  RuntimeComplianceDiagnostics,
} from './compliance.js';

export type {
  IMarketplaceService,
  IPackageCatalog,
  ILicenseService,
  IUpdateService,
  ITrustService,
  MarketplaceInstallPreview,
  MarketplaceRecommendation,
} from './marketplace.js';

export type { IEngineLifecycleHooks, EngineHealthReport, EngineLifecycleContext } from './engineLifecycle.js';

export type {
  IApplicationModule,
  IEngineModule,
  IConnectorModule,
  IExtensionModule,
  PlatformModuleKind,
  PlatformModuleContract,
} from './moduleContracts.js';
