---
description: Interact with your application on multiple chains
---

# App Abstraction

_Note: Abacus is the former name of the Hyperlane protocol. The repo and SDK will soon be renamed._

The Hyperlane SDK simplifies the interface for smart contract applications deployed across multiple chains. It provides utilties for invoking a contract's methods on a target chain and a  [`MultiProvider`](../multiprovider.md) for managing chain connections.&#x20;

### Implement

The `AbacusApp` abstraction is a mapping that resolves a chain to a collection of [ethers Contracts](https://docs.ethers.io/v5/api/contract/contract/#Contract). Developers should extend `AbacusApp` and can add methods for different kinds of contract calls/transactions they would like to initiate.

A simple `AbacusApp` extension could look like this:

```typescript
export class MyAbacusApp<Chain extends ChainName = ChainName> 
  extends AbacusApp<MyContracts, Chain> 
{
  async myMethod(from: Chain, to: Chain, message: string) {
    const myContract = this.getContracts(from).router;
    const toDomain = ChainNameToDomainId[to];
    const tx = await helloWorldContract.myMethod(toDomain, message);
    return tx.wait();
  }
}
```

{% hint style="info" %}
See the [Hyperlane Hello World](https://github.com/abacus-network/abacus-app-template/blob/main/src/sdk/app.ts) app for an example of how to extend `AbacusApp`.
{% endhint %}

### Interact

Once an `AbacusApp` implementation is defined, it can be instantiated using the output generated from the [`AbacusAppDeployer`](broken-reference) and an instance of the [`MultiProvider`](../multiprovider.md).&#x20;

```typescript
const chainToContracts = await myDeployer.deploy();
const app = new mydApp(chainToContracts, multiProvider);
```

{% hint style="warning" %}
It is currently not possible to provide a set of networks in the `MultiProvider` which is only a subset of chains in the `addresses` constructor argument. This behavior is being fixed in a future release.
{% endhint %}

To interact with contracts on a particular network, simply provide the namespace to the app.&#x20;

```typescript
const ethereumContracts = myApp.getContracts('ethereum');
```
