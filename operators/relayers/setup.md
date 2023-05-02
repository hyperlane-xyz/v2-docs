---
description: Required setup instructions
---

# Setup

The relayer is responsible for delivering messages to their destination chains. This involves being able to submit transactions to many destination chains, and therefore requires access to a key for signing transactions. There are two supported key types: hexadecimal private keys (for in-memory signing), and AWS KMS based keys (best practice for production environments).

## Hexadecimal keys

A hexadecimal private key used for in-memory signing can be used by your relayer to sign transactions. This is the recommended setup for testing or development purposes.

{% content-ref url="../agent-keys/hexadecimal-key-setup.md" %}
[hexadecimal-key-setup.md](../agent-keys/hexadecimal-key-setup.md)
{% endcontent-ref %}

## AWS KMS keys

An AWS KMS key can be used by your relayer to sign transactions. This is the recommended setup for production relayers.

{% content-ref url="../agent-keys/aws-setup.md" %}
[aws-setup.md](../agent-keys/aws-setup.md)
{% endcontent-ref %}

## Next

After you've configured your relayer keys, continue to the [environment-variables](environment-variables/ "mention") section.
