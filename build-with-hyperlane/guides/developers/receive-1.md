---
description: Customize interchain security using ISMs
---

# Configuring Security

Developers can take control of interchain security using Interchain Security Modules.&#x20;

### Interchain Security Modules

An Interchain Security Module (ISM) is a smart contract that is responsible for verifying messages from a remote chain. ISMs must implement the `IInterchainSecurityModule` interface.

```solidity
interface IInterchainSecurityModule {
   /**
    * @notice Returns whether or not to accept an interchain message.
    * @param _metadata Arbitrary metadata that can be injected by a relayer,
    * used by the ISM to verify the validity of `_message`.
    * May include things like validator signatures, merkle proofs,
    * zero-knowledge proofs of light client state, etc.
    * @param _message Hyperlane formatted interchain message.
    */
    function accept(
        bytes calldata _metadata,
        bytes calldata _message
    ) external returns (bool);
}   
```

{% hint style="info" %}
See [`Message.sol`](https://github.com/hyperlane-xyz/hyperlane-monorepo/blob/main/solidity/contracts/libs/Message.sol)for more details on Hyperlane message encoding.
{% endhint %}

### Specifying custom ISMs

To specify the ISM they would like to use, developers may implement the `ISpecifiesInterchainSecurityModule` interface in any contract that receives interchain messages.

```solidity
interface ISpecifiesInterchainSecurityModule {
    /// @notice Returns the address of the ISM that should be used to verify
    /// interchain messages sent to this contract.
    function interchainSecurityModule() external view returns (address);
}
```

If no ISM is specified, or if the specified ISM is the null address, the default `MultisigIsm` will be used.

{% hint style="warning" %}
[Relayer](../../../protocol-reference/agents/relayer.md) support for custom ISMs is coming soon™️. It is recommended to use the default ISM for now.
{% endhint %}
