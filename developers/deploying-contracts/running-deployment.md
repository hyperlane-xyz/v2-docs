---
description: Executing the multi-chain contract deployment
---

# Running deployment

Once an `AbacusDeployer` class has been defined, the deployer can be instantiated with a [Multiprovider](../building-applications/multiprovider.md) and a map of chains to configurations. These configs will be provided to your `deployContracts` methods and can include any values needed there. The initialization of Invoking `deploy()` will deploy contracts for all specified chains.&#x20;

```typescript
const ethereum: MyConfig = {...};
const polygon: MyConfig = {...};
const myDeployer = new MyDeployer(multiProvider, { ethereum, polygon });
const contracts = await myDeployer.deploy();
```

In scripts that calls `deploy`, consider persisting deployment artifacts as they will be  important for future use of your application. This includes addresses, compiler options, and contract constructor arguments.

{% hint style="info" %}
For an example deployment script, see the [Abacus Hello World](https://github.com/abacus-network/abacus-app-template/blob/main/src/scripts/deploy.ts) app.
{% endhint %}
