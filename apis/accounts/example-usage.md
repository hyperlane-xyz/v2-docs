---
description: Call smart contracts on remote chains
---

# Example usage

### Call encoding

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
</code></pre>

### Paying for Interchain Gas

Just like all Hyperlane messages that wish to have their messages delivered by a relayer, users must [pay for interchain gas](../../build-with-hyperlane/guides/paying-for-interchain-gas.md).

The various `callRemote` functions in the Accounts API each return the message ID as a `bytes32`. This message ID can then be used by the caller to pay for interchain gas.

When specifying the amount of gas, the caller must pay for a gas amount high enough to cover:

1. "Overhead" gas used by the Accounts API contract and ISM on the destination chain. See the below table to understand what this will be.
2. The gas used by the user-specified arbitrary call(s) that will be performed by the interchain account.

#### Overhead gas amounts

For the very first message sent by a sender on the origin chain to a new destination domain, a higher overhead destination gas cost is incurred. This is because the Interchain Account must be created on the destination chain, which involves a new contract being deployed. Subsequent messages to an already-created Interchain Account have a much cheaper overhead.

| Interchain Account Already Exists?                                                                                                                | Overhead Gas Amount |
| ------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- |
| No - this is the very first message from a `(uint32 origin, address owner)` pair to the destination, and a new Interchain Account will be created | 150,000             |
| Yes                                                                                                                                               | 30,000              |

#### Gas payment example

```solidity
function makeCall(uint256 gasAmount, Call[] memory calls) external payable {
    // First, send the call
    uint32 ethereumDomain = 1;
    bytes32 messageId = IInterchainAccountRouter(0xabc..).callRemote(
        ethereumDomain,
        calls
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
