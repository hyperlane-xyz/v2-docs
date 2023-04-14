---
description: Check that everything works
---

# Send test messages

You can check everything is working correctly by sending a test message between each pair of chains.&#x20;

## Send messages

You can run `yarn ts-node scripts/test-messages.ts` to send test messages. You will need to provide the following arguments:

* `chains`: Test messages will be sent between each pair of these chains
* `key`: A hexadecimal private key for transaction signing

An example command that tests that messages can be sent between any pair of `anvil`, `goerli`, and `sepolia` is shown below:

```bash
yarn ts-node scripts/test-messages.ts \
  --chains anvil goerli sepolia \
  --key 0x6f0311f4a0722954c46050bb9f088c4890999e16b64ad02784d24b5fd6d09061
```

## Verify

If everything ran successfully, congrats! You should something similar to the following output:

```bash
$ yarn ts-node scripts/test-messages.ts --chains anvil goerli --key 0x6f0311f4a0722954c46050bb9f088c4890999e16b64ad02784d24b5fd6d09060
Sent message from anvil to 0xBC3cFeca7Df5A45d61BC60E7898E63670e1654aE on goerli with message ID 0x5ad21a8dcfe2cd91d3e59e26f2ef7f01f6ab1850ef5922233c7776eacff8d8b0
Sent message from goerli to 0xBC3cFeca7Df5A45d61BC60E7898E63670e1654aE on anvil with message ID 0x27f8fcf9151c7bcc50408b2ca1df027346740f0b40b8e516b04b4a09a6757f69
Message from anvil to goerli with ID 0x5ad21a8dcfe2cd91d3e59e26f2ef7f01f6ab1850ef5922233c7776eacff8d8b0 has not yet been delivered
Message from goerli to anvil with ID 0x27f8fcf9151c7bcc50408b2ca1df027346740f0b40b8e516b04b4a09a6757f69 has not yet been delivered
Message from anvil to goerli with ID 0x5ad21a8dcfe2cd91d3e59e26f2ef7f01f6ab1850ef5922233c7776eacff8d8b0 has not yet been delivered
Message from goerli to anvil with ID 0x27f8fcf9151c7bcc50408b2ca1df027346740f0b40b8e516b04b4a09a6757f69 was delivered
Message from anvil to goerli with ID 0x5ad21a8dcfe2cd91d3e59e26f2ef7f01f6ab1850ef5922233c7776eacff8d8b0 was delivered
Testing complete
```

If you've waited a while and messages still aren't being delivered, take a look at the origin chain relayer logs and reach out on [discord](https://discord.gg/hyperlane).
