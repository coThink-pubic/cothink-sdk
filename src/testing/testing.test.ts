import { describe, expect, it } from 'vitest';
import { createMockPlatformSDK, createTestRuntimeContext } from './index.js';

describe('platform sdk testing helpers', () => {
  it('creates mock sdk with permissions', async () => {
    const sdk = createMockPlatformSDK({ permissions: ['task.read'] });
    const allowed = await sdk.permissions.hasPermission(
      {
        tenantId: '00000000-0000-4000-8000-000000000001',
        userId: 'u1',
        correlationId: 'c1',
      },
      'task.read',
    );
    expect(allowed).toBe(true);
  });

  it('creates test runtime context', () => {
    const ctx = createTestRuntimeContext();
    expect(ctx.tenantId).toBeTruthy();
    expect(ctx.sdk.logging).toBeDefined();
  });
});
