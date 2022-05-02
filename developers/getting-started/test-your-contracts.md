---
description: Test your smart contracts using Abacus and Hardhat
---

# Test your contracts

Once you're done writing your contracts, it's time to test them! You can use the [Abacus hardhat plugin](https://www.npmjs.com/package/@abacus-network/hardhat) to deploy an instance of Abacus for testing purposes and simulate interchain messaging.

In the future, Abacus will support additional testing frameworks, including [Foundry](https://github.com/foundry-rs/foundry).

## Install the plugin&#x20;

First, install the plugin:

```
yarn add --dev @abacus-network/hardhat
```

Then, import it by adding the following line to your `hardhat.config.ts`

```typescript
import '@abacus-network/hardhat';
```

## Use the plugin

The Abacus hardhat plugin allows you to deploy an instance of the Abacus contracts to your test environment, and simulate the passing of interchain messages between contracts.

In the example below, we simulate message passing between two chains, one with chain ID `1000`, and the other with chain ID `2000`.

```typescript
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { abacus, ethers } from 'hardhat';

// Types are generated using Typechain 
import { HelloWorld, HelloWorld__factory } from '../types';

// Chain IDs for our two simulated chains. These can be set to any value.
const localDomain = 1000;
const remoteDomain = 2000;
const domains = [localDomain, remoteDomain];

describe('HelloWorld', async () => {
  let signer: SignerWithAddress,
    local: HelloWorld,
    remote: HelloWorld;

  // Deploys one set of Abacus smart contracts for each entry in `domains`.
  // Using two domains allows us to simulate message passing between the
  // 'local' and 'remote' chains.
  before(async () => {
    [signer] = await ethers.getSigners();
    await abacus.deploy(domains, signer);
  });
  
  // Deploys two instances of our contracts, one to be treated as the 'local'
  // instance and the other as the 'remote' instance.
  // The HelloWorld contracts have no notion of which chain they're on, and so
  // in this case it doesn't matter which is which.
  beforeEach(async () => {
    const factory = new HelloWorld__factory(signer);
    local = await factory.deploy();
    remote = await factory.deploy();
  });
  
  it('should emit a HelloWorld event', async () => {
    // Initiate the transaction on the source chain.
    await local.sendHelloWorld(remoteDomain, remote.address);
    
    // Process interchain messages on the simulated remote chain.
    expect(await abacus.processMessages())
      .to.emit(remote, 'HelloWorld')
      .withArgs(localDomain, local.address, 'hello world');
  });
});
```
