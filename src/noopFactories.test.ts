import { describe, expect, it } from 'vitest';
import {
  createNoopAiRuntime,
  createNoopComplianceService,
  createNoopMarketplaceServices,
  createNoopPackageService,
} from './index.js';

const ctx = {
  tenantId: '00000000-0000-4000-8000-000000000001',
  userId: '00000000-0000-4000-8000-000000000099',
  correlationId: 'test-correlation',
};

describe('createNoopComplianceService', () => {
  it('fails closed for install and publication', async () => {
    const compliance = createNoopComplianceService();
    expect(await compliance.isInstallAllowed('pkg', '1.0.0')).toBe(false);
    expect(await compliance.isPublicationAllowed('pkg', '1.0.0')).toBe(false);
  });

  it('validateModule fails when runtime is disabled', async () => {
    const compliance = createNoopComplianceService();
    const report = await compliance.validateModule({ moduleId: 'pkg', version: '1.0.0' });
    expect(report.passed).toBe(false);
    expect(report.recommendations).toContain('Platform runtime disabled');
  });
});

describe('createNoopAiRuntime', () => {
  it('disables tool execution with a stable error', async () => {
    const ai = createNoopAiRuntime();
    await expect(ai.executeTool(ctx, { toolId: 'any-tool' })).resolves.toEqual({
      ok: false,
      error: 'AI runtime disabled',
      latencyMs: 0,
    });
  });

  it('reports unknown health and a disabled model route', async () => {
    const ai = createNoopAiRuntime();
    expect(ai.getHealth()).toBe('unknown');
    await expect(ai.routeModel(ctx, {})).resolves.toMatchObject({
      available: false,
      errorCode: 'NO_AUTHORIZED_MODEL_PROVIDER',
    });
  });
});

describe('createNoopMarketplaceServices', () => {
  it('marks trust as unsigned and denies trusted publishers', async () => {
    const { trust } = createNoopMarketplaceServices();
    expect(await trust.isTrustedPublisher('anyone')).toBe(false);
    expect(await trust.verifyPackage('pkg', '1.0.0')).toEqual({
      ok: false,
      status: 'unsigned',
      issues: ['Marketplace trust service unavailable'],
    });
  });

  it('blocks install preview and throws on install', async () => {
    const { marketplace } = createNoopMarketplaceServices();
    const preview = await marketplace.previewInstall({
      tenantId: ctx.tenantId,
      packageId: 'pkg',
      version: '1.0.0',
    });
    expect(preview).toMatchObject({
      trustStatus: 'unsigned',
      requiresAdminApproval: true,
      installBlocked: true,
    });
    expect(preview.installBlockReasons.length).toBeGreaterThan(0);

    await expect(
      marketplace.install({
        tenantId: ctx.tenantId,
        packageId: 'pkg',
        version: '1.0.0',
      }),
    ).rejects.toThrow('Marketplace runtime unavailable — package install blocked');
  });

  it('resolves non-install mutators without throwing', async () => {
    const { marketplace } = createNoopMarketplaceServices();
    await expect(marketplace.enable(ctx.tenantId, 'pkg')).resolves.toBeUndefined();
    await expect(marketplace.disable(ctx.tenantId, 'pkg')).resolves.toBeUndefined();
    await expect(marketplace.uninstall(ctx.tenantId, 'pkg')).resolves.toBeUndefined();
    await expect(marketplace.upgrade(ctx.tenantId, 'pkg', '2.0.0')).resolves.toBeUndefined();
  });
});

describe('createNoopPackageService', () => {
  it('validates ok with empty inventory', async () => {
    const packages = createNoopPackageService();
    expect(await packages.validate('pkg', '1.0.0')).toEqual({ ok: true, issues: [] });
    expect(await packages.listInstalled(ctx.tenantId)).toEqual([]);
    expect(await packages.listAvailable()).toEqual([]);
  });
});
