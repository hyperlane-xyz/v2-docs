---
description: Relayers deliver interchain messages to their recipients
---

# Relayers

Relayers are responsible for aggregating [validator](validators.md) signatures and submitting merkle proofs to `Inboxes`, delivering interchain messages to their recipients.

Relayers are configured to point to the Validators' storage modality to read the signatures off-chain and aggregate them before submitting them on-chain.

Relayers can easily configure the messages that they wish to process. At launch, the relayer will support:

1. A sender/recipient whitelist
2. A sender/recipient blacklist
3. The ability to accept [payments on the origin chain](../../developers/advanced/gas.md) as for processing a message on the destination chain.&#x20;

```solidity
/**
  * @notice Attempts to process the provided formatted `message`. Verifies
  * the aggregated signature on the checkpoint, and the merkle proof of
  * `message` against it.
  * @dev Reverts if fails to verify the signature or merkle proof.
  * @param _checkpoint The signed merkle root and leaf index.
  * @param _signature An aggregated signature on the checkpoint.
  * @param _proof A merkle proof of `message` against `checkpoint.root`.
  * @param _message Formatted message (refer to Mailbox.sol Message library).
  */
function process(
  Checkpoint calldata _checkpoint,
  Signature calldata _signature,
  MerkleProof calldata _proof,
  bytes calldata _message
) external;
```

For convenience, Abacus Works will run an open source and configurable relayer agent, implemented as a Rust binary.

#### Error handling

The relayer may be configured to retry messages when processing fails. Messages that fail to process on the first attempt will cause the relayer to retry with exponential backoff. After a maximum amount of retries, the relayer will no longer attempt to process the message.

