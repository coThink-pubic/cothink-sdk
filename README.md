# coThink SDK

Interface-only Platform SDK for coThink modules (`@collaborative-llm-chat/platform-sdk`).

## Repository

- **Remote:** https://git.ncdlabs.com/coThink/cothink-sdk
- **Workspace path:** sibling clone `../cothink-sdk` next to `integration`, `api`, `shared`, etc.

## Package

```bash
pnpm install
pnpm run build
pnpm run test
```

## Exports

- `PlatformSDK` and platform service interfaces
- Module contracts (`IApplicationModule`, `IEngineModule`, `IConnectorModule`, `IExtensionModule`)
- AI Runtime, Marketplace, Compliance, and Package Manager interfaces
- `@collaborative-llm-chat/platform-sdk/testing` — re-exports `@collaborative-llm-chat/platform-testing` (prefer the testing package for new modules)

## Documentation

Normative architecture: [integration.wiki/module-architecture-specification/](https://git.ncdlabs.com/coThink/integration/wiki/module-architecture-specification/README) · [integration wiki Home](https://git.ncdlabs.com/coThink/integration/wiki/Home)
