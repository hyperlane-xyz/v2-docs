# Validator

The Validator is a permissioned role that is responsible for signing checkpoints on an [Outbox](../messaging/outbox.md), effectively allowing the transmission of the merkle tree of messages to the respective Inboxes on remote chains.

Validators call the `latestCheckpoint` function on the [Outbox](../messaging/outbox.md) which is a simple view call and then sign the returned checkpoint after accounting for finality of the Outbox's local chain. Validators are expected to store signed checkpoints on highly available storage so that [Relayers](relayer.md) can submit them to the Inboxes.

```solidity
/**
  * @notice Returns the latest checkpoint for the Validators to sign.
  * @return root Latest checkpointed root
  * @return index Latest checkpointed index
  */
function latestCheckpoint()
  external
  view
  returns (bytes32 root, uint256 index);
```

Improper signatures, i.e. signatures over checkpoints that do not exist on the Outbox, are considered malicious and could lead to invalid messages being processed on the inbox. Thus validators are responsible for only signing valid checkpoints on the Outbox and ensure their operational security. Improper signatures can be submitted on-chain and result in slashing (see more under [Proof-of-Stake](../security/proof-of-stake.md)).

Abacus Works is developing the Validator as a rust binary that can be easily run by anyone. There is no requirement for Validators to observe more than a single chain since Validator sets are independent, thus Validators can be recruited from a chain's existing node operator community.

