---
description: Unique IDs for each Hyperlane-supported chain
---

# Domain identifiers

{% hint style="warning" %}
Note that Abacus domain IDs have no relationship with EVM chain IDs, as Abacus will eventually support non-EVM chains.
{% endhint %}

Hyperlane uses proprietary domain IDs to reference each Hyperlane-supported chain.

When [sending a message](../developers/messaging-api/send.md), users must provide the domain ID of the destination chain. When [receiving a message](../developers/messaging-api/receive.md), the recipient will be passed the domain ID of the origin chain.

### Mainnet

| Network   | Domain Identifier (`uint32`) |
| --------- | ---------------------------- |
| Arbitrum  | `0x617262`                   |
| Avalanche | `0x61766178`                 |
| BSC       | `0x627363`                   |
| Celo      | `0x63656c6f`                 |
| Ethereum  | `0x657468`                   |
| Optimism  | `0x6f70`                     |
| Polygon   | `0x706f6c79`                 |
| Moonbeam  | `0x6d6f2d6d`                 |

### Testnet

| Network         | Domain Identifier (`uint32`) |
| --------------- | ---------------------------- |
| Alfajores       | `1000`                       |
| BSC Testnet     | `0x62732d74`                 |
| Fuji            | `43113`                      |
| Goerli          | `5`                          |
| Mumbai          | `80001`                      |
| Moonbase Alpha  | `0x6d6f2d61`                 |
| Optimism Goerli | `420`                        |
| Arbitrum Goerli | `421613`                     |
|                 |                              |
