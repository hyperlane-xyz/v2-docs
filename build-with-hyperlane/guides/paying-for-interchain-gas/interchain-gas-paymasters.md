# Interchain Gas Paymasters

For convenience, Hyperlane provides an on-chain API on the origin chain that can be used to pay [relayers](../../../protocol/agents/relayer.md) in the origin chain's native token to deliver messages on the destination chain. This payment is called an interchain gas payment.

### Interface

An Interchain Gas Paymaster (IGP) contract has a payable function which accepts a message ID, the destination domain of the message, an amount of destination gas, and an address on the origin chain to be refunded any overpayment.

This function does not necessarily need to be called in the same transaction as the message dispatch.

<!-- INCLUDE node_modules/@hyperlane-xyz/core/interfaces/IInterchainGasPaymaster.sol -->
<!-- WARNING: copied from the included file path. Do not edit directly. -->
```solidity
// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity >=0.6.11;

/**
 * @title IInterchainGasPaymaster
 * @notice Manages payments on a source chain to cover gas costs of relaying
 * messages to destination chains.
 */
interface IInterchainGasPaymaster {
    /**
     * @notice Emitted when a payment is made for a message's gas costs.
     * @param messageId The ID of the message to pay for.
     * @param gasAmount The amount of destination gas paid for.
     * @param payment The amount of native tokens paid.
     */
    event GasPayment(
        bytes32 indexed messageId,
        uint256 gasAmount,
        uint256 payment
    );

    function payForGas(
        bytes32 _messageId,
        uint32 _destinationDomain,
        uint256 _gasAmount,
        address _refundAddress
    ) external payable;

    function quoteGasPayment(uint32 _destinationDomain, uint256 _gasAmount)
        external
        view
        returns (uint256);
}

```
<!-- WARNING: copied from the included file path. Do not edit directly. -->
<!-- END -->

### How It Works

The interchain gas payment protocol is based on a social contract between a [relayer](../../../protocol/agents/relayer.md) and the interchain gas payer. Any relayer can provide their own IGP contracts, and anyone can pay for interchain gas on behalf of any message. A set of IGP contracts relating to relayers operated by the core team are provided.

The IGP contracts that are provided will calculate and enforce payment on-chain. This means that a call to the `payForGas` function of the `InterchainGasPaymaster` will revert if there is insufficient payment. If a `payForGas` call is successfully made that pays for a sufficient gas amount, the relayer commits to processing the message.

### The Router Pattern

If your application uses the [Router](../../../sdks/building-applications/writing-contracts/router.md) pattern, an internal function [`_dispatchWithGas`](https://github.com/hyperlane-xyz/hyperlane-monorepo/blob/13daa1bd86788074686cd9a7f68cc3cf722b85e4/solidity/contracts/Router.sol#L188) is provided that will dispatch a message and pay interchain gas.
