---
description: Configure which messages to relay, and which to ignore
---

# Message filtering

By default, the relayer will attempt to deliver messages sent from its origin chain to a destination chain that it is aware of.

Relayers may want to further filter the messages they attempt to deliver. For example, someone building an interchain app may want to run a relayer that only delivers messages sent to that application. Similarly, some relayers may wish to only relay messages to a subset of available chains.

Relayers may optionally filter the messages they deliver by setting the `HYP_RELAYER_WHITELIST` or `HYP_RELAYER_BLACKLIST` environment variables.

These environment variables are stringified JSON objects with the following format:

```typescript
type Filter = string | string[];

type ListElement = {
  senderAddress?: Filter;
  originDomain?: Filter;
  recipientAddress?: Filter;
  destinationDomain?: Filter;
}

type BlackOrWhitelist = ListElement[];
```

Both the whitelist and blacklists have "any" semantics. In other words, the relayer will deliver messages that match _any_ of the whitelist filters, and ignore messages that match _any_ of the blacklist filters.

For example, the following config used as a whitelist will ensure the relayer will relay any messages sent to ethereum, any messages sent from address `0xca7f632e91B592178D83A70B404f398c0a51581F` to either celo or avalanche, and any messages sent to address `0xca7f632e91B592178D83A70B404f398c0a51581F` on arbitrum or optimism.

```json
[
    {
        senderAddress: "*",
        destinationDomain: ["1"],
        recipientAddress: "*"
    },
    {
        senderAddress: "0xca7f632e91B592178D83A70B404f398c0a51581F",
        destinationDomain: ["42220", "43114"],
        recipientAddress: "*"
    },
    {
        senderAddress: "*",
        destinationDomain: ["42161", "420"],
        recipientAddress: "0xca7f632e91B592178D83A70B404f398c0a51581F"
    }
]
```

As a string, a valid config may look like `HYP_RELAYER_WHITELIST='[{"senderAddress":"","destinationDomain":["1"],"recipientAddress":""},{"senderAddress":"0xca7f632e91B592178D83A70B404f398c0a51581F","destinationDomain":["42220","43114"],"recipientAddress":""},{"senderAddress":"","destinationDomain":["42161","420"],"recipientAddress":"0xca7f632e91B592178D83A70B404f398c0a51581F"}]'`

The blacklist supersedes the whitelist, i.e. if a message matches both the whitelist _and_ the blacklist, it will not be delivered.
