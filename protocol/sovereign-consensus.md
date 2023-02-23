---
description: Configurable interchain security
---

# Sovereign consensus

Sovereign consensus allows applications to configure and choose from a selection of **Interchain Security Modules**, smart contracts that define a security model for interchain messaging.

Applications can use sovereign consensus to tune security models and trust assumptions to best fit their needs. A heterogenous ecosystem of interchain security models allows for fault isolation and maximizes Hyperlane's decentralization.

Sovereign consensus is entirely optional. [`Mailboxes`](messaging.md) will default to a module that leverages the economic security provided by [proof-of-stake](proof-of-stake.md).

Applications can opt into sovereign consensus by implementing the `interchainSecurityModule()` ABI, which returns the address of the ISM being used by the application.

```solidity
interface ISpecifiesInterchainSecurityModule {
    /// @notice Returns the address of the ISM that should be used to verify
    /// interchain messages sent to this contract.
    function interchainSecurityModule() external view returns (address);
}
```

This model allows for varying levels of customization. Developers that want minimal customization can use the default ISM or point to an already deployed contract. Developers that want more control over security can deploy and configure their own ISM, or even write one from scratch.

### Interchain security modules

Interchain security modules (ISMs) are smart contracts that define the security model for an application.

ISMs must implement the `accept()` interface, which gets called by the `Mailbox` before delivering a message. If `accept()` does not return true, the transaction will revert.

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

### Examples

A few types of ISMs are described below for illustrative purposes. Eventually, we plan to deploy pre-configured instances of each of these that developers can choose from. Alternatively, developers can deploy and configure their own ISM instances.

**Multisig:** A simple t-of-n security model. A proof-of-stake adapter contract could be used to vary the membership to reflect the Hyperlane validators that provide the most economic security.

<details>
    <summary>Diagram</summary>
<!-- INCLUDE diagrams/multisig-pos-ism.md -->
<!-- END -->
</details>

**Optimistic:** A model pioneered by [Optics](https://docs.celo.org/protocol/bridge/optics) that prioritizes safety over liveness, optimistic ISMs encode a fraud window during which 1-of-n parties can halt the system.

**Dynamic:** ISMs that vary their configuration (or underlying security model) over time based on message content or application state.
