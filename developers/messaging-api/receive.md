---
description: Receive an inbound message from any Hyperlane supported network.
---

# Receive

Developers must implement the `handle()` ABI in order to receive interchain messages.

### Interface

```solidity
interface IMessageRecipient {
    function handle(
        uint32 _origin,
        bytes32 _sender,
        bytes calldata _messageBody
    ) external;
}
```

`_origin` the Domain ID of the origin chain, IDs found [here](../domains.md#mainnet).

`_sender` the address of the message sender on the origin chain

`_messageBody` the message being passed.



### Access Control

{% hint style="warning" %}
To ensure only valid interchain messages are accepted, it is important to require that `msg.sender` is a known Hyperlane `Mailbox`.
{% endhint %}

Developers must implement access control on `handle()` in order to ensure the security of interchain messages. Only the Hyperlane `Mailbox` contract should have permission to call this function. An example of this access control is shown below.&#x20;

```solidity
address constant mailbox = 0x0E3239277501d215e17a4d31c487F86a425E110B;
// for access control on handle implementations
modifier onlyMailbox() {
    require(msg.sender == mailbox);
    _;    
}

function handle(
    uint32 _origin,
    bytes32 _sender,
    bytes calldata _messageBody
) external onlyMailbox {};
```

### Encoding

{% hint style="info" %}
Hyperlane message senders are left-padded to `bytes32` for compatibility with virtual machines that are addressed differently.&#x20;
{% endhint %}

The following utility is provided in the [`TypeCasts` library](https://github.com/hyperlane-xyz/hyperlane-monorepo/blob/main/solidity/contracts/libs/TypeCasts.sol) for convenience.

```solidity
// alignment preserving cast
function bytes32ToAddress(bytes32 _buf) internal pure returns (address) {
    return address(uint160(uint256(_buf)));
}
```

### Example Usage

An example `handle()` implementation for receiving messages provided below.

```solidity
event Received(uint32 origin, address sender, bytes message);
function handle(
    uint32 _origin,
    bytes32 _sender,
    bytes memory _message
) external onlyMailbox() {
    address sender = bytes32ToAddress(_sender);
    emit Received(_origin, sender, _message);
}
```
