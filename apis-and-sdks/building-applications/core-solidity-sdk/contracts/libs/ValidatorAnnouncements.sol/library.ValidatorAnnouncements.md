# ValidatorAnnouncements
[Git Source](https://github.com/hyperlane-xyz/hyperlane-monorepo/blob/60f321f452052881dce4e22999022e11fc117456/contracts/libs/ValidatorAnnouncements.sol)


## Functions
### getAnnouncementDigest

Returns the digest validators are expected to sign when signing announcements.


```solidity
function getAnnouncementDigest(address _mailbox, uint32 _localDomain, string memory _storageLocation)
    internal
    pure
    returns (bytes32);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_mailbox`|`address`|Address of the mailbox being validated|
|`_localDomain`|`uint32`|Domain of chain on which the contract is deployed|
|`_storageLocation`|`string`|Storage location string.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bytes32`|The digest of the announcement.|


