---
description: Interact with your application on multiple chains
---

# App Abstraction

The Hyperlane SDK simplifies the interface for smart contract applications deployed across multiple chains. It provides utilties for invoking a contract's methods on a target chain and a  [`MultiProvider`](multiprovider.md) for managing chain connections.&#x20;

### Implement

The `HyperlaneApp` abstraction is a mapping that resolves a chain to a collection of [ethers Contracts](https://docs.ethers.io/v5/api/contract/contract/#Contract). Developers should extend `HyperlaneApp` and can add methods for different kinds of contract calls/transactions they would like to initiate.

A simple `HyperlaneApp` extension could look like this:

```typescript
export class MyHyperlaneApp<Chain extends ChainName = ChainName> 
  extends HyperlaneApp<MyContracts, Chain> 
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
See the [Hyperlane Hello World](https://github.com/hyperlane-xyz/hyperlane-app-template/blob/main/src/app/app.ts) app for an example of how to extend `HyperlaneApp`.
{% endhint %}

### Interact

Once a `HyperlaneApp` implementation is defined, it can be instantiated using the output generated from the `HyperlaneAppDeployer` and an instance of the [`MultiProvider`](multiprovider.md).&#x20;

```typescript
const chainToContracts = await myDeployer.deploy();
const app = new mydApp(chainToContracts, multiProvider);
```

To interact with contracts on a particular network, simply provide the namespace to the app.&#x20;

```typescript
const ethereumContracts = myApp.getContracts('ethereum');
```
