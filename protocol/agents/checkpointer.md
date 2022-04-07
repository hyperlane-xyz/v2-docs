# Checkpointer

The Checkpointer is responsible for creating [checkpoints](../messaging/#checkpoints) on an [Outbox](../messaging/outbox.md).

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

For convenience, Abacus Works will run an open source and configurable checkpointer agent, implemented as a Rust binary. This checkpointer will be configured with a "max-latency" policy, ensuring messages are included in a checkpoint at least as frequently as configured.

If application developers require lower latency, they can run a checkpointer themselves or call `Outbox.checkpoint()` directly within their application after calling `Outbox.dispatch().`&#x20;

In the future the protocol may directly or indirectly incentivize checkpoint creation.&#x20;
