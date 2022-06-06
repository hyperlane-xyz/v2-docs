# Relayer

Relayers are responsible for taking source chain signed Outbox [checkpoints](../messaging/#checkpoints) and relaying them to destination chain [Inbox](../messaging/inbox.md)es.

Checkpoints can be relayed by calling `Inbox.checkpoint()`. Because a message must be included in a relayed checkpoint before it can be sent to its recipient, more frequent relaying of checkpoints results in lower perceived latency for users. Anyone can relay a checkpoint at any time to facilitate the delivery of cross-chain messages.

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
  bytes memory _signatures
) external;
```

For convenience, Abacus Works will run an open source and configurable relayer agent, implemented as a Rust binary.&#x20;

Relayers are configured to point to the Validators' storage modality to read the signed checkpoints off-chain and aggregate them before submitting them on-chain.

Messages will only be processed by the Abacus Works relayer if a [sufficient Interchain gas](../../developers/application-sdk/gas.md) payment has been made on the source chain.

In the future the protocol may directly or indirectly incentivize relaying or introduce mechanisms for users to pool their fee payments towards a single checkpoint for many messages.

