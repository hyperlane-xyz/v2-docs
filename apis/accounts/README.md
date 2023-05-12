---
description: Call smart contracts on remote chains
---

# Accounts API

Developers can use the Accounts API to create and control an account on a remote chain from their local chain.

Unlike the [messaging-api](../messaging-api/ "mention"), which requires recipients to implement a specific interface, the Accounts API allows developers to interact with any remote contract.

The Accounts API assigns every `(uint32 origin, uint32 destination, address owner)` tuple a unique interchain account (ICA) address. The sender owns that ICA on the destination chain, and can direct it to make arbitrary function calls via the `InterchainAccountRouter.callRemote()` endpoint.

### Computing addresses

It may be useful to know the remote address of your ICA before sending a message. For example, you may want to first fund the address with tokens. The `getRemoteInterchainAccount` function can be used to get the address of an ICA given the destination chain and owner address.

An example is included below of a contract precomputing its own Interchain Account address.

```solidity
address myInterchainAccount = IInterchainAccountRouter(...).getInterchainAccount(
    destination,
    address(this)
);
```

### Interface

```solidity
// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity >=0.6.11;

import {CallLib} from "../contracts/libs/Call.sol";

interface IInterchainAccountRouter {
    function callRemote(
        uint32 _destinationDomain,
        CallLib.Call[] calldata calls
    ) external returns (bytes32);

    function getRemoteInterchainAccount(uint32 _destination, address _owner)
        external
        view
        returns (address);
}

```

{% hint style="info" %}
Want to use `InterchainAccountRouter`? Please refer to [addresses.md](../../resources/addresses.md "mention") and [domains.md](../../resources/domains.md "mention")
{% endhint %}

## Example Usage

### Encoding

The `callRemote` function takes as arguments an array of `Call` structs. `Call.data` can be easily encoded with the `abi.encodeCall` function.

<pre class="language-solidity"><code class="lang-solidity">struct Call {
    // supporting non EVM targets
    bytes32 to;
    uint256 value;
    bytes data;
}

<strong>interface IUniswapV3Pool {
</strong>    function swap(
        address recipient,
        bool zeroForOne,
        int256 amountSpecified,
        uint160 sqrtPriceLimitX96,
        bytes calldata data
    ) external returns (int256 amount0, int256 amount1);
}

IUniswapV3Pool pool = IUniswapV3Pool(...);
Call swapCall = Call({
    to: TypeCasts.addressToBytes32(address(pool)),
    data: abi.encodeCall(pool.swap, (...));
    value: 0,
});
uint32 ethereumDomain = 1;
IInterchainAccountRouter(0xabc...).dispatch(ethereumDomain, [swapCall]);
</code></pre>

### Computing addresses

It may be useful to know the remote address of your ICA before sending a message. For example, you may want to first fund the address with tokens. The `getRemoteInterchainAccount` function can be used to get the address of an ICA given the destination chain and owner address.

An example is included below of a contract precomputing its own interchain account address.

```solidity
address myInterchainAccount = IInterchainAccountRouter(...).getInterchainAccount(
    destination,
    address(this)
);
```

### Paying for Interchain Gas

Just like all Hyperlane messages that wish to have their messages delivered by a relayer, users must [pay for interchain gas](../../build-with-hyperlane/guides/paying-for-interchain-gas.md).

The various `callRemote` functions in the Accounts API each return the message ID as a `bytes32`. This message ID can then be used by the caller to pay for interchain gas.

When specifying the amount of gas, the caller must pay for a gas amount high enough to cover:

1. "Overhead" gas used by the Accounts API contract and ISM on the destination chain. See the below table to understand what this will be.
2. The gas used by the user-specified arbitrary call(s) that will be performed by the interchain account.

#### Overhead gas amounts

For the very first message sent by a sender on the origin chain to a new destination domain, a higher overhead destination gas cost is incurred. This is because the interchain account must be created on the destination chain, which involves a new contract being deployed. Subsequent messages to an already-created interchain account have a much cheaper overhead.

| Interchain account already exists?                                                                                                                | Overhead Gas Amount |
| ------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- |
| No - this is the very first message from a `(uint32 origin, address owner)` pair to the destination, and a new interchain account will be created | 150,000             |
| Yes                                                                                                                                               | 30,000              |

#### Gas Payment Example

```solidity
function makeCall(uint256 gasAmount) external payable {
    // First, send the call
    uint32 ethereumDomain = 0x657468;
    // consistent across all chains
    address icaRouter = 0xc011170d9795a7a2d065E384EAd1CA3394A7d35E;
    bytes32 messageId = IInterchainAccountRouter(icaRouter).dispatch(
        ethereumDomain,
        address(pool),
        abi.encodeCall(pool.swap, (...))
    );

    // Then, pay for gas

    // The mainnet DefaultIsmInterchainGasPaymaster
    IInterchainGasPaymaster igp = IInterchainGasPaymaster(
        0x56f52c0A1ddcD557285f7CBc782D3d83096CE1Cc
    );
    // Pay with the msg.value
    igp.payForGas{ value: msg.value }(
         // The ID of the message
         messageId,
         // Destination domain
         ethereumDomain,
         // The total gas amount. This should be the
         // overhead gas amount + gas used by the call being made
         gasAmount,
         // Refund the msg.sender
         msg.sender
     );
}
```

## Diagram

```mermaid
%%{ init: {
  "theme": "neutral",
  "themeVariables": {
    "mainBkg": "#025AA1",
    "textColor": "white",
    "clusterBkg": "white"
  },
  "themeCSS": ".edgeLabel { color: black }"
}}%%

flowchart TB
    subgraph Origin Chain
      Sender
      A_O[InterchainAccountRouter]
      M_O[(Mailbox)]
    end

    subgraph Destination Chain
      M_D[(Mailbox)]
      A_D[InterchainAccountRouter]
      SenderAccount
      Recipient
    end

    Sender -- "dispatch(destination, recipient, call)" --> A_O
    A_O -- "dispatch(destination, router, \n[sender, recipient, call])" --> M_O
    M_O -. "relay" .- M_D
    M_D -- "handle(origin, router, \n[sender, recipient, call])" --> A_D
    A_D == "interchainAccount(origin, sender)" ==> SenderAccount
    SenderAccount -- "call(data)" --> Recipient
    
    click A_O https://github.com/hyperlane-xyz/hyperlane-monorepo/blob/main/solidity/contracts/middleware/InterchainAccountRouter.sol
    click A_D https://github.com/hyperlane-xyz/hyperlane-monorepo/blob/main/solidity/contracts/middleware/InterchainAccountRouter.sol

    style Sender fill:#efab17
    style SenderAccount fill:#efab17
    style Recipient fill:#efab17
```
