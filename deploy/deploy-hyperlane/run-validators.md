---
description: Securing outbound messages from your chain
---

# Run validators

Follow the [validators](../../operators/validators/ "mention") guide to run validators for the [messaging.md](../../protocol/messaging.md "mention")on your local chain. These validators will provide the security for messages sent **from** your chain **to** remote chains.&#x20;

Include the agent config from the [deploy-contracts.md](deploy-contracts.md "mention") step in `CONFIG_FILES`. If you're using Docker, you will need to mount the file into the container.

You should have already set up your [keys.md](keys.md "mention"), so you can skip that part of the guide.

{% hint style="warning" %}
Make sure these validators match the addresses you provided when you[#setup](deploy-contracts.md#setup "mention") your `MultisigIsmConfig`.  Otherwise, the [multisig-ism.md](../../protocol/sovereign-consensus/multisig-ism.md "mention")s you deployed in the previous step will not be able to verify messages sent from your chain.
{% endhint %}

{% content-ref url="../../operators/validators/" %}
[validators](../../operators/validators/)
{% endcontent-ref %}
