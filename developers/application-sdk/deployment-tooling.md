---
description: Deploying your application to multiple chains
---

# Deployment tooling

The Application SDK simplifies the deployment of smart contracts to a set of configured target chains.

### Install

```shell
yarn add @abacus-network/deploy
```

### Implement

To leverage the `AbacusAppDeployer` class, developers must provide an implementation for `deployContracts` which describes the logic for deploying the application on a single chain. Developers building with the [Router](../contract-sdk/router.md) pattern can extend `AbacusRouterDeployer`, which handles some Router-specific boilerplate.

```typescript
import { AbacusAppDeployer } from '@abacus-network/deploy';
import { ChainName } from '@abacus-network/sdk';

class MyDeployer<Chain extends ChainName, MyConfig>
  extends AbacusRouterDeployer<Chain, MyContracts, MyFactories, MyConfig> { 
    function deployContracts(network: Networks, config: MyConfig) {
        // deploy contracts here
    }
}
```

For a simple, single contract app that extends the `Router` contract, it is sufficient to call the `deployRouter` method in the `deployContracts` implementation:

```typescript
  async deployContracts(chain: Chain, config: HelloWorldConfig) {
    const acm = this.core.getContracts(chain).abacusConnectionManager.address;
    const router = await this.deployRouter(chain, [], [acm]);
    return { router };
  }
```

{% hint style="info" %}
See the [Examples section](../examples/) for more implementations of `AbacusAppDeployer.`
{% endhint %}

### Deploy

After providing an implementation for `deployContracts`, a deployer can be instantiated with a [Multiprovider](multiprovider.md) and a map of chains to configurations. These configs will be provided to your `deployContracts` methods and can include any values needed there. The initialization of Invoking `deploy()` will deploy contracts for all specified chains.&#x20;

```typescript
const ethereum: MyConfig = {...};
const polygon: MyConfig = {...};
const myDeployer = new MyDeployer(multiProvider, { ethereum, polygon });
const contracts = await myDeployer.deploy();
```

In scripts that calls `deploy`, consider persisting deployment artifacts as they will be  important for future use of your application. This includes addresses, compiler options, and contract constructor arguments.
