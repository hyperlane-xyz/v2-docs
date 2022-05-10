---
description: Interact with your application on multiple chains
---

# Interaction API

The Abacus Interaction API simplifies the interface for smart contract applications deployed across multiple networks. It provides a Typescript interface for invoking an application's smart contract methods on a target network, leveraging the [`MultiProvider`](multiprovider.md) for node API interaction.&#x20;

### Install

```shell
yarn add @abacus-network/sdk
```

### Implement

The `AbacusApp` abstraction is a mapping that resolves a network namespace to a collection of [ethers Contract](https://docs.ethers.io/v5/api/contract/contract/#Contract) instances on that network. A default implementation of this collection called [`AbacusContracts`](https://github.com/abacus-network/abacus-monorepo/blob/main/typescript/sdk/src/contracts.ts#L37) is provided which should satisfy most conceivable designs. This implementation ensures your contracts collections are attached to the appropriate network providers.

{% hint style="info" %}
Please see the [Examples section](../examples/) for a demonstration of how to leverage the `AbacusApp` abstraction`.`
{% endhint %}

### Interact

Once an `AbacusApp` implementation is defined, it can be instantiated using the output generated from the [`AbacusAppDeployer`](../application-sdk/deployment-tooling.md) and an instance of the [`MultiProvider`](multiprovider.md).&#x20;

```typescript
import { addresses } from './deployOutput';
const myApp = new MyApp(addresses, multiProvider);
```

{% hint style="warning" %}
It is currently not possible to provide a set of networks in the `MultiProvider` which is only a subset of networks in the `addresses` constructor argument. This behavior is being fixed in a future release.
{% endhint %}

To interact with contracts on a particular network, simply provide the namespace to the app.&#x20;

```typescript
const ethereumContracts = myApp.getContracts('ethereum');
```
