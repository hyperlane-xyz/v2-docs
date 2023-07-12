# ICircleMessageTransmitter
[Git Source](https://github.com/hyperlane-xyz/hyperlane-monorepo/blob/60f321f452052881dce4e22999022e11fc117456/contracts/middleware/liquidity-layer/interfaces/circle/ICircleMessageTransmitter.sol)


## Functions
### receiveMessage

Receive a message. Messages with a given nonce
can only be broadcast once for a (sourceDomain, destinationDomain)
pair. The message body of a valid message is passed to the
specified recipient for further processing.

*Attestation format:
A valid attestation is the concatenated 65-byte signature(s) of exactly
`thresholdSignature` signatures, in increasing order of attester address.
If the attester addresses recovered from signatures are not in
increasing order, signature verification will fail.***
If incorrect number of signatures or duplicate signatures are supplied,
signature verification will fail.
Message format:
Field Bytes Type Index
version 4 uint32 0
sourceDomain 4 uint32 4
destinationDomain 4 uint32 8
nonce 8 uint64 12
sender 32 bytes32 20
recipient 32 bytes32 52
messageBody dynamic bytes 84*


```solidity
function receiveMessage(bytes memory _message, bytes calldata _attestation) external returns (bool success);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_message`|`bytes`|Message bytes|
|`_attestation`|`bytes`|Concatenated 65-byte signature(s) of `_message`, in increasing order of the attester address recovered from signatures.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`success`|`bool`|bool, true if successful|


### usedNonces


```solidity
function usedNonces(bytes32 _nonceId) external view returns (bool);
```

