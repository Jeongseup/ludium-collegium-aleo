// The 'simple_arc721' program.
program simple_arc721_3lzgy5.aleo {
    struct String64 {
        part0: u128,
        part1: u128,
        part2: u128,
        part3: u128
    }

    struct TokenId {
        token_number: u128,
        collection_number: u128
    }

     record Token {
        owner: address,
        id : TokenId, 
        metadata_uri: String64 
    }

    record Collection {
        owner: address, 
        id: u128,
    }

    transition create_collection(receiver: address, collection_id : u128) -> Collection{
        return Collection {
            owner: receiver,
            id: collection_id,
        };
    }

    // Define a mint transition that takes a balance and returns a token
    transition mint(receiver: address, token_id: TokenId, metadata: String64 ) -> Token {
        return Token { 
            owner : self.caller,
            id: token_id,
            metadata_uri: metadata
        };
    }
}
