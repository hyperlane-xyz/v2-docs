---
description: Validators secure the Hyperlane protocol
---

# Validators

Validators are responsible for observing the [`Outbox`](../messaging/outbox.md) contract and signing its merkle root, facilitating message transmission to remote chains.

The global validator set is determined by a [proof-of-stake](../security/proof-of-stake.md) protocol implemented as a set of smart contracts on each Hyperlane-supported chain. Applications may specify additional [sovereign](../security/sovereign-consensus.md) validator sets, which provide application-specific security on top of proof-of-stake's economic security.

Validators read the current merkle root by calling `Outbox.latestCheckpoint()`.  Once a root has achieved sufficient [finality](https://medium.com/mechanism-labs/finality-in-blockchain-consensus-d1f83c120a9a), validators are expected to sign it and post their signature to highly available storage so that it can be aggregated by [relayers](relayer.md).

```solidity
/**
  * @notice Returns the latest checkpoint for validators to sign.
  * @return root Latest checkpointed root
  * @return index Latest checkpointed index
  */
function latestCheckpoint()
  external
  view
  returns (bytes32 root, uint256 index);
```

Validators that sign anything other than a finalized merkle root risk compromising the safety of the protocol, and may be slashed.

Abacus Works is developing the validator as a Rust binary that can be easily run by anyone. Operationally, validators need to run this binary and a node for the chain that they are validating for. We hope that the majority of Hyperlane validators will come from each chain's existing node operator community.

