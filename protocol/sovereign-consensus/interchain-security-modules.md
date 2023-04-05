---
description: The security interface for Hyperlane
---

# Interface

ISMs must implement the `IInterchainSecurityModel()` interface. This interface consists of two functions.

```solidity
// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity >=0.6.11;

interface IInterchainSecurityModule {
    /**
     * @notice Returns an enum that represents the type of security model
     * encoded by this ISM.
     * @dev Relayers infer how to fetch and format metadata.
     */
    function moduleType() external view returns (uint8);

    /**
     * @notice Defines a security model responsible for verifying interchain
     * messages based on the provided metadata.
     * @param _metadata Off-chain metadata provided by a relayer, specific to
     * the security model encoded by the module (e.g. validator signatures)
     * @param _message Hyperlane encoded interchain message
     * @return True if the message was verified
     */
    function verify(bytes calldata _metadata, bytes calldata _message)
        external
        returns (bool);
}
```

### Verify

The primary function that ISMs must implement is `verify()`. The [messaging.md](../messaging.md "mention") will call `IInterchainSecurityModule.verify()` before delivering a message to its recipient. If `verify()` reverts or returns `false`, the message will not be delivered.

The `verify()` function takes two parameters.

The first, `_metadata`, consists of arbitrary bytes provided by [relayer.md](../agents/relayer.md "mention"). Typically, these bytes are specific to the ISM. For example, for a [multisig-ism.md](multisig-ism.md "mention"), `_metadata` must include validator signatures.

The second, `_message`, consists of the Hyperlane message being verified. ISMs can use this to inspect details about the message being verified. For example, a [multisig-ism.md](multisig-ism.md "mention") could change validator sets based on the origin chain of the message.

{% hint style="warning" %}
See the [`Message.sol`](https://github.com/hyperlane-xyz/hyperlane-monorepo/blob/main/solidity/contracts/libs/Message.sol) library for more information on the format of the Hyperlane message passed to `verify()`
{% endhint %}

### Module type

The secondary function that ISMs must implement is `moduleType()`. This is used to signal to [relayer.md](../agents/relayer.md "mention")what to include in `_metadata`. ISMs **must** return one of the supported module types.&#x20;

## Sequence diagram

The following shows a simplified sequence diagram of an interchain message being verified and delivered on the destination chain.

{% hint style="info" %}
If the recipient does not implement `ISpecifiesInterchainSecurityModule` or `recipient.interchainSecurityModule()` returns `address(0)`, the default ISM configured on the [messaging.md](../messaging.md "mention") will be used to verify the message.

This is omitted from the sequence diagram for clarity.
{% endhint %}

```mermaid
sequenceDiagram


    participant Relayer
    participant Mailbox
    participant ISM
    participant Recipient

    Relayer-->>ISM: moduleType()
    ISM-->>Relayer: ISM type
    Relayer->>Mailbox: process(metadata, message)
    Mailbox-->>Recipient: interchainSecurityModule()
    Recipient-->>Mailbox: ISM address
    Mailbox->>ISM: verify(metadata, message)
    ISM-->>Mailbox: true
    Mailbox->>Recipient: handle(origin, sender, body)

```
