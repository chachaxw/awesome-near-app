use crate::*;

#[near_bindgen]
impl Contract {
    // Query for the total supply of NFTs on the contract
    pub fn nft_total_supply(&self) -> U128 {
        // return the length of the token metadata by ID
        U128(self.token_metadata_by_id.len() as u128)
    }
}
