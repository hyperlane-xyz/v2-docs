---
description: Abacus domain identifiers.
---

# Domain Identifiers

Domain identifiers are used to distinguish between destination networks and are an essential part of message encoding. In future, if the Abacus mailboxes are upgraded with backwards incompatible changes (like an encoding change), different domain identifiers would be necessary. A message encoding change implies a fresh storage commitment to accumulated outbound messages and therefore fresh deployments of Abacus mailboxes ([`Outbox`](../protocol/messaging/outbox.md) and [`Inbox`](../protocol/messaging/inbox.md)).

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

### Testnet

| Network         | Domain Identifier (`uint32`) |
| --------------- | ---------------------------- |
| Alfajores       | `1000`                       |
| ArbitrumRinkeby | `0x61722d72`                 |
| BSC Testnet     | `0x62732d74`                 |
| Fuji            | `43113`                      |
| Goerli          | `5`                          |
| Kovan           | `3000`                       |
| Mumbai          | `80001`                      |
| OptimismKovan   | `0x6f702d6b`                 |
