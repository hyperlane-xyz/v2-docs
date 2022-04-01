# Relayer

The Relayer is an unpermissioned role responsible for taking signed [checkpoints](../messaging/#checkpoints) from a source chain and relaying them to an [Inbox](../messaging/inbox.md) on a destination chain.

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

For convenience, Abacus Works will run an open source and configurable relayer agent, implemented as a rust binary.&#x20;

Relayers are configured to point to the Validators' storage modality to read the signed checkpoints off-chain and aggregate them before submitting them on-chain.

For now, the relayer can be configured with a simple "max-latency" policy, ensuring that checkpoints are always relayed within a predefined time period.

In the future the protocol may directly or indirectly incentivize the relaying of checkpoints.&#x20;
