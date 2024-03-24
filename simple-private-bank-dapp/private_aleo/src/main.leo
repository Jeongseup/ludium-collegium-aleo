// 'private_aleo' 프로그램.
program private_aleo.aleo {
    // 은행에서 발행한 토큰.
    // - 'owner'  : 이 토큰과 관련된 레코드를 소유한 계정의 주소.
    // - 'amount' : 계정이 소유한 토큰의 양.
    record Token {
        owner: address,
        amount: u64,
    }

    // 각 계정이 소유한 토큰의 양을 저장하는 온체인 매핑
    // 계정은 사용자의 프라이버시를 보존하기 위해 필드로 저장됩니다.
    mapping balances: field => u64;

    // 새로운 토큰을 반환합니다.
    // - `owner` : 토큰을 발행할 계정의 주소.
    // - `amount`: 발행할 토큰의 양.
    // 함수 호출자가 은행이어야 합니다.
    // 은행의 주소는 aleo1t0uer3jgtsgmx5tq6x6f9ecu8tr57rzzfnc2dgmcqldceal0ls9qf6st7a입니다.
    transition issue(owner: address, amount: u64) -> Token {
        //assert_eq(self.caller, aleo1t0uer3jgtsgmx5tq6x6f9ecu8tr57rzzfnc2dgmcqldceal0ls9qf6st7a);
        return Token {
            owner: owner,
            amount: amount,
        };
    }

    // 은행에 일정 금액을 입금합니다.
    // 입금 후 남은 금액의 토큰을 새로운 토큰으로 반환합니다.
    // - `token` : 입금할 토큰을 담은 레코드.
    // - `amount`: 입금할 토큰의 양.
    transition deposit(token: Token, amount: u64) -> Token {
        let difference: u64 = token.amount - amount;

        let remaining: Token = Token {
            owner: token.owner,
            amount: difference,
        };

        // 토큰 소유자의 해시를 계산합니다.
        let hash: field = BHP256::hash_to_field(token.owner);

        return remaining then finalize(hash, amount);
    }

    // 입금된 토큰의 양만큼 온체인 상태를 업데이트합니다.
    // - `hash`  : 토큰 소유자의 해시.
    // - `amount`: 입금된 토큰의 양.
    finalize deposit(hash: field, amount: u64) {
        let current_amount: u64 = Mapping::get_or_use(balances, hash, 0u64);
        Mapping::set(balances, hash, current_amount + amount);
    }

    // 출금할 금액의 토큰을 담은 새로운 토큰을 반환합니다.
    // - `recipient`: 토큰을 출금할 계정의 주소.
    // - `amount`   : 출금할 토큰의 양.
    // - `rate`     : 복리 이자율.
    // - `periods`  : 이자를 복리로 계산할 기간.
    // 함수 호출자가 은행이어야 합니다.
    transition withdraw(recipient: address, amount: u64, rate: u64, periods: u64) -> Token {
       // assert_eq(self.caller, aleo1t0uer3jgtsgmx5tq6x6f9ecu8tr57rzzfnc2dgmcqldceal0ls9qf6st7a);
        let hash: field = BHP256::hash_to_field(recipient);

        let total: u64 = calculate_interest(amount, rate, periods);

        let token: Token = Token {
            owner: recipient,
            amount: total,
        };

        return token then finalize(hash, amount);
    }

    // 출금된 토큰의 양만큼 온체인 상태를 업데이트합니다.
    // - `hash`  : 토큰 소유자의 해시.
    // - `amount`: 출금된 토큰의 양.
    finalize withdraw(hash: field, amount: u64) {
        let current_amount: u64 = Mapping::get_or_use(balances, hash, 0u64);
        Mapping::set(balances, hash, current_amount - amount);
    }

    // 복리 이자를 적용한 후의 총 토큰 양을 반환합니다.
    // - `principal`: 이자를 복리로 계산할 토큰의 양.
    // - `rate`     : 복리 이자율.
    // - `periods`  : 이자를 복리로 계산할 기간.
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
