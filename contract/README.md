# Awesome-near-app Smart Contract

A [smart contract] written in [Rust] for an app initialized with [create-near-app]

## Quick Start

Before you compile this code, you will need to install Rust with [correct target]

## Skeleton and Rust Architecture

| File                              | Description                                                                      |
| --------------------------------- | -------------------------------------------------------------------------------- |
| [approval.rs](#approval.rs)       | Has the functions that controls the access and transfers of non-fungible tokens. |
| [enumeration.rs](#enumeration.rs) | Contains the methods to list NFT tokens and their owners.                        |
| [lib.rs](#lib.rs)                 | Holds the smart contract initialization functions.                               |
| [metadata.rs](#metadata.rs)       | Defines the token and metadata structure.                                        |
| [mint.rs](#mint.rs)               | Contains token minting logic.                                                    |
| [nft_core.rs](#nft_core.rs)       | Core logic that allows you to transfer NFTs between users.                       |
| [royalty.rs](#royalty.rs)         | Contains payout-related functions.                                               |

```rust
contract
├── Cargo.lock
├── Cargo.toml
├── README.md
├── build.sh
└── src
    ├── approval.rs
    ├── enumeration.rs
    ├── lib.rs
    ├── metadata.rs
    ├── mint.rs
    ├── nft_core.rs
    └── royalty.rs
```

### `approval.rs`

> This allows people to approve other accounts to transfer NFTs on their behalf.

This file contains the logic that complies with the standard's [approvals management](https://nomicon.io/Standards/NonFungibleToken/ApprovalManagement.html) extension. Here is a breakdown of the methods and their functions:

| Method              | Description                                                                                               |
| ------------------- | --------------------------------------------------------------------------------------------------------- |
| **nft_approve**     | Approves an account ID to transfer a token on your behalf.                                                |
| **nft_is_approved** | Checks if the input account has access to approve the token ID.                                           |
| **nft_revoke**      | Revokes a specific account from transferring the token on your behalf.                                    |
| **nft_revoke_all**  | Revokes all accounts from transferring the token on your behalf.                                          |
| **nft_on_approve**  | This callback function, initiated during `nft_approve`, is a cross contract call to an external contract. |

### `enumeration.rs`

> This file provides the functions needed to view information about NFTs, and follows the standard's [enumeration](https://nomicon.io/Standards/NonFungibleToken/Enumeration.html) extension.

| Method                   | Description                                                                        |
| ------------------------ | ---------------------------------------------------------------------------------- |
| **nft_total_supply**     | Returns the total amount of NFTs stored on the contract                            |
| **nft_tokens**           | Returns a paginated list of NFTs stored on the contract regardless of their owner. |
| **nft_supply_for_owner** | Allows you view the total number of NFTs owned by any given user.                  |
| **nft_tokens_for_owner** | Returns a paginated list of NFTs owned by any given user.                          |

### `lib.rs`

> This file outlines what information the contract stores and keeps track of.

| Method               | Description                                                                                     |
| -------------------- | ----------------------------------------------------------------------------------------------- |
| **new_default_meta** | Initializes the contract with default `metadata` so the user doesn't have to provide any input. |
| **new**              | Initializes the contract with the user-provided `metadata`.                                     |

> Keep in mind
> The initialization functions (`new`, `new_default_meta`) can only be called once.

### `metadata.rs`

> This file is used to keep track of the information to be stored for tokens, and metadata.
> In addition, you can define a function to view the contract's metadata which is part of the standard's [metadata](https://nomicon.io/Standards/NonFungibleToken/Metadata.html) extension.

| Name              | Description                                                                                                   |
| ----------------- | ------------------------------------------------------------------------------------------------------------- |
| **TokenMetadata** | This structure defines the metadata that can be stored for each token. (title, description, media, etc.       |
| **Token**         | This structure outlines what information will be stored on the contract for each token.                       |
| **JsonToken**     | When querying information about NFTs through view calls, the return information is stored in this JSON token. |
| **nft_metadata**  | This function allows users to query for the contact's internal metadata.                                      |

### `mint.rs`

> Contains token minting logic.

| Method       | Description                               |
| ------------ | ----------------------------------------- |
| **nft_mint** | This function mints a non-fungible token. |

### `nft_core.rs`

> Core logic that allows you to transfer NFTs between users.

| Method                   | Description                                                                                                                                                                                                                                                                                   |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **nft_transfer**         | Transfers an NFT to a receiver ID.                                                                                                                                                                                                                                                            |
| **nft_transfer_call**    | Transfers an NFT to a receiver and calls a function on the receiver ID's contract. The function returns `true` if the token was transferred from the sender's account.                                                                                                                        |
| **nft_token**            | Allows users to query for the information about a specific NFT.                                                                                                                                                                                                                               |
| **nft_on_transfer**      | Called by other contracts when an NFT is transferred to your contract account via the `nft_transfer_call` method. It returns `true` if the token should be returned back to the sender.                                                                                                       |
| **nft_resolve_transfer** | When you start the `nft_transfer_call` and transfer an NFT, the standard also calls a method on the receiver's contract. If the receiver needs you to return the NFT to the sender (as per the return value of the `nft_on_transfer` method), this function allows you to execute that logic. |

### `royalty.rs`

> Contains payout-related functions.

| Method                  | Description                                                                                                   |
| ----------------------- | ------------------------------------------------------------------------------------------------------------- |
| **nft_payout**          | This view method calculates the payout for a given token.                                                     |
| **nft_transfer_payout** | Transfers the token to the receiver ID and returns the payout object that should be paid for a given balance. |

## Exploring The Code

1. The main smart contract code lives in `contract/src/lib.rs`.
2. Tests: You can run smart contract tests with the `contract/src/tests` script. This runs
   standard Rust tests using [cargo] with a `--nocapture` flag so that you
   can see any debug info you print to the console.

smart contract: https://docs.near.org/docs/develop/contracts/overview

Rust: https://www.rust-lang.org/

create-near-app: https://github.com/near/create-near-app

correct target: https://github.com/near/near-sdk-rs#pre-requisites

cargo: https://doc.rust-lang.org/book/ch01-03-hello-cargo.html
