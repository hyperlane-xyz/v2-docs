---
description: Retrieve info about messages using GraphQL
---

# GraphQL API

The Hyperlane agents collect useful information about activity on the system, including all messages. That data can be queried via the APIs.

The APIs are currently available free of charge and without any required authentication.

{% hint style="info" %}
Connect your preferred GraphQL client or library to [https://api.hyperlane.xyz/v1/graphql](https://api.hyperlane.xyz/v1/graphql) to query data!
{% endhint %}

### Example Query

The following query will retrieve useful information about a message:

```graphql
query MessageDetails ($hash: String!){
  message(where: {hash: {_ilike: $hash}}) {
    destination
    id
    leaf_index
    hash
    msg_body
    origin
    origin_tx_id
    transaction {
      id
      block_id
      gas_used
      hash
      sender
      block {
        hash
        domain
        height
        id
        timestamp
      }
    }
    outbox_address
    recipient
    sender
    timestamp
    delivered_message {
      id
      tx_id
      inbox_address
      transaction {
        block_id
        gas_used
        hash
        id
        sender
        block {
          domain
          hash
          height
          id
          timestamp
        }
      }
    }
    message_states {
      block_height
      block_timestamp
      error_msg
      estimated_gas_cost
      id
      processable
    }
  }
}
```

### GraphQL Schema Types

```graphql
type message {
  delivered_message: delivered_message
  destination: Int!
  domain: domain!
  hash: String!
  id: bigint!
  leaf_index: Int!
  message_states: [message_state!]!
  msg_body: bytea
  origin: Int!
  origin_tx_id: bigint!
  outbox_address: String!
  recipient: String!
  sender: String!
  time_created: timestamp!
  timestamp: timestamp!
  transaction: transaction!
}

type delivered_message {
  domain: Int!
  domainByDomain: domain!
  hash: String!
  id: bigint!
  inbox_address: String!
  time_created: timestamp!
  transaction: transaction!
  tx_id: bigint!
}

type block {
  domain: Int!
  domainByDomain: domain!
  hash: String!
  height: bigint!
  id: bigint!
  time_created: timestamp!
  timestamp: timestamp!
}

type domain {
  chain_id: bigint
  id: Int!
  is_deprecated: Boolean!
  is_test_net: Boolean!
  name: String!
  native_token: String!
  time_created: timestamp!
  time_updated: timestamp!
}

type gas_payment {
  amount: numeric!
  domain: Int!
  domainByDomain: domain!
  id: bigint!
  leaf_index: Int!
  outbox_address: String!
  time_created: timestamp!
  transaction: transaction!
  tx_id: bigint!
}

type message_state {
  block_height: bigint!
  block_timestamp: timestamp!
  error_msg: String
  estimated_gas_cost: numeric
  id: bigint!
  message: message!
  msg_id: bigint!
  processable: Boolean!
  time_created: timestamp!
}

type transaction {
  block: block!
  block_id: bigint!
  checkpoint_updates: [checkpoint_update!]!
  cumulative_gas_used: float8!
  delivered_messages: [delivered_message!]!
  effective_gas_price: float8
  gas_limit: float8!
  gas_payments: [gas_payment!]!
  gas_price: float8
  gas_used: float8!
  hash: String!
  id: bigint!
  max_fee_per_gas: float8
  max_priority_fee_per_gas: float8
  messages: [message!]!
  nonce: bigint!
  recipient: String
  sender: String!
  time_created: timestamp!
}
```
