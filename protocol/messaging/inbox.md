---
description: A description of the Inbox contract
---

# Inbox

The Inbox contract provides an interface for applications building on Abacus to receive messages from remote chains.

{% hint style="info" %}
There are several Inboxes on each Abacus-supported chain, one for each remote chain from which messages may be sent. For clarity and simplicity, the following documentation describes a single Inbox contract responsible for receiving messages from a single remote chain.
{% endhint %}

#### Checkpoint

In order to pass a message on to its recipient, a signed [checkpoint](./#checkpoints) committing to that message must first be relayed to the Inbox. Anyone can relay a signed checkpoint to an Inbox by calling `Inbox.checkpoint()`.

```solidity
/**
  * @notice Verifies that a quorum of validators signed the checkpoint and writes
  * it to storage so that messages can be proved against its root.
  * @dev Reverts if checkpoints's index is not greater than our latest index.
  * @param _root The checkpoint's merkle root
  * @param _index The checkpoint's index
  * @param _signature Validator signatures on `_root` and `_index`
  */
function checkpoint(
  bytes32 _root,
  uint256 _index,
  bytes calldata _signatures
) external;
```

#### Process

Once a checkpoint has been accepted by an `Inbox`, anybody can send a message included in that checkpoint to its recipient by proving inclusion in the corresponding merkle tree. This will result in a call by the `Inbox` to the `handle()` function of the message recipient.

```solidity
/**
  * @notice Attempts to process the provided formatted `message`. Performs
  * verification against root of the proof
  * @dev Reverts if verification of the message fails.
  * @dev Includes the eventual function signature for Sovereign Consensus,
  * but comments out the name to suppress compiler warning
  * @param _message Formatted message (refer to Common.sol Message library)
  * @param _proof Merkle proof of inclusion for message's leaf
  * @param _index Index of leaf in outbox's merkle tree
  */
function process(
  bytes calldata _message,
  bytes32[32] calldata _proof,
  uint256 _index,
  bytes calldata /* _sovereignData */
) external;
```
