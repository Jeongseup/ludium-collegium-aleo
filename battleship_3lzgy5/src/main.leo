import board.aleo;
import move.aleo;
import verify.aleo;

// 'program' 스코프는 'battleship' 프로그램과 관련된 데이터 타입, 함수 및 상태를 정의합니다.
program battleship_3lzgy5.aleo {
    // 새로운 battleship 게임을 나타내는 레코드를 반환합니다.
    transition initialize_board(
        // 8x8 그리드에서 항모의 배치를 나타내는 u64 표현입니다. 길이 = 5.
        carrier: u64,
        // 8x8 그리드에서 전함의 배치를 나타내는 u64 표현입니다. 길이 = 4.
        battleship: u64,
        // 8x8 그리드에서 순양함의 배치를 나타내는 u64 표현입니다. 길이 = 3.
        cruiser: u64,
        // 8x8 그리드에서 구축함의 배치를 나타내는 u64 표현입니다. 길이 = 2.
        destroyer: u64,
        // 상대방의 주소입니다.
        player: address,
    ) -> board.aleo/board_state.record {
        // 각각의 선박 배치 비트열이 유효한지 확인합니다.
        // 배의 배치, 배의 길이, 배의 가로 비트열, 배의 세로 비트열, 
        let valid_carrier: bool = verify.aleo/validate_ship(carrier, 5u64, 31u64, 4311810305u64);
        assert(valid_carrier);

        let valid_battleship: bool = verify.aleo/validate_ship(battleship, 4u64, 15u64, 16843009u64);
        assert(valid_battleship);

        let valid_cruiser: bool = verify.aleo/validate_ship(cruiser, 3u64, 7u64, 65793u64);
        assert(valid_cruiser);

        let valid_destroyer: bool = verify.aleo/validate_ship(destroyer, 2u64, 3u64, 257u64);
        assert(valid_destroyer);

        // 모든 선박 배치를 결합하여 보드를 생성합니다.
        let board: u64 = verify.aleo/create_board(carrier, battleship, cruiser, destroyer);

        // 보드 상태 레코드를 초기화합니다.
        let state: board.aleo/board_state = board.aleo/new_board_state(board, player);

        // 보드 상태 레코드를 반환합니다.
        return state;
    }

    // 업데이트된 board_state.record를 반환하며,
    // 더 이상 이를 사용하여 새로운 게임에 참여하거나 시작할 수 없습니다.
    // 상대방이 소유한 더미 이동 레코드를 반환합니다.
    transition offer_battleship(
        // 게임을 시작할 보드 레코드입니다.
        board: board.aleo/board_state.record,
    ) -> (board.aleo/board_state.record, move.aleo/move.record) {
        
        //start_board 함수는 game_started: true 값을 추가해서 반환한다.
        let state: board.aleo/board_state = board.aleo/start_board(board);

        //상대방이 소유한 무브레코드를 반환한다. 
        let dummy: move.aleo/move = move.aleo/start_game(board.player_2);

        //보드 스테이트와 상대방이 기록할 더미 레코드 반환
        return (state, dummy);
    }

    // 시작된 게임 상태가 된  board_state.record를 반환하며, 
    // 이를 더 이상 참여하거나 새로운 게임을 시작할 수 없습니다.
    // 상대방이 소유한 더미 이동 레코드를 반환합니다.
    transition start_battleship(
        // 게임을 진행할 보드 레코드입니다.
        board: board.aleo/board_state.record,
        // 게임을 시작하기 위한 이동 레코드입니다. 
        // offer_battleship에서 생성된 더미 이동 레코드여야 합니다.
        move_start: move.aleo/move.record,
    ) -> (board.aleo/board_state.record, move.aleo/move.record) {
        // 무브 플레이어와 보드 플레이어가 일치하는지 확인합니다.
        assert_eq(board.player_1, move_start.player_2);
        assert_eq(board.player_2, move_start.player_1);

        //game_started: true인 값을 추가해서 반환한다. 
        let state: board.aleo/board_state = board.aleo/start_board(board);
        //상대방이 소유한 무브 레코드를 반환
        let dummy: move.aleo/move = move.aleo/start_game(board.player_2);

        return (state, dummy);
    }

    // 업데이트된 board 레코드를 반환합니다.
    // 상대방이 소유한 새로운 이동 레코드를 반환합니다.
    transition play(
        // 업데이트할 board 레코드입니다.
        board: board.aleo/board_state.record,
        // 상대방으로부터 수신한 이동 레코드입니다.
        // incoming_fire_coordinate은 shoot으로 들어온 u64 
        move_incoming: move.aleo/move.record,
        // 상대방의 보드에서 다음에 플레이할 좌표의 비트 표현에 해당하는 u64입니다.
        shoot: u64,
    ) -> (board.aleo/board_state.record, move.aleo/move.record) {
        // 게임이 시작되었는지 확인합니다. 이로써 플레이어들이 게임을 시작하고 나서 
        // 새로운 보드를 만들어 사용하는 것을 방지합니다.
        assert(board.game_started);

        // 무브 플레이어와 보드 플레이어가 일치하는지 확인합니다.
        // 무브 보드는 상대방에게 반환하기 때문에 플레이어1은 플레이어2로, 플레이어2는 플레이어1로 확인한다.
        assert_eq(board.player_1, move_incoming.player_2);
        assert_eq(board.player_2, move_incoming.player_1);

        // 자신의 보드에서 좌표를 플레이합니다. 유효한 이동이 아닌 경우 실패합니다.
        let hit_or_miss: board.aleo/board_state = board.aleo/update_played_tiles(board, shoot);

        // 자신의 보드를 마지막 공격 결과로 업데이트합니다.
        let next_board: board.aleo/board_state = board.aleo/update_hits_and_misses(hit_or_miss, move_incoming.prev_hit_or_miss);

        // 상대방의 공격 좌표가 명중인지 확인합니다.
        let is_hit: u64 = move_incoming.incoming_fire_coordinate & board.ships;

        // 다음 이동을 생성합니다.
        let next_move: move.aleo/move = move.aleo/create_move(move_incoming, shoot, is_hit);


        return (next_board, next_move);
    }
}

