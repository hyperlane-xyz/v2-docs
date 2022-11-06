---
description: >-
  All you need to know about why Hyperlane is the best choice for your
  interoperability needs
---

# Why Hyperlane?

If you want to learn about Hyperlane, you've come to the right place. This page is here to get you the information you need to understand when considering Hyperlane as the interoperability layer of choice for your app, or your blockchain. Let's get started.

### So what is Hyperlane?

Before you know why you should use it, you should know what it is! Hyperlane is the modular interoperability platform empowering developers to build applications that can easily and securely communicate between multiple blockchains. We call these interchain applications.\
\
You should also know what Hyperlane is not. It is not another token bridge, it is a network between blockchains. Developers can leverage this network to build applications that can easily and securely interact between the blockchains within it, allowing them to serve users on any of those chains.\
\
Modular? Yes Modular. Hyperlane was built as a modular interoperability layer, with an architecture uniquely suited to the world of many smart contract environments, whether they are rollups (either generalized or app specific), appchains, and heterogenous layer 1 blockchains whether they are intended to be monolithic or not. Hyperlane was purpose built with flexibility and future proofing in mind. We want developers who choose Hyperlane to feel assured that Hyperlane will evolve with their applications, and know that they won’t have to look for new options because they ‘outgrow’ the platform.

Note that Hyperlane can support any smart contract environment, and in the course of these docs the term blockchain or chain will be used where rollup or appchain are equally suitable.&#x20;

### What are the benefits of Hyperlane?

