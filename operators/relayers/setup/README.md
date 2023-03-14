---
description: Required setup instructions
---

# Setup

The relayer is responsible for delivering messages to their destination chains. This involves being able to submit transactions to many destination chains, and therefore requires access to a key for signing transaction. There are two supported key types: hexadecimal private keys (for in-memory signing), and AWS KMS based keys (best practice for production environments).

## Hexadecimal keys

A hexadecimal private key used for in-memory signing can be used by your relayer to sign transactions. This is the recommended setup for testing or development purposes.

{% content-ref url="hexadecimal-key-setup.md" %}
[hexadecimal-key-setup.md](hexadecimal-key-setup.md)
{% endcontent-ref %}

## AWS KMS Setup

An AWS KMS key can be used by your relayer to sign transactions. This is the recommended setup for production relayers.

{% content-ref url="aws-setup.md" %}
[aws-setup.md](aws-setup.md)
{% endcontent-ref %}
