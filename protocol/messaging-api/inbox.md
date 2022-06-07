---
description: Receive messages
---

# Inbox

The `Inbox` contract provides an interface for applications building on Abacus to receive messages from remote chains.

{% hint style="info" %}
There are several `Inboxes` on each Abacus-supported chain, one for each remote chain from which messages may be sent. For clarity and simplicity, the following documentation describes a single `Inbox` contract responsible for receiving messages from a single remote chain.
{% endhint %}

#### Process

[Relayers](../agents/relayers.md) deliver messages to their recipients by calling `Inbox.process()`. This function takes as arguments the signed merkle root, the message, and a merkle proof of that message against the signed root.

The `Inbox` verifies that a quorum of validators signed the root and the merkle proof before delivering the message to the recipient by calling `recipient.handle()`.

```solidity
/**
  * @notice Attempts to process the provided formatted `message`. Verifies
  * the aggregated signature on the checkpoint, and the merkle proof of
  * `message` against it.
  * @dev Reverts if fails to verify the signature or merkle proof.
  * @param _checkpoint The signed merkle root and leaf index.
  * @param _signature An aggregated signature on the checkpoint.
  * @param _proof A merkle proof of `message` against `checkpoint.root`.
  * @param _message Formatted message (refer to Mailbox.sol Message library).
  */
function process(
  Checkpoint calldata _checkpoint,
  Signature calldata _signature,
  MerkleProof calldata _proof,
  bytes calldata _message
) external;
```
