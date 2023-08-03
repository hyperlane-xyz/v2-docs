---
description: Unique IDs for each Hyperlane-supported chain
---

# Domain identifiers

{% hint style="warning" %}
Note that Hyperlane domain IDs are not guaranteed to be the same as EVM chain IDs, as Hyperlane will eventually support non-EVM chains.
{% endhint %}

Hyperlane uses proprietary domain IDs to reference each Hyperlane-supported chain.

When [sending a message](../../apis/messaging-api/send.md), users must provide the domain ID of the destination chain. When [receiving a message](../../apis/messaging-api/receive.md), the recipient will be passed the domain ID of the origin chain.

{% hint style="info" %}
This list includes only the deployments on chains that are managed by Abacus Works (our legal entity). Anybody can deploy Hyperlane on any chain using [Permissionless ](../broken-reference/)[Interoperability ](../broken-reference/)and thus this list may not be exhaustive.
{% endhint %}

### Mainnet

| Network   | Domain Identifier (uint32) |
| --------- | -------------------------- |
| Arbitrum  | `42161`                    |
| Avalanche | `43114`                    |
| BSC       | `56`                       |
| Celo      | `42220`                    |
| Ethereum  | `1`                        |
| Optimism  | `10`                       |
| Polygon   | `137`                      |
| Moonbeam  | `1284`                     |
| Gnosis    | `100`                      |

### Testnet

| Network         | Domain Identifier (uint32) |
| --------------- | -------------------------- |
| Alfajores       | `44787`                    |
| BSC Testnet     | `97`                       |
| Fuji            | `43113`                    |
| Goerli          | `5`                        |
| Sepolia         | `11155111`                 |
| Mumbai          | `80001`                    |
| Moonbase Alpha  | `1287`                     |
| Optimism Goerli | `420`                      |
| Arbitrum Goerli | `421613`                   |
