# NodeJS SDK

_Note: Abacus is the former name of the Hyperlane protocol. The repos will soon be renamed._

The NodeJS SDK ([`@hyperlane-xyz/sdk`](https://www.npmjs.com/package/@hyperlane-xyz/sdk)) contains everything you need to productionize your interchain app on the web, including:

### [RPC Provider Management](./#multiprovider)

App to chain communication is performed via ethers.js compatible [providers](https://docs.ethers.io/v5/api/providers/). To help manage providers for multiple chains, the SDK includes a `MultiProvider` utility.

### [Multichain Deployment Tooling](deploying-contracts.md)

Facilitate deploying your contract(s) to multiple chains. This includes utilities for bytecode verification, contract upgradability patterns, and resumability from partially successful deployments (e.g. k/n chains successfully deployed).

### [Interchain Gas Estimation](./#gas-estimation-and-payment)

Hyperlane allows users to pay for message processing on the destination chain using tokens from the origin chain. Use the `InterchainGasCalculator` utility for gas estimation of cross-chain messages.

### [App Abstraction](./#undefined)

## Class Hierarchy

![](<../../../.gitbook/assets/Abacus Application SDK Diagram v2.png>)
