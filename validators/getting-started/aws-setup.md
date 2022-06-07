---
description: Configure your signing key and S3 bucket
---

# AWS setup

### Create an IAM user

This IAM user will be given permission to sign with the KMS key that you will later configure. Your Abacus validator will use this identity when signing.

1. Go to AWS's Identity and Access Management (IAM) in the [AWS console](https://us-east-1.console.aws.amazon.com/iamv2/home).
2. On the left, under "Access management", click "Users".
3. Click the blue button "Add user".
4. Pick a friendly and informative username, like `abacus-validator`. This username will be referenced in future steps, so if you choose a different username be sure to use your correct username in the future.
5. Select "Access key - Programmatic access" as the access type.
6. Keep clicking the next buttons, the default permissions and tags are sufficient for now.
7. Once reviewed, click "Create user".
8. Copy the "Access key ID" and "Secret access key" to a safe place. These will be passed to your Abacus validator as environment variables.

### Create a KMS key

1. Go to AWS's Key Management Service (KMS) in the AWS console.
2. Ensure you are in the region you want to create the key in. This can be confirmed by viewing the region at the top right of the console, or by finding the name in the URL's subdomain (e.g. `us-west-2.console.aws.amazon.com` means you're operating in the region `us-west-2`).
3. On the left, click "Customer managed keys".
4. Click "Create key".
5. Select the "Asymmetric" key type.
6. Select the "Sign and verify" key usage.
7. Select the `ECC_SECG_P256K1` key spec.
8. Click "Next".
9. Set the Alias to something friendly and informative, like `abacus-validator-signer-${chain_name}`.
10. While not necessary, feel free to write a description and add any tags that you think will be useful.
11. Click "Next".
12. A key administrator is not required, but if you want, you can select one.
13. Click "Next".
14. Select the user `abacus-validator` (or the username of the user you had previously created).
15. Click "Next".
16. In the Review page, scroll to the "Key policy". The generated key policy is acceptable, but you can make the access even less permissive if you wish by:
17. Removing the `kms:DescribeKey` and `kms:Verify` actions from the statement whose "Sid" is "Allow use of the key"
18. Removing the entire statement whose "Sid" is "Allow attachment of persistent resources".
19. Click "Finish"

### Create an S3 bucket

Instructions coming soon...

### Test Access

See [https://github.com/tkporter/get-aws-kms-address](https://github.com/tkporter/get-aws-kms-address)
