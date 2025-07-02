
> [!INFO] Schrödinger backups
> Backups that haven't been tested as actually restorable.

## Key Hierarchy
Commonly used way to facilitate key rotation for data.
**Data Encryption Key (DEK):** The key used to encrypt and decrypt the actual data.
**Key Encryption Key (KEK):** A separate key used to encrypt and protect the DEKs.


## mTLS
Mutual TLS is a way for both client and server to authenticate each other, certificate of client is trusted by the server and certificate of server is set up to be trusted by the client. The way to do it is having both of then signed by a common CA. Always make sure to store certificates in your SecretStore and NOT on the disk. So it can be easily rotated,

