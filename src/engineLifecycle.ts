export type EngineHealthStatus = 'healthy' | 'degraded' | 'failed';

export type EngineLifecycleContext = {
  moduleId: string;
  version: string;
  tenantId?: string;
  correlationId?: string;
};

export type EngineHealthReport = {
  status: EngineHealthStatus;
  version: string;
  startupTimeMs: number;
  configurationStatus: 'initialized' | 'pending' | 'invalid';
  dependencyValidation: { ok: boolean; issueCount: number };
  checkedAt: string;
};

export interface IEngineLifecycleHooks {
  onInstall(ctx: EngineLifecycleContext): Promise<void>;
  onEnable(ctx: EngineLifecycleContext): Promise<void>;
  onDisable(ctx: EngineLifecycleContext): Promise<void>;
  onUpgrade(ctx: EngineLifecycleContext, fromVersion: string): Promise<void>;
  onUninstall(ctx: EngineLifecycleContext): Promise<void>;
  onHealthCheck(ctx: EngineLifecycleContext): Promise<EngineHealthReport>;
  onConfigurationChanged(
    ctx: EngineLifecycleContext,
    change: { key: string; before: unknown; after: unknown },
  ): Promise<void>;
}
