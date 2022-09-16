---
description: Receive messages
---

# Inbox

The `Inbox` contract provides an interface for applications building on Hyperlane to receive messages from remote chains.

{% hint style="info" %}
There are several `Inboxes` on each Hyperlane-supported chain, one for each remote chain from which messages may be sent. For clarity and simplicity, the following documentation describes a single `Inbox` contract responsible for receiving messages from a single remote chain.
{% endhint %}

#### Process

[Relayers](../agents/relayer.md) deliver messages to their recipients by calling `Inbox.process()`. This function takes as parameters the message to deliver, a merkle proof of that message, and an arbitrary bytes array, to be consumed by the recipient's [interchain security module](../security/sovereign-consensus.md) (ISM).

The `Inbox` checks for acceptance by the recipients ISM and verifies the merkle proof before delivering the message to the recipient by calling `recipient.handle()`.

```solidity
/**
  * @notice Attempts to process the provided formatted `message`. Checks
  * that the recipient's ISM will accept the messages, verifies the merkle
  * proof, and delivers the message to the recipient.
  * @param _root The merkle root that `_message` was proved against.
  * @param _index The number of messages in the merkle tree.
  * @param _sovereignData Arbitrary data to pass to the recipient's ISM.
  * Typically a list of validator signatures.
  * @param _message Formatted message (refer to Mailbox.sol Message library).
  * @param _proof A merkle proof of `message` against `_root`.
  */
  function process(
    bytes32 _root,
    uint256 _index,
    bytes calldata _sovereignData,
    bytes calldata _message,
    bytes32[32] calldata _proof,
    uint256 _leafIndex
  ) external;
```
