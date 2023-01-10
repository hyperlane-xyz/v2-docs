---
description: Send a message to any Hyperlane supported network.
---

# Send

Developers can send interchain messages by calling the`Mailbox.dispatch` endpoint. At the moment, dispatched messages must be received by a contract with the `handle()` function. You will learn more about this in the [Receive](receive.md) section up next, but for now let's cover the message sending interface.

### Interface

```solidity
interface IMailbox {
    function dispatch(
        uint32 _destinationDomain,
        bytes32 _recipientAddress,
        bytes calldata _messageBody
    ) external returns (uint256);
}
```

You can find the address of the `Mailbox` contract on each chain [here](../addresses.md), and chain domains [here](../domains.md).

`_destinationDomain` is the chain you're sending to. Domain ID's can be found [here](../domains.md).

`_recipientAddress` is the receiving contract, it needs to be a contract with the `handle()` function, you can read about it in the [Receive](receive.md) section.

`_messageBody` is the message you're passing. More on example usage below.

### Encoding

{% hint style="info" %}
Recipient addresses are left-padded to `bytes32` for compatibility with virtual machines that are addressed differently.&#x20;
{% endhint %}

The following utility is provided in the [`TypeCasts` library](https://github.com/hyperlane-xyz/hyperlane-monorepo/blob/main/solidity/contracts/libs/TypeCasts.sol) for convenience.

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
IMailbox(ethereumMailbox).dispatch(
    avalancheDomain,
    addressToBytes32(avalancheRecipient),
    bytes("hello avalanche from ethereum")
);
```
