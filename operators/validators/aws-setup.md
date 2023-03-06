---
description: Configure your signing key and S3 bucket
---

# AWS setup

### Create an IAM user

This IAM user will be given permission to sign with the KMS key that you will later configure. Your Hyperlane validator will use this identity when signing.

1. Go to AWS's Identity and Access Management (IAM) in the [AWS console](https://us-east-1.console.aws.amazon.com/iamv2/home).
2. On the left, under "Access management", click "Users".
3. Click the blue button "Add users".
4. Pick a friendly and informative username, like `hyperlane-validator-${chain_name}`. This username will be referenced in future steps, so if you choose a different username be sure to use your correct username in the future.
5. Click "Next", you do not need to assign the user any permissions.
6. Click "Create user".
7. Click into the user that you just created
8. Click the "Security Credentials" tab
9. Scroll down to "Access Keys" and click "Create Access Key"
10. Select "Application running outside AWS" and click "Next"
11. Click "Next", no need to add a description tag&#x20;
12. Click "Create access key"
13. Copy the "Access key ID" and "Secret access key" to a safe place. These will be passed to your Hyperlane validator as environment variables.

### Create a KMS key

This key will be used by your validator to sign `Mailbox` merkle roots.

1. Go to AWS's Key Management Service (KMS) in the AWS console.
2. Ensure you are in the region you want to create the key in. This can be confirmed by viewing the region at the top right of the console, or by finding the name in the URL's subdomain (e.g. `us-west-2.console.aws.amazon.com` means you're operating in the region `us-west-2`).
3. On the left, click "Customer managed keys".
4. Click "Create key".
5. Select the "Asymmetric" key type.
6. Select the "Sign and verify" key usage.
7. Select the `ECC_SECG_P256K1` key spec.
8. Click "Next".
9. Set the Alias to something friendly and informative, like `hyperlane-validator-signer-${chain_name}`.
10. While not necessary, feel free to write a description and add any tags that you think will be useful.
11. Click "Next".
12. A key administrator is not required, but if you want, you can select one.
13. Click "Next".
14. Give usage permissions to the IAM user you created in the previous section (e.g. `hyperlane-validator-{chain_name}`).
15. Click "Next".
16. In the Review page, scroll to the "Key policy". The generated key policy is acceptable, but you can make the access even less permissive if you wish by:
    1. Removing the `kms:DescribeKey` and `kms:Verify` actions from the statement whose "Sid" is "Allow use of the key"
    2. Removing the entire statement whose "Sid" is "Allow attachment of persistent resources".
17. Click "Finish"

### Create an S3 bucket

Your validator will post their signatures to this bucket.

1. Go to AWS's S3 in the AWS console.
2. On the right, click the orange "Create Bucket" button
3. Pick an informative bucket name, such as `hyperlane-validator-signatures-${validator_name}-${chain_name}`
4. Consider choosing the same region as the KMS key you created in the previous step.&#x20;
5. Keep the recommended "ACLs disabled" setting for object ownership.
6. Configure public access settings so that relayers can read your signatures
   1. Uncheck "Block all public access"
   2. Check the first two options that block access via access control lists
   3. Leave the last two options unchecked, we will be granting public read access via a bucket policy
   4. Acknowledge that these settings may result in public access to your bucket
7. The remaining default settings are fine, click the orange "Create bucket" button on the bottom

### Configure S3 bucket permissions

Your validator IAM user will need write permissions, and it should be publicly readable by relayers.

1. Navigate back to "Identity and Access Management (IAM)" in the AWS console
2. Under "IAM resources" you should see at least one "User", click into that
3. Click on the name of the user that you provisioned earlier (e.g. `hyperlane-validator-${chain_name}`)
4. Copy the "User ARN" to your clipboard, it should look something like `arn:aws:iam::791444913613:user/hyperlane-validator-${chain_name}`
5. Navigate back to "S3" in the AWS console
6. Click on the name of the bucket you just created
7. Just under the name of the bucket, click "Permissions"
8. Scroll down to "Bucket policy" and click "Edit"
9. Enter the following contents. The Bucket ARN is shown just above where you enter the policy

```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Principal": "*",
            "Action": [
                "s3:GetObject",
                "s3:ListBucket"
            ],
            "Resource": [
                "${BUCKET_ARN}",
                "${BUCKET_ARN}/*"
            ]
        },
        {
            "Effect": "Allow",
            "Principal": {
                "AWS": "${USER_ARN}"
            },
            "Action": [
                "s3:DeleteObject",
                "s3:PutObject"
            ],
            "Resource": "${BUCKET_ARN}/*"
        }
    ]
}
```
