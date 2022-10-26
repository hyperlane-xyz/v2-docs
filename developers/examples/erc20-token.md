---
description: An interchain ERC20 token contract
---

# ERC20 token

The [hyperlane-token repo](https://github.com/hyperlane-xyz/hyperlane-token) shows an example interchain ERC20 token, also called a `HypERC20`.

The changes to the vanilla OpenZeppelin ERC20 contract are minimal. It has a `transferRemote()` function that burns the specified amount of tokens on the sending chain and mints the equivalent amount on the receiving chain.

#### Contract

Its [contract](https://github.com/hyperlane-xyz/hyperlane-token/blob/main/contracts/HypERC20.sol) implements a `transferRemote` method which burns tokens and dispatches corresponding messages.&#x20;

```solidity
/**
 * @notice Transfers `_amount` of tokens from `msg.sender` to `_recipient` on the `_destination` chain.
 * @dev Burns `_amount` of tokens from `msg.sender` on the origin chain and dispatches
 *      message to the `destination` chain to mint `_amount` of tokens to `recipient`.
 * @param _destination The identifier of the destination chain.
 * @param _recipient The address of the recipient on the destination chain.
 * @param _amount The amount of tokens to be sent to the remote recipient.
 */
function transferRemote(
    uint32 _destination,
    address _recipient,
    uint256 _amount
) external payable {
    _burn(msg.sender, _amount);
    _dispatchWithGas(
        _destination,
        abi.encode(_recipient, _amount),
        msg.value
    );
}
```

It also requires a `_handle` method which mints tokens upon receiving messages.

```solidity
/**
 * @dev Mints tokens to recipient when router receives transfer message.
 * @param _origin The identifier of the origin chain.
 * @param _message The encoded remote transfer message containing the recipient address and amount.
 */
function _handle(
    uint32 _origin,
    bytes32,
    bytes memory _message
) internal override {
    (address recipient, uint256 amount) = abi.decode(
        _message,
        (address, uint256)
    );
    _mint(recipient, amount);
}
```
