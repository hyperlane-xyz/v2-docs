---
description: Managing multi-chain contract deployments
---

# Deployment

_Note: Abacus is the former name of the Hyperlane protocol. The repo and deployers will soon be renamed._

`AbacusDeployer` helps manage the deployment of contracts across multiple chains. Hyperlane apps should extend a deployer to specifiy the needed types and implement any needed logic for deployment of their contracts.&#x20;

### Implement

Developers must provide an implementation for `deployContracts` which describes the logic for deploying the application on a single chain. Developers building with the [Router](../writing-contracts/router.md) pattern can extend `AbacusRouterDeployer`, which handles some Router-specific boilerplate.

Deployers will also need contract [Factories](https://docs.ethers.io/v5/api/contract/contract-factory/), which be defined manually or generated automatically by tooling like TypeChain (recommended).

```typescript
import { AbacusRouterDeployer, ChainName } from '@abacus-network/sdk';

class MyDeployer<Chain extends ChainName, MyConfig>
  extends AbacusRouterDeployer<Chain, MyContracts, MyFactories, MyConfig> { 
    function deployContracts(network: Networks, config: MyConfig) {
      // Custom contract deployment logic to goes here
      // This method is called once for each target chain
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
For an example deployer implementation see the [Hyperlane Hello World](https://github.com/abacus-network/abacus-app-template/blob/main/src/deploy/deploy.ts) app.
{% endhint %}

### Interact

Once an `AbacusDeployer` class has been defined, the deployer can be instantiated with a [Multiprovider](multiprovider.md) and a map of chains to configurations. These configs will be provided to your `deployContracts` methods and can include any values needed there. The initialization of Invoking `deploy()` will deploy contracts for all specified chains.&#x20;

```typescript
const ethereum: MyConfig = {...};
const polygon: MyConfig = {...};
const myDeployer = new MyDeployer(multiProvider, { ethereum, polygon });
const contracts = await myDeployer.deploy();
```

In scripts that calls `deploy`, consider persisting deployment artifacts as they will be  important for future use of your application. This includes addresses, compiler options, and contract constructor arguments.

{% hint style="info" %}
For an example deployment script, see the [Hyperlane Hello World](https://github.com/abacus-network/abacus-app-template/blob/main/src/scripts/deploy.ts) app.
{% endhint %}
