# store_3lzgy5.aleo

## Build Guide

To compile this Aleo program, run:

```bash
snarkvm build
```

To execute this Aleo program, run:

```bash
snarkvm run hello
```

Test Scripts

```bash
# test add item
leo run add_item 1u8 10u64 100u64


#token: Token = Token {
#  owner: aleo19q8lac65jcd3m7k4rzv9awrc0euwjhqj6yhcs5nzhrqsnce5zgfqupcr3w,\
#  amount: 10000u64,
#  _nonce: 1695607089910352802771013590414929058114897561850772609210967897257482934055group -> not required
#};

# test run
leo run buy '{
 owner: aleo1jxpthhnm4yv5kly69a80cd0gxzmfr9zyj5ktpwy6c3wfhxm6q58q3lzgy5.private,
  amount: 10000u64.private,
  _nonce: 6454746015393505811671401129091330549036205015618570235834391641324347085342group.public
}' \
  1u8 \
  5u64 \
  500u64

```

https://testnet3.aleoscan.io/program?id=store_3lzgy5.aleo
