---
description: Find message details using the Hyperlane Explorer
---

# Searching for Messages

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
Note, by default the explorer will only find message on [core Hyperlane chains](../../resources/domains.md). For searching chains deployed using Permisionless Interoperability, see [Configure PI Chains](configuring-pi-chains.md).
{% endhint %}
