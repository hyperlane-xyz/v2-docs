---
description: Send an outbound message to any Abacus supported network.
---

# Send

Outbound messages must be sent with the `Outbox.dispatch` endpoint to be relayed by Abacus.

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

Developers can reference deployed [`Outbox` addresses in the docs](../addresses/).

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

An example sending from `ethereum`  to [`HelloWorld`](https://github.com/abacus-network/abacus-monorepo/blob/mattie/kathy-asserts-message-processing/typescript/helloworld/contracts/HelloWorld.sol) on `avalanche`  is provided below.

```solidity
uint32 constant avalancheDomain = 0x61766178;
address constant avalancheHelloWorld = 0x82825C0884558C9c5A94B545e7563c95aBA49197;
address constant ethereumOutbox = 0x2f9DB5616fa3fAd1aB06cB2C906830BA63d135e3;
IOutbox(ethereumOutbox).dispatch(
    avalancheDomain,
    addressToBytes32(avalancheHelloWorld),
    bytes("hello avalanche from ethereum")
);
```
