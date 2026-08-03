import { describe, expect, it } from 'vitest';
import { createMockPlatformSDK, createTestRuntimeContext } from './index.js';

const baseCtx = {
  tenantId: 'tenant-input',
  userId: 'user-input',
  correlationId: 'corr-input',
};

describe('createMockPlatformSDK', () => {
  it('allows only listed permissions without wildcard', async () => {
    const sdk = createMockPlatformSDK({ permissions: ['task.read'] });
    expect(await sdk.permissions.hasPermission(baseCtx, 'task.read')).toBe(true);
    expect(await sdk.permissions.hasPermission(baseCtx, 'task.write')).toBe(false);
  });

  it('denies all permissions when allowlist is empty', async () => {
    const sdk = createMockPlatformSDK({ permissions: [] });
    expect(await sdk.permissions.hasPermission(baseCtx, 'task.read')).toBe(false);
    expect(await sdk.permissions.hasPermission(baseCtx, '*')).toBe(false);
  });

  it('uses default tenant and user ids for identity resolution', async () => {
    const sdk = createMockPlatformSDK();
    const resolved = await sdk.identity.resolveContext(baseCtx);
    expect(resolved.tenantId).toBe('00000000-0000-4000-8000-000000000001');
    expect(resolved.userId).toBe('00000000-0000-4000-8000-000000000099');
    expect(resolved.correlationId).toBe('corr-input');
  });
});

describe('createTestRuntimeContext', () => {
  it('returns fixed correlation id and wired sdk', () => {
    const ctx = createTestRuntimeContext({
      tenantId: '00000000-0000-4000-8000-000000000010',
      userId: '00000000-0000-4000-8000-000000000020',
    });
    expect(ctx.tenantId).toBe('00000000-0000-4000-8000-000000000010');
    expect(ctx.userId).toBe('00000000-0000-4000-8000-000000000020');
    expect(ctx.correlationId).toBe('test-runtime-correlation');
    expect(ctx.sdk.logging).toBeDefined();
    expect(ctx.sdk.packages).toBeDefined();
  });
});
