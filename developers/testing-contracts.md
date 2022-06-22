---
description: Testing contracts locally using the Hardhat plugin
---

# Testing contracts

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

In the example below, we simulate message passing between two chains. For more in depth examples see the tests in the [Abacus template application](https://github.com/abacus-network/abacus-app-template/tree/main/src/test).

```typescript
import '@abacus-network/hardhat';
import { utils as deployUtils } from '@abacus-network/deploy';
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
  // Get Domain ID for desired chain
  const remoteDomain = ChainNameToDomainId['test2'];

  before(async () => {
    [signer] = await ethers.getSigners();
    // Create multiprovider using desired test configs
    multiProvider = deployUtils.getMultiProviderFromConfigAndSigner(
      myTestConfigs,
      signer,
    );
    // Create and run a test core deployer
    const coreDeployer = new TestCoreDeploy(multiProvider);
    const coreContractsMaps = await coreDeployer.deploy();
    // Create a core test app with deployed core contracts
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
    await expect(local.sendMessage(remoteDomain, 'Hello')).to.emit(
      local,
      'SentHelloWorld',
    );
    // Check that sent counts are correct
    expect(await local.sent()).to.equal(1);
    expect(await local.sentTo(remoteDomain)).to.equal(1);
  });
  
  it('handles a message', async () => {
    await local.sendMessage(remoteDomain, 'World');
    // Mock processing of the message by Abacus
    await coreApp.processOutboundMessages(localChain);
    // The initial message has been dispatched.
    expect(await local.sent()).to.equal(1);
    // The initial message has been processed.
    expect(await remote.received()).to.equal(1);
    expect(await remote.receivedFrom(localDomain)).to.equal(1);
  });
});
```
