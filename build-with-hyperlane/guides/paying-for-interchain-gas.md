---
description: Automatically pay a relayer to deliver messages
---

# Automatically pay for interchain gas

{% hint style="info" %}
Read up on [interchain-gas-payments.md](../../protocol/interchain-gas-payments.md "mention") and the [interchain-gas-paymaster-api.md](../../apis-and-sdks/interchain-gas-paymaster-api.md "mention")
{% endhint %}

This guide will show you how to integrate the [interchain-gas-paymaster-api.md](../../apis-and-sdks/interchain-gas-paymaster-api.md "mention") into your application.

Doing so ensures your application automatically makes [interchain-gas-payments.md](../../protocol/interchain-gas-payments.md "mention") to a relayer so that they will deliver the messages sent by your application.

We will cover two different approaches. If you know which approach you would prefer, feel free to jump directly to that section.

## Interchain gas payments funded by the user

A common approach is to pass the interchain gas payment costs through to `msg.sender`. This ensures that users of your application pay the full costs of sending _and_ delivering an interchain message.

Note since the caller of the function is paying for the message's interchain gas, the function must be payable!

```solidity
// The Mailbox (same address on all EVM chains)
IMailbox mailbox = IMailbox(0x35231d4c2D8B8ADcB5617A638A0c4548684c7C70);
// An IGP contract associated with the Abacus Works relayer 
// (same address on all mainnet EVM chains)
IInterchainGasPaymaster igp = IInterchainGasPaymaster(
    0x56f52c0A1ddcD557285f7CBc782D3d83096CE1Cc
);
// The amount of gas that the recipient contract consumes on the destination
// chain when handling a message from this origin chain.
uint256 gasAmount = 100000;

function sendAndPayForMessage() external payable {
    bytes32 messageId = mailbox.dispatch(/* ... */);
    igp.payForGas{ value: msg.value }(
        messageId, // The ID of the message that was just dispatched
        destinationDomain, // The destination domain of the message
        gasAmount, // 100k gas to use in the recipient's handle function
        msg.sender // refunds go to msg.sender, who paid the msg.value
    );
}
```

## Interchain gas payments funded by the application

An alternative approach is for the application to pay the interchain gas payment costs itself.

This may be desirable if the intent is for the application to subsidize some transaction costs, or if the application is already collecting a fee from the user that can be used to cover the costs of delivering interchain messages.

```solidity
// The Mailbox (same address on all EVM chains)
IMailbox mailbox = IMailbox(0x35231d4c2D8B8ADcB5617A638A0c4548684c7C70);
// An IGP contract associated with the Abacus Works relayer 
// (same address on all mainnet EVM chains)
IInterchainGasPaymaster igp = IInterchainGasPaymaster(
    0x56f52c0A1ddcD557285f7CBc782D3d83096CE1Cc
);
// The amount of gas that the recipient contract consumes on the destination
// chain when handling a message from this origin chain.
uint256 gasAmount = 100000;

function sendMessage() external {
    bytes32 messageId = mailbox.dispatch(/* ... */);

    // Get the required payment from the IGP.
    uint256 quote = igp.quoteGasPayment(
        destinationDomain,
        gasAmount
    );
    // Pay from the contract's balance
    igp.payForGas{ value: quote }(
        messageId, // The ID of the message that was just dispatched
        destinationDomain, // The destination domain of the message
        gasAmount,
        address(this) // refunds are returned to this contract
    );
}

// so that the contract can receive native tokens, including refunds
receive() external payable {}
```
