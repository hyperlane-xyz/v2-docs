# Processor

Processors are responsible for verifying and then processing messages on an [Inbox](../messaging/inbox.md).

Messages can be verified against a checkpoint by calling `Inbox.prove()`. After a message has been proved, it can be processed by calling `Inbox.process()`. For convenience, both actions can be performed in the same transaction by calling `Inbox.proveAndProcess()`.

```solidity
/**
  * @notice First attempts to prove the validity of `_message`. If successful,
  * then attempts to process.
  * @param _message Formatted message
  * @param _proof Merkle proof of inclusion for message's leaf
  * @param _index Index of leaf in Outbox's merkle tree
  */
function proveAndProcess(
  bytes memory _message,
  bytes32[32] calldata _proof,
  uint256 _index
) external;
```

For convenience, Abacus Works will run an open source and configurable processor agent, implemented as a Rust binary.

The processor observes an [Outbox](../messaging/outbox.md), constructing merkle proofs for messages as checkpoints are created. After those checkpoints are relayed to an Inbox, the processor submits the merkle proof to the Inbox, which forwards the message to its recipient.

On testnets, developers can expect the Abacus Works processor to automatically process messages. On mainnets, there will be a protocol for paying on the source chain for the processor to process the message on the remote chain.

#### Error handling

The processor may be configured to retry messages when processing fails. Messages that fail to process on the first attempt will cause the processor to retry with exponential backoff. After a maximum amount of retries, the processor will no longer attempt to process the message.
