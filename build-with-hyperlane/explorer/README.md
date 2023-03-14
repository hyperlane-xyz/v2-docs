---
description: Using the Hyperlane Explorer to find and track messages
---

# Explorer

The [Hyperlane Explorer](https://explorer.hyperlane.xyz/) can be used to find messages on any network with a Hyperlane deployment. Drill down into messages for more details about their properties and status.&#x20;

Messages to/from [core chains](../../resources/domains.md) will searchable by transaction hash, message ID, or sender/recipient address. For other chains, the explorer can be configured to search for messages by providing it a [chain config](configuring-pi-chains.md).

### Finding messages

To find the status of your message delivery, as well as details about the message contents, see [Searching for Messages.](searching-for-messages.md)

If you're trying to debug a problem with message delivery, the [Debugging Messages](observability.md) page has useful tips.

### API Reference

The explorer's data can be accessed programmatically via the [REST API](rest-api.md) or [GraphQL API](graphql-api.md). The REST API is recommended because it exposes a simpler interface for message data.&#x20;

### Permissionless Interoperability

The explorer UI and REST API can be configured to search for messages on any chain with a Hyperlane deployment. See [Configuring PI Chains](configuring-pi-chains.md) for details.

