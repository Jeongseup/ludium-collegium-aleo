program store_3lzgy5.aleo;

record Token:
    owner as address.private;
    amount as u64.private;

record Item:
    owner as address.private;
    item as u8.private;
    quantity as u64.private;


mapping items:
	key as u8.public;
	value as u64.public;


mapping prices:
	key as u8.public;
	value as u64.public;

function mint:
    input r0 as address.private;
    input r1 as u64.private;
    assert.eq self.caller aleo1jxpthhnm4yv5kly69a80cd0gxzmfr9zyj5ktpwy6c3wfhxm6q58q3lzgy5;
    cast r0 r1 into r2 as Token.record;
    output r2 as Token.record;


function add_item:
    input r0 as u8.private;
    input r1 as u64.private;
    input r2 as u64.private;
    assert.eq self.caller aleo1jxpthhnm4yv5kly69a80cd0gxzmfr9zyj5ktpwy6c3wfhxm6q58q3lzgy5;
    async add_item r0 r1 r2 into r3;
    output r3 as store_3lzgy5.aleo/add_item.future;

finalize add_item:
    input r0 as u8.public;
    input r1 as u64.public;
    input r2 as u64.public;
    get.or_use items[r0] 0u64 into r3;
    add r3 r1 into r4;
    set r4 into items[r0];
    set r2 into prices[r0];


function buy:
    input r0 as Token.record;
    input r1 as u8.private;
    input r2 as u64.private;
    input r3 as u64.private;
    sub r0.amount r3 into r4;
    cast r0.owner r4 into r5 as Token.record;
    cast self.caller r1 r2 into r6 as Item.record;
    async buy r1 r2 r3 into r7;
    output r5 as Token.record;
    output r6 as Item.record;
    output r7 as store_3lzgy5.aleo/buy.future;

finalize buy:
    input r0 as u8.public;
    input r1 as u64.public;
    input r2 as u64.public;
    get.or_use items[r0] 0u64 into r3;
    gte r3 r1 into r4;
    assert.eq r4 true;
    get.or_use prices[r0] 0u64 into r5;
    assert.neq r5 0u64;
    mul r5 r1 into r6;
    assert.eq r6 r2;
