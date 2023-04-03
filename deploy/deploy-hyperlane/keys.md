# Keys

In order to complete this guide, you will need to have the following:

* **A deployer key**: a 32 byte hexadecimal private key that is funded on the local and remote chains, used for deploying contracts
* **Validator addresses**: `n` local validator addresses and `m`, the number of validators needed to verify outbound messages from the local chain. Used for configuring [multisig-ism.md](../../protocol/sovereign-consensus/multisig-ism.md "mention")s
* **Relayer keys**: One for the local chain and each of the remote chains. Each must have a balance, and will be used by the relayer to deliver messages.

{% hint style="info" %}
For instructions on how to generate keys, see [agent-keys](../../operators/agent-keys/ "mention"). Your deployer key **must** be a hexadecimal key, while validator and relayer keys can be hexadecimal or AWS KMS.
{% endhint %}

{% content-ref url="../../operators/agent-keys/" %}
[agent-keys](../../operators/agent-keys/)
{% endcontent-ref %}

&#x20;
