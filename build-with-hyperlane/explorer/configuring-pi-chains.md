---
description: Using a Permissionless Interoperability chain in the Explorer
---

# Configuring PI Chains

Hyperlane can be [permissionlessly deployed](../../deploy/permissionless-interoperability.md) to any chain, but messages on PI chains cannot be identified by the default Hyperlane agents. To view details about messages from PI chains, first configure the explorer with metadata about that chain.

To begin, go to the [explorer's settings page](https://explorer.hyperlane.xyz/settings). From there, click the Add Custom Chain button.

<figure><img src="../../.gitbook/assets/Screenshot 2023-03-14 at 4.08.22 PM.png" alt=""><figcaption></figcaption></figure>

A modal will appear. Input the configuration for your PI Chain. The chain config schema is an extension of the Hyperlane SDK's [ChainMetadata schema](https://github.com/hyperlane-xyz/hyperlane-monorepo/blob/main/typescript/sdk/src/consts/chainMetadata.ts#L21) but with a `contracts` object added. Currently only the `mailbox` contract address is required but more functionality may be enabled in the future if more addresses are provided.&#x20;

If a valid Etherscan-based block explorer config is provided, the Hyperlane Explorer will utilize it to find the desired messages. If not, it will use the RPC URL. Note, Explorers with api keys (even just free-tier keys), perform faster and more reliably.

### Chain Config Examples

**A minimal chain config:**

```json
{
  "chainId": 12345,
  "name": "myChain",
  "publicRpcUrls": [{ "http": "https://myRpcUrl.com" }],
  "contracts": {
    "mailbox": "0x12345..."
  }
}
```

**A chain config with a block explorer and block timings included:**

```json
{
  "chainId": 12345,
  "name": "myChain",
  "publicRpcUrls": [{ "http": "https://myRpcUrl.com" }],
  "blockExplorers": [ {
      "name": "MyScan",
      "url": "https://myScanExplorer.com",
      "apiUrl": "https://api-myScanExplorer.com/api"
  } ],
  "blocks": { "confirmations": 1, "estimateBlockTime": 10 },
  "contracts": {
    "mailbox": "0x12345..."
  }
}
```

{% hint style="info" %}
If the origin or destination `domainId` of chains in your messages doesn't match their `chainId` then you must include the `domainId` field in your chain config.
{% endhint %}
