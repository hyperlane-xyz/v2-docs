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

Because checkpoints commit to the entire history of outbound messages, the gas costs of creating a new checkpoint can be amortized over multiple messages. However, in the early days of the network, there may not be enough messages being sent in order to amortize these costs effectively. For now, application developers are encouraged to call \`checkpoint()\` whenever they send a new message.

In the future the protocol may directly or indirectly incentivize checkpoint creation or allow for mechanisms for users to pool fee payments towards a single checkpoint for many messages.
