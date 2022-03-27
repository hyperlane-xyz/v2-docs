# Checkpointer

The Checkpointer is an unpermissioned role responsible for creating [checkpoints](../messaging/#checkpoints) on an [Outbox](../messaging/outbox.md).

Checkpoints can be created by calling `Outbox.checkpoint()`.  Because a message must be included in a checkpoint before it can be relayed to a remote chain, more frequent checkpoints result in lower perceived latency for users. Anyone can create a checkpoint at any time to facilitate the delivery of cross-chain messages.

```solidity
/**
  * @notice Checkpoints the latest root and index.
  * Validators are expected to sign this checkpoint so that it can be
  * relayed to the Inbox contracts.
  * @dev emits Checkpoint event
  */
function checkpoint() external;
```

For convenience, Abacus Works will run an open source and configurable checkpointer agent, implemented as a rust binary.&#x20;

For now, the checkpointer can be configured with a simple "max-latency" policy, ensuring that messages are always included in a checkpoint within a predefined time period.&#x20;

If application developers require lower latency, they can run a checkpointer themselves or call `Outbox.checkpoint()` directly within their application after calling `Outbox.dispatch().`&#x20;

In the future the protocol may directly or indirectly incentivize checkpoint creation.&#x20;
