# Warp Routes

Warp Routes are Hyperlane's take on token wrappers by making them permissionless. Conversely to virtually all existing token wrappers, there is no single blessed issue of wrapped tokens. With Hyperlane Warp Routes, anyone can deploy wrapped synthetics (which we call Warp Routes). Issuers of tokens no longer need to convince bridges to add their token and be at the mercy of bridges, instead of they can follow a very simple guide to create their own wrapped tokens that are available on any Hyperlane-supported chain and be sovereign about it.&#x20;

> With great power comes great responsibility - Uncle Ben

### How Token wrapping generally works

Token wrapping generally works by having two smart contracts: One that holds the collateral token on the collateral chain and one that mints and burns the synthetic wrapped version of the token on a remote chain. Let's say we have USDC on Ethereum (the collateral chain) and a hypothetical Hyperchain (the remote chain). There are two things you can do:

#### Send from the collateral chain to the remote chain

* On the collateral chain, native USDC tokens get locked in the token bridge contract and a message gets sent via the underlying messaging protocol
* On the remote chain, the message is received and the token bridge contract mints the recipient the equivalent amount of synthetic tokens

#### Send from the remote chain back to the collateral chain

* On the remote chain, the synthetic tokens get burned by the token bridge contracts and a message gets sent via the underlying message protocol
* On the collateral chain, the message is received and the equivalent amount of tokens get unlocked by the token bridge contract to the recipient

### What's the problem?

#### Single Shared Security Model

Every token in the token bridge contract uses the same canonical one-size-fits-all security model. That means that users have no way of opting into more (or less) security.

#### Lack of Sovereignty

Synthetic token contracts are generally owned by the token bridge contract (and more often than not thus by the core team) and thus custom contract functionality is not available.

### How Hyperlane Warp Routes work

Warp Routes improve upon the classic token wrapping by allowing anyone to create synthetic tokens and making them sovereign by customizing both the owner of the remote chain contracts as well as security model

#### Send from the collateral chain to the remote chain

* the native USDC tokens get locked on Ethereum (the collateral chain) in the `HypERC20Collateral` contract which sends a message to the remote chain via the local Mailbox.
* The HypERC20 contract on Hyperchain (the remote chain) receives the message (as checked by the configured ISM) and mints the recipient the equivalent amount of tokens

#### Send from the remote chain back to the collateral chain

* The `HypERC20` contract on Hyperchain (the remote chain) burns the passed tokens and sends a message via the local Mailbox.
* The `HypERC20Collateral` contract on Ethereum receives the message (as checked by the configured ISM) and unlocks the equivalent amount of token to the recipient.

#### Security Considerations

Because there is no canonical security model for Warp Routes, applications can not only specify very strict security, but also very loose security for the token wrapping. Just like any other defi application, users need to be extremely careful in which contract (`HypERC20Collateral`) they are sending their tokens to. All contracts should be treated as untrusted by default. Hosted UIs leveraging Warp Routes (like the reference UI) should only display vetted contracts.&#x20;

We expect that curation of `HypERC20Collateral` contracts will become an important. The reference UI supports a minor modification to the [TokenList](https://tokenlists.org/) standard so that curators can create lists of "safe" `HypERC20Collateral` contracts that users can easily import and use.
