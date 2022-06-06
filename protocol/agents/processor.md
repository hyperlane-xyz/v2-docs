# Processor

Processors are responsible for sending messages to their recipients by calling [`Inbox.process()`](../messaging/inbox.md#process).

```solidity
/**
 * @notice Attempts to process the provided formatted `message`. Performs
 * verification against root of the proof
 * @dev Reverts if verification of the message fails.
 * @param _message Formatted message (refer to Common.sol Message library)
 * @param _proof Merkle proof of inclusion for message's leaf
 * @param _index Index of leaf in outbox's merkle tree
*/
function process(
   bytes calldata _message,
   bytes32[32] calldata _proof,
   uint256 _index,
   bytes calldata _sovereignData
) external;
```

For convenience, Abacus Works will run an open source and configurable processor agent, implemented as a Rust binary.

The processor observes an [Outbox](../messaging/outbox.md), constructing merkle proofs for messages as checkpoints are created. After those checkpoints are relayed to an Inbox, the processor submits the merkle proof to the Inbox, which forwards the message to its recipient.

Similar to the [Relayer](relayer.md), messages will only be processed by the Abacus Works processor if a sufficient [interchain gas payment](../../developers/application-sdk/gas.md) has been made on the source chain.

Note that Sovereign Consensus is not currently implemented.

#### Error handling

The processor may be configured to retry messages when processing fails. Messages that fail to process on the first attempt will cause the processor to retry with exponential backoff. After a maximum amount of retries, the processor will no longer attempt to process the message.