There are a number of benefits to using Hyperlane, several of which stem from the differentiating features discussed [below](why-hyperlane.md#what-sets-it-apart), but before we get to them let's touch on more basic benefits.

The first of these is the ability to connect your applications across many blockchains. This allows users to interact with your application from the chain they already are based from. Reducing the amount of hoops they have to jump through just to get to your app. Its about abstracting away the complexity of navigating between chains, and letting you and your users simply focus on your app.

Apps that have already become successful on one chain and want to expand to another, or better yet, have already deployed on another blockchain, take great benefit from Hyperlane. Until now, all new deployments were instanced and separate. You'd have a popular app on Ethereum, but outside of sharing your brand, how does a new deployment on Polygon benefit from the network effects you've amassed on Ethereum?&#x20;

Additionally, as an application, you could use Hyperlane as a smart router for execution, routing your messages to the most appropriate chain given the parameters you care about most. If you're optimizing for cost, you could route to the most cost effective chain at any point in time.&#x20;

But what about a blockchain? How can it benefit from Hyperlane? A Hyperlane deployment on a blockchain means every current and future application on that chain gets to accrue the aforementioned benefits. Additionally, chains can benefit from new traffic that would not have arrived if not for Hyperlane.&#x20;

What about rollups or appchains? As a rollup Hyperlane augments your native bridge to your L1, offering your developers a fast path option for asset transfers. More importantly, it offers them the ability to interoperate with other environments, including other rollups and other L1s outside of your existing ecosystem. Similarly all of these apply to an appchain.

### What sets it apart?

If you're considering an interoperability platform, you probably want to know what makes it unique, so let's get right into it and discuss what differentiates Hyperlane from existing offerings.&#x20;

#### Sovereign Consensus

Hyperlane introduces [Sovereign Consensus](../protocol/security/sovereign-consensus.md), an innovation in interchain security. The tl;dr on Sovereign Consensus is that it lets developers configure their own security model, utilizing what we call Interchain Security Modules (ISMs). ISMs can be thought of as a menu of security options that a developer choose can from, as well as mix and match between them. Initial ISMs will include economic security, optimistic security, and different proof-of-authority configurations. That said, new ISMs can be written and implemented by anyone meaning the potential exists to support any security model a developer would like. Before we go any further, its worth noting that Sovereign Consensus is an opt-in system, thus developers who are satisfied with the base layer of security offered by the validators are not required to use it.

Hyperlane's Sovereign Consensus brings a unique, one-of-one feature. With every interoperability platform a developer is essentially bought in to their security model, and it’s what they get at all times. Sovereign Consensus lets a developer configure security dynamically (if they so choose). You can set different security models for different types of user actions. When I transfer $10 I might just want the fastest path. But when I transfer $10m, I want the most secure. With Sovereign Consensus the $10 can go through economic security only, while the $10m can go through an optimistic model. Sovereign Consensus is the first modular security protocol introduced to the interoperability landscape. Not only does it let developers plug-and-play into their desired security model, it lets them do so dynamically within the same application.

Sovereign Consensus can ultimately incorporate any security model, giving developers on Hyperlane peace of mind knowing that they could always benefit from the latest and greatest innovations in security. When implemented, Sovereign Consensus simply means that Hyperlane contracts will seek additional logic before messages are processed by a recipient contract, and that can be logic provided via an ISM. When developers write new ISMs for their own benefit, they can be made available for others to leverage as well, creating a network effect in security to the benefit of all Hyperlane users. For instance, you can imagine the not so far future when ZK proofs are efficient enough such that light client verification of any blockchain is feasible, this mode of security can also be incorporated into Hyperlane within an ISM. With Sovereign Consensus no Hyperlane developer will be left behind as the industry moves forward.

#### Verifiable Fraud Proofs and Permissionless Slashing

Hyperlane’s architecture offers another unique feature in the interoperability landscape, Verifiable Fraud Proofs and Permissionless Slashing. What does this mean? First we need some context. In the case of Hyperlane, part of the security model, namely the economic security on outbound messages, comes from staking validators. Unlike other systems where the stake is concentrated on a single chain, Hyperlane has unique validator sets for each chain, and those validators keep their stakes on the chain they are validating. Thus in the event of malicious behavior by validators the malicious action is recorded on the chain they’ve staked on, such that anyone can observe it, and submit a fraud proof of that malicious action. Because the stake lives on the same chain, the validator can be permissionlessly slashed, and there is no need for an honest majority, or even honest minority assumption in the validator set. This is what it means for a system to have Verifiable Fraud Proofs and Permissionless Slashing. There is no way for validators to escape the economic costs of malicious behavior, meaning that the cost to commit fraud will always be known, and will always be borne by a malicious validator. Any system constructed like Hyperlane will have these properties.

However, imagine a system where validators keep their stake on a single chain. You detect fraud on a different chain, and submit a proof. The validator is to be slashed. How can that stake, which lives on a different chain than the one where the fraud occurred, can be slashed? The information has to be relayed over to that chain, meaning it has to go through the same validator set that includes a bad apple. But what if a majority of the set is colluding? How could they be slashed? The only option is to slash them manually, in a permissioned mode. Thus systems architected in such a way cannot have these properties that Hyperlane developers benefit from.

#### Permissionless Deployment

The real magic of crypto is enabled by its permissionless nature. Even outside of crypto, the permissive and expressive nature of software is a major reason for the tremendous innovation seen in software in the last few decades while many other areas have stagnated.&#x20;

Despite that, permissionless is sorely missing from the world of interoperability, and for good reason. The adversarial nature of blockchains makes the prospect of permissionless deployment for interoperability seem like a pipe dream, and it very well may be. Until Hyperlane.

Hyperlane's architecture was created with the prospect of permissionelss deployment in mind, with the ultimate goal of achieving this holy grail of interoperability.&#x20;

It is currently in development, and will be live before the end of 2023. Given its uniqueness, more details will only be shared about the implementation of this feature as it nears release.

In the meantime, you can request Hyperlane deployments using this [form](https://1nd5rxtdcl2.typeform.com/to/WJSVc3wR).

#### Developer Focus

Hyperlane is the developer’s developer. Relentlessly focused on the developer’s experience in using the platform, and making it easier for developers to delight their own users. Features like Interchain Accounts, accessed via the [Accounts API](../developers/send/) allow developers to execute function calls, and control addresses on other chains without having to deploy a contract on those chains. While Interchain Queries, accessed via the [Queries API](../developers/query/) allow developers to access information on another chain and verify it, enabling them to conduct future actions on the basis of that information. These and other features like allow developers to easily and simply do what otherwise would have been complex.

Most importantly, Hyperlane is focused on shifting the burden of interoperability from end users to applications. Unlike token bridges, which let users move assets to reach their application of choice on a different blockchain, Hyperlane enables developers to build applications that can be accessed by users wherever they are, resulting in a superior experience for both user and developer.&#x20;

#### &#x20; 
