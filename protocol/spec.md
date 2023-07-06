# Hyperlane Protocol Specification

A Hyperlane imnlementation for a new chain is composed of the following components:

1. [contracts](#contracts): expose the interface for application developers to send and receive messages with
2. [agents](#agents): operate the protocol by adding security and relaying messages
3. [services](#services): optional components that can be used to enhance the developer experience
4. [apps](#apps): optional demo applications that use the protocol

# Contracts

<!-- Much of this was adapted from generated solidity natspec docs -->

Below describes the onchain contract spec for the Hyperlane protocol. It uses solidity types for familiarity but everything should be generalizable to other languages. 

- `address` should be interpreted as the local chain's address type
- `payable` describes a function that allows callers to pass native tokens

## Message

The message is the core data structure used by the Hyperlane protocol. It is a packed data structure that contains all the information needed to route a message from one domain to another.

```solidity
struct Message {
    uint8   version,
    uint32  nonce,
    uint32  origin,
    bytes32 sender,
    uint32  destination,
    bytes32 recipient,
    bytes   body
}
```

**Members**

|Name|Type|Description|
|----|----|-----------|
|`version`|`uint8`|The version of the origin and destination Mailboxes|
|`nonce`|`uint32`|A nonce to uniquely identify the message on its origin Mailbox|
|`origin`|`uint32`|Domain of origin chain|
|`sender`|`bytes32`|Address of sender on origin chain|
|`destination`|`uint32`|Domain of destination chain|
|`recipient`|`bytes32`|Address of recipient on destination chain|
|`body`|`bytes`|Raw bytes of message body|

## Message Recipient

A contract that wants to receive a message must expose the following handler.

```solidity
function handle(
    uint32  origin,
    bytes32 sender,
    bytes   body
);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`origin`|`uint32`|Domain of origin chain|
|`sender`|`bytes32`|Address of sender on origin chain|
|`body`|`bytes`|Raw bytes content of message body|

They may optionally specify a security module to verify messages before they are handled.

```solidity
function interchainSecurityModule() returns (address);
```

## Mailbox

The mailbox is the entrypoint for developers to send and receive messages from.

### dispatch

Dispatches a message to the destination domain and recipient.

```solidity
function dispatch(
    uint32  destination,
    bytes32 recipient,
    bytes   body
) returns (
    bytes32 messageId
);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`destination`|`uint32`|Domain of destination chain|
|`recipient`|`bytes32`|Address of recipient on destination chain as bytes32|
|`body`|`bytes`|Raw bytes content of message body|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`messageId`|`bytes32`|The message ID inserted into the Mailbox's merkle tree|

### process

Attempts to deliver `message` to its recipient. Verifies `message` via the recipient's ISM using the provided `metadata`.

```solidity
function process(
    bytes metadata,
    bytes message
);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`metadata`|`bytes`|Metadata used by the ISM to verify `message`.|
|`message`|`bytes`|Byte packed [message](#message)|

### count

Returns the number of messages dispatched


```solidity
function count() public view returns (uint32);
```

### root

Returns root of merkle tree which contains all dispatched message IDs as leaves.

```solidity
function root() public view returns (bytes32);
```

## Interchain Security Module

Interchain security modules are used to verify messages before they are processed. 

### moduleType

Returns an enum that represents the type of security model
encoded by this ISM.

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

*Relayers infer how to fetch and format metadata from this type.*

### verify

Defines a security model responsible for verifying interchain
messages based on the provided metadata.


```solidity
function verify(
    bytes metadata,
    bytes message
) returns (
    bool success
);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`metadata`|`bytes`|Off-chain metadata provided by a relayer, specific to the security model encoded by the module (e.g. validator signatures)|
|`message`|`bytes`|Hyperlane encoded interchain message|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`success`|`bool`|True if the message was verified|

## Multisig ISM

Implements a security module that checks if the metadata provided to verify satisfies a quorum of signatures from a set of configured validators.

### Metadata

To be used with the MESSAGE_ID_MULTISIG module type implementation in the relayer, the metadata must be formatted as follows:

```solidity
struct MultisigMetadata {
    bytes32 originMailbox;
    bytes32 signedCheckpointRoot;
    bytes   signatures;
}
```

**Members**

|Name|Type|Description|
|----|----|-----------|
|`originMailbox`|`bytes32`|The address of the origin mailbox|
|`signedCheckpointRoot`|`bytes32`|The signed checkpoint root|
|`signatures`|`bytes`|The concatenated signatures of the validators|

### validatorsAndThreshold

Returns the set of validators responsible for verifying message
and the number of signatures required

*Can change based on the content of _message*

```solidity
function validatorsAndThreshold(
    bytes message
) returns (
    address[] validators,
    uint8 threshold
);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`message`|`bytes`|Hyperlane formatted interchain message|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`validators`|`address[]`|The array of validator addresses|
|`threshold`|`uint8`|The number of validator signatures needed|

## Interchain Gas Paymaster

The gas paymaster is used to pay for the gas required in message processing on the destination chain. This is not strictly required if relayers are willing to subsidize message processing.

### payForGas

Deposits msg.value as a payment for the relaying of a message
to its destination chain.

*Overpayment will result in a refund of native tokens to the refundAddress.
Callers should be aware that this may present reentrancy issues.*

```solidity
function payForGas(
    bytes32 messageId,
    uint32  destination,
    uint256 gasAmount,
    address refundAddress
) payable;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`messageId`|`bytes32`|The ID of the message to pay for.|
|`destination`|`uint32`|The domain of the message's destination chain.|
|`gasAmount`|`uint256`|The amount of destination gas to pay for.|
|`refundAddress`|`address`|The local address to refund any overpayment to.|


# Agents

Below describes the offchain agent spec for the Hyperlane protocol.

## Relayer

Relayers index messages dispatched from the [Mailbox](#mailbox) on the origin chain and process messages on the destination chain by building metadata for the message [recipient](#message-recipient)'s [ISM](#interchain-security-module).

<!-- integration checklist -->

## Validator

<!-- ## Watcher -->

<!-- ## Scraper -->

# Services

## Scraper

## Explorer

# Apps

## Kathy

Canary application that sends test messages between domains in a round robin fashion.

## Warp Routes

Token router application that routes tokens between domains on demand.

### transferRemote

Transfers `amountOrId` token to `recipient` on `destination` domain.

```solidity
function transferRemote(
    uint32  destination,
    bytes32 recipient,
    uint256 amountOrId
) returns (
    bytes32 messageId
);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`destination`|`uint32`|The identifier of the destination chain.|
|`recipient`|`bytes32`|The address of the recipient on the destination chain.|
|`amountOrId`|`uint256`|The amount or identifier of tokens to be sent to the remote recipient.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`messageId`|`bytes32`|The identifier of the dispatched message.|

### Transfer Message

To be interoperable with warp routes on other chains, the `body` of a transfer message must be a byte packed `TransferMessage` struct.

```solidity
struct TransferMessage {
    bytes32 recipient;
    uint256 amountOrId;
    bytes   metadata;
}
```

**Members**

|Name|Type|Description|
|----|----|-----------|
|`recipient`|`bytes32`|The recipient of the remote transfer|
|`amountOrId`|`uint32`|An amount of tokens or a token identifier to be transferred|
|`metadata`|`uint32`|Optional metadata e.g. NFT URI information|
