---
description: Retrieve info about messages using GraphQL
---

# GraphQL API

The Hyperlane agents collect useful information about activity on the system, including all messages. That data can be queried via the APIs.

The APIs are currently available free of charge and without any required authentication.

{% hint style="info" %}
Connect your preferred GraphQL client or library to [https://hyperlane-explorer-2.hasura.app/v1/graphql](https://hyperlane-explorer-2.hasura.app/v1/graphql) to query data!
{% endhint %}

### Example Query

The following query will retrieve useful information about a message:

```graphql
query MessageDetails ($id: String!){
  message(where: {msg_id: {_ilike: $id}}) {
    destination
    msg_id
    nonce
    msg_body
    origin
    origin_tx_id
    origin_mailbox
    recipient
    sender
    timestamp
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
    delivered_message {
      id
      tx_id
      destination_mailbox
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
  id: bigint!
  message_states: [message_state!]!
  msg_id: String!
  msg_body: bytea
  nonce: Int!
  origin: Int!
  origin_mailbox: String!
  origin_tx_id: bigint!
  recipient: String!
  sender: String!
  time_created: timestamp!
  timestamp: timestamp!
  transaction: transaction!
}

type delivered_message {
  destination_mailbox: String!
  domain: Int!
  domainByDomain: domain!
  id: bigint!
  msg_id: String!
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
  msg_id: String
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
