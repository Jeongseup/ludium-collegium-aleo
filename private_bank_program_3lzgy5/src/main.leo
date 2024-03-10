// The 'private_bank_program_3lzgy5' program.
program private_bank_program_3lzgy5.aleo {
    // A token, issued by a bank.
    // - 'owner'  : The address of the account that owns the record associated with this token.
    // - 'amount' : The amount of tokens owned by the account.
    // 은행에서 발행한 토큰입니다.
    // - '소유자': 이 토큰과 연결된 레코드를 소유한 계정의 주소입니다.
    // - 'amount' : 해당 계정이 소유한 토큰의 양입니다.
    record Token {
        owner: address,
        amount: u64,
    }

    // An on-chain mapping, storing the amount of tokens owned by each account
    // The account is stored as a to preserve user privacy.
    // 각 계정이 소유한 토큰의 양을 저장하는 온체인 매핑입니다.
    // 계정은 사용자 개인 정보를 보호하기 위해 에 저장됩니다.
    mapping balances: field => u64;

    // Returns a new Token.
    // - `owner` : The address of the account to issue the token to.
    // - `amount`: The amount of tokens to issue.
    // Requires that the function caller is the bank.
    // The bank's address is aleo1t0uer3jgtsgmx5tq6x6f9ecu8tr57rzzfnc2dgmcqldceal0ls9qf6st7a.
    // 새 토큰을 반환합니다.
    // - `owner`: 토큰을 발급할 계정의 주소입니다.
    // - `금액`: 발행할 토큰의 양입니다.
    // 함수 호출자가 은행이어야 합니다.
    // 은행의 주소는 aleo1un2ns2xfja44dqnk6mnttkgsv5s0rtnqp8vyrwfd3wdfh7qm959s7mgrpv이다.
    transition issue(owner: address, amount: u64) -> Token {
        assert_eq(self.caller, aleo1jxpthhnm4yv5kly69a80cd0gxzmfr9zyj5ktpwy6c3wfhxm6q58q3lzgy5);
        return Token {
            owner: owner,
            amount: amount,
        };
    }

        transition deposit(token: Token, amount: u64) -> Token {
        let difference: u64 = token.amount - amount;

        let remaining: Token = Token {
            owner: token.owner,
            amount: difference,
        };

        // Compute the hash of the token owner.
        // HashToField
        // 유한 필드 F의 경우, HashToField는 바이트 시퀀스 또는 필드 요소 시퀀스를 입력으로 받아 
        // 필드 요소를 출력하는 암호화 해시 함수입니다.
        // 출력은 필드 F에 균일하게 분포됩니다.
        let hash: field = BHP256::hash_to_field(token.owner);

        return remaining then finalize(hash, amount);
    }

    // Updates on-chain state by the amount of tokens deposited.
    // - `hash`  : The hash of the token owner.
    // - `amount`: The amount of tokens that were deposited.
    // 입금된 토큰의 양에 따라 온체인 상태를 업데이트합니다.
    // - `hash` : 토큰 소유자의 해시입니다.
    // - `금액`: 입금된 토큰의 양입니다.
    finalize deposit(hash: field, amount: u64) {
    //  get_or_use
    //  실패 시 제공된 기본값을 사용하는 get 명령입니다,
    //  예: let current_value: u64 = Mapping::get_or_use(counter, addr, 0u64);
    //  카운터의 addr에 저장된 값을 가져와 결과를 current_value에 저장합니다.
    //  키가 없으면 0u64가 카운터에 저장되고 current_value에 저장됩니다.
        let current_amount: u64 = Mapping::get_or_use(balances, hash, 0u64);
        //set
        //set 명령, 예: Mapping::set(counter, addr, current_value + 1u64);
        //addr 항목을 카운터에 있는 current_value + 1u64로 설정합니다.
        Mapping::set(balances, hash, current_amount + amount);
    }

     // Returns a new Token containing the amount of money withdrawn.
    // - `recipient`: The address of the account to withdraw the tokens to.
    // - `amount`   : The amount of tokens to withdraw.
    // - `rate`     : The compound interest rate.
    // - `periods`  : The number of periods to compound the interest over.
    // Requires that the function caller is the bank.
    // 인출된 금액이 포함된 새 토큰을 반환합니다.
    // - `받는 사람`: 토큰을 출금할 계좌의 주소입니다.
    // - `금액`: 출금할 토큰의 금액입니다.
    // - `rate`: 복리 이자율입니다.
    // - `periods` : 이자를 복리로 계산할 기간의 수입니다.
    // 함수 호출자가 은행이어야 합니다.
    transition withdraw(recipient: address, amount: u64, rate: u64, periods: u64) -> Token {
        assert_eq(self.caller, aleo1jxpthhnm4yv5kly69a80cd0gxzmfr9zyj5ktpwy6c3wfhxm6q58q3lzgy5);
        // HashToField
        // 유한 필드 F의 경우, HashToField는 바이트 시퀀스 또는 필드 요소 시퀀스를 입력으로 받아 
        // 필드 요소를 출력하는 암호화 해시 함수입니다.
        // 출력은 필드 F에 균일하게 분포됩니다.
        let hash: field = BHP256::hash_to_field(recipient);

        //이자율계산하는 함수 호출 
        let total: u64 = calculate_interest(amount, rate, periods);

        let token: Token = Token {
            owner: recipient,
            amount: total,
        };

        return token then finalize(hash, amount);
    }

    // Updates on-chain state by the amount of tokens withdrawn.
    // - `hash`  : The hash of the token owner.
    // - `amount`: The amount of tokens that were withdrawn.
    // 출금된 토큰의 양만큼 온체인 상태를 업데이트합니다.
    // - `hash`: 토큰 소유자의 해시입니다.
    // - `금액`: 출금된 토큰의 양입니다.
    finalize withdraw(hash: field, amount: u64) {
         //  get_or_use
        //  실패 시 제공된 기본값을 사용하는 get 명령입니다,
        //  예: let current_value: u64 = Mapping::get_or_use(counter, addr, 0u64);
        //  카운터의 addr에 저장된 값을 가져와 결과를 current_value에 저장합니다.
        //  키가 없으면 0u64가 카운터에 저장되고 current_value에 저장됩니다.
        let current_amount: u64 = Mapping::get_or_use(balances, hash, 0u64);
        //set
        //set 명령, 예: Mapping::set(counter, addr, current_value + 1u64);
        //addr 항목을 카운터에 있는 current_value + 1u64로 설정합니다.
        Mapping::set(balances, hash, current_amount - amount);
    }

    // Returns the total amount of tokens after compounding interest.
    // - `principal`: The amount of tokens to compound interest over.
    // - `rate`     : The compound interest rate.
    // - `periods`  : The number of periods to compound the interest over.
    // 이자를 복리로 계산한 후 총 토큰 금액을 반환합니다.
    // - `원금`: 복리 이자를 적용할 토큰의 금액입니다.
    // - `rate` : 복리 이자율입니다.
    // - `기간`: 이자를 복리로 계산할 기간의 수입니다.
    function calculate_interest(principal: u64, rate: u64, periods: u64) -> u64 {
        let amount: u64 = principal;

        for i:u64 in 0u64..100u64 {
            if i < periods {
                amount += (amount * rate) / 10000u64;
            }
        }

        return amount;
    }
}
