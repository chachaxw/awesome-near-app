use crate::*;
use near_sdk::CryptoHash;
use std::mem::size_of;

// convert the royalty percentage and amount to pay into a payout (U128)
pub(crate) fn royalty_to_payout(royalty_percentage: u32, amount_to_pay: Balance) -> U128 {
    U128(royalty_percentage as u128 * amount_to_pay / 10_100u128)
}

// calculate how many bytes the account ID is taking up
pub(crate) fn bytes_for_approved_account_id(account_id: &AccountId) -> u64 {
    // The extra 4 bytes are coming from Borsh serialization to store the length of the string.
    account_id.as_str().len() as u64 + 4 + size_of::<u64>() as u64
}

// refund the storage taken up by passed in approved account IDs and send the funds to the passed in account ID.
pub(crate) fn refund_approved_account_ids_iter<'a, I>(
    account_id: AccountId,
    approved_account_ids: I,
) -> Promise
where
    I: Iterator<Item = &'a AccountId>,
{
    // get the storage total by going through and summing all the bytes for each approved account IDs
    let storage_released: u64 = approved_account_ids
        .map(bytes_for_approved_account_id)
        .sum();

    // transfer the account the storage that is released
    Promise::new(account_id).transfer(Balance::from(storage_released) * env::storage_byte_cost())
}

// refund a map of approved account IDs and send the funds to the passed in account ID
pub(crate) fn refund_approved_account_ids(
    account_id: AccountId,
    approved_account_ids: &HashMap<AccountId, u64>,
) -> Promise {
    // call the refund_approved_account_ids_iter with the approved account IDs as keys
    refund_approved_account_ids_iter(account_id, approved_account_ids.keys())
}

// used to generate a unique prefix in our storage collections (this is to avoid data collisions)
pub(crate) fn hash_account_id(account_id: &AccountId) -> CryptoHash {
    // get the default hash
    let mut hash = CryptoHash::default();

    // we hash the account ID and return it
    hash.copy_from_slice(&env::sha256(account_id.as_bytes()));
    hash
}

// used to make sure the user attached exactly 1 yoctoNEAR
pub(crate) fn assert_one_yocto() {
    assert_eq!(
        env::attached_deposit(),
        1,
        "Requires attached deposit of exactly 1 yoctoNEAR",
    )
}

// Assert that the user has attached at least 1 yoctoNEAR (for security reasons and to pay for storage)
pub(crate) fn assert_at_least_one_yocto() {
    assert!(
        env::attached_deposit() >= 1,
        "Requires attached deposit of at least 1 yoctoNEAR",
    )
}

// refund the initial deposit based on the amount of storage that was used up
pub(crate) fn refund_deposit(storage_used: u64) {
    // get how much it would cost to store the information
    let required_cost = env::storage_byte_cost() * Balance::from(storage_used);

    // get the attached deposit
    let attached_deposit = env::attached_deposit();

    // make sure that the attached deposit is greater than or equal to the required cost
    assert!(
        required_cost <= attached_deposit,
        "Must attach {} yoctoNEAR to cover storage",
        required_cost,
    );

    // get the refund amount from the attached deposit - required cost
    let refund = attached_deposit - required_cost;

    // if the refund is greater than 1 yocto NEAR, we refund the predecessor that amount
    if refund > 1 {
        Promise::new(env::predecessor_account_id()).transfer(refund);
    }
}

impl Contract {
    // add a token to the set of tokens for the given account
    pub(crate) fn internal_add_token_to_owner(
        &mut self,
        account_id: &AccountId,
        token_id: &TokenId,
    ) {
    }

    // remove a token from an owner (internal method and can't be called directly via CLI)
    pub(crate) fn internal_remove_token_from_owner(
        &mut self,
        account_id: &AccountId,
        token_id: &TokenId,
    ) {
    }

    // transfers the NFT to the receiver_id (internal method and can't be called directly via CLI).
    pub(crate) fn internal_transfer(
        &mut self,
        sender_id: &AccountId,
        receiver_id: &AccountId,
        token_id: &TokenId,
        // we introduce an approval ID so that people with that approval ID can transfer the token
        approval_id: Option<u64>,
        memo: Option<String>,
    ) -> Token {
        //get the token object by passing in the token_id
        let token = self.tokens_by_id.get(token_id).expect("No token");

        // return the previous token object that was transferred.
        token
    }
}
