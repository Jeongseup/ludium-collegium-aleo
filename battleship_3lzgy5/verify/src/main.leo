program verify.aleo {
    // Returns the number of flipped bits.
    // E.g. 17870283321406128128u64, in binary 11111000 00000000 00000000 00000000 00000000 00000000 00000000 00000000,
    // returns 5u64; 
    // 1이 5개 나온다는 것을 체크한다. 

// 이 비트 카운트 함수는 비트 연산을 이용해 주어진 64비트 정수에서 1로 설정된 비트의 수를 세는 알고리즘입니다. 이 과정은 일반적으로 "population count"나 "Hamming weight"라고 불리며, 컴퓨터 과학에서 널리 사용됩니다. 이 특정 구현은 비트마스크와 산술 연산을 사용하여 비교적 효율적으로 비트 수를 계산합니다. 각 단계별로 알고리즘을 분해해 보겠습니다.
// 비트 분할: 먼저, 입력 비트 bits를 2, 4, 8로 나누어 각각 r1, r2, r3을 계산합니다. 이 연산은 실제로 비트를 오른쪽으로 시프트하는 것과 동일합니다. 즉, r1은 bits를 1비트, r2는 2비트, r3는 3비트 오른쪽으로 시프트한 값입니다. 이러한 시프트는 이후 단계에서 그룹별 비트 수를 계산하는 데 도움이 됩니다.
// 비트 마스킹: 다음으로, 각 결과 r1, r2, r3에 대해 특정 비트 마스크를 적용합니다(8608480567731124087u64, 3689348814741910323u64, 1229782938247303441u64). 이 비트 마스크는 특정 비트 위치를 선택적으로 제거하거나 보존하는 데 사용됩니다. 마스킹의 목적은 각 2비트, 4비트, 8비트 그룹 내에서 1의 수를 정확하게 계산할 수 있게 준비하는 것입니다.
// 비트 수 계산: bits - r4 - r5 - r6를 계산하여 실제로 각 비트 그룹 내에서 1의 수를 추정합니다. 이 결과는 각 2비트 그룹 내 1의 총합을 나타냅니다.
// 종합: 결과를 16으로 나누고(r8), 이전 결과에 더한 다음(r9), 1085102592571150095u64 비트 마스크를 적용합니다. 이 단계는 각 4비트 내에서 1의 총 수를 계산하는 데 도움이 됩니다.
// 결과: 마지막으로, 결과를 255로 나눈 나머지(r11)를 계산합니다. 이는 각 8비트 바이트 내에서 1의 총 수를 최종적으로 계산합니다.
// 이 공식이 어떻게 도출되었는지 이해하는 것은 복잡할 수 있으며, 각 비트 연산의 정확한 목적과 비트 마스크의 값이 어떻게 선택되었는지 깊이 있게 이해하려면 비트 연산에 대한 상당한 이해가 필요합니다. 이러한 비트 마스크 값은 비트 패턴을 효율적으로 분석하고, 특정 비트 위치를 조작하여 최종적으로 1의 총 수를 계산하기 위해 신중하게 선택되었습니다. 이 방법은 컴퓨터가 내부적으로 데이터를 처리하는 방식을 활용하여, 반복문이나 조건문 없이도 빠르게 비트 수를 세는 데 매우 효과적입니다.
    function bitcount(bits: u64) -> u64 {
        let r1: u64 = bits / 2u64;
        let r2: u64 = bits / 4u64;
        let r3: u64 = bits / 8u64;

        let r4: u64 = r1 & 8608480567731124087u64;
        let r5: u64 = r2 & 3689348814741910323u64;
        let r6: u64 = r3 & 1229782938247303441u64;

        let r7: u64 = bits - r4 - r5 - r6;

        let r8: u64 = r7 / 16u64;
        let r9: u64 = r7 + r8;
        let r10: u64 = r9 & 1085102592571150095u64;
        let r11: u64 = r10 % 255u64;

        return r11;
    }

    // Returns boolean of whether all the flipped bits in location are "adjacent". Horizontally, this means all flipped bits are
    // directly next to each other (111). Vertically, this means all flipped bits are separated by 7 unflipped bits
    // (10000000100000001).
    function adjacency_check(
        // The u64 representation of a ship's placement in an 8x8 grid.
        ship: u64,
        // The u64 representation of a ship's bitstring, either horizontally or vertically.
        // E.g. a ship of length 3's bit string horizontally would be: 000111 = 7u64. Vertically, the bit string would be:
        // 10000000100000001 = 65793u64.
        orientation: u64,
    ) -> bool {
        // This may result in 0.
        let division: u64 = ship / orientation;

        // subtracting 1 from 0 will cause an underflow, so we should check for this edge case.
        let is_eq: bool = division == 0u64;

        // if the above division resulted in 0, we know the adjacency check should return false.
        // Setting to r4 to 3 (11) will guarantee failure here.
        let ternary: u64 = is_eq ? 3u64 : division;
        let subtraction: u64 = ternary - 1u64;
        let and: u64 = subtraction & ternary;

        let bits_are_adjacent: bool = and == 0u64;

        return bits_are_adjacent;
    }

    // Returns boolean of whether adjacent flipped bits don't split a row of size 8.
    // E.g. 111000000 has adjacent flipped bits but splits a row: 00000001 11000000
    function horizontal_check(
        // The u64 representation of a ship's placement in an 8x8 grid.
        ship: u64,
        // The u64 representation of a ship's bitstring horizontally.
        horizontal: u64,
    ) -> bool {
        let remainder: u64 = ship % 255u64;
        // This may result in 0.
        let division: u64 = remainder / horizontal;

        // Subtracting 1 from 0 will cause an underflow.
        let is_eq: bool = division == 0u64;

        // Setting to 3 will guarantee failure.
        let ternary: u64 = is_eq ? 3u64 : division;
        let subtraction: u64 = ternary - 1u64;
        let and: u64 = subtraction & ternary;

        let bits_split_row: bool = and == 0u64;

        return bits_split_row;
    }

    //carrier, 5u64, 31u64, 4311810305u64
    // Returns `true` if the ship placement is valid.
    transition validate_ship(
        // The u64 representation of a ship's placement in an 8x8 grid.
        ship: u64,
        // The length of the placed ship.
        length: u64,
        // The u64 equivalent of a ship's horizontal bitstring representation.
        horizontal: u64,
        // The u64 equivalent of a ship's vertical bitstring representation.
        vertical: u64,
    ) -> bool {
        // Check bitcount -- all other validations depend on the bitcount being correct.
        let num_bits: u64 = bitcount(ship);
        assert_eq(num_bits, length);

        // Check horizontal bits of ship.
        let is_adjacent: bool = adjacency_check(ship, horizontal); // True if bits are adjacent horizontally.
        let is_horizontal: bool = horizontal_check(ship, horizontal); // True if those horizontal bits are not split across rows.
        let valid_horizontal: bool = is_adjacent && is_horizontal; // True if bits are adjacent horizontally and not split across rows.

        // Check vertical bits of ship.
        let valid_vertical: bool = adjacency_check(ship, vertical); // True if bits are adjacent vertically.

        let ship_is_valid: bool = valid_horizontal || valid_vertical; // Ship is valid if it is vertically or horizontally valid.

        return ship_is_valid;
    }

    // Returns the u64 representation of all the ships' placements in an 8x8 grid. This function will fail
    // if any of the ship placements overlap each other.
    transition create_board(
        // The u64 representation of a carrier's placement in an 8x8 grid. Length = 5.
        carrier: u64,
        // The u64 representation of a battleship's placement in an 8x8 grid. Length = 4.
        battleship: u64,
        // The u64 representation of a cruiser's placement in an 8x8 grid. Length = 3.
        cruiser: u64,
        // The u64 representation of a destroyer's placement in an 8x8 grid. Length = 2.
        destroyer: u64,
    ) -> u64 {
        // Bitwise combine the ship placements together
        let ships: u64 = carrier | battleship | cruiser | destroyer;

        let num_bits: u64 = bitcount(ships);
        assert_eq(num_bits, 14u64); // Given 4 individually-valid ships, a valid combination should yield exactly 14 flipped bits.

        return ships;
    }
}