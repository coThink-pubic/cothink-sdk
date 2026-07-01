import type { IEngineLifecycleHooks } from './engineLifecycle.js';
import type { PlatformSDK } from './index.js';

/** Canonical Application module contract — UI/metadata owned by the application. */
export interface IApplicationModule {
  readonly moduleId: string;
  readonly version: string;
  initialize(sdk: PlatformSDK): Promise<void>;
  shutdown?(): Promise<void>;
}

/** Canonical Engine module contract — business logic and lifecycle owned by the engine. */
export interface IEngineModule extends IEngineLifecycleHooks {
  readonly moduleId: string;
  readonly version: string;
  initialize(sdk: PlatformSDK): Promise<void>;
}

/** Connector modules integrate external systems via the Platform SDK. */
export interface IConnectorModule {
  readonly moduleId: string;
  readonly version: string;
  initialize(sdk: PlatformSDK): Promise<void>;
  connect(): Promise<void>;
  disconnect(): Promise<void>;
}

/** Extension modules contribute platform extension points without owning full apps. */
export interface IExtensionModule {
  readonly moduleId: string;
  readonly version: string;
  readonly contributionPoints: string[];
  initialize(sdk: PlatformSDK): Promise<void>;
  activate(): Promise<void>;
  deactivate(): Promise<void>;
}

export type PlatformModuleKind = 'application' | 'engine' | 'connector' | 'extension' | 'package';

export type PlatformModuleContract =
  | IApplicationModule
  | IEngineModule
  | IConnectorModule
  | IExtensionModule;
