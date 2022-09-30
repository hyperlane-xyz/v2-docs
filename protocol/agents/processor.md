---
description: Watchtowers observe the network for validator fraud
---

# Watchtowers

The Validators are responsible for confirming which messages are valid, such that they are made ready to process on the destination chain. To do so, they watch the [`Outbox`](../messaging/outbox.md) and signing its merkle root. But who watches them? Who makes sure they perform their role dutifully, without fault? The Watchtowers!

Watchtowers are responsible for watching an [`Outbox`](../messaging/outbox.md) and its corresponding [`Inboxes`](../messaging/inbox.md) to detect if validators have censored or falsified messages. They are a permissionless agent by which the network protects against fraud.

If fraud is detected, the watchtower submits evidence to the origin chain, slashing the validator. Watchtowers earn a reward for successfully submitting evidence of fraud.

```solidity
/**
  * @notice Checks that the validator signed an invalid checkpoint and burns ABC
  * held in its Staking and Withdrawal pools.
  * @param _validator The validator public key.
  * @param _checkpoint The signed merkle root and index.
  * @param _signature The validator's signature on the checkpoint.
  * @param _fraudulentProof A merkle proof against the fraudulent checkpoint.
  * @param _canonicalProof A merkle proof against a canonical checkpoint.
  * @return True upon success.
  */
function slash(
  bytes32 _validator,
  Checkpoint calldata _checkpoint,
  Signature calldata _signature,
  MerkleProof calldata _fraudulentProof,
  MerkleProof calldata _canonicalProof
) external returns(bool);
```

The presence of one or more watchtowers acts to deter message censorship or falsification by validators.

For convenience, Abacus Works will run an open source and configurable watchtower agent, implemented as a Rust binary. Watchtowers will remain an open source and permissionless role. Applications could run Watchtowers, but so could Validators, Relayers, and any other stakeholder in the Hyperlane ecosystem.

