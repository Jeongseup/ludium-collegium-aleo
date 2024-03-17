# Aleo Contest

## 알레오 콘테스트 1주차

- EIP들을 이더리움 해커톤에서 만들어졌다고 함. 그래서, 해커톤에서 반드시EIP 같은 느낌의 제안을 하는 것도 의미있음.

- sigmoid 함수 같은 걸 aleo public lib으로 만들어보는 건 어떨까?

- Decentralized SSL 도 재밌을 것 같음

- ludium에서 사용하기 위한 leo 기반 zk verfiable certificate 을 생성하게 해주는 걸 해보려고 함
  ludium 용 zk application

  1. 루디움 코스 완료에 대한 did vp + proof 해서 -> aleo chain 에 올리기
     -> 이번 콘테스트에서는 이거만 간략하게 돌아가게 해보려고 함
     -> 잘되면 대략 좀 정리해서 zPass에서 쓸 수 있도록 그리고 결국 각 이슈어가 저 스펙에 맞춰서 쓸 수 있도록 issuer 스펙을 정의해보는 것도 의미가 있을 것 같음

  2. 루디움 코스 완료에 대한 did vp + proof 해서 -> aleo chain 에 올리기
  3. eth, metamask did vp + proof 해서 aleo chain에 올리기

  - ref
    https://www.w3.org/TR/did-core/#example-a-simple-did-document
    https://devs.polygonid.com/
    https://github.com/hackathemy/polygon-id

## 알레오 콘테스트 2주차

지난번에 나온 아이디어들 중에 루디움 코스 완료한 사람들에 대해서 DID VC를 발급해주는 걸 만드려 보려고 함. 일단 아래 플로우를 만들어 보긴 했는데 어디까지가 가능한지 아닌지 잘 모르겠음

### Spec flow for building

폴리곤 ID에서 사용하던 VC 스펙은 어차피 알레오 재단에서 만들어 둔게 있는지 이미 좀 더 스펙이 정의된 라이브러리가 있는지 체크가 필요함

- https://devs.polygonid.com/docs/issuer/issuer-overview
- https://www.spruceid.dev/
- https://zpass.docs.aleo.org/

### Ludium did application sudo flow

#### 1. 루디움 DID 등록

- 루디움(issuer) 통해서, DID등록.

  - issuer의 역할 -> vc를 발급해주는데 있어서 필요한 건? 사용자의 DID?

- VC를 생성하기 위해서는 사용자의 DID가 필요.

  - 사용자의 DID값을 얻기 위하여 http://{{host}}:3000/v1/claim/authentication를 호출하여 authentication QR코드를 만들어서 인증을 받습니다.

- issuer's DID authentification

  1. 이거 aleo wallet에서 signing? 이런게 지원이 되어야 함 or

  2. auth contract 가 있어서 그걸 통해서 임시 did? 를 발급 받고 컨트랙트에 저장해야함

```go
// 아래 콜은 그럼 wallet interaction을 통해서 하거나 auth contract를 통해서 불러온 데이터를 바탕으로 아래 콜을 이뤄지게 함
// 결국에서 이슈어(루디움)는 요청한 userID에 따라서 type을 정의하고 그것에 따라서 json VC를 발급해줌.
var jsonData []byte
	if claimType == "builder" {
		jsonData, err = json.Marshal(makeClaimData(userID, tokenNumber))
	} else if claimType == "funder" {
		jsonData, err = json.Marshal(makeClaimData2(userID))
	} else {
		return c.String(http.StatusInternalServerError, "Error reading response")
	}
	if err != nil {
		return c.String(http.StatusInternalServerError, "Error marshaling JSON")
	}


func makeClaimData(userId string, tokenNumber int) DAOVerificationToken {
	credential := DAOVerificationToken{
		CredentialSchema: "ipfs://QmPX6sCNSzVDvrdz8fbaFfjckRqqXL4KPjpkhrLefVt4QN",
		Type:             "DAOVerificationToken",
		CredentialSubject: struct {
			ID    string `json:"id"`
			Token int    `json:"token"`
		}{
			ID:    userId,
			Token: tokenNumber,
		},
		SignatureProof: true,
		MtProof:        true,
	}
	return credential
}
```

그럼 발급된 VC는 아래와 같은 데이터를 갖게 됨. 루디움 백엔드에서 아래 데이터를 발급해줄 때 데이터 무결성에 대한 걸 어떻게 체크하지?

1. 루디움 디비는 유저가 접근은 못함. (다만 내 현재 정보를 알 수 있음)
2. 이슈어는 디비를 들어내지 않고, 유저의 vc를 무결한 상태로 발급했다! 라고 전달해주고 싶음 아 어차피 유저가 자기 vc랑 현재 정보를 보고 비교할 수 있으니 상관없음
3. 제 3자 입장에서 다른 유저의 발급된 vc를 어떻게 제대로 인증하지? -> 이건 미정, 일단 그냥 이슈어가 바보가 아닌 이상 정상적인 이슈어링을 할 것으로 가정

