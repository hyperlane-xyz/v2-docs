---
description: Send a message to any Abacus supported network.
---

# Send

Developers can send interchain messages by calling the`Outbox.dispatch` endpoint.

### Interface

```solidity
interface IOutbox {
    function dispatch(
        uint32 _destinationDomain,
        bytes32 _recipientAddress,
        bytes calldata _messageBody
    ) external returns (uint256);
}
```

You can find the address of the `Outbox` contract on each chain [here](../contract-addresses/), and chain domains [here](../domains.md).

### Encoding

{% hint style="info" %}
Recipient addresses are left-padded to `bytes32` for compatibility with virtual machines that are addressed differently.&#x20;
{% endhint %}

The following utility is provided in the [`TypeCasts` library](https://github.com/abacus-network/abacus-monorepo/blob/main/solidity/core/contracts/libs/TypeCasts.sol) for convenience.

```solidity
// alignment preserving cast
function addressToBytes32(address _addr) internal pure returns (bytes32) {
    return bytes32(uint256(uint160(_addr)));
}
```

### Example Usage

The code snippet below shows an example of sending a message from Ethereum to Avalanche.

```solidity
uint32 constant avalancheDomain = 0x61766178;
address constant avalancheRecipient = 0x82825C0884558C9c5A94B545e7563c95aBA49197;
address constant ethereumOutbox = 0x2f9DB5616fa3fAd1aB06cB2C906830BA63d135e3;
IOutbox(ethereumOutbox).dispatch(
    avalancheDomain,
    addressToBytes32(avalancheRecipient),
    bytes("hello avalanche from ethereum")
);
```
