---
description: The skeleton of an Hyperlane-connected contract and app
---

# HelloWorld

The [hyperlane-app-template repo](https://github.com/hyperlane-xyz/hyperlane-app-template) shows the basic skeleton of an Hyperlane app.

### Contract

Its [contract](https://github.com/hyperlane-xyz/hyperlane-app-template/blob/main/contracts/HelloWorld.sol) sends a user-specified string to another chain which handles the message by increasing counters and emitting events.&#x20;

To conveniently implement the router pattern, the contract extends `@abacus-network/app/contracts/Router.sol`

To send the message, it calls the `_dispatchWithGas` method.

### Deployer

The [deployer](https://github.com/hyperlane-xyz/hyperlane-app-template/blob/main/src/deploy/deploy.ts) is configured to deploy to local hardhat-based test networks.

The main purpose of defining a deployer is to provide the custom types and and implementation of the `deployContracts` method. See [Deploying contracts](../building-applications/nodejs-sdk/deploying-contracts.md) for more details.

```typescript
export class HelloWorldDeployer<
  Chain extends ChainName,
> extends AbacusRouterDeployer<
  Chain,
  HelloWorldConfig,
  HelloWorldContracts,
  HelloWorldFactories,
> 
```

### Application

The [application](https://github.com/hyperlane-xyz/hyperlane-app-template/blob/main/src/app/app.ts) fetches some basic statistics and returns them.

The `sendHelloWorld` method shows an example of triggering the remote message dispatch:

```typescript
    const tx = await sender.sendHelloWorld(toDomain, message, {
      ...chainConnection.overrides,
      gasLimit,
      value,
    });
```
