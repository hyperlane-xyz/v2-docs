---
description: Manage RPC providers for Hyperlane supported chains in one place
---

# RPC Providers

`MultiProvider` is a utility used throughout the Hyperlane Application SDK. In essence, it is a mapping that resolves a chain namespace to a configured node (JSON RPC) provider.

### Configure

To configure and create your `MultiProvider`, create ethers.js-compatible providers and optionally specify a block confirmation threshold:&#x20;

```typescript
import {chainConnectionConfigs} from '@hyperlane-xyz/sdk';
// You can use a custom defined provider, say for a local node:
const ethereum = {
    provider: new ethers.providers.UrlJsonRpcProvider('http://localhost:8545/')
};
const polygon = {
    provider: new ethers.providers.UrlJsonRpcProvider('https://rpc-mainnet.matic.network'),
    confirmations: 10, // wait 10 blocks for finality
};
// Or you can use the SDK's default configs and providers:
const celo = chainConnectionConfigs.celo
const multiProvider = new MultiProvider({ ethereum, polygon, celo });
```

### Interact

`MultiProvider` allows, for example, an application to have static node provisioning per target chain and register a user's signer for the duration of a session.

```typescript
const userSigner = await getSessionSigner();
serverMultiProvider.getDomainConnection('ethereum').registerSigner(userSigner);
```

### Test

For use in tests, the Hardhat `signer` can be used to emulate a multichain system locally. The chains shown (`test1`, `test2`, `test3`) are included for convenience.

```typescript
import { ethers } from 'hardhat';

const [signer] = await ethers.getSigners();
const testMultiProvider = new MultiProvider({
    test1: { signer },
    test2: { signer },
    test3: { signer },
});
```

