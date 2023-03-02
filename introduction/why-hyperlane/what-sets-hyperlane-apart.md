---
description: What are the platform's differentiating features?
---

# What sets Hyperlane apart?

If you're considering an interoperability platform, you probably want to know what makes it unique, so let's get right into it and discuss what differentiates Hyperlane from existing offerings.&#x20;

#### [Permissionless Interoperability](../../deploy/permissionless-interoperability.md)

The real magic of crypto is enabled by its permissionless nature. Even outside of crypto, the permissive and expressive nature of software is a major reason for the tremendous innovation seen in software in the last few decades while many other areas have stagnated.&#x20;

Despite that, permissionless is sorely missing from the world of interoperability, and for good reason. The adversarial nature of blockchains makes the prospect of permissionless deployment for interoperability seem like a pipe dream, until now.

Hyperlane's architecture was purpose built to be the first ever [Permissionless Interoperability](../../deploy/permissionless-interoperability.md) layer, an attempt to achieve the holy grail of blockchain connectivity.

The MVP of Permissionless Interoperability is now live, and accessible [here](../../deploy/deploy-hyperlane/). Try it out and give us your feedback!

#### [Sovereign Consensus](../../protocol/sovereign-consensus/)

Hyperlane introduces [Sovereign Consensus](../../protocol/sovereign-consensus/), an innovation in interchain security. The tl;dr on Sovereign Consensus is that it lets developers configure their own security model, utilizing what we call **Interchain Security Modules** (ISMs). ISMs are a menu of security options that a developer choose can from, as well as mix and match between them. Initial ISMs will include economic security, optimistic security, and different proof-of-authority configurations. That said, new ISMs can be written and implemented by anyone meaning the potential exists to support any security model a developer would like.&#x20;

Hyperlane's Sovereign Consensus brings a unique, one-of-one feature to the interoperability landscape. With every interoperability platform an application is locked in to their security model at all times. Sovereign Consensus lets developers configure security dynamically. You can set different security models for different types of user actions. When I transfer $10 I want the fastest path. But when I transfer $10m, I want the most secure. With Sovereign Consensus the $10 transaction can be passed through economic security alone, while the $10m can go through an optimistic model with a prolonged challenge period. Sovereign Consensus is the first modular security protocol introduced to the interoperability landscape. Not only does it let developers plug-and-play into their desired security model, it lets them do so dynamically within the same application.

Sovereign Consensus can ultimately incorporate any security model, giving developers on Hyperlane peace of mind knowing they will benefit from the state of the art in security. It may sound too good to be true or very complex, but it is quite simple. Implementing Sovereign Consensus means that Hyperlane contracts will seek additional logic before messages are processed by a recipient contract, and that can be logic provided via an ISM.&#x20;

When developers write new ISMs for their own benefit, they can be made available for others to leverage as well, creating a network effect in security to the benefit of all Hyperlane users. For instance, you can imagine the not so far future when ZK proofs are efficient enough such that light client verification of any blockchain is feasible, this mode of security can be incorporated into Hyperlane as an ISM. With Sovereign Consensus no Hyperlane developer will be left behind as the industry moves forward.

#### [Verifiable Fraud Proofs and Permissionless Slashing](../../protocol/proof-of-stake.md#verifiable-fraud-proofs)

Hyperlane’s architecture offers another unique feature in the interoperability landscape, Verifiable Fraud Proofs and Permissionless Slashing. What does this mean? First we need some context. In the case of Hyperlane, part of the security model, namely the economic security on outbound messages, comes from staking validators. Unlike other systems where the stake is concentrated on a single chain, Hyperlane has unique validator sets for each chain, and those validators keep their stakes on the chain they are validating. Thus in the event of malicious behavior by validators the malicious action is recorded on the chain they’ve staked on, allowing anyone to observe it and submit a fraud proof of it. Because the stake lives on the same chain, the validator can be permissionlessly slashed, and there is no need for an honest majority, or even honest minority assumption in the validator set. This is what it means for a system to have Verifiable Fraud Proofs and Permissionless Slashing. There is no way for validators to escape the economic costs of malicious behavior, meaning that the cost to commit fraud will always be known, and will always be borne by a malicious validator. Any system constructed like Hyperlane will have these properties.

However, imagine a system where validators keep their stake on a single chain. You detect fraud on a different chain, and submit a proof. The validator is to be slashed. How can that stake, which lives on a different chain than the one where the fraud occurred, be slashed? The information has to be relayed over to that chain, meaning it has to go through the same validator set that includes a bad apple. But what if a majority of the set is colluding? How could they be slashed? The only option is to slash them manually, in a permissioned mode. Thus systems architected in such a way lack the properties that Hyperlane developers benefit from.



#### Developer Focus

Hyperlane is the developer’s developer. Relentlessly focused on the developer’s experience in using the platform, and making it easier for developers to delight their users. Features like Interchain Accounts, accessed via the [Accounts API](../../apis/accounts.md) allow developers to execute function calls on other chains without having to deploy a contract on those chains. While Interchain Queries, accessed via the [Queries API](../../apis/query.md) allow developers to access information on another chain and verify it, enabling them to initiate actions leveraging that information. These and other features like allow developers to easily and simply do what otherwise would have been complex.

Most importantly, Hyperlane is focused on shifting the burden of interoperability from end users to applications. Unlike token bridges, which let users move assets to reach their application of choice on a different blockchain, Hyperlane enables developers to build applications that can be accessed by users wherever they are, resulting in a superior experience for both user and developer.&#x20;

####
