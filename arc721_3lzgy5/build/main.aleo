program arc721_3lzgy5.aleo;

struct String64:
    part0 as u128;
    part1 as u128;
    part2 as u128;
    part3 as u128;

struct TokenId:
    token_number as u128;
    collection_number as u128;

record Token:
    owner as address.private;
    id as TokenId.private;
    metadata_uri as String64.private;

record Collection:
    owner as address.private;
    id as u128.private;


function create_collection:
    input r0 as address.private;
    input r1 as u128.private;
    cast r0 r1 into r2 as Collection.record;
    output r2 as Collection.record;


function mint:
    input r0 as address.private;
    input r1 as TokenId.private;
    input r2 as String64.private;
    cast self.caller r1 r2 into r3 as Token.record;
    output r3 as Token.record;
