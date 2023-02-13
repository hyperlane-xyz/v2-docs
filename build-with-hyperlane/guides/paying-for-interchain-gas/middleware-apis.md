# Middleware APIs

APIs like the [Liquidity Layer API](../../../../apis/token-bridge-api.md), the [Accounts API](../../../../apis/send.md), and the [Queries API](../../../../apis/query.md) are sometimes called "middlewares." Just like all Hyperlane messages that wish to be delivered by a relayer, messages sent via these middlewares must have interchain gas paid for.

Middleware APIs don't pay for interchain gas themselves, and instead leave this up to the caller. Each of these APIs have functions that return the `bytes32 messageId` that is expected to be used by the caller to pay for interchain gas. The gas amount, regardless of which IGP is being used, must consider the overhead gas costs that the middleware API contracts use on the destination chain.

### Accounts API

[Read here](../../../../apis/send.md#paying-for-interchain-gas) about how to correctly pay for gas for messages sent via the Accounts API.

### Queries API

[Read here](../../../../apis/query.md#paying-for-interchain-gas) about how to correctly pay for gas for messages sent via the Queries API.

### Liquidity Layer API

[Read here](../../../../apis/token-bridge-api.md#paying-for-interchain-gas) about how to correctly pay for gas for messages sent via the Liquidity Layer API.
