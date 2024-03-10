// The 'store_3lzgy5' program.
program store_3lzgy5.aleo {

    mapping items: u8 => u64;
    mapping prices: u8 => u64;

    record Token {
        owner: address,
        amount: u64,
    }

    record Item {
        owner: address,
        item: u8,
        quantity: u64,
    }

//     transition main(public a: u32, b: u32) -> u32 {
//         let c: u32 = a + b;
//         return c;
//     }
    
    // Address of store owner: aleo10ppqgwqzdr2h49z3w4faze74genk6zs0ye4tzemk3d8uxerfkqzspkzp7w
    // Step 1: Mint tokens to certain address
    transition mint(receiver: address, amount: u64) -> Token {
        assert_eq(self.caller, aleo1jxpthhnm4yv5kly69a80cd0gxzmfr9zyj5ktpwy6c3wfhxm6q58q3lzgy5);

        return Token {
            owner: receiver,
            amount: amount
        };
    }

    // Step 2: Add item
    transition add_item(item: u8, quantity: u64, price: u64) {
        assert_eq(self.caller, aleo1jxpthhnm4yv5kly69a80cd0gxzmfr9zyj5ktpwy6c3wfhxm6q58q3lzgy5);

        return then finalize(item, quantity, price);
    }

    // Increment items quantity, set item price
    finalize add_item (item: u8, quantity: u64, price: u64) {
        let item_count: u64 = Mapping::get_or_use(items, item, 0u64);
        Mapping::set(items, item, item_count + quantity);

        Mapping::set(prices, item, price);
    }
    
    transition buy(token: Token, item: u8, quantity: u64, bill_amount: u64) -> (Token, Item) {
        let difference: u64 = token.amount - bill_amount;
        
        let remaining: Token = Token {
            owner: token.owner,
            amount: difference
        };

        let item_record: Item = Item {
            owner: self.caller,
            item: item,
            quantity: quantity
        };

        return (remaining, item_record) then finalize(item, quantity, bill_amount);
    }

    finalize buy (item: u8, quantity: u64, bill_amount: u64) {
        let available_quantity: u64 = Mapping::get_or_use(items, item, 0u64);
        assert(available_quantity >= quantity);
        // Mapping::set(items, item, available_quantity - quantity);

        let item_price: u64 = Mapping::get_or_use(prices, item, 0u64);
        assert_neq(item_price, 0u64);

        let total_price: u64 = item_price * quantity;
        assert_eq(total_price, bill_amount);
    }

    transition transfer_item (item: Item, receiver: address) ->  Item {
        assert_eq(self.caller, item.owner);

        // return Token {
        //     owner: receiver,
        //     amount: amount
        // };
        
        return Item {
            owner: receiver,
            item: item.item,
            quantity: item.quantity
        };
    }
}
