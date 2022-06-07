---
description: Send messages
---

# Outbox

The `Outbox` contract provides an API to send messages to remote chains.

#### Dispatch

To send interchain messages, developers call `Outbox.dispatch()`.

This function function takes as arguments the message contents, the destination chain ID, and the recipient address. Each message get inserted as a leaf into an [incremental merkle tree](https://medium.com/@josephdelong/ethereum-2-0-deposit-merkle-tree-13ec8404ca4f). This data structure allows gas-efficient insertion of elements into the tree.

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
  bytes calldata _messageBody
) external;
```
