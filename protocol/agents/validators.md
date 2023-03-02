---
description: Validators help secure the Hyperlane protocol
---

# Validators

Validators are responsible for observing the [messaging.md](../messaging.md "mention") contract and signing its merkle root, facilitating message transmission to remote chains.

Unlike many other protocols, Hyperlane does **not** have an enshrined validator set. Anyone is free to run a validator and help contribute to securing interchain messages.

{% hint style="info" %}
Want to run a validator? Follow the instructions at [validators](../../operators/validators/ "mention")
{% endhint %}

Validators read the current merkle root by calling `Mailbox.latestCheckpoint()`.  Once a root has achieved sufficient [finality](https://medium.com/mechanism-labs/finality-in-blockchain-consensus-d1f83c120a9a), validators are expected to sign it and post their signature to highly available storage so that it can be aggregated by [relayer.md](relayer.md "mention").

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

Validators that sign anything other than a finalized checkpoint risk compromising the safety of the protocol. If they are participating in [proof-of-stake.md](../proof-of-stake.md "mention"), this may result in their stake being slashed.

Abacus Works is developing the validator as a Rust binary that can be easily run by anyone. Operationally, validators need to run this binary and a node for the chain that they are validating for. We hope that the majority of Hyperlane validators will come from each chain's existing node operator community.

