---
description: A description of the Inbox contract
---

# Inbox

The Inbox contract provides an interface for applications building on Abacus to receive messages from remote chains.

{% hint style="info" %}
There are several Inboxes on each Abacus-supported chain, one for each remote chain from which messages may be sent. For clarity and simplicity, the following documentation describes a single Inbox contract responsible for receiving messages from a single remote chain.
{% endhint %}

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

Once a checkpoint has been accepted by an Inbox, anybody can prove that a message was included in that checkpoint by calling `Inbox.prove().`

```solidity
/**
  * @notice Attempts to prove the validity of message given its leaf, the
  * merkle proof of inclusion for the leaf, and the index of the leaf.
  * @dev For convenience, we allow proving against any checkpoint.
  * @param _leaf Leaf of message to prove
  * @param _proof Merkle proof of inclusion for leaf
  * @param _index Index of leaf in outbox's merkle tree
  * @return Returns true if proof was valid
  */
function prove(
  bytes32 _leaf,
  bytes32[32] calldata _proof,
  uint256 _index
) public returns (bool);
```

Finally, messages that have been proven against a checkpoint can be forwarded to their recipients, which are responsible for handling them.

```solidity
/**
  * @notice Given formatted message, dispatches to the end recipient.
  * @dev Recipient must implement a `handle` method (refer to IMessageRecipient.sol)
  * Reverts if formatted message's destination domain is not the Inbox's domain,
  * if message has not been proven, or if the call to `handle` fails.
  * @param _message Formatted message
  */
function process(bytes calldata _message) public;
```
