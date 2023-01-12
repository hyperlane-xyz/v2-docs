---
description: Retrieve info about messages using REST
---

# REST API

The Hyperlane agents collect useful information about activity on the system, including all messages. That data can be queried via the APIs.

The APIs are currently available free of charge and without any required authentication.

{% hint style="info" %}
Connect your preferred fetch client or library to [https://api-v1.hyperlane.xyz/api/rest](https://api-v1.hyperlane.xyz/api/rest) to query data!
{% endhint %}

### Example Query

#### Request

```javascript
const baseUrl = 'https://api.hyperlane.xyz/api/rest'
const messageHash = 'f1b84b24a88011e14bc4acde11753016af377b4a9f21a6dcea466da7915a901d'
const url =`${baseUrl}/messages/byHash/${messageHash}`;
const response = await fetch(url, {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
});
const data = await response.json();
```

#### Response

```json
{
  "message": [
    {
      "destination": 5,
      "id": 94156,
      "leaf_index": 16949,
      "hash": "f1b84b24a88011e14bc4acde11753016af377b4a9f21a6dcea466da7915a901d",
      "msg_body": "\\x48656c6c6f21",
      "origin": 1000,
      "origin_tx_id": 157045,
      "transaction": {
        "id": 157045,
        "block_id": 156065,
        "gas_used": 79745,
        "hash": "643b1b8bc38520ae9832719e55c575fe0aa535f6e4ffc6d121388ae1e1c996db",
        "sender": "ff5c0ab5aa2bd380cba1d1c7d82747bca210bae8",
        "block": {
          "hash": "1fbb58619e85ca91fb11faa514f4b2ce6f944411abd5293aa1805be0fd8f1314",
          "domain": 1000,
          "height": 14755503,
          "id": 156065,
          "timestamp": "2022-11-22T18:31:48"
        }
      },
      "outbox_address": "5c7d9b5f38022db78416d6c0132bf8c404dede27",
      "recipient": "19be55d859368e02d7b9c00803eb677bdc1359bd",
      "sender": "0fd5a339466638ad2746748dcfff65a27f605de4",
      "timestamp": "2022-11-22T18:31:48",
      "delivered_message": {
        "id": 6141737,
        "tx_id": 157046,
        "inbox_address": "d3d062a5dcba85ae863618d4c264d2358300c283",
        "transaction": {
          "block_id": 156066,
          "gas_used": 167553,
          "hash": "d77322ee4cd6132639b2d59375c32d955a12c7f1a048c5747260089be17fad02",
          "id": 157046,
          "sender": "6af19360f3c3a1221d6a5fae0c8110e42e2a0d74",
          "block": {
            "domain": 5,
            "hash": "91b89214602e81c1afa4cebfea7b51683ee47625002aefa94e9ce7e6d1d42eef",
            "height": 8000504,
            "id": 156066,
            "timestamp": "2022-11-22T18:32:12"
          }
        }
      },
      "message_states": []
    }
  ]
}
```

### API Reference

#### Fetching Message

`/messages/byHash/:hash`

`/messages/bySender/:address`&#x20;

`/messages/byRecipient/:address`

`/messages/byOriginTransactionHash/:hash`

`/messages/byOriginTransactionSender/:address`

`/messages/byDestinationTransactionHash/:hash`

`/messages/byDestinationTransactionSender/:address`

#### Fetching Delivery

`/deliveries/byMessageHash/:hash`

`/deliveries/byTransactionHash/:hash`

`/deliveries/byTransactionSender/:address`
