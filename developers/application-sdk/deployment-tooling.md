---
description: Deploy your application on multiple chains
---

# Deployment Tooling

The Abacus deployment tooling simplifies the deployment of Abacus smart contract applications to configured target networks.

### Install

```shell
yarn add @abacus-network/deploy
```

### Implement

To leverage the `AbacusAppDeployer` abstraction, developers must provide an implementation for `deployContracts` which describes the logic for deploying the application on a single network.&#x20;

```typescript
import { AbacusAppDeployer } from '@abacus-network/deploy';
import { ChainName } from '@abacus-network/sdk';

class MyDeployer<Networks extends ChainName, MyConfig>
  extends AbacusAppDeployer<Networks, MyConfig> { 
    function deployContracts(network: Networks, config: MyConfig) {
        // deploy contracts here
    }
}
```

There are `deployContract` and `deployProxiedContract` helper functions included in `AbacusAppDeployer` which can simplify the `deployContracts` implementation.&#x20;

```typescript
this.deployContract(network, 'MyContract', MyContract__factory, config.args);
```

{% hint style="info" %}
Please see the [Examples section](../examples/) for an implementation of the `AbacusAppDeployer` abstraction`.`
{% endhint %}

### Deploy

Once a single network's implementation is specified, a deployer can be instantiated with a [multiprovider.md](../environments/multiprovider.md "mention") and corresponding config. The subsequent `deploy()` invocation will perform deployment for all networks specified in the configuration.

```typescript
const ethereum: MyConfig = {...};
const polygon: MyConfig = {...};
const myDeployer = new MyDeployer(multiProvider, { ethereum, polygon });
const addresses = await myDeployer.deploy();
```

{% hint style="info" %}
Persisting deployment artifacts will be very important for future use of your application. This goes beyond just addresses and includes compiler options and constructor arguments.
{% endhint %}

There is a `writeOutput` helper function included in `AbacusAppDeployer` that will assist in writing these artifacts to disk.&#x20;

```typescript
deployer.writeOutput('./output', addresses)
```
