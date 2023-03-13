---
description: Retrieve info about messages using REST Queries
---

# REST API

The Hyperlane agents collect useful information about activity on the system, including all messages. That data can be queried via the APIs.

The APIs are currently available free of charge and without any required authentication.

{% hint style="info" %}
Connect your preferred fetch client or library to [https://explorer.hyperlane.xyz/api](https://explorer.hyperlane.xyz/api) to query data!
{% endhint %}

### Example Query

#### Request

```javascript
const baseUrl = 'https://explorer.hyperlane.xyz/api'
const action = 'module=message&action=get-messages'
const messageId = '62d30bde22af368e43f981f65186ff2c2b895a09774a9397f815dcc366793875'
const url =`${baseUrl}?${action}&id=${messageId}`;
const response = await fetch(url, {
  method: "GET",
  headers: { "Content-Type": "application/json" },
});
const data = await response.json();
```

#### Response

```json
{
  "status": "1",
  "message": "OK",
  "result": [
    {
      "id": "62d30bde22af368e43f981f65186ff2c2b895a09774a9397f815dcc366793875",
      "status": "delivered",
      "sender": "0x854fd51c04408ad84da3838a4ff7282522f7866e",
      "recipient": "0x1c847335d123632fc7d662ab87ac7872acd920f2",
      "originDomainId": 80001,
      "destinationDomainId": 43113,
      "nonce": 613,
      "body": "0x48656c6c6f21",
      "originTransaction": {
        "from": "0x06c8798aa665bdbeea6aba6fc1b1d9bbdca8d613",
        "transactionHash": "0x8359f6c022a1e164e052f2a106c8f67a222c7e2355ded825c4112486510cdb80",
        "blockNumber": 30789012,
        "gasUsed": 100813,
        "timestamp": 1673373764000
      },
      "destinationTransaction": {
        "from": "0x0a1a869dc7f56c9fd4276b0568fd232a07d88e83",
        "transactionHash": "0x439ae6fbbd768404166ef31a08ade52d4659f9843ac490203b90406661b5001b",
        "blockNumber": 17884981,
        "gasUsed": 153381,
        "timestamp": 1673373842000
      }
    }
  ]
}
```

### API Reference

#### Module: Message

Action: `get-message`, Parameter (1 required):

* `id`: message id (string)
* `sender`: address of message sender (string)
* `recipient`: address of message recipient (string)
* `origin-tx-hash`: hash of origin transaction (string)
* `origin-tx-sender`: address of origin tx sender (string)
* `destination-tx-hash`: hash of destination transaction (string)
* `destination-tx-sender`: address of destination tx sender (string)

Action: `get-status` Parameter (1 required):

* _Same as get-message above_

Action: `search-messages`, Parameter (1 required):

* `query`: address or hash to search (string)

### APIs for Permissionless Interoperability chains&#x20;

Hyperlane can be [permissionlessly deployed](../../../deploy/permissionless-interoperability.md) to any chain, but messages on PI chains cannot be identified by the default Hyperlane agents. To view details about messages from PI chains, query the `search-pi-messages` action. The search requires a chain config in the request body. Note, this same functionality is also available in the [Explorer web app](https://explorer.hyperlane.xyz/settings).

```javascript
const chainConfig = {
  "chainId": 1234,
  "name": "mychain",
  "publicRpcUrls": [{ "http": "https://myRpcUrl.com" }],
  "blockExplorers": [ {
      "name": "MyChainScan",
      "url": "https://myChainExplorer.com",
      "apiUrl": "https://myChainExplorer.com/api",
      "apiKey": "12345"
  } ],
  "contracts": {
    "mailbox": "0x123..."
  }
}

const baseUrl = 'https://explorer.hyperlane.xyz/api'
const action = 'module=message&action=search-pi-messages'
const query = '62d30bde22af368e43f981f65186ff2c2b895a09774a9397f815dcc366793875'
const url =`${baseUrl}?${action}&query=${query}`;
const response = await fetch(url, {
  method: "POST",
  body: JSON.stringify(chainConfig),
  headers: { "Content-Type": "application/json" },
});
const data = await response.json();
```

#### Chain Config Schema

The chain config schema is an extension of the Hyperlane SDK's [ChainMetadata schema](https://github.com/hyperlane-xyz/hyperlane-monorepo/blob/main/typescript/sdk/src/consts/chainMetadata.ts#L21) but with a `contracts` object added. Currently only the `mailbox` contract address is required but more functionality may be enabled in the future if more addresses are provided.&#x20;

If a valid Etherscan-based block explorer config is provided, the Hyperlane Explorer will utilize it to find the desired messages. If not, it will use the RPC URL. Note, Explorers with api keys (even just free-tier keys), perform faster and more reliably.

{% hint style="info" %}
If the origin or destination `domainId` of chains in your messages doesn't match their `chainId` then you must include the `domainId` field in your chain config.
{% endhint %}
