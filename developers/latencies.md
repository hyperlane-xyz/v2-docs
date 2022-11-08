---
description: Abacus block finality latency configuratino.
---

# Latencies

Validators must wait a certain number of blocks to be mined before they are considered valid and [reorg-safe](https://www.alchemy.com/overviews/what-is-a-reorg). Without this, validators could be slashed since they may have signed a checkpoint that is no longer valid.

Refer to the following sections for block finality configuration used by the Abacus Works validators.

### Mainnet

| Network   | Latency             |
| --------- | ------------------- |
| Arbitrum  | 1 block             |
| Avalanche | 3 blocks (6s)       |
| BSC       | 15 blocks (45s)     |
| Celo      | 1 block (5s)        |
| Ethereum  | 20 blocks (260s)    |
| Optimism  | 1 block             |
| Polygon   | 256 blocks (\~540s) |

### Testnet

| Network         | Latency          |
| --------------- | ---------------- |
| Arbitrum Goerli | 1 block          |
| Alfajores       | 1 block (5s)     |
| BSC Testnet     | 9 blocks (27s)   |
| Fuji            | 3 blocks (\~6s)  |
| Goerli          | 2 blocks (30s)   |
| Kovan           | 7 blocks (\~50s) |
| Mumbai          | 32 blocks (160s) |
| Moonbase Alpha  | 1 block          |
| Optimism Goerli | 1 block          |
