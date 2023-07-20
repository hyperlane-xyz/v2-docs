---
description: Modular interchain security
---

# Interchain security modules

Hyperlane is secured by **Interchain Security Modules** (ISMs). ISMs are smart contracts that are responsible for verifying that interchain messages being delivered on the destination chain were _actually sent_ on the origin chain.

Hyperlane developers can **optionally** **override** the [messaging.md](../messaging.md "mention")'s default ISM by specifying an application-specific ISM, which they can configure, compose, and customize according to the needs of their application.

### Configure

Hyperlane defines a set of pre-built ISMs. Developers can deploy any of these contracts "off-the-shelf" and configure them with their own parameters.

For example, application developers that want increased sovereignty over interchain security could deploy a [multisig-ism.md](multisig-ism.md "mention") configured with validators sourced from their community.

### Compose

ISMs act as "security [legos](https://en.wikipedia.org/wiki/Lego)". Developers can mix and match different ISMs together to encode a security model that best fits their needs.

For example, application developers that want additional security could deploy an [aggregation-ism-1.md](aggregation-ism-1.md "mention") that requires verification by both a [multisig-ism.md](multisig-ism.md "mention") configured with validators from the Hyperlane community, **and** a [wormhole-ism.md](wormhole-ism.md "mention") that verifies that a quorum of the [Wormhole](https://wormhole.com/) validator set verified the message.

### Customize

ISMs are fully customizable. Developers can write their own ISMs, tailoring them to the needs of their application.

For example, application developers can build ISMs that adjust security models based on message content. High value and infrequent messages (e.g. governance) could be verified by a security model that prioritizes safety over latency and gas costs. Lower value and more frequent messages could be verified by a security model that prioritizes latency and gas costs over safety.

## Overriding the default ISM

Application developers can override the default ISM by implementing the `ISpecifiesInterchainSecurityModule` interface in their application.

Specifically, this interface must be implemented in the same smart contract that implements `handle()`.

```solidity
// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity >=0.6.11;

interface ISpecifiesInterchainSecurityModule {
    function interchainSecurityModule()
        external
        view
        returns (IInterchainSecurityModule);
}
```
