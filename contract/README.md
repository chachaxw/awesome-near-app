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

```rust
// src/approval.rs
pub trait NonFungibleTokenCore {
    //approve an account ID to transfer a token on your behalf
    fn nft_approve(&mut self, token_id: TokenId, account_id: AccountId, msg: Option<String>);

    //check if the passed in account has access to approve the token ID
	fn nft_is_approved(
        &self,
        token_id: TokenId,
        approved_account_id: AccountId,
        approval_id: Option<u64>,
    ) -> bool;

    //revoke a specific account from transferring the token on your behalf
    fn nft_revoke(&mut self, token_id: TokenId, account_id: AccountId);

    //revoke all accounts from transferring the token on your behalf
    fn nft_revoke_all(&mut self, token_id: TokenId);
}

#[ext_contract(ext_non_fungible_approval_receiver)]
trait NonFungibleTokenApprovalsReceiver {
    //cross contract call to an external contract that is initiated during nft_approve
    fn nft_on_approve(
        &mut self,
        token_id: TokenId,
        owner_id: AccountId,
        approval_id: u64,
        msg: String,
    );
}
```

### `enumeration.rs`

> This file provides the functions needed to view information about NFTs, and follows the standard's [enumeration](https://nomicon.io/Standards/NonFungibleToken/Enumeration.html) extension.

| Method                   | Description                                                                        |
| ------------------------ | ---------------------------------------------------------------------------------- |
| **nft_total_supply**     | Returns the total amount of NFTs stored on the contract                            |
| **nft_tokens**           | Returns a paginated list of NFTs stored on the contract regardless of their owner. |
| **nft_supply_for_owner** | Allows you view the total number of NFTs owned by any given user.                  |
| **nft_tokens_for_owner** | Returns a paginated list of NFTs owned by any given user.                          |

```rust
// src/enumeration.rs
impl Contract {
    //Query for the total supply of NFTs on the contract
    pub fn nft_total_supply(&self) -> U128 {
        /*
            FILL THIS IN
        */
        todo!(); //remove once code is filled in.
    }

    //Query for nft tokens on the contract regardless of the owner using pagination
    pub fn nft_tokens(&self, from_index: Option<U128>, limit: Option<u64>) -> Vec<JsonToken> {
        /*
            FILL THIS IN
        */
        todo!(); //remove once code is filled in.
    }

    //get the total supply of NFTs for a given owner
    pub fn nft_supply_for_owner(
        &self,
        account_id: AccountId,
    ) -> U128 {
        /*
            FILL THIS IN
        */
        todo!(); //remove once code is filled in.
    }

    //Query for all the tokens for an owner
    pub fn nft_tokens_for_owner(
        &self,
        account_id: AccountId,
        from_index: Option<U128>,
        limit: Option<u64>,
    ) -> Vec<JsonToken> {
        /*
            FILL THIS IN
        */
        todo!(); //remove once code is filled in.
    }
}
```

### `lib.rs`

> This file outlines what information the contract stores and keeps track of.

| Method               | Description                                                                                     |
| -------------------- | ----------------------------------------------------------------------------------------------- |
| **new_default_meta** | Initializes the contract with default `metadata` so the user doesn't have to provide any input. |
| **new**              | Initializes the contract with the user-provided `metadata`.                                     |

> Keep in mind
> The initialization functions (`new`, `new_default_meta`) can only be called once.

```rust
// src/lib.rs
impl Contract {
    /*
        initialization function (can only be called once).
        this initializes the contract with default metadata so the
        user doesn't have to manually type metadata.
    */
    #[init]
    pub fn new_default_meta(owner_id: AccountId) -> Self {
        /*
            FILL THIS IN
        */
        todo!(); //remove once code is filled in.
    }

    /*
        initialization function (can only be called once).
        this initializes the contract with metadata that was passed in and
        the owner_id.
    */
    #[init]
    pub fn new(owner_id: AccountId, metadata: NFTContractMetadata) -> Self {
        /*
            FILL THIS IN
        */
        todo!(); //remove once code is filled in.
    }
}
```

### `metadata.rs`

