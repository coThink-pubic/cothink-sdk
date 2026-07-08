# coThink SDK

Interface-only Platform SDK for coThink modules (`@collaborative-llm-chat/platform-sdk`).

## Repository

- **Remote:** https://git.ncdlabs.com/coThink/cothink-sdk
- **Wiki:** https://git.ncdlabs.com/coThink/cothink-sdk/wiki
- **Workspace path:** sibling clone `../cothink-sdk` next to `integration`, `api`, `shared`, etc.

## Package

```bash
pnpm install
pnpm run build
pnpm run test
```

Requires Node.js ≥ 22 and pnpm ≥ 9.

## Exports

- `PlatformSDK` and platform service interfaces
- Module contracts (`IApplicationModule`, `IEngineModule`, `IConnectorModule`, `IExtensionModule`)
- AI Runtime, Marketplace, Compliance, and Package Manager interfaces
- `@collaborative-llm-chat/platform-sdk/testing` — `createMockPlatformSDK`, `createTestRuntimeContext` (prefer `@collaborative-llm-chat/platform-testing` for new modules)

## Documentation

| Layer | Location |
|-------|----------|
| **SDK contract wiki** | [cothink-sdk wiki](https://git.ncdlabs.com/coThink/cothink-sdk/wiki) — Getting Started, API reference, testing, CI |
| **Normative MAS / Platform Runtime** | [MAS-1.0](https://git.ncdlabs.com/coThink/integration/wiki/module-architecture-specification/README) · [integration wiki Home](https://git.ncdlabs.com/coThink/integration/wiki/Home) |
