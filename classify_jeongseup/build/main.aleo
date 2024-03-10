program classify_jeongseup.aleo;

struct EndlessNode:
    node_name as u8;
    right as boolean;
    left as boolean;

struct OneSonNode:
    node_name as u8;
    right as EndlessNode;
    left as boolean;

struct Dataset:
    e0 as u32;
    e1 as u32;


function main:
    input r0 as Dataset.public;
    is.eq r0.e0 0u32 into r1;
    is.eq r0.e1 0u32 into r2;
    ternary r1 true true into r3;
    and r1 r2 into r4;
    ternary r4 false r3 into r5;
    output r5 as boolean.private;
