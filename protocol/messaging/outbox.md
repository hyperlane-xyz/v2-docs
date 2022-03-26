---
description: A description of the Outbox contract
---

# Outbox

The Outbox contract provides an interface for applications building on Abacus to send messages to remote chains.

There is an instance of the Outbox contract on each Abacus-supported chain. To send a message to a remote chain, applications simply call `Outbox.dispatch()` specifying the message contents and destination.

```solidity
/**
  * @notice Dispatch the message it to the destination domain & recipient
  * @param _destinationDomain Domain of destination chain
  * @param _recipientAddress Address of recipient on destination chain as bytes32
  * @param _messageBody Raw bytes content of message
  */
function dispatch(
  uint32 _destinationDomain,
  bytes32 _recipientAddress,
  bytes memory _messageBody
) external;
```

Dispatched messages get inserted into an [incremental merkle tree](https://medium.com/@josephdelong/ethereum-2-0-deposit-merkle-tree-13ec8404ca4f), which updates the contents of the tree while minimizing the number of storage for each insertion.

For a dispatched message to reach its destination, it must first be included in a [checkpoint](./#checkpoints). Anyone can create a new checkpoint by calling `Outbox.checkpoint()`, which computes the current merkle root and writes it to storage.

Checkpoints are signed by the validator set and relayed to [Inboxes](inbox.md), after which messages can be proved against the merkle root and forwarded to their recipient.
