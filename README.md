---
description: Seamless and secure communication between blockchains
---

# Intro to Hyperlane

Hyperlane is the modular interoperability platform. Hyperlane empowers developers to build interchain applications, apps that can communicate between many blockchain environments and offer users a unified experience.&#x20;

Hyperlane's API's offer developers secure and simple ways to communicate between blockchains, and the Hyperlane SDK can makes building interchain applications quick and easy. &#x20;



```mermaid
flowchart LR
    
    subgraph oc[Origin Chain]
        sc(Sender Contract) 
        mb[\Mailbox/]
    end
    
    subgraph rc[Recipient Chain]
        rec(Recipient Contract)
        mb2[/Mailbox\]
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



### Looking to integrate Hyperlane?

Check out the [getting started guide](developers/getting-started.md) for ABIs, code examples, contract addresses, and more.

### Want to learn more about the protocol?

Take a look at the [protocol docs](protocol/overview.md) to understand the Hyperlane protocol architecture and [security model](protocol/security/).

### Why should you use Hyperlane? Continue to the [next page](introduction/why-hyperlane/) to learn more

### &#x20;

{% hint style="warning" %}
Hyperlane was originally named Abacus. For the time being you may encounter the name Abacus still referenced throughout the docs, github repos, and smart contracts.&#x20;
{% endhint %}
