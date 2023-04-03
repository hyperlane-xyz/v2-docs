---
description: Delivering interchain messages
---

# Run relayers

Follow the [relayers](../../operators/relayers/ "mention") guide to run a relayer for the local chain, and each of the remote chains. These relayers will deliver interchain messages sent between the local and remote chains.

Remember to set the `HYP_RELAYER_DESTINATIONCHAINNAMES` appropriately.

Include the agent config from the [deploy-contracts.md](deploy-contracts.md "mention") step in `CONFIG_FILES`. If you're using Docker, you will need to mount the file into the container.

You should have already set up your [keys.md](keys.md "mention"), so you can skip that part of the guide.

{% content-ref url="../../operators/relayers/" %}
[relayers](../../operators/relayers/)
{% endcontent-ref %}
