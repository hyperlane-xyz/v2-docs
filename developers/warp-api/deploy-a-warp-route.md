---
description: Move your token between chains
---

# Deploy a Warp Route

A Warp Route is simply a [router.md](../building-applications/writing-contracts/router.md "mention") application, requiring one `HypERC20` token contract to be deployed on each chain you wish to support.

The [hyperlane-token](https://github.com/hyperlane-xyz/hyperlane-token) repo includes a script that allows you to configure and deploy a Warp Route for your desired token.

### 1. Setup

Clone the [hyperlane-token](https://github.com/hyperlane-xyz/hyperlane-token) repo and run the following commands:

```
$ yarn install
$ yarn build
```

### 2. Configuration

#### Token config

You will need to create a JSON file that specifies the Warp Route configuration. This will include information such as:

* Which token, on which chain, is this Warp Route being created for?
* Hyperlane connection details (e.g. contract addresses for [messaging](../../protocol/messaging/ "mention"), or the [IGP contract to use](../paying-for-interchain-gas/which-igp-to-use-and-understanding-gas-amounts.md))
* Optional security configuration (i.e. [Interchain Security Module](../messaging-api/receive-1.md#interchain-security-modules) addresses)

Your configuration must have exactly one entry with `"type": "collateral"`, which specifies the canonical token address. Every other entry must have `"type": "synthetic"`.

Deployers may configure interchain security by setting the `interchainSecurityModule` field to the address of the ISM that will verify inbound interchain messages. If none is specified, the default from the `Mailbox` contract will be used.

#### Example

An example token config for a Warp Route that allows for interchain transfers of the ERC20 token at address `0xb4fbf271143f4fbf7b91a5ded31805e42b2208d6` between the Goerli and Alfajores testnets is shown below, and can be found in [`configs/warp-route-token-config.json`](https://github.com/hyperlane-xyz/hyperlane-token/blob/main/configs/warp-route-token-config.json)``

This Warp Route is secured by the default ISMs that are set on the `Mailboxes` for those chains.

```json
{
  "goerli": {
    "type": "collateral",
    "token": "0xb4fbf271143f4fbf7b91a5ded31805e42b2208d6",
    "owner": "0x5bA371aeA18734Cb7195650aFdfCa4f9251aa513",
    "mailbox": "0xCC737a94FecaeC165AbCf12dED095BB13F037685",
    "interchainGasPaymaster": "0xF90cB82a76492614D07B82a7658917f3aC811Ac1",
    "interchainSecurityModule": undefined,
  },
  "alfajores": {
    "type": "synthetic",
    "name": "WETH",
    "symbol": "WETH",
    "totalSupply": 0,
    "token": "0xb4fbf271143f4fbf7b91a5ded31805e42b2208d6",
    "owner": "0x5bA371aeA18734Cb7195650aFdfCa4f9251aa513",
    "mailbox": "0xCC737a94FecaeC165AbCf12dED095BB13F037685",
    "interchainGasPaymaster": "0xF90cB82a76492614D07B82a7658917f3aC811Ac1",
    "interchainSecurityModule": undefined,
  }
}
```

#### Chain config

The Warp Route deployer will be aware of the connection details (e.g. RPC URL) for many standard chains.

If you would like to deploy a Warp Route to a chain that is not included in the Hyperlane SDK, you can specify chain connection details in a JSON file.

#### Example

An example chain config for a Warp Route is shown below. If your chain does not have a block explorer you can leave that array empty.

```json
{
  "goerli": {
    "id": 5,
    "name": "goerli",
    "displayName": "Goerli",
    "nativeToken": { "name": "Ether", "symbol": "ETH", "decimals": 18 },
    "publicRpcUrls": [{ "http": "https://eth-goerli.public.blastapi.io" }],
    "blockExplorers": [
      {
        "name": "Goerliscan",
        "url": "https://goerli.etherscan.io",
        "apiUrl": "https://api-goerli.etherscan.io",
        "family": "etherscan"
      }
    ],
    "blocks": {
      "confirmations": 1,
      "reorgPeriod": 2,
      "estimateBlockTime": 13
    }
  }
}
```

### 3. Deployment

Run the following script to deploy your Warp Route:

```bash
$ yarn deploy-warp-route --private-key $PRIVATE_KEY \
    --token-config my-token-config.json --chain-config my-chain-config.json
```

You must pass a private key and the path to the config file as arguments for the deploy script.&#x20;

Private key function needs to be passed from the account that submits the deployment transaction to all the chains that the Warp Route is being deployed to. This account needs to have balances on all chains that the account is deploying and connecting Warp Route to.

Example configs can be found in `./configs/`, one for tokens and another for chains. The chains config can be used to enable permisionless deployments, or to override the Hyperlane SDK's default values. Use the `--chain-config` flag to pass a chain config path to the deploy script.

When the command finishes, it will output the list of contracts.
