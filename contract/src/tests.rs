/* unit tests */
use crate::approval::NonFungibleTokenCore;
#[cfg(test)]
use crate::Contract;
use crate::TokenMetadata;
use near_sdk::json_types::{U128, U64};
use near_sdk::test_utils::{accounts, VMContextBuilder};
use near_sdk::testing_env;
use near_sdk::{env, AccountId};

use std::collections::HashMap;

const MINT_STORAGE_COST: u128 = 100_000_000_000_000_000_000_000;
const MIN_REQUIRED_APPROVAL_YOCTO: u128 = 170000000000000000000;

fn get_context(predecessor: AccountId) -> VMContextBuilder {
    let mut builder = VMContextBuilder::new();
    builder.predecessor_account_id(predecessor);
    builder
}

fn sample_token_metadata() -> TokenMetadata {
    TokenMetadata {
        title: Some("Chacha NFT".into()),
        description: Some("This is an awesome NFT project and developed by Chacha".into()),
        media: None,
        media_hash: None,
        copies: None,
        issued_at: None,
        expires_at: None,
        starts_at: None,
        updated_at: None,
        extra: None,
        reference: None,
        reference_hash: None,
    }
}

#[test]
#[should_panic(expected = "The Contract is not initialized")]
fn test_default() {
    let context = get_context(accounts(0));
    testing_env!(context.build());
    let _contract = Contract::default();
}

#[test]
fn test_new_account_contract() {
    let context = get_context(accounts(1));
    testing_env!(context.build());

    let contract = Contract::new_default_meta(accounts(1).into());
    testing_env!(context.is_view(true).build());

    let contract_nft_token = contract.nft_tokens(Some(U128(0)), None);
    assert_eq!(contract_nft_token.len(), 0);
}
