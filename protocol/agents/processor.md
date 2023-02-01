---
description: Watchtowers observe the network for validator fraud
---

# Watchtowers

{% hint style="warning" %}
Watchtower agents are a work in progress. Details may change as the design matures.
{% endhint %}

Validators are responsible for signing attestations of [`Mailbox`](../messaging.md) state on the origin chain. These attestations can be consumed by [`ISMs`](../sovereign-consensus.md#interchain-security-modules) to prove the validity of interchain messages on the destination chain.

But who watches them? Who makes sure they perform their role dutifully, without fault? The Watchtowers!

Watchtowers are responsible for observing `Mailboxes` and validator signatures to detect if validators are attempting to censor or falsify messages. They are a permissionless agent by which the network protects against fraud.

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

The presence of one or more watchtowers acts to deter misbehavior by validators.

For convenience, Abacus Works will run an open source and configurable watchtower agent, implemented as a rust binary. Watchtowers will remain an open source and permissionless role. Applications could run watchtowers, but so could validators, relayers, and any other stakeholder in the Hyperlane ecosystem.

