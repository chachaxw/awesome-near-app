# Awesome-near-app Smart Contract

A [smart contract] written in [Rust] for an app initialized with [create-near-app]

## Quick Start

Before you compile this code, you will need to install Rust with [correct target]

## Skeleton and Rust Architecture

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

`approval.rs` - Has the functions that controls the access and transfers of non-fungible tokens.
`enumeration.rs` - Contains the methods to list NFT tokens and their owners.
`lib.rs` - Holds the smart contract initialization functions.
`metadata.rs` - Defines the token and metadata structure.
`mint.rs` - Contains token minting logic.
`nft_core.rs` - Core logic that allows you to transfer NFTs between users.
`royalty.rs` - Contains payout-related functions.

## Exploring The Code

1. The main smart contract code lives in `src/lib.rs`.
2. Tests: You can run smart contract tests with the `./test` script. This runs
   standard Rust tests using [cargo] with a `--nocapture` flag so that you
   can see any debug info you print to the console.

smart contract: https://docs.near.org/docs/develop/contracts/overview
Rust: https://www.rust-lang.org/
create-near-app: https://github.com/near/create-near-app
correct target: https://github.com/near/near-sdk-rs#pre-requisites
cargo: https://doc.rust-lang.org/book/ch01-03-hello-cargo.html
