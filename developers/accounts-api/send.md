---
description: Send a message via Interchain Account to any contract on an Abacus supported network.
---

# Send

Developers can send interchain messages via Interchain Accounts by calling the `InterchainAccountRouter.dispatch` endpoint. In contrast with the [Messaging API](../messaging-api/send.md), the Interchain Account API allows developers to send messages to any contract, not just `IMessageRecipient`s with the `handle()` function, making it compatible with legacy contracts. To achieve this, message encoding must be constrained to ABI encoded function calls. 

If it does not exist already, the Interchain Account will be atomically created. 

### Interface

```solidity
struct Call {
    address to;
    bytes data;
}

interface IInterchainAccountRouter {
    function dispatch(
        uint32 _destinationDomain,
        Call[] calldata calls
    ) external returns (uint256);
}
```

You can find the address of the `InterchainAccountRouter` contract on each chain [here](../addresses.md#interchainaccountrouter), and chain domains [here](../domains.md).


`_destinationDomain` is the chain you're sending to, it is **not** the chainID, rather it is a unique ID assigned by the protocol to each chain. Domain ID's can be found [here](../domains.md).

`calls` is an array of `Call` structs, each of which contains the address of the contract you're sending to, and the ABI encoded function call you're making. More on example usage below.


## Example Usage

### Encoding

Calls can be easily encoded with the `abi.encodeCall` function. 

```solidity
IUniswapV3Pool pool = IUniswapV3Pool(...);
Call swapCall = Call({
    to: address(pool),
    data: abi.encodeCall(pool.swap, (...));
});
```

### Sending

Perform a Uniswap V3 swap on Ethereum from an Interchain Account . The Interchain Account must satisfy any requirements the recieving contract has on `msg.sender`, such as token allowances for swapping.

```solidity
uint32 constant ethereumDomain = 0x657468;
address constant icaRouter = 0x1dbb057c50820b73A5450B5a0cADf5C5cc4b362E; // consistent across all chains
IInterchainAccountRouter(icaRouter).dispatch(
    ethereumDomain,
    [swapCall]
);
```
