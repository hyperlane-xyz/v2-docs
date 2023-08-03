---
description: Using the Hyperlane Explorer to find and track messages
---

# Explorer

The [Hyperlane Explorer](https://explorer.hyperlane.xyz/) can be used to find messages on any network with a Hyperlane deployment. Drill down into messages for more details about their properties and status.

Messages to/from [core chains](../../resources/domains/) will searchable by transaction hash, message ID, or sender/recipient address. For other chains, the explorer can be configured to search for messages by providing it a chain config.

### Searching for messages

The [Hyperlane Explorer](https://explorer.hyperlane.xyz/) supports searching for messages using any of the following values:

* Hash of the transaction that initiated the message (origin tx)
* Hash of the transaction that delivered message (destination tx)
* Address of the account that sent the origin transaction
* Address of the account that sent the destination transaction
* Address of the message sender
* Address of the message recipient
* ID of the message

To search, enter your query into the top search bar. You can use the Origin Chain, Destination Chain, and Time filter options to narrow down your search.

<figure><img src="../../.gitbook/assets/Screenshot 2023-03-14 at 4.03.15 PM.png" alt=""><figcaption><p>Explorer search bar</p></figcaption></figure>

{% hint style="info" %}
Note, by default the explorer will only find message on [core Hyperlane chains](../../resources/domains/). To view messages send to and/or from other chains, see [configuring-pi-chains.md](configuring-pi-chains.md "mention") .
{% endhint %}

### Permissionless Interoperability

The explorer UI and REST API can be configured to search for messages on any chain with a Hyperlane deployment. See [configuring-pi-chains.md](configuring-pi-chains.md "mention") for details.

### Debugging Messages

If you're trying to debug a problem with message delivery, the [observability.md](observability.md "mention") page has useful tips.

### API Reference

The explorer's data can be accessed programmatically via the [rest-api.md](rest-api.md "mention") or [graphql-api.md](graphql-api.md "mention"). The REST API is recommended because it exposes a simpler interface for message data.

###
