---
description: >-
  A high level description of interchain applications and the eras of
  interoperability
---

# Interchain apps

As stated prior the key question Abacus set out to answer is "Which chain should I deploy on?" and the logical follow up question "how can my app go across blockchains?". Before expanding on Abacus’ answer, and the Abacus vision for interchain applications it’s worth taking a moment to take stock of how we got here. At Abacus we like talking about the different eras of blockchain interoperability.&#x20;

### Eras of Interoperability

#### _2016-2019: Intra-ecosystem_

This first era of interoperability was one where smart contract platforms were still nascent. Ethereum had launched the year before and the notion that there would be a single smart contract platform that dominates them all was common. Given that context it's easy to see why interoperability designs of the time such as Polkadot and its Parachains, or Cosmos, IBC and app-chains were made that way. These designs offered native interoperability within a defined set of rules as interoperability was woven into consensus. For Abacus, IBC is viewed as the intellectual wellspring that informs  thinking and design philosophy. IBC may be the most secure and effective way to achieve a interoperability within a well-defined system, however, in the many-chain world we live in today Abacus believes it is insufficient to satisfy the needs of both users and developers. \
\
The emergence of this many chain world is what gave way to the second era, bringing about asset bridging.

#### _2020-2022: The Bridges Are Coming!_

The second era of interoperability centered around transfer of assets between chains. At Abacus we like to call this interoperability at the edge, or user-centric interoperability. The nomenclature of 'bridging' has become dominant as these protocols enable some measure of interoperability between disparate blockchains, they are in a way bridges between these 'islands-of-state'. Many bridging protocols are built on top of some form of generalized message passing protocol. Messages are passed between chains by leveraging an off-chain oracle mechanism that observes the chains and submits a form of evidence on-chain as to the validity of the messages. This mechanism can be a decentralized set of validators, a permission set, a multisig, or worst-of-all, a single centralized point of failure. While there is more than one approach to bridging, the general concept for bridge protocols remains the same; assets are identified and isolated on one chain, the origin chain, most often deposited into a smart contract. The protocol then notifies another smart contract on the destination chain, which will mint the asset on that chain. However in almost every case the minted token on the destination chain is not perfectly fungible with the origin token, resulting in a process that is not dissimilar from wrapping tokens. Thus at the destination of a bridging protocol exists a representation of the token the user intended to bridge. Two bridging protocols bridging to the same destination will emit two distinct token representations, unless they work in concert and align on a unified representation.&#x20;

![More Bridges More Problems?](../.gitbook/assets/image.png)

Increasing competition in the bridging category has led to an increasing amount of token representations as each bridge creates unique token representations on each destination chain which in turn creates an increasingly unpleasant experience as fragmentation grows. Amongst the best bridging era protocols you'll find Wormhole, Axelar, and Synapse. All of which represent stunning achievement and material advancement over what existed before them.

While the bridging era protocols often are built on some message passing protocol, narrow or generalized, we find the focus on interoperability of assets unappealing. It is our many interactions with this variant of interoperability that led us to build Abacus and herald the era of interchain applications!

#### _2022 and beyond: Interchain Applications_

We're hesitant to really call this an era as it has not yet begun, but we believe that Abacus and others will bring about this era. The most consequential difference between this era and the previous ones is that the focus is not on interoperability managed at the edge, but interoperability managed by the app. It's about enabling developers to build by-default cross chain applications. While it is true that the generalized message passing protocols that enable some bridges could potentially be leveraged for this goal, it is the software package on top of the protocol that will enable the proliferation of interchain applications. In addition to Abacus, Layer Zero appears to be the most notable protocol working towards an interchain application platform. At the current state it appears that any interchain application platform will need to rely on an off-chain oracle mechanism to enable the interchain function calls required by such applications.&#x20;

#### Taking Stock

With the eras of interoperability plotted, let us take stock of the benefits and drawbacks of the different approaches.&#x20;

_Intra-ecosystem_

Benefits:&#x20;

* Interoperability protocol is often woven into consensus, and as such there is native support for any application built within the confines of the ecosystem.
* Improved security guarantees. With interoperability as part of consensus its possible to have shared security across the protocols many sub-networks. Additionally, there is no need to rely on an external oracle service as part of message passing and verification.

Drawbacks:&#x20;

* Not backwards compatible, to gain the benefit of interoperability you must build within the network.

_Asset Bridging_

Benefits:&#x20;

* Backwards compatibility. Theoretically any blockchain network should be compatible with a generalized bridge.
* Users enjoy mobility of their assets, allowing them to take assets anywhere they please.

Drawbacks:

* Only as secure as the weakest security chain that is bridged.
* Leads to fragmentation due to multiple asset representations.

_Interchain Applications_

Benefits:&#x20;

* Backwards compatibility. Theoretically any blockchain network should be compatible with a generalized message passing protocol.
* Developers can unify their apps across multiple chains, such that they share state, offering improved composability and user experience.

Drawbacks:

* Only as secure as the weakest security chain is supported.&#x20;

### Our Vision

We envision a future state of the world where all apps are interchain apps. Where developers think more about the application they're building than the substrate they're building it on. Where composability does not end with a single blockchain, and where users aren't limited by their choice of chain. \
\
To that end, the long term vision is for Abacus to become a one-stop deployment platform, where a developer only needs to write their app as an Abacus app, and Abacus will deploy it on any supported chain they desire. We know that we will get there eventually, but that will require a massive investment of effort, time andd resources. As we work towards that vision, we will be releasing versions of Abacus that allow any developer to deploy an Abacus app that acts as the connective tissue between all of their existing deployments on supported chains.\
\
In the current state cross-chain applications don't actually exist. App developers may deploy a version of their app on another chain, but for all intents and purposes that deployment is a separate app that happens to have the same brand and interface, but for a user they are separate apps completely. Since each app lives on the 'island-of-state' that is its native blockchain, the app is cross-chain in name only. With the initial version of Abacus an application like Aave or Uniswap no longer has to settle for the dismal and disjointed experience offered by having disparate instances of their app on different chains. Rather, they could offer a unified experience, shared state across all deployments, allowing their users to only interface with their app without concern for the chains it is deployed to.
