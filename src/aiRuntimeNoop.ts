import type { IAiRuntime } from '@collaborative-llm-chat/platform-sdk';

export function createNoopAiRuntime(): IAiRuntime {
  const emptyStats = {
    toolExecutions: 0,
    failures: 0,
    retries: 0,
    totalLatencyMs: 0,
    totalTokens: 0,
    estimatedCostUsd: 0,
  };
  return {
    async listTools() {
      return [];
    },
    async listParticipants() {
      return [];
    },
    listPrompts() {
      return [];
    },
    listContextProviders() {
      return [];
    },
    listMemoryProviders() {
      return [];
    },
    listWorkflows() {
      return [];
    },
    listModelProviders() {
      return [];
    },
    async aggregateContext() {
      return { providers: [], entries: [] };
    },
    async executeTool() {
      return { ok: false, error: 'AI runtime disabled', latencyMs: 0 };
    },
    async routeModel() {
      return {
        providerId: 'disabled',
        moduleId: 'platform-ai-foundation',
        modelId: 'default',
        providerType: 'router',
      };
    },
    getExecutionStats() {
      return { ...emptyStats };
    },
    getHealth() {
      return 'unknown';
    },
  };
}
