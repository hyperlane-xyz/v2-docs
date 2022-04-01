---
description: A description of the Abacus sovereign consensus protocol
---

# Sovereign consensus

Sovereign consensus allows applications to optionally specify the rules under which they accept messages from an [Inbox](../messaging/inbox.md).

While we expect the security of the Abacus validator set to be sufficient for most applications, the [additional layer](https://en.wikipedia.org/wiki/Swiss\_cheese\_model) of sovereign consensus allows applications building on Abacus to remain self sovereign and ensure safety even in the presence of a compromised validator set.

## Motivation

Sovereign consensus is designed to address the scaling problems inherent in proof-of-stake based oracle networks.

The economic security of proof-of-stake is based on a simple principle; that the "stick" of slashing is larger than the "carrot" that can be gained by byzantine behavior \[[1](sovereign-consensus.md#undefined)].

Intuitively, this holds true for proof-of-stake blockchains. A quorum of validators can collude to double spend tokens by double signing blocks and forking the chain, for which their stake would be slashed. Validators cannot spend tokens for which they don't have access to the private key; they can at _most_ double spend tokens they already own. It seems reasonable to conclude that the economic consequences of slashing would be greater than the economic benefits of double spending \[[2](sovereign-consensus.md#undefined)].

Unfortunately, the economic security of proof-of-stake is less clear for oracle networks. Unlike in layer ones, where the rules of the blockchain can prevent byzantine validators from spending tokens that they don't own, oracle networks have no ability to verify the values provided by their validators. This makes the attack surface far larger than in blockchains. In other words, the "stick" stays the same size, but the "carrot" grows much larger.

This problem only gets worse as the network scales in adoption, as we can expect the value of the assets built on top of the oracle network to grow faster than the value of the proof-of-stake token that secures it.

At Abacus, we believe that a simple proof-of-stake protocol is not sufficient to provide economic security for a cross-chain messaging layer at scale.

Enter sovereign consensus.

## Sovereign consensus

Sovereign consensus complements proof-of-stake by allowing applications that built on top of Abacus to specify the rules under which they accept messages from an Inbox.

While these rules can be arbitrary, we expect most applications that adopt sovereign consensus to retain some notion of guardians; application-specific validators that must have signed a [checkpoint](../messaging/#checkpoints) before its messages can be forwarded by the [Inbox](../messaging/inbox.md) to the application.

The economic security of the protocol is strengthened when applications select incentive aligned guardians, as an application's native token can be expected to depreciate in the event that an attacker is able to pass fraudulent messages to the application.

Abacus applications enable sovereign consensus by implementing the `sovereign()` function in their application, which returns the smart contract address containing the sovereign consensus rules.

```solidity
/**
  * @return Returns the address of the application's sovereign consensus contract.
  **/
function sovereign() external view returns (address);
```

That smart contract must implement `verify()`, which takes message-specific information and returns a boolean.

```solidity
/**
  * @notice Implements sovereign consensus rules for an Abacus application.
  * @param _root The merkle root that `_message` was proved against.
  * @param _origin The chain ID from which the message was sent. 
  * @param _sender The address from which the message was sent.
  * @param _message The contents of the message.
  * @param _sovereignData Additional data provided by the caller,
  * e.g. guardian signatures on `_root`
  * @return Returns true iff the message should be accepted.
  */
function verify(
  bytes32 _root,
  uint32 _origin,
  bytes32 _sender,
  bytes memory _message,
  bytes memory _sovereignData
) external view returns (bool valid);
```

More sophisticated sovereigns may implement rules specific to the content of the message. For example, a cross-chain token application could require additional guardian signatures for transfers over a certain size.

#### Footnotes

* \[1] [https://en.wikipedia.org/wiki/Carrot\_and\_stick](https://en.wikipedia.org/wiki/Carrot\_and\_stick)
* \[2] For simplicity, we ignore [long range attacks](https://blog.positive.com/rewriting-history-a-brief-introduction-to-long-range-attacks-54e473acdba9), which may allow validators to retroactively go "long" or "short" tokens for which the future price is substantially different, while potentially avoiding the consequences of slashing. Most proof-of-stake blockchains have mitigations to protect against long range attacks, and all can be expected to hard-fork in the event of such an attack.