> This file is used to keep track of the information to be stored for tokens, and metadata.
> In addition, you can define a function to view the contract's metadata which is part of the standard's [metadata](https://nomicon.io/Standards/NonFungibleToken/Metadata.html) extension.

| Name              | Description                                                                                                   |
| ----------------- | ------------------------------------------------------------------------------------------------------------- |
| **TokenMetadata** | This structure defines the metadata that can be stored for each token. (title, description, media, etc.       |
| **Token**         | This structure outlines what information will be stored on the contract for each token.                       |
| **JsonToken**     | When querying information about NFTs through view calls, the return information is stored in this JSON token. |
| **nft_metadata**  | This function allows users to query for the contact's internal metadata.                                      |

```rust
// src/metadata.rs
#[derive(BorshDeserialize, BorshSerialize, Serialize, Deserialize, Clone)]
#[serde(crate = "near_sdk::serde")]
pub struct NFTContractMetadata {
    /*
        FILL THIS IN
    */
}

#[derive(BorshDeserialize, BorshSerialize, Serialize, Deserialize)]
#[serde(crate = "near_sdk::serde")]
pub struct TokenMetadata {
    /*
        FILL THIS IN
    */
}

#[derive(BorshDeserialize, BorshSerialize)]
pub struct Token {
    /*
        FILL THIS IN
    */
}

//The Json token is what will be returned from view calls.
#[derive(Serialize, Deserialize)]
#[serde(crate = "near_sdk::serde")]
pub struct JsonToken {
    /*
        FILL THIS IN
    */
}

pub trait NonFungibleTokenMetadata {
    //view call for returning the contract metadata
    fn nft_metadata(&self) -> NFTContractMetadata;
}

#[near_bindgen]
impl NonFungibleTokenMetadata for Contract {
    fn nft_metadata(&self) -> NFTContractMetadata {
        /*
            FILL THIS IN
        */
        todo!(); //remove once code is filled in.
    }
}
```

### `mint.rs`

> Contains token minting logic.

| Method       | Description                               |
| ------------ | ----------------------------------------- |
| **nft_mint** | This function mints a non-fungible token. |

```rust
// src/mint.rs
impl Contract {
    #[payable]
    pub fn nft_mint(
        &mut self,
        token_id: Option<TokenId>,
        metadata: TokenMetadata,
        receiver_id: Option<AccountId>,
    ) {
        /*
            FILL THIS IN
        */
    }
}
```

### `nft_core.rs`

> Core logic that allows you to transfer NFTs between users.

| Method                   | Description                                                                                                                                                                                                                                                                                   |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **nft_transfer**         | Transfers an NFT to a receiver ID.                                                                                                                                                                                                                                                            |
| **nft_transfer_call**    | Transfers an NFT to a receiver and calls a function on the receiver ID's contract. The function returns `true` if the token was transferred from the sender's account.                                                                                                                        |
| **nft_token**            | Allows users to query for the information about a specific NFT.                                                                                                                                                                                                                               |
| **nft_on_transfer**      | Called by other contracts when an NFT is transferred to your contract account via the `nft_transfer_call` method. It returns `true` if the token should be returned back to the sender.                                                                                                       |
| **nft_resolve_transfer** | When you start the `nft_transfer_call` and transfer an NFT, the standard also calls a method on the receiver's contract. If the receiver needs you to return the NFT to the sender (as per the return value of the `nft_on_transfer` method), this function allows you to execute that logic. |

```rust
// src/nft_core.rs
pub trait NonFungibleTokenCore {
    //transfers an NFT to a receiver ID
    fn nft_transfer(
        &mut self,
        receiver_id: AccountId,
        token_id: TokenId,
        memo: Option<String>,
    );

    //transfers an NFT to a receiver and calls a function on the receiver ID's contract
    /// Returns `true` if the token was transferred from the sender's account.
    fn nft_transfer_call(
        &mut self,
        receiver_id: AccountId,
        token_id: TokenId,
        memo: Option<String>,
        msg: String,
    ) -> PromiseOrValue<bool>;

    //get information about the NFT token passed in
    fn nft_token(&self, token_id: TokenId) -> Option<JsonToken>;
}

#[ext_contract(ext_non_fungible_token_receiver)]
trait NonFungibleTokenReceiver {
    //Method stored on the receiver contract that is called via cross contract call when nft_transfer_call is called
    /// Returns `true` if the token should be returned back to the sender.
    fn nft_on_transfer(
        &mut self,
        sender_id: AccountId,
        previous_owner_id: AccountId,
        token_id: TokenId,
        msg: String,
    ) -> Promise;
}

#[ext_contract(ext_self)]
trait NonFungibleTokenResolver {
    /*
        resolves the promise of the cross contract call to the receiver contract
        this is stored on THIS contract and is meant to analyze what happened in the cross contract call when nft_on_transfer was called
        as part of the nft_transfer_call method
    */
    fn nft_resolve_transfer(
        &mut self,
        owner_id: AccountId,
        receiver_id: AccountId,
        token_id: TokenId,
    ) -> bool;
}
```

### `royalty.rs`

> Contains payout-related functions.

| Method                  | Description                                                                                                   |
| ----------------------- | ------------------------------------------------------------------------------------------------------------- |
| **nft_payout**          | This view method calculates the payout for a given token.                                                     |
| **nft_transfer_payout** | Transfers the token to the receiver ID and returns the payout object that should be paid for a given balance. |

```rust
// src/royalty.rs
pub trait NonFungibleTokenCore {
    //calculates the payout for a token given the passed in balance. This is a view method
  	fn nft_payout(&self, token_id: TokenId, balance: U128, max_len_payout: u32) -> Payout;

    //transfers the token to the receiver ID and returns the payout object that should be payed given the passed in balance.
    fn nft_transfer_payout(
        &mut self,
        receiver_id: AccountId,
        token_id: TokenId,
        approval_id: u64,
        memo: Option<String>,
        balance: U128,
        max_len_payout: u32,
    ) -> Payout;
}
```

## Deploy Contract

`near deploy --accountId $NFT_CONTRACT_ID --wasmFile out/main.wasm`

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
