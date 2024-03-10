# private_bank_program_3lzgy5.aleo

## Build Guide

To compile this Aleo program, run:

```bash
snarkvm build
```

To execute this Aleo program, run:

```bash
snarkvm run hello
```

### local issue

```bash
       Leo ✅ Compiled 'main.leo' into Aleo instructions

⛓  Constraints

 •  'private_bank_program_3lzgy5.aleo/issue' - 2,026 constraints (called 1 time)

➡️  Output

 • {
  owner: aleo1jxpthhnm4yv5kly69a80cd0gxzmfr9zyj5ktpwy6c3wfhxm6q58q3lzgy5.private,
  amount: 100u64.private,
  _nonce: 378142707435168756146441612696614630518183926095885898477773977541661714028group.public
}
```

### local deposit

```bash
# input
leo run deposit '{  owner: aleo1jxpthhnm4yv5kly69a80cd0gxzmfr9zyj5ktpwy6c3wfhxm6q58q3lzgy5.private, amount: 100u64.private, _nonce:378142707435168756146441612696614630518183926095885898477773977541661714028group.public}' 30u64

# output

⛓  Constraints

 •  'private_bank_program_3lzgy5.aleo/deposit' - 3,452 constraints (called 1 time)

➡️  Outputs

 • {
  owner: aleo1jxpthhnm4yv5kly69a80cd0gxzmfr9zyj5ktpwy6c3wfhxm6q58q3lzgy5.private,
  amount: 70u64.private,
  _nonce: 6039324115245876006914102862182350241397452073825771439193674312574115728239group.public
}
 • {
  program_id: private_bank_program_3lzgy5.aleo,
  function_name: deposit,
  arguments: [
    3243489098982239119410182225740130895599795847078236044750469829333518053861field,
    30u64
  ]
}
```

### local withdraw

```bash
# input
leo run withdraw ${ALEO_ADDRESS} 50u64 1234u64 15u64

# output
       Leo ✅ Compiled 'main.leo' into Aleo instructions

⛓  Constraints

 •  'private_bank_program_3lzgy5.aleo/withdraw' - 48,991 constraints (called 1 time)

➡️  Outputs

 • {
  owner: aleo1jxpthhnm4yv5kly69a80cd0gxzmfr9zyj5ktpwy6c3wfhxm6q58q3lzgy5.private,
  amount: 266u64.private,
  _nonce: 2566641736554063793776762653760216119765903023594860725409371451880959127929group.public
}
 • {
  program_id: private_bank_program_3lzgy5.aleo,
  function_name: withdraw,
  arguments: [
    3243489098982239119410182225740130895599795847078236044750469829333518053861field,
    50u64
  ]
}
```
