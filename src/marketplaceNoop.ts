import type {
  ILicenseService,
  IMarketplaceService,
  IPackageCatalog,
  ITrustService,
  IUpdateService,
} from './marketplace.js';

export function createNoopMarketplaceServices(): {
  marketplace: IMarketplaceService;
  catalog: IPackageCatalog;
  licenses: ILicenseService;
  updates: IUpdateService;
  trust: ITrustService;
} {
  const emptyCatalog = async () => [] as never[];
  const noop = async () => undefined;
  return {
    marketplace: {
      search: emptyCatalog,
      previewInstall: async () => ({
        packageId: '',
        version: '',
        name: '',
        publisher: '',
        capabilities: [],
        permissions: [],
        dependencies: [],
        requiresAdminApproval: false,
        trustStatus: 'unsigned',
      }),
      install: noop,
      enable: noop,
      disable: noop,
      uninstall: noop,
      upgrade: noop,
      resolveIntent: async () => [],
    },
    catalog: {
      list: emptyCatalog,
      get: async () => undefined,
      getByPackageId: async () => undefined,
      categories: async () => [],
      recentlyUpdated: emptyCatalog,
      mostInstalled: emptyCatalog,
      highestRated: emptyCatalog,
      recommend: async () => [],
    },
    licenses: {
      getStatus: async () => undefined,
      listForTenant: emptyCatalog,
      activate: async () => ({
        packageId: '',
        tenantId: '',
        licenseType: 'internal',
        status: 'pending',
        scope: 'organization',
      }),
      revoke: noop,
    },
    updates: {
      listAvailableUpdates: emptyCatalog,
      pinVersion: noop,
      setAutoUpdate: noop,
      rollback: noop,
      getVersionHistory: async () => [],
    },
    trust: {
      verifyPackage: async () => ({ ok: true, status: 'unsigned', issues: [] }),
      isTrustedPublisher: async () => false,
      listSecurityAdvisories: async () => [],
    },
  };
}
