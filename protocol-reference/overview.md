---
description: A secure interchain messaging protocol
---

# Overview

Hyperlane is a generalized interchain messaging protocol that empowers developers to send messages from one blockchain to another. Messages can contain any arbitrary bytes, and are not limited to text. They can be used to transfer any information between blockchains. They can allow you to move around value, execute function calls, and many other things that allow for the creation of interchain applications, apps that can be accessed by users on any blockchain.

Users interface with the Hyperlane protocol via Mailbox smart contracts, which provide an on-chain [API](messaging.md) to send and receive interchain messages.

Hyperlane is secured by [sovereign consensus](sovereign-consensus.md), which allows applications to configure and choose from a selection of **interchain security modules** (ISMs). Applications may specify an ISM to customize the security model that secures their integration with the Hyperlane messaging API.

The default ISM is secured by Hyperlane validators. Validators can be slashed for attempting to censor or falsify messages via a delegated proof-of-stake protocol.&#x20;

```mermaid
flowchart LR
  subgraph oc[Origin chain]
    direction LR
    usero("User (sender)") 
    subgraph hypo[Hyperlane contracts]
        direction LR
        mbo(Mailbox)
        stko(Staking) 
    end
  end
  usero--"mailbox.dispatch()"-->mbo
  stko-."mailbox.latestCheckpoint()".->mbo


  subgraph offc[Off chain]
    direction TB
    subgraph validator[Validator]
        direction TB
        val["Validator(s)"]
        aws[(Validator signatures)]
    end
    subgraph relayer[Relayer]
        direction BT
        rel["Relayer(s)"]
    end
    subgraph watchtower[Watchtower]
        direction BT
        wt["Watchtower(s)"]
    end 
  end
  val-."mailbox.latestCheckpoint()".->mbo
  val-->aws
  val--"staking.stake()"-->stko
  rel-.->mbo
  rel-.->aws
  rel--"mailbox.process()"-->mbd
  wt-.->aws
  wt-.->mbo
  wt--"staking.slash()"-->stko


  subgraph dc[Destination chain]
    direction LR
    ismd(ISM)
    userd("User (recipient)")
    subgraph hypd[Hyperlane contracts]
        direction LR
        mbd(Mailbox)
    end
  end
  mbd--"ism.accept()"-->ismd
  mbd-."recipient.interchainSecurityModule()".->userd
  mbd--"recipient.handle()"-->userd


  subgraph leg[Legend]
    direction TB
    contract(Smart contract)
    agent[Agent]
    a(a)
    b(b)
    c(a)
    d(b)
  end
  a--a writes to b-->b
  c-.a reads from b.->d


  style val fill:#fcf,stroke:#929,stroke-width:3px
  style aws fill:#fc9,stroke:#f90,stroke-width:3px
  style rel fill:#e4f3ff,stroke:#025aa1,stroke-width:3px 
  style oc fill:#c8e6fe,stroke:#ddd,stroke-dasharray: 5 5,stroke-width:3px
  style dc fill:#c8e6fe,stroke:#ddd,stroke-dasharray: 5 5,stroke-width:3px
  style usero stroke-width:3px
  style userd stroke-width:3px
  style mbo fill:#e4f3ff,stroke:#025aa1,stroke-width:3px
  style mbd fill:#e4f3ff,stroke:#025aa1,stroke-width:3px

```
