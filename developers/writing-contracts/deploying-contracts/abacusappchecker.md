---
description: A utility for confirm that contracts are functioning
---

# AbacusAppChecker

Abacus apps can optionally implement an `AbacusAppChecker` to confirm that their contracts and live. For contracts utilizing the the [Router](../router.md) pattern, simply extending the `AbacusRouterChecker` with custom types is sufficient.

```typescript
import { AbacusRouterChecker, ChainName } from '@abacus-network/sdk';

export class MyChecker<
  Chain extends ChainName,
> extends AbacusRouterChecker<
  Chain,
  MyContracts,
  MyApp<Chain>,
  MyConfig
> {}

```

{% hint style="info" %}
For an example checker implementation see the [Abacus Hello World](https://github.com/abacus-network/abacus-app-template/blob/main/src/deploy/check.ts) app.
{% endhint %}
