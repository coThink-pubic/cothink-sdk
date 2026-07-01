import type { PlatformSDK } from '../index.js';
import { createNoopAiRuntime } from '../aiRuntimeNoop.js';
import { createNoopComplianceService } from '../complianceNoop.js';
import { createNoopMarketplaceServices } from '../marketplaceNoop.js';
import { createNoopPackageService } from '../packageService.js';

export type MockPlatformSDKOptions = {
  tenantId?: string;
  userId?: string;
  permissions?: string[];
};

export function createMockPlatformSDK(options: MockPlatformSDKOptions = {}): PlatformSDK {
  const tenantId = options.tenantId ?? '00000000-0000-4000-8000-000000000001';
  const userId = options.userId ?? '00000000-0000-4000-8000-000000000099';
  const granted = new Set(options.permissions ?? ['*']);

  const configurationStore = new Map<string, unknown>();

  return {
    configuration: {
      async get<T>(moduleId: string, key: string) {
        return configurationStore.get(`${moduleId}:${key}`) as T | undefined;
      },
      async getResolved<T>(moduleId: string, key: string) {
        return configurationStore.get(`${moduleId}:${key}`) as T | undefined;
      },
    },
    events: {
      async publish() {
        return undefined;
      },
      subscribe() {
        return () => undefined;
      },
    },
    logging: {
      debug() {},
      info() {},
      warn() {},
      error() {},
    },
    permissions: {
      async hasPermission(_ctx, permission) {
        return granted.has('*') || granted.has(permission);
      },
    },
    metrics: {
      increment() {},
      observe() {},
    },
    storage: {
      async getObject() {
        return null;
      },
      async putObject() {
        return undefined;
      },
      async deleteObject() {
        return undefined;
      },
    },
    notifications: {
      async notify() {
        return undefined;
      },
    },
    ai: {
      async invoke() {
        return { output: 'mock-ai-response' };
      },
    },
    search: {
      async search() {
        return [];
      },
    },
    identity: {
      async resolveContext(ctx) {
        return { ...ctx, tenantId, userId, correlationId: ctx.correlationId ?? 'test-correlation' };
      },
    },
    audit: {
      async recordIntent() {
        return undefined;
      },
    },
    packages: createNoopPackageService(),
    aiRuntime: createNoopAiRuntime(),
    ...createNoopMarketplaceServices(),
    compliance: createNoopComplianceService(),
  };
}
