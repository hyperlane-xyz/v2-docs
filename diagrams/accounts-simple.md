```mermaid
%%{ init: {
  "theme": "neutral",
  "themeVariables": {
    "mainBkg": "#025AA1",
    "textColor": "white",
    "clusterBkg": "beige"
  },
  "themeCSS": ".edgeLabel { color: black }"
}}%%

flowchart TB
    subgraph Origin Chain
      Sender
      A_O[InterchainQueryRouter]
    end

    subgraph Destination Chain
      A_D[InterchainQueryRouter]
      Recipient[Recipient]
    end

    Sender -- "query(recipient, data, callback)" --> A_O
    A_O <-. "relay" .-> A_D
    A_D -- "call(data)" --> Recipient
    Recipient -- "result" --> A_D
    A_O -- "callback(result)" --> Sender

    click A_O https://github.com/hyperlane-xyz/hyperlane-monorepo/blob/main/solidity/contracts/middleware/InterchainAccountRouter.sol
    click A_D https://github.com/hyperlane-xyz/hyperlane-monorepo/blob/main/solidity/contracts/middleware/InterchainAccountRouter.sol

    style Sender fill:purple
    style Recipient fill:purple
```