---
description: Announcing information about your validator
---

# Announcing your validator

[Relayers](../../protocol/agents/relayer.md) need to know where to find your validator's signatures. You can make relayers aware of your validator by writing to the `ValidatorAnnounce` contract on the chain that you're validating.

### Getting your validator's signed announcement

First, find the signed announcement JSON object automatically created by your validator. This is an attestation made by your validator indicating where its signatures can be found.

{% tabs %}
{% tab title="AWS S3 validators" %}
If you followed the [AWS setup](setup/aws-setup.md) instructions, to find your signed announcement:

1. Navigate to your S3 bucket in the AWS console.
2. Select the `announcement.json` object.
3. Click on "Object URL"
{% endtab %}

{% tab title="Local validators" %}
If you followed the [Local setup](setup/local-setup.md) instructions, you can find your signed announcement by running:

{% code overflow="wrap" %}
```sh
cat $MY_VALIDATOR_SIGNATURES_DIRECTORY/announcement.json
```
{% endcode %}
{% endtab %}
{% endtabs %}

Your signed `announcement.json` should look something like this. Local validators will have a `storage_location` prefixed with `file://`.

```json
{
  "value": {
    "validator": "0xe6072396568e73ce6803b12b7e04164e839f1e54",
    "mailbox_address": "0x000000000000000000000000cc737a94fecaec165abcf12ded095bb13f037685",
    "mailbox_domain": 44787,
    "storage_location": "s3://hyperlane-testnet3-alfajores-validator-0/us-east-1"
  },
  "signature": {
    "r": "0xe8bdb71521ca4737a30eb4f8c12094768b1c0cc5f9405e879d91066bff5cf02c",
    "s": "0x1f41b8b6edfc7a1c5ffd0d3a216b2b56c5796b5a00cb686f896dac325d8cfa61",
    "v": 28
  }
}
```

### Submitting your validator's announcement

Now you can submit your signed announcement to the `ValidatorAnnounce` smart contract. Instructions for doing this either with Etherscan or Cast are provided.

{% tabs %}
{% tab title="Etherscan" %}
1. Navigate to the `ValidatorAnnounce` page on etherscan for the chain you're validating. You can find a link in [addresses.md](../../resources/addresses.md "mention").
2. Click on the "Contract" tab, and the "Write Contract" button, and click the dropdown on "announce".
3. Fill in the `_validator`, `_storageLocation`, and `_signature` arguments.
   1. Set `_validator` to `value.validator` from your JSON announcement
   2. Set `_storageLocation` to `value.storage_location` from your JSON announcement
   3. Set `_signature` to the concatenation of `signature.r`, `signature.s`, and the hexidecimal representation of `signature.v` (`0x1C` for 28 and `0x1B` for 27). Make sure that you remove the `0x` prefixes.

<figure><img src="../../.gitbook/assets/Screen Shot 2023-01-30 at 4.30.00 PM.png" alt=""><figcaption><p>Example input</p></figcaption></figure>

4. Click "Write" and submit the transaction.
{% endtab %}

{% tab title="Cast" %}
1. Announce your validator by running the following command, filling in the following variables:
   1. Set `$VALIDATOR_ANNOUNCE_ADDRESS` to the address of the `ValidatorAnnounce` contract: [addresses.md](../../resources/addresses.md "mention")
   2. Set `$VALIDATOR` to `value.validator` from your JSON announcement
   3. Set `$STORAGE_LOCATION` to `value.storage_location` from your JSON announcement
   4. Set `$SIGNATURE` to the concatenation of `signature.r`, `signature.s`, and the hexidecimal representation of `signature.v` (`0x1C` for 28 and `0x1B` for 27). Make sure that you remove the `0x` prefixes.
   5. Set `$RPC_URL` to an RPC URL that can be used to submit transactions
   6. Set `$PRIVATE_KEY` to a hexadecimal private key that can be used to submit transactions

<pre class="language-bash"><code class="lang-bash"><strong>cast send $VALIDATOR_ANNOUNCE_ADDRESS \
</strong>  "announce(address, string calldata, bytes calldata)(bool)" \
  $VALIDATOR $STORAGE_LOCATION $SIGNATURE \
  --rpc-url $RPC_URL --private-key $PRIVATE_KEY
</code></pre>

{% hint style="info" %}
Some chains don't support EIP-1559, which is the default transaction mode used by cast. If `cast` gives an error along the lines of `custom error: EIP-1559 not activated`, try running the command again with the `--legacy` flag.
{% endhint %}
{% endtab %}
{% endtabs %}

Once you see that your transaction has succeeded, relayers will automatically be made aware of your validator! Your validator is now completely set up.
