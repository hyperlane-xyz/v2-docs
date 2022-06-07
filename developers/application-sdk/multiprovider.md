---
description: Manage node providers for Abacus supported networks in one place
---

# MultiProvider

`MultiProvider` is a network utility used throughout the Abacus Application SDK. In essence, it is a mapping that resolves a network namespace to a configured node provider.

### Configuration

It has a simple interface for configuring target networks that are supported by the Abacus core protocol.

```typescript
const ethereum = {
    provider: new UrlJsonRpcProvider('http://localhost:8545/')
};
const polygon = {
    provider: new UrlJsonRpcProvider('https://rpc-mainnet.matic.network'),
    confirmations: 10, // wait 10 blocks for finality
};
const multiProvider = new MultiProvider({ ethereum, polygon });
```

### Use

`MultiProvider` allows, for example, an application to have static node provisioning per target network and register a user's signer for the duration of a session.

```typescript
const userSigner = await getSessionSigner();
serverMultiProvider.getDomainConnection('ethereum').registerSigner(userSigner);
```

### Testing

For use in hardhat tests, we can provide the hardhat `signer` to multiple test networks to emulate a multichain system locally. The networks shown (`test1`, `test2`, `test3`) are included for convenience.

```typescript
import { ethers } from 'hardhat';

const [signer] = await ethers.getSigners();
const testMultiProvider = new MultiProvider({
    test1: { signer },
    test2: { signer },
    test3: { signer },
});
```

