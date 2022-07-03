use create::*;
use near_sdk::ext_contract;

pub trait NonFungibleTokenCore {
    // approve an account ID to transfer a token on your behalf
    fn nft_approve(&mut self, token_id: TokenId, account_id: AccountId, msg: Option<String>);

    // check if the passed in account has access to approve the token ID
    fn nft_is_approved(
        &self,
        token_id: TokenId,
        approved_account_id: AccountId,
        approve_id: Option<u64>,
    ) -> bool;

    // revoke a specific account from transferring the token on your behalf
    fn nft_remove(&mut self, token_id: TokenId, account_id: AccountId);

    // revoke all accounts from transferring the token on your behalf
    fn nft_remove_all(&mut self, token_id: TokenId);
}

#[ext_contract(ext_non_fungible_token_approval_receiver)]
trait NonFungibleTokenApprovalReceiver {
    // cross contract call to an external contract that is initiated during nft_approve
    fn nft_on_approve(
        &mut self,
        token_id: TokenId,
        owner_id: AccountId,
        approval_id: u64,
        msg: String,
    );
}

#[near_bindgen]
impl NonFungibleTokenCore for Contract {}
