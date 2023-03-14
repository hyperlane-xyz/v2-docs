---
description: Generate your relayer's key
---

# AWS KMS key setup

Using AWS KMS keys in your relayer is a best practice for production environments.

You're also welcome to use [Hexadecimal keys](hexadecimal-key-setup.md) instead.

### Create an IAM user

This IAM user will be given permission to sign with the KMS key that you will later configure. Your Hyperlane relayer will use this identity when signing transactions.

1. Go to AWS's Identity and Access Management (IAM) in the [AWS console](https://us-east-1.console.aws.amazon.com/iamv2/home).
2. On the left, under "Access management", click "Users".
3. Click the blue button "Add users".
4. Pick a friendly and informative username, like `hyperlane-relayer-${chain_name}`. This username will be referenced in future steps, so if you choose a different username be sure to use your correct username in the future.
5. Click "Next", you do not need to assign the user any permissions.
6. Click "Create user".
7. Click into the user that you just created
8. Click the "Security Credentials" tab
9. Scroll down to "Access Keys" and click "Create Access Key"
10. Select "Application running outside AWS" and click "Next"
11. Click "Next", no need to add a description tag&#x20;
12. Click "Create access key"
13. Copy the "Access key ID" and "Secret access key" to a safe place. These will be passed to your Hyperlane relayer as environment variables.

### Create a KMS key

This key will be used by your relayer to sign transactions.

1. Go to AWS's Key Management Service (KMS) in the AWS console.
2. Ensure you are in the region you want to create the key in. This can be confirmed by viewing the region at the top right of the console, or by finding the name in the URL's subdomain (e.g. `us-west-2.console.aws.amazon.com` means you're operating in the region `us-west-2`).
3. On the left, click "Customer managed keys".
4. Click "Create key".
5. Select the "Asymmetric" key type.
6. Select the "Sign and verify" key usage.
7. Select the `ECC_SECG_P256K1` key spec.
8. Click "Next".
9. Set the Alias to something friendly and informative, like `hyperlane-relayer-signer-${chain_name}`.
10. While not necessary, feel free to write a description and add any tags that you think will be useful.
11. Click "Next".
12. A key administrator is not required, but if you want, you can select one.
13. Click "Next".
14. Give usage permissions to the IAM user you created in the previous section (e.g. `hyperlane-relayer-{chain_name}`).
15. Click "Next".
16. In the Review page, scroll to the "Key policy". The generated key policy is acceptable, but you can make the access even less permissive if you wish by:
    1. Removing the `kms:DescribeKey` and `kms:Verify` actions from the statement whose "Sid" is "Allow use of the key"
    2. Removing the entire statement whose "Sid" is "Allow attachment of persistent resources".
17. Click "Finish"

### Next

Continue to the [Environment variables](../environment-variables.md) section.

{% content-ref url="../environment-variables.md" %}
[environment-variables.md](../environment-variables.md)
{% endcontent-ref %}
