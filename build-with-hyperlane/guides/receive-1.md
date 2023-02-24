---
description: Customize interchain security using ISMs
---

# Configuring Security

Developers can take control of interchain security using Interchain Security Modules.&#x20;

### Interchain Security Modules

An Interchain Security Module (ISM) is a smart contract that is responsible for verifying messages from a remote chain. ISMs must implement the `IInterchainSecurityModule` interface.

<!-- INCLUDE node_modules/@hyperlane-xyz/core/interfaces/IInterchainSecurityModule.sol -->
<!-- END -->

To specify the ISM they would like to use, developers may implement the `ISpecifiesInterchainSecurityModule` interface in any contract that receives interchain messages.

If no ISM is specified, or if the specified ISM is the null address, the default `MultisigIsm` will be used.


{% hint style="info" %}
See [`Message.sol`](https://github.com/hyperlane-xyz/hyperlane-monorepo/blob/main/solidity/contracts/libs/Message.sol)for more details on Hyperlane message encoding.
{% endhint %}


{% hint style="warning" %}
[Relayer](../../../protocol/agents/relayer.md) support for custom ISMs is coming soon™️. It is recommended to use the default ISM for now.
{% endhint %}
