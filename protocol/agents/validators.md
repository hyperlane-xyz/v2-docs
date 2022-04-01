# Validators

Validators are permissioned actors responsible for signing checkpoints on an [Outbox](../messaging/outbox.md), facilitating message transmission to remote chains.

Membership in the validator set is determined by a [proof-of-stake](../security/proof-of-stake.md) protocol implemented as a set of smart contracts on each Abacus-supported chain.

Validators can retrieve the most recent checkpoint by calling `Outbox.latestCheckpoint()`. After a checkpoint has achieved sufficient [finality](https://medium.com/mechanism-labs/finality-in-blockchain-consensus-d1f83c120a9a), validators are expected to sign it and store their signature on highly available storage so that their signatures can be [relayed](relayer.md) to one or more [Inboxes](../messaging/inbox.md).

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

Validators that sign anything other than a finalized checkpoint risk compromising the safety of the protocol, and may be slashed.

Abacus Works is developing the validator as a Rust binary that can be easily run by anyone. Operationally, validators need to run this binary and a node for the chain that they are validating for. We hope that the majority of Abacus validators will come from each chain's existing node operator community.

