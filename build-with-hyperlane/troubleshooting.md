---
description: Having trouble with Hyperlane? Let's help you figure it out!
---

# Troubleshooting

As you navigate the interchain space and begin sending your first messages between blockchains, you may run into some issues. This section will help you troubleshoot common issues so you can get right back on the Interchain Highway and onwards to your destination!

### Message Delivery

For a simple approach to debugging messages, try the Hyperlane Explorer. It can diagnose common issues with message delivery. See [Debugging with Explorer](explorer/observability.md) for details.

Still need more help? Find our team on the [Hyperlane Discord](http://discord.gg/hyperlane) and ask away!

### Off-chain Agents&#x20;

#### Missing name field error

An error about a missing `name` field most likely indicates that you have an environment variable that implies the existence of a chain, but said chain does not exist in the config files. You may have mispelled the ENV name (`HYP_BASE_CHAINS_GOERLI_CONNECTION_URL)`. Or you may have specified a new chain but forgot to load the corresponding config file.
