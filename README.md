---
description: Pioneering permissionless and modular interoperability between blockchains
---

# Hyperlane Introduction

Hyperlane is permissionless and modular interoperability platform with focus on security assumptions. Empowering developers to build interchain applications that can communicate cross chain between blockchain environments.&#x20;

Hyperlane priority focus is developer experience and security of cross chain transfers offering it's users the best experience of cross chain protocol communication.

### **Cross chain API modules by Hyperlane**

Hyperlane provides set of various API modules as plug and play solution for their cross chain application. Hyperlane SDK can makes building interchain applications quick and easy. &#x20;

[messaging-api](api-reference/messaging-api/ "mention") [token-bridge-api.md](api-reference/token-bridge-api.md "mention") [send.md](api-reference/send.md "mention")[query.md](api-reference/query.md "mention")[warp-api.md](api-reference/warp-api.md "mention")



```mermaid
flowchart LR
    
    subgraph oc[Origin Chain]
        sc(Sender Contract) 
        mb[\Mailbox/]
    end
    
    subgraph rc[Destination Chain]
        rec(Recipient Contract)
        mb2[/Mailbox\]
        ism(Interchain Security Module)
    end

    val{{"Validator(s)"}}
    aws[(Off-Chain<br>Highly-Available<br>Storage)]
    rel[/Relayer/]

    
    sc--"mailbox.dispatch()"-->mb
    mb--"latestCheckpoint()"-->val
    val--signed checkpoint-->aws
    mb-->rel
    aws-->rel
    rel--"mailbox.process()"-->mb2
    mb2--"recipient.handle()"-->rec
    mb2<--"ism.accept()"-->ism
    
    style val fill:#fcf,stroke:#929,stroke-width:3px
    style aws fill:#fc9,stroke:#f90,stroke-width:3px
    style rel fill:#e4f3ff,stroke:#025aa1,stroke-width:3px 
    style oc fill:#c8e6fe,stroke:#ddd,stroke-dasharray: 5 5,stroke-width:3px
    style rc fill:#c8e6fe,stroke:#ddd,stroke-dasharray: 5 5,stroke-width:3px
    style sc stroke-width:3px
    style rec stroke-width:3px
    style mb fill:#e4f3ff,stroke:#025aa1,stroke-width:3px
    style mb2 fill:#e4f3ff,stroke:#025aa1,stroke-width:3px
```



### Integrate Hyperlane into your app

Check out the [getting started guide](introduction/getting-started.md) for everything you need to start building with Hyperlane. If you run into an issues or have any questions, [join our discord](https://discord.gg/hyperlane) to get support from the community of Hyperlane builders!

### Learn more about Hyperlane Protocol

Take a look at the [protocol docs](protocol-reference/overview.md) to understand the Hyperlane protocol architecture and [security model](protocol-reference/sovereign-consensus.md).

### Learn more about Hyperlane use cases. Continue to the [next page](introduction/why-hyperlane/) to learn more&#x20;
