# Keys

In order to complete this guide, you will need to have the following:

* **A deployer key**: a 32 byte hexadecimal private key that is funded on all the chains on which we need to deploy contracts.
* **Validator addresses**: a list of validator addresses for your local chain are needed to configure the [multisig-ism.md](../../protocol/sovereign-consensus/multisig-ism.md "mention")s. The configuration is a list of  `n` local validator addresses and the threshold `m`, the minimum number of validators needed to verify outbound messages from the local chain.
* **Relayer keys**: You'll be running one relayer for the local chain and each of the remote chains. Each relayer instance must be configured with a key that has a balance on all the other chains. Use the chains' faucet to get tokens if they are testnets, for the core chains, you can find a list of faucets under [token-sources-and-faucets.md](../../resources/token-sources-and-faucets.md "mention")

{% hint style="info" %}
For instructions on how to generate keys, see [agent-keys](../../operators/agent-keys/ "mention"). Your deployer key **must** be a hexadecimal key, while validator and relayer keys can be hexadecimal or AWS KMS.
{% endhint %}

&#x20;
