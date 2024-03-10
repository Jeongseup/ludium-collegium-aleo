# arc721_3lzgy5.aleo

## Build Guide

To compile this Aleo program, run:

```bash
snarkvm build
```

To execute this Aleo program, run:

```bash
snarkvm run hello
```

### local create collection

```bash
# input
ALEO_ADDRESS=aleo1jxpthhnm4yv5kly69a80cd0gxzmfr9zyj5ktpwy6c3wfhxm6q58q3lzgy5
leo run "create_collection" "${ALEO_ADDRESS}" 0u128

# output
⛓  Constraints

 •  'arc721_3lzgy5.aleo/create_collection' - 2,020 constraints (called 1 time)

➡️  Output

 • {
  owner: aleo1jxpthhnm4yv5kly69a80cd0gxzmfr9zyj5ktpwy6c3wfhxm6q58q3lzgy5.private,
  id: 0u128.private,
  _nonce: 6921269746538920245781255316486239693292211603584763418524884175284468150545group.public
}
```

### local mint

```bash
# input
TOKEN_ID="{
    token_number: 0u128,
    collection_number : 0u128
}"

META_DATA="{
    part0: 140152554740597502496524452237299901250u128,
    part1: 133324194421918155921132289162654938981u128,
    part2: 93509703548909910993375653557521895508u128,
    part3: 147831289382731815962129268963868147712u128
}"

leo run "mint" "aleo1jxpthhnm4yv5kly69a80cd0gxzmfr9zyj5ktpwy6c3wfhxm6q58q3lzgy5" "${TOKEN_ID}"  "${META_DATA}"

# output
⛓  Constraints

 •  'arc721_3lzgy5.aleo/mint' - 2,020 constraints (called 1 time)

➡️  Output

 • {
  owner: aleo1jxpthhnm4yv5kly69a80cd0gxzmfr9zyj5ktpwy6c3wfhxm6q58q3lzgy5.private,
  id: {
    token_number: 0u128.private,
    collection_number: 0u128.private
  },
  metadata_uri: {
    part0: 140152554740597502496524452237299901250u128.private,
    part1: 133324194421918155921132289162654938981u128.private,
    part2: 93509703548909910993375653557521895508u128.private,
    part3: 147831289382731815962129268963868147712u128.private
  },
  _nonce: 3814838936242381853025476834297376588098644280443556741778925930917064028448group.public
}

```
