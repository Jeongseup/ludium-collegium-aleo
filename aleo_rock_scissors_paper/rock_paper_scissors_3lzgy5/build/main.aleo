program rock_paper_scissors_3lzgy5.aleo;

struct Message:
    first as field;
    second as field;


function main:
    input r0 as Message.private;
    cast r0.first r0.second into r1 as Message;
    is.eq r1.first 0field into r2;
    is.eq r1.second 2field into r3;
    and r2 r3 into r4;
    is.eq r1.first 0field into r5;
    is.eq r1.second 5field into r6;
    and r5 r6 into r7;
    is.eq r1.first 0field into r8;
    is.eq r1.second 0field into r9;
    and r8 r9 into r10;
    is.eq r1.first 2field into r11;
    is.eq r1.second 0field into r12;
    and r11 r12 into r13;
    is.eq r1.first 2field into r14;
    is.eq r1.second 5field into r15;
    and r14 r15 into r16;
    is.eq r1.first 2field into r17;
    is.eq r1.second 2field into r18;
    and r17 r18 into r19;
    is.eq r1.first 5field into r20;
    is.eq r1.second 2field into r21;
    and r20 r21 into r22;
    is.eq r1.first 5field into r23;
    is.eq r1.second 0field into r24;
    and r23 r24 into r25;
    is.eq r1.first 5field into r26;
    is.eq r1.second 5field into r27;
    and r26 r27 into r28;
    add r1.first r1.second into r29;
    ternary r28 10field r29 into r30;
    ternary r25 r1.first r30 into r31;
    ternary r22 r1.second r31 into r32;
    ternary r19 10field r32 into r33;
    ternary r16 r1.first r33 into r34;
    ternary r13 r1.second r34 into r35;
    ternary r10 10field r35 into r36;
    ternary r7 r1.second r36 into r37;
    ternary r4 r1.first r37 into r38;
    output r38 as field.private;
