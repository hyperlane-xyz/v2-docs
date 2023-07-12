# Implementation Guide

## Hyperlane Implementation Guide

A Hyperlane implementation for a new chain architecture is comprised of the following:

* [ ] [Contracts](spec.md#contracts): expose the interface for application developers to send and receive messages with
* [ ] [Agents](spec.md#agents): operate the protocol by adding security and relaying messages
* [ ] [Apps](spec.md#apps): applications that use the protocol and demonstrate its capabilities

## Contracts

Below describes the onchain contract spec for the Hyperlane protocol. It uses solidity types for familiarity but everything should be generalizable to other languages.

* `address` should be interpreted as the local chain's address type
* `payable` describes a function that allows callers to pass native tokens

### Message

The message is the core data structure used by the Hyperlane protocol. It is a packed data structure that contains all the information needed to route a message from one domain to another.

* [Solidity Implementation](https://github.com/hyperlane-xyz/hyperlane-monorepo/blob/main/solidity/contracts/libs/Message.sol)
* [Sway Implementation](https://github.com/hyperlane-xyz/fuel-contracts/blob/main/contracts/hyperlane-message/src/main.sw)

```solidity
struct Message {
    // The version of the origin and destination Mailboxes
    uint8 version,
    // A nonce to uniquely identify the message on its origin Mailbox
    uint32 nonce,
    // Domain of origin chain
    uint32 origin,
    // Address of sender on origin chain
    bytes32 sender,
    // Domain of destination chain
    uint32 destination,
    // Address of recipient on destination chain
    bytes32 recipient,
    // Raw bytes of message body
    bytes body
}
```

### Message Recipient

A contract that wants to receive a message must expose the following handler.

* [Solidity Implementation](https://github.com/hyperlane-xyz/hyperlane-monorepo/blob/main/solidity/contracts/interfaces/IMessageRecipient.sol)
* [Sway Implementation](https://github.com/hyperlane-xyz/fuel-contracts/blob/main/contracts/hyperlane-interfaces/src/lib.sw#L109)

```solidity
function handle(
    // Domain of origin chain
    uint32 origin,
    // Address of sender on origin chain
    bytes32 sender,
    // Raw bytes content of message body
    bytes body
);
```

They may optionally specify a security module to verify messages before they are handled.

```solidity
function interchainSecurityModule() returns (address);
```

### Mailbox

The mailbox is the entrypoint for developers to send and receive messages from.

* [Solidity Implementation](https://github.com/hyperlane-xyz/hyperlane-monorepo/blob/main/solidity/contracts/Mailbox.sol)
* [Sway Implementation](https://github.com/hyperlane-xyz/fuel-contracts/blob/main/contracts/hyperlane-mailbox/src/main.sw)

#### dispatch

Dispatches a message to the destination domain and recipient.

```solidity
function dispatch(
    // Domain of destination chain
    uint32 destination,
    // Address of recipient on destination chain as bytes32
    bytes32 recipient,
    // Raw bytes content of message body
    bytes body
) returns (
    // The message ID inserted into the Mailbox's merkle tree
    bytes32 messageId
);
```

#### process

Attempts to deliver `message` to its recipient. Verifies `message` via the recipient's ISM using the provided `metadata`.

```solidity
function process(
    // Metadata used by the ISM to verify message.
    bytes metadata,
    // Byte packed message
    bytes message
);
```

#### count

Returns the number of messages dispatched

```solidity
function count() public view returns (uint32);
```

#### root

Returns root of merkle tree which contains all dispatched message IDs as leaves.

```solidity
function root() public view returns (bytes32);
```

### Interchain Security Module

Interchain security modules are used to verify messages before they are processed.

* [Solidity Implementation](https://github.com/hyperlane-xyz/hyperlane-monorepo/blob/main/solidity/contracts/interfaces/IInterchainSecurityModule.sol)
* [Sway Implementation](https://github.com/hyperlane-xyz/fuel-contracts/blob/main/contracts/hyperlane-interfaces/src/lib.sw#L93)

#### moduleType

Returns an enum that represents the type of security model encoded by this ISM.

```solidity
enum ModuleType {
    NULL,
    ROUTING,
    AGGREGATION,
    LEGACY_MULTISIG,
    MERKLE_ROOT_MULTISIG,
    MESSAGE_ID_MULTISIG,
    OPTIMISM
}

function moduleType() returns (ModuleType);
```

_Relayers infer how to fetch and format metadata from this type._

#### verify

Defines a security model responsible for verifying interchain messages based on the provided metadata.

```solidity
function verify(
    // Off-chain metadata provided by a relayer, specific 
    // to the security model encoded by the module 
    // (e.g. validator signatures)
    bytes metadata,
    // Hyperlane encoded interchain message
    bytes message
) returns (
    // True if the message was verified
    bool success
);
```

### Multisig ISM

Implements a security module that checks if the metadata provided to verify satisfies a quorum of signatures from a set of configured validators.

* [Solidity Implementation](https://github.com/hyperlane-xyz/hyperlane-monorepo/blob/main/solidity/contracts/isms/multisig/AbstractMultisigIsm.sol)
* [Sway Implementation](https://github.com/hyperlane-xyz/fuel-contracts/blob/main/contracts/multisig-ism/src/main.sw)

#### Metadata

To be used with the MESSAGE\_ID\_MULTISIG module type implementation in the relayer, the metadata must be formatted as follows:

* [Solidity Implementation](https://github.com/hyperlane-xyz/hyperlane-monorepo/blob/main/solidity/contracts/libs/isms/MessageIdMultisigIsmMetadata.sol)
* [Sway Implementation](https://github.com/hyperlane-xyz/fuel-contracts/blob/main/contracts/multisig-ism-metadata/src/main.sw)

```solidity
struct MultisigMetadata {
    // The address of the origin mailbox
    bytes32 originMailbox;
    // The signed checkpoint root
    bytes32 signedCheckpointRoot;
    // The concatenated signatures of the validators
    bytes signatures;
}
```

#### validatorsAndThreshold

Returns the set of validators responsible for verifying message and the number of signatures required

_Can change based on the content of \_message_

```solidity
function validatorsAndThreshold(
    // Hyperlane formatted interchain message
    bytes message
) returns (
    // The array of validator addresses
    address[] validators,
    // The number of validator signatures needed
    uint8 threshold
);
```

### Interchain Gas Paymaster

The gas paymaster is used to pay for the gas required in message processing on the destination chain. This is not strictly required if relayers are willing to subsidize message processing.

* [Solidity Implementation](https://github.com/hyperlane-xyz/hyperlane-monorepo/blob/main/solidity/contracts/igps/InterchainGasPaymaster.sol)
* [Sway Implementation](https://github.com/hyperlane-xyz/fuel-contracts/blob/main/contracts/igp/interchain-gas-paymaster/src/main.sw)

#### payForGas

Deposits msg.value as a payment for the relaying of a message to its destination chain.

_Overpayment will result in a refund of native tokens to the refundAddress. Callers should be aware that this may present reentrancy issues._

```solidity
function payForGas(
    // The ID of the message to pay for.
    bytes32 messageId,
    // The domain of the message's destination chain.
    uint32 destination,
    // The amount of destination gas to pay for.
    uint256 gasAmount,
    // The local address to refund any overpayment to.
    address refundAddress
) payable;
```

#### Gas Payment

Emitted when a payment is made for a message's gas costs.

```solidity
event GasPayment(
    bytes32 messageId,
    uint256 gasAmount,
    uint256 payment
);
```

## Agents

Below describes the agent spec for a new chain implementation. The rust implementations hope to support all chains, but the spec is intended to be chain agnostic.

#### Message Indexing

All agents must index [messages](spec.md#message) from the origin [mailbox](spec.md#mailbox). In the solidity mailbox, we [emit an event for each message](https://github.com/hyperlane-xyz/hyperlane-monorepo/blob/main/solidity/contracts/Mailbox.sol#L125-L129) dispatched. Other chains may have different ways of surfacing this information, but the agent must be able to get message content reliably and with consistent ordering -- see the [message indexer](https://github.com/hyperlane-xyz/hyperlane-monorepo/blob/main/rust/hyperlane-core/src/traits/indexer.rs) trait.

* [ethereum](https://github.com/hyperlane-xyz/hyperlane-monorepo/blob/main/rust/chains/hyperlane-ethereum/src/mailbox.rs)

### Validator

In addition to indexing messages dispatched from the mailbox, validators produce attestations for the messages they observe to be used on the destination chain for security.

#### Checkpoint

Validators produce attestations called [checkpoints](spec.md#checkpoint) from the [mailbox](spec.md#mailbox) which commit via merkle [root](spec.md#root) to all dispatched message IDs.

```rust
pub struct Checkpoint {
    /// The mailbox address
    pub mailbox_address: H256,
    /// The mailbox chain
    pub mailbox_domain: u32,
    /// The checkpointed root
    pub root: H256,
    /// The index of the checkpoint
    pub index: u32,
}
```

Validators use the latest checkpoint method on the [mailbox trait](https://github.com/hyperlane-xyz/hyperlane-monorepo/blob/16146f0f03d0b0be67583cf16b22a3c50abdd977/rust/hyperlane-core/src/traits/mailbox.rs) to get the latest checkpoint from the mailbox and submit signatures using the [checkpoint syncer trait](https://github.com/hyperlane-xyz/hyperlane-monorepo/blob/16146f0f03d0b0be67583cf16b22a3c50abdd977/rust/hyperlane-base/src/traits/checkpoint\_syncer.rs).

#### Checkpoint with Message ID

Validators use indexed messages to join the [checkpoint](spec.md#checkpoint) with the corresponding message ID emitted from the mailbox.

```rust
pub struct CheckpointWithMessageId {
    /// existing Hyperlane checkpoint struct
    #[deref]
    pub checkpoint: Checkpoint,
    /// hash of message emitted from mailbox checkpoint.index
    pub message_id: H256,
}
```

They also publish these augmented checkpoints on their syncer.

### Relayer

In addition to indexing messages dispatched from the mailbox, relayers process messages on the destination chain. This requires building metadata that satisfies the message [recipient](spec.md#message-recipient)'s [ISM](spec.md#interchain-security-module) verification requirements, and signing transactions that [process](spec.md#process) the message on the destination [mailbox](spec.md#mailbox).

#### Metadata Builders

Each [module type](spec.md#moduletype) implies a different metadata format for [message verification](spec.md#verify) to succeed. Relayers need each module trait (eg [multisig](https://github.com/hyperlane-xyz/hyperlane-monorepo/blob/main/rust/hyperlane-core/src/traits/multisig\_ism.rs)) to be implemented.

#### Message Processor

The relayer will attempt to process messages on the destination mailbox (see [message processor](https://github.com/hyperlane-xyz/hyperlane-monorepo/blob/main/rust/agents/relayer/src/msg/processor.rs#L24)). If

* the message recipient ISM returns an unknown module type
* module type is known but metadata fails to verify
* metadata verifies but dry running (gas estimation) message processing fails

then the message will be kicked to an exponential backoff retry queue. The relayer relies on implementations of the [mailbox](https://github.com/hyperlane-xyz/hyperlane-monorepo/blob/main/rust/hyperlane-core/src/traits/mailbox.rs) and [ism](https://github.com/hyperlane-xyz/hyperlane-monorepo/blob/main/rust/hyperlane-core/src/traits/interchain\_security\_module.rs) traits for these checks.

#### Gas Payment Enforcement

Relayers may also require gas payment for a specific message ID on the origin chain before processing the message on the destination chain. To do this, they must have an [IGP](spec.md#interchain-gas-paymaster) deployed with their address set as beneficiary and index [gas payment](spec.md#gas-payment) events. See [gas payment enforcement trait](https://github.com/hyperlane-xyz/hyperlane-monorepo/blob/main/rust/agents/relayer/src/msg/gas\_payment/mod.rs).

## Apps

### Kathy

Canary application that sends test messages between domains in a round robin fashion.

### Warp Routes

Token router application that routes tokens between domains on demand.

#### transferRemote

Transfers `amountOrId` token to `recipient` on `destination` domain.

```solidity
function transferRemote(
    // The Domain of the destination chain.
    uint32  destination,
    // The address of the recipient on the destination chain.
    bytes32 recipient,
    // The amount or identifier of tokens to be sent to the remote recipient.
    uint256 amountOrId
) returns (
    // The identifier of the dispatched message.
    bytes32 messageId
);
```

#### Transfer Message

To be interoperable with warp routes on other chains, the `body` of a transfer message must be a byte packed `TransferMessage` struct.

```solidity
struct TransferMessage {
    // The recipient of the remote transfer
    bytes32 recipient;
    // An amount of tokens or a token identifier to be transferred
    uint256 amountOrId;
    // Optional metadata e.g. NFT URI information
    bytes   metadata;
}
```
