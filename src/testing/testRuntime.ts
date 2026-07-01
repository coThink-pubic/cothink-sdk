import type { PlatformSDK } from '../index.js';
import { createMockPlatformSDK, type MockPlatformSDKOptions } from './mockSdk.js';

export type TestRuntimeContext = {
  sdk: PlatformSDK;
  tenantId: string;
  userId: string;
  correlationId: string;
};

export function createTestRuntimeContext(options: MockPlatformSDKOptions = {}): TestRuntimeContext {
  const tenantId = options.tenantId ?? '00000000-0000-4000-8000-000000000001';
  const userId = options.userId ?? '00000000-0000-4000-8000-000000000099';
  const correlationId = 'test-runtime-correlation';
  const sdk = createMockPlatformSDK({ ...options, tenantId, userId });
  return { sdk, tenantId, userId, correlationId };
}
