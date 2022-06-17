---
description: Test your smart contracts using Abacus and Hardhat
---

# Hardhat

Once you're done writing your contracts, it's time to test them! You can use the [Abacus hardhat plugin](https://www.npmjs.com/package/@abacus-network/hardhat) to deploy an instance of Abacus for testing purposes and simulate interchain messaging.

In the future, Abacus will support additional testing frameworks, including [Foundry](https://github.com/foundry-rs/foundry).

## Install the plugin&#x20;

First, install the plugin:

```shell
yarn add --dev @abacus-network/hardhat
```

Then, import it by adding the following line to your `hardhat.config.ts`

```typescript
import '@abacus-network/hardhat';
```

## Use the plugin

The Abacus hardhat plugin allows you to deploy an instance of the Abacus contracts to your test environment, and simulate the passing of interchain messages between contracts.

In the example below, we simulate message passing between two chains, one with chain ID `1000`, and the other with chain ID `2000`. For more in depth examples see the tests in the [Abacus template application](https://github.com/abacus-network/abacus-app-template/tree/main/src/test).

```typescript
import { utils as deployUtils } from '@abacus-network/deploy';
import '@abacus-network/hardhat';
import { TestCoreApp } from '@abacus-network/hardhat/dist/src/TestCoreApp';
import { TestCoreDeploy } from '@abacus-network/hardhat/dist/src/TestCoreDeploy';
import {
  ChainMap,
  ChainNameToDomainId,
  MultiProvider,
  TestChainNames,
} from '@abacus-network/sdk';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('HelloWorld', async () => {
  let signer: SignerWithAddress;
  let multiProvider: MultiProvider<TestChainNames>;
  let local: MyApp;
  let coreApp: TestCoreApp;
  let config: ChainMap<TestChainNames, MyConfig>;

  before(async () => {
    [signer] = await ethers.getSigners();
    // Create multiprovider using desired test configs
    multiProvider = deployUtils.getMultiProviderFromConfigAndSigner(
      myTestConfigs,
      signer,
    );
    // Create and run a test deployer
    const coreDeployer = new TestCoreDeploy(multiProvider);
    const coreContractsMaps = await coreDeployer.deploy();
    // Create and run a test deployer
    coreApp = new TestCoreApp(coreContractsMaps, multiProvider);
    // Extend my configs with needed core configs
    config = coreApp.extendWithConnectionManagers(getMyConfigs(signer.address));
  });

  beforeEach(async () => {
    // Create and run my app deployer
    const deployer = new MyDeployer(multiProvider, config, coreApp);
    const contracts = await deployer.deploy();
    local = contracts['test1'].router;
  });

  it('sends a message', async () => {
    // Get Domain ID for desired chain
    const remoteDomain = ChainNameToDomainId['test2'];
    await expect(local.sendMessage(remoteDomain, 'Hello')).to.emit(
      local,
      'SentHelloWorld',
    );
    // Check that sent counts are correct
    expect(await local.sent()).to.equal(1);
    expect(await local.sentTo(remoteDomain)).to.equal(1);
  });
});

```
