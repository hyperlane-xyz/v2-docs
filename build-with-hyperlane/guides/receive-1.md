---
description: Customize interchain security using ISMs
---

# Specifying an ISM

Developers can take control of interchain security using [sovereign-consensus](../../protocol/sovereign-consensus/ "mention").

### Interchain Security Modules

An Interchain Security Module (ISM) is a smart contract that is responsible for verifying messages from a remote chain. ISMs must implement the `IInterchainSecurityModule` interface.

```solidity
// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity >=0.6.11;

interface IInterchainSecurityModule {
    /**
     * @notice Returns an enum that represents the type of security model
     * encoded by this ISM.
     * @dev Relayers infer how to fetch and format metadata.
     */
    function moduleType() external view returns (uint8);

    /**
     * @notice Defines a security model responsible for verifying interchain
     * messages based on the provided metadata.
     * @param _metadata Off-chain metadata provided by a relayer, specific to
     * the security model encoded by the module (e.g. validator signatures)
     * @param _message Hyperlane encoded interchain message
     * @return True if the message was verified
     */
    function verify(bytes calldata _metadata, bytes calldata _message)
        external
        returns (bool);
}

interface ISpecifiesInterchainSecurityModule {
    function interchainSecurityModule()
        external
        view
        returns (IInterchainSecurityModule);
}

```

To specify the ISM they would like to use, developers may implement the `ISpecifiesInterchainSecurityModule` interface in any contract that receives interchain messages.

If no ISM is specified, or if the specified ISM is the null address, whatever ISM is configured as the default on the destination chain `Mailbox` will be used.

{% hint style="info" %}
See [`Message.sol`](https://github.com/hyperlane-xyz/hyperlane-monorepo/blob/main/solidity/contracts/libs/Message.sol)for more details on Hyperlane message encoding.
{% endhint %}
