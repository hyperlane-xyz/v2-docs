---
description: A hierarchy and vocabulary of Application SDK core concepts
---

# Core concepts

Some of the core Application SDK concepts are arranged in a hierarchy as shown below:

![](<../../.gitbook/assets/Abacus Application SDK Diagram v2.png>)

A typical Abacus application would implement extensions of `AbacusApp`, `AbacusDeployer`, and (optionally) `AbacusChecker`. Following is a list of noteworthy concepts/objects in the Application SDK:

**AbacusApp:** The central manager of contracts objects.

**AbacusCore:** The `AbacusApp` for Abacus itself (i.e. for its core contracts)

**AbacusDeployer:** A utility for managing deployments to supported chains.

**AbacusChecker**: A utility for querying contracts to 'check' they are deployed and functioning.

**Factories:** Collections of ethers.js [contract factories](https://docs.ethers.io/v5/api/contract/contract-factory/).

**MultiProvider:** A utility to manage and use ethers.js compatible providers for multiple chains.

**InterchainGasCalculator:** A utility for computing gas estimates for cross-chain messages.

**TestCoreApp / TestCoreDeploy:** App/Deploy extensions intended for use in hardhat tests.

{% hint style="info" %}
For other terms or concepts that may not be covered here, see the [Glossary page](../../resources/glossary.md).
{% endhint %}

