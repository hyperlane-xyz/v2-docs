---
description: Local security provided by application-specific validators
---

# Sovereign consensus

Sovereign consensus gives applications the _option_ to specify their own validator sets that operate in parallel with the global set.

Applications can leverage the reputation of known and incentive-aligned actors by allowing them to participate as [validators](../agents/validators.md) in sovereign consensus.

In order for a message to be delivered to an application, a quorum of both the global and sovereign validator sets must sign a merkle root that contains that message. This ensures that neither validator set alone is able to falsify messages.

While we expect the security of the Abacus validator set to be sufficient for most applications, the [additional layer](https://en.wikipedia.org/wiki/Swiss\_cheese\_model) of sovereign consensus allows applications to make explicit the implicit trust assumptions that underpin most decentralized applications.

Applications can add sovereign validators by calling `Inbox.enrollSovereignValidator()`.

```solidity
/**
  * @notice Adds a public key to msg.sender's sovereign validator set.
  * @param _root The merkle root that `_message` was proved against.
  * @param _origin The chain ID from which the message was sent. 
  * @param _sender The address from which the message was sent.
  * @param _message The contents of the message.
  * @param _sovereignData Additional data provided by the caller,
  * e.g. guardian signatures on `_root`
  * @return Returns true iff the message should be accepted.
  */
function enrollSovereignValidator(
  bytes32 _root,
  uint32 _origin,
  bytes32 _sender,
  bytes memory _message,
  bytes memory _sovereignData
) external view returns (bool valid);
```
