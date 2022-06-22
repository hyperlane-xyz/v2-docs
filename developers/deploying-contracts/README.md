---
description: Managing multi-chain contract deployments
---

# Deploying contracts

The Abacus SDK contains utilities to facilitate deploying your contract(s) to multiple chains. This includes utilities for bytecode verification, contract upgradability patterns, and sanity checking deployments for consistency across chains

Two core classes will be relevant for this task: an `AbacusDeployer` and an `AbacusAppChecker`.

### Install

```shell
yarn add @abacus-network/deploy
```

### [AbacusDeployer](abacusdeployer.md)

A utility for managing deployments to multiple supported chains.&#x20;

### [AbacusAppChecker](abacusappchecker.md)

A utility for querying contracts to 'check' they are deployed and functioning.

### Class Hierarchy

![](<../../.gitbook/assets/Abacus Application SDK Diagram v2.png>)
