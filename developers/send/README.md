---
description: Make remote function calls from an Interchain Account
---

# Accounts API

Developers can use the Accounts API to create an account on a remote chain, and use that account to call smart contracts.

Unlike the [messaging-api](../messaging-api/ "mention"), which requires recipients to implement a specific interface, the Accounts API allows developers to interact with any remote contract.

The Accounts API assigns every `(uint32 origin, address sender)` pair a unique interchain account address. The sender controls that address on all remote chains, and can direct it to make arbitrary function calls via the `InterchainAccountRouter.dispatch()` endpoint.

### Interface

```solidity
interface IInterchainAccountRouter {
    struct Call {
        address to;
        bytes data;
    }

    /**
     * @notice Direct an interchain account to make multiple consecutive calls
     * @param _destinationDomain The chain on which to make the calls
     * @param _calls The list of ABI encoded calls to make
     * @return The message ID of the dispatched Hyperlane message
     */
    function dispatch(uint32 _destinationDomain, Call[] calldata _calls)
        external
        returns (bytes32);

    /**
     * @notice Direct an interchain account to make a single call
     * @param _destinationDomain The chain on which to make the call
     * @param _target The address to call
     * @param _data The calldata for the call
     * @return The message ID of the dispatched Hyperlane message
     */
    function dispatch(
        uint32 _destinationDomain,
        address _target,
        bytes calldata _data
    ) external returns (bytes32);

    /**
     * @return The interchain account address for the (origin, sender) pair
     */
    function getInterchainAccount(uint32 _originDomain, address _sender)
        external
        view
        returns (address);
}

```

`InterchainAccountRouters`  can be found at `0xc011170d9795a7a2d065E384EAd1CA3394A7d35E` and domain IDs can be found [here](../domains.md).

## Example Usage

### Encoding

You can either pass a call directly in arguments to the `dispatch` function or construct an array of `Call` structs. Calls can be easily encoded with the `abi.encodeCall` function.

```solidity
interface IUniswapV3Pool {
    function swap(
        address recipient,
        bool zeroForOne,
        int256 amountSpecified,
        uint160 sqrtPriceLimitX96,
        bytes calldata data
    ) external returns (int256 amount0, int256 amount1);
}

IUniswapV3Pool pool = IUniswapV3Pool(...);
Call swapCall = Call({
    to: address(pool),
    data: abi.encodeCall(pool.swap, (...));
});
```

### Sending

Perform a Uniswap V3 swap on Ethereum via an Interchain Account from a controlling account on another chain. The Interchain Account must satisfy any requirements the receiving contract has on `msg.sender`, such as token balances or allowances.

```solidity
uint32 ethereumDomain = 0x657468;
 // consistent across all chains
address icaRouter = 0xc011170d9795a7a2d065E384EAd1CA3394A7d35E;
IInterchainAccountRouter(icaRouter).dispatch(
    ethereumDomain,
    address(pool),
    abi.encodeCall(pool.swap, (...))
);
```

### Precomputing Addresses

It is often useful to have knowledge of the Interchain Account address before sending a message. For example, you may want to fund the address with tokens before sending a message. The `getInterchainAccount` function can be used to get the address of an Interchain Account given the controlling chain domain and address pair.

An example is included below of a contract precomputing its own Interchain Account address.

```solidity
address myInterchainAccount = IInterchainAccountRouter(...).getInterchainAccount(
    localDomain,
    address(this)
);
```
