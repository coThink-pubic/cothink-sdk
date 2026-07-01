import type { PlatformContext } from './index.js';

export type RegisteredAiTool = {
  id: string;
  moduleId: string;
  moduleVersion: string;
  label: string;
  description?: string;
  requiredPermissions: string[];
};

export type RegisteredAiParticipant = {
  id: string;
  moduleId: string;
  moduleVersion: string;
  label: string;
  description?: string;
  role?: string;
  requiredPermissions: string[];
};

export type RegisteredPrompt = {
  id: string;
  moduleId: string;
  moduleVersion: string;
  label: string;
  version: string;
  scope: 'system' | 'tool' | 'workflow' | 'participant';
};

export type RegisteredContextProvider = {
  id: string;
  moduleId: string;
  moduleVersion: string;
  label: string;
  scope: string;
  dataClassification?: string;
};

export type RegisteredMemoryProvider = {
  id: string;
  moduleId: string;
  moduleVersion: string;
  label: string;
  scope: string;
};

export type RegisteredWorkflow = {
  id: string;
  moduleId: string;
  moduleVersion: string;
  label: string;
  category?: string;
};

export type RegisteredModelProvider = {
  id: string;
  moduleId: string;
  moduleVersion: string;
  label: string;
  providerType: string;
};

export type AiContextBundle = {
  providers: RegisteredContextProvider[];
  entries: Array<{ providerId: string; moduleId: string; scope: string; payload: Record<string, unknown> }>;
};

export type AiToolExecutionInput = {
  toolId: string;
  moduleId?: string;
  arguments?: Record<string, unknown>;
};

export type AiToolExecutionResult = {
  ok: boolean;
  output?: unknown;
  error?: string;
  latencyMs: number;
  modelProviderId?: string;
  promptVersion?: string;
  reasoningPath?: string[];
};

export type ModelRouteRequest = {
  preferredProviderId?: string;
  modelHint?: string;
  requiredCapabilities?: string[];
};

export type ModelRoute = {
  providerId: string;
  moduleId: string;
  modelId: string;
  providerType: string;
};

export type AiExecutionStats = {
  toolExecutions: number;
  failures: number;
  retries: number;
  totalLatencyMs: number;
  totalTokens: number;
  estimatedCostUsd: number;
};

export interface IAiTool {
  readonly descriptor: RegisteredAiTool;
  execute(ctx: PlatformContext, input: Record<string, unknown>): Promise<unknown>;
}

export interface IAiParticipant {
  readonly descriptor: RegisteredAiParticipant;
}

export interface IContextProvider {
  readonly descriptor: RegisteredContextProvider;
  resolve(ctx: PlatformContext): Promise<Record<string, unknown>>;
}

export interface IMemoryProvider {
  readonly descriptor: RegisteredMemoryProvider;
  recall(ctx: PlatformContext, query: { key: string }): Promise<unknown>;
  store(ctx: PlatformContext, entry: { key: string; value: unknown }): Promise<void>;
}

export interface IPromptProvider {
  resolve(ctx: PlatformContext, promptId: string, version?: string): Promise<string | undefined>;
}

export interface IWorkflowProvider {
  readonly descriptor: RegisteredWorkflow;
  run(ctx: PlatformContext, input: Record<string, unknown>): Promise<unknown>;
}

export interface IModelRouter {
  route(ctx: PlatformContext, request: ModelRouteRequest): Promise<ModelRoute>;
}

export interface IAiRuntime {
  listTools(ctx: PlatformContext): Promise<RegisteredAiTool[]>;
  listParticipants(ctx: PlatformContext): Promise<RegisteredAiParticipant[]>;
  listPrompts(): RegisteredPrompt[];
  listContextProviders(): RegisteredContextProvider[];
  listMemoryProviders(): RegisteredMemoryProvider[];
  listWorkflows(): RegisteredWorkflow[];
  listModelProviders(): RegisteredModelProvider[];
  aggregateContext(ctx: PlatformContext, scopes?: string[]): Promise<AiContextBundle>;
  executeTool(ctx: PlatformContext, input: AiToolExecutionInput): Promise<AiToolExecutionResult>;
  routeModel(ctx: PlatformContext, request: ModelRouteRequest): Promise<ModelRoute>;
  getExecutionStats(): AiExecutionStats;
  getHealth(): 'healthy' | 'degraded' | 'unhealthy' | 'unknown';
}