```json
// ipfs://QmPX6sCNSzVDvrdz8fbaFfjckRqqXL4KPjpkhrLefVt4QN
{
  "$metadata": {
    "type": "DAOVerificationToken",
    "uris": {
      "jsonLdContext": "ipfs://QmQb3pfSfmFZNQapcXk3zdnDnmmpqmiZ6YWFcCwyq14ajM"
    },
    "version": "3.0"
  },
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "description": "Verification for the membership of the DAO",
  "title": "DAOVerificationToken",
  "properties": {
    "@context": {
      "type": ["string", "array", "object"]
    },
    "expirationDate": {
      "format": "date-time",
      "type": "string"
    },
    "id": {
      "type": "string"
    },
    "issuanceDate": {
      "format": "date-time",
      "type": "string"
    },
    "issuer": {
      "type": ["string", "object"],
      "format": "uri",
      "properties": {
        "id": {
          "format": "uri",
          "type": "string"
        }
      },
      "required": ["id"]
    },
    "type": {
      "type": ["string", "array"],
      "items": {
        "type": "string"
      }
    },
    "credentialSubject": {
      "description": "Stores the data of the credential",
      "title": "Credential subject",
      "properties": {
        "id": {
          "description": "Stores the DID of the subject that owns the credential",
          "title": "Credential subject ID",
          "format": "uri",
          "type": "string"
        },
        "token": {
          "description": "To verify if you are a member of the dao",
          "title": "token",
          "type": "integer"
        }
      },
      "required": [],
      "type": "object"
    },
    "credentialSchema": {
      "properties": {
        "id": {
          "format": "uri",
          "type": "string"
        },
        "type": {
          "type": "string"
        }
      },
      "required": ["id", "type"],
      "type": "object"
    }
  },
  "required": [
    "@context",
    "id",
    "issuanceDate",
    "issuer",
    "type",
    "credentialSubject",
    "credentialSchema"
  ],
  "type": "object"
}
```

이후에 유저가 월렛? 이런 곳에 이 vc를 들고 있어야 하는데..

leo program을 통해서 on-chain proof generating을 하고 이걸 리턴 해준다음

#### VC proof generation

1. 원래는 폴리곤 ID는 유저들이 로컬에서 proof를 만들어서 on-chain verification을 하게 되는데 aleo에서는 유저들이 굳이 proof를 만들 필요 없음

2. proof generator contract가 있어서 이걸 통해서 private된 vc를 컨트랙트로부터 읽은 후에 이걸가지고 proof가 만들어진 후에 정상적으로 만들어졌다면.

3. proof는 컨트랙트에 저장(추후 재생성을 하지 않고 verify만 하고 넘어가면 되니까)

4. success proof generating or verify가 되면. 비즈니스 로직이 수행되어야함 -> ludium deposit contract가 있어서 or aleo learn 2 earn deposit contract가 있어서 수행을 완료한 사람에게 즉시 리워드 지급

### polygon id vc spec reference

```bash
# polygon id flow
1. 루디움에서 VC를 생성하기 위해서는 사용자의 DID가 필요함.

2. 사용자의 DID값을 얻기 위하여 http://{{host}}:3000/v1/claim/authentication를 호출하여 authentication QR코드를 만들어서 인증을 받음.


3. QRLINK에 있는 값으로 QRCODE를 생성 후 PoyglonID APP을 통하여 스캔 후 authentication을 진행

4. http://{{host}}:3000/v1/claim/{{sessionID}}위의 API를 통해서 받은 sessionID와 보유 토큰수를 입력하여 VC를 생성하는 QR코드 값을 받습니다.

5. 위의 API를 통해 받은 JSON데이터로 QRCODE를 생성 후 PoyglonID APP을 통하여 스캔하면 POLYGON-ID APP에 VC가 생성 됩니다.
(polygon id app에 모바일에 저장) -> 만약 모바일 어플이 없으면 컨트랙트에 스테이트 저장

6. http://{{host}}:3003/v1/contract/deploy를 호출하여 생성한 VC를 검증할 스마트컨트랙트를 배포하고 ZK로 어떤 내용을 검증할지 정의합니다.


# 그리고 밑에서는 그냥 etc 로직
아래의 예제는 votesTheshhold를 넘는 투표를 받으면 해당 컨트랙트가 가지고 있는 tokenAddress에 해당하는 토큰을 builder에게 전달하는 컨트랙트 예제 입니다. image

https://github.com/pjhnocegood/polygon-id/blob/main/on-chain-verification/contracts/TokenTransferContract.sol

투표를 하기 위한 QR코드를 만듭니다. iden3comm://?request_uri=http://{{host}}:3001/v1/votes/{{contractAddress}} image

PoyglonID APP을 통하여 스캔 후 ZK proof를 만들어 트랜잭션을 발생 시킵니다. image image image image

```
