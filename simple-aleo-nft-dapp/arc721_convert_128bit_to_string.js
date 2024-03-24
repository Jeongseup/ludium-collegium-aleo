// 주어진 128비트 값
// const u128Value0_collection_num = BigInt(
//   "122921125932422346952394642653916961969"
// );

const u128Value0_collection_num = BigInt(
  "268826264694461553421063619632887168628"
);
//268826264694461553421063619632887168628u128
const u128Value0_base_uri = BigInt("140152554740597500994461819226067828736");

const u128Value1 = BigInt("8791151658256312720257277708017424861757091771485603744852737314846000970755563243580020629156420464148275613205966487651361276316158895564853234627348317980094516595959687274825387862437725780938369820616960142127");

// const u128Value1 = BigInt("140152554740597502496524452237299901250");
const test ="8791151658256312720257277708017424861757091771485603744852737314846000970755563243580020629156420464148275613205966487651361276316158895564853234627348317980094516595959687274825387862437725780938369820616960142127"
console.log("length check",test.length )

console.log("length check",test.length/4 )

const u128Value2 = BigInt("133324194421918155921132289162654938981");

const u128Value3 = BigInt("93509703548909910993375653557521895508");

const u128Value4 = BigInt("147831289382731815962129268963868147712");

// 128비트 값을 16진수 문자열로 변환
const hexString_coll_num = u128Value0_collection_num.toString(16);
const hexString_base_uri = u128Value0_base_uri.toString(16);

const hexString = u128Value1.toString(16);
const hexString2 = u128Value2.toString(16);

const hexString3 = u128Value3.toString(16);

const hexString4 = u128Value4.toString(16);

// 16진수 문자열을 아스키코드 8비트로 변환

// 128비트 값인 "140152554740597500994461819226067828736"을 아스키코드 8비트로 변환하기 위해서는
// 해당 값을 16진수 문자열로 변환한 뒤, 각 16진수 값을 8비트 아스키코드 문자로 매핑해야 합니다.
//아래는 JavaScript 코드를 사용한 예시입니다:
let asciiString = "";
let col_num = "";
let base_uri = "";
let metadata_1 = "";
let metadata_2 = "";
let metadata_3 = "";
let metadata_4 = "";
//hexString_coll_num;

console.log("hexString_coll_num", hexString_coll_num);

for (let i = 0; i < hexString_coll_num.length; i += 2) {
  const hexByte = hexString_coll_num.substr(i, 2);
  const decimalValue = parseInt(hexByte, 16);
  col_num += String.fromCharCode(decimalValue);
}

for (let i = 0; i < hexString_base_uri.length; i += 2) {
  const hexByte = hexString_base_uri.substr(i, 2);
  const decimalValue = parseInt(hexByte, 16);
  base_uri += String.fromCharCode(decimalValue);
}

for (let i = 0; i < hexString.length; i += 2) {
  const hexByte = hexString.substr(i, 2);
  const decimalValue = parseInt(hexByte, 16);
  asciiString += String.fromCharCode(decimalValue);
  metadata_1 += String.fromCharCode(decimalValue);
}
//asciiString += " ";

for (let i = 0; i < hexString2.length; i += 2) {
  const hexByte = hexString2.substr(i, 2);
  const decimalValue = parseInt(hexByte, 16);
  asciiString += String.fromCharCode(decimalValue);
  metadata_2 += String.fromCharCode(decimalValue);
}


for (let i = 0; i < hexString3.length; i += 2) {
  const hexByte = hexString3.substr(i, 2);
  const decimalValue = parseInt(hexByte, 16);
  asciiString += String.fromCharCode(decimalValue);
  metadata_3 += String.fromCharCode(decimalValue);
}


for (let i = 0; i < hexString4.length; i += 2) {
  const hexByte = hexString4.substr(i, 2);
  const decimalValue = parseInt(hexByte, 16);
  asciiString += String.fromCharCode(decimalValue);
  metadata_4 += String.fromCharCode(decimalValue);
}

console.log(
  "Original 128-bit Value u128Value0_collection_num:",
  u128Value0_collection_num.toString()
);
console.log(
  "Original 128-bit Value u128Value0_base_uri:",
  u128Value0_base_uri.toString()
);

console.log("Original 128-bit Value u128Value1 :", u128Value1.toString());
console.log("Original 128-bit Value u128Value2 :", u128Value2.toString());
console.log("Original 128-bit Value u128Value3 :", u128Value3.toString());
console.log("Original 128-bit Value u128Value4 :", u128Value4.toString());

console.log("col_num", col_num);
console.log("base_uri", base_uri);
console.log("Original metadata_1 ", metadata_1);
console.log("Original metadata_2 ", metadata_2);
console.log("Original metadata_3 ", metadata_3);
console.log("Original metadata_4", metadata_4);

console.log("ASCII String:", asciiString);
const int128Value = BigInt("122921125932422346952394642653916961969");
console.log(int128Value);
