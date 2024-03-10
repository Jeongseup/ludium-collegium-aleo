function getSettingsFromNumber(settingNum) {
  const bitStringArray = settingNum
    .toString(2)
    .padStart(32, '0')
    .split('')
    .reverse();
  console.log('bitStringArray', bitStringArray);
  return {
    initialized: bitStringArray[0] === '1',
    active: bitStringArray[1] === '1',
    whiteList: bitStringArray[2] === '1',
    frozen: bitStringArray[3] === '1',
  };
}

function getBit(setting) {
  return setting ? '1' : '0';
}

function convertSettingsToNumber(settings) {
  console.log('call convertSettingsToNumber', settings);
  const { frozen, active, whiteList, initialized } = settings;
  console.log('after convertSettingsToNumber', settings);
  const bitString = `${getBit(frozen)}${getBit(whiteList)}${getBit(
    active
  )}${getBit(initialized)}`;

  console.log('bitString', bitString);
  return parseInt(bitString, 2);
}

function safeParseInt(value) {
  const parsedValue = parseInt(value, 10);
  console.log('parsedValue', parsedValue);
  return isNaN(parsedValue) ? 0 : parsedValue;
}

// 이 로직의 목적은 문자열을 UTF-8 바이트 시퀀스로 인코딩한 후, 그 바이트 시퀀스를 하나의 큰 정수로 표현하여,
// 예를 들어 암호화나 해싱 작업에서 사용할 수 있는 형태로 만든다.
//하지만, 이 구현에는 바이트 순서를 기준으로 왼쪽 시프트를 사용하는 방식 때문에, \
//문자열의 길이가 길어질수록 더 많은 비트를 시프트해야 하며,
// 이는 특정 길이 이상에서는 예상치 못한 결과를 초래할 수 있다.
//게다가, 인코딩된 바이트를 누적할 때 사용하는 방식은 바이트 순서(빅 엔디언, 리틀 엔디언)에 대한 고려 없이 수행된다.
function stringToBigInt(input) {
  console.log('call stringToBigInt', stringToBigInt);
  console.log('input', input);

  //utf 8로 인코더 변수 설정
  //TextEncoder 인스턴스 생성: TextEncoder는 문자열을 UTF-8 바이트 시퀀스로 인코딩하는 데 사용된다.
  //이 예제에서는 encoder 변수에 TextEncoder의 새 인스턴스를 할당한다.
  const encoder = new TextEncoder();

  // 문자열 인코딩: encoder.encode(input) 메서드는 입력 문자열을 UTF-8로 인코딩하고, 그 결과를 Uint8Array로 반환한다.
  //이 배열은 인코딩된 문자열의 각 바이트를 담고 있다.
  const encodedBytes = encoder.encode(input);
  console.log('encoder', encoder);
  console.log('encodedBytes', encodedBytes);

  // BigInt 변수 초기화: bigIntValue는 인코딩된 바이트 값을 단일 BigInt 값으로 누적하기 위해 사용됩니다. 초기값은 0이다.
  let bigIntValue = BigInt(0);
  console.log('bigIntValue', bigIntValue);

  //인코딩된 바이트 배열의 길이만큼 순회
  //   encodedBytes Uint8Array(16) [
  //     98,  97, 102, 107, 114,
  //    101, 105,  98, 106, 102,
  //    111, 108, 100, 107, 117,
  //     50
  //  ]
  for (let i = 0; i < encodedBytes.length; i++) {
    //바이트 시퀀스를 BigInt로 변환: 인코딩된 바이트 배열을 순회하며 각 바이트를 BigInt로 변환한다.
    //이 때, 각 바이트는 해당 바이트의 위치에 따라 적절한 비트만큼 왼쪽으로 시프트된다.
    //예를 들어, 첫 번째 바이트(가장 낮은 주소를 가진 바이트)는 시프트되지 않고,
    //두 번째 바이트는 8비트, 세 번째 바이트는 16비트, 이런 식으로 왼쪽으로 시프트된다.
    const byteValue = BigInt(encodedBytes[i]);
    console.log('byteValue', byteValue);

    const shiftedValue = byteValue << BigInt(8 * i);
    console.log('shiftedValue', shiftedValue);

    // BigInt 값의 누적: 각 바이트를 해당하는 비트 위치로 시프트한 후, 이를 bigIntValue에 누적한다.
    // 누적은 비트 OR 연산(|)을 사용하여 수행된다. 이 과정을 통해 모든 인코딩된 바이트가 하나의 BigInt 값으로 합쳐진다.
    bigIntValue = bigIntValue | shiftedValue;
    console.log('bigIntValue', bigIntValue);
  }

  // 결과 반환: 마지막으로, 모든 바이트가 BigInt 값으로 변환되고 누적된 후, 이 BigInt 값이 함수의 결과로 반환한다.
  return bigIntValue;
}

function bigIntToString(bigIntValue) {
  console.log('call bigIntToString', bigIntToString);
  console.log('bigIntValue', bigIntValue);
  const bytes = [];
  let tempBigInt = bigIntValue;
  console.log('tempBigInt', tempBigInt);
  while (tempBigInt > BigInt(0)) {
    const byteValue = Number(tempBigInt & BigInt(255));
    console.log('byteValue', byteValue);

    bytes.push(byteValue);
    console.log('bytes', bytes);

    tempBigInt = tempBigInt >> BigInt(8);
    console.log('tempBigInt', tempBigInt);
  }

  const decoder = new TextDecoder();
  console.log('decoder', decoder);
  const asciiString = decoder.decode(Uint8Array.from(bytes));
  console.log('asciiString', asciiString);
  return asciiString;
}

//이 함수의 목적은 긴 문자열을 작은 단위로 나누고, 각 단위를 독립적으로 BigInt 값으로 변환하여 처리하는 데 있다.
//이 방식은 특히 문자열이 매우 길거나, 문자열로부터 큰 숫자를 추출해야 하는 애플리케이션(예: 암호화, 대규모 수치 계산)에서 유용하다.
//stringToBigInt 함수의 구현 세부 사항에 따라, 각 청크의 변환 과정에서 데이터의 손실 없이 정확한 변환을 보장하기 위한 처리가 포함될 수 있다.
function splitStringToBigInts(input) {
  console.log('splitStringToBigInts', splitStringToBigInts);
  // 변수 설정 및 초기화:
  // chunkSize: 문자열을 나눌 크기를 정의합니다. 여기서는 16으로 설정되어 있어, 문자열을 16자리 문자열로 나눈다.
  // numChunks: 문자열을 chunkSize로 나눈 후 생성될 조각(청크)의 총 개수를 계산한다.
  // Math.ceil(input.length / chunkSize)를 통해 입력 문자열의 길이를 청크 크기로 나눈 값의 올림을 계산하여,
  // 입력 문자열을 완전히 커버할 수 있는 청크의 최소 개수를 결정한다.
  const chunkSize = 16;

  //Math.ceil() 함수는 주어진 숫자보다 크거나 같은 숫자 중 가장 작은 숫자를 integer 로 반환한다.
  const numChunks = Math.ceil(input.length / chunkSize);

  console.log('numChunks', numChunks);

  //bigInts 배열 초기화: 이 배열은 각 청크를 BigInt 값으로 변환한 결과를 저장하기 위해 사용된다.
  const bigInts = [];

  for (let i = 0; i < numChunks; i++) {
    //substr() 메서드는 문자열에서 특정 위치에서 시작하여 특정 문자 수 만큼의 문자들을 반환한다.
    // 문자열 분할 및 변환:
    // for 루프를 사용하여 입력 문자열을 여러 청크로 나눈다.
    //각 반복에서 i * chunkSize 위치에서 시작하여 chunkSize 길이만큼의 문자열 조각(청크)을 추출합니다. 이는 substr 메서드를 통해 수행된다.

    const chunk = input.substr(i * chunkSize, chunkSize);
    console.log('chunk', chunk);

    // 각 청크는 이전에 설명한 stringToBigInt 함수를 통해 BigInt 값으로 변환된다.
    //이 함수는 문자열을 UTF-8로 인코딩하고, 인코딩된 바이트를 하나의 BigInt 값으로 합친다.
    const bigIntValue = stringToBigInt(chunk);
    console.log('bigIntValue', bigIntValue);

    //배열에 bigIntValue 삽입
    bigInts.push(bigIntValue);
    console.log('bigInts', bigInts);
  }

  return bigInts;
}

function joinBigIntsToString(bigInts) {
  let result = '';

  for (let i = 0; i < bigInts.length; i++) {
    const chunkString = bigIntToString(bigInts[i]);
    console.log('chunkString', chunkString);
    result += chunkString;
    console.log('result', result);
  }

  return result;
}

// 이 함수는 배열의 길이를 특정 값으로 고정시키고 싶을 때 유용하며,
// 특히 BigInt 타입을 다루는 연산에서 필요한 배열 길이를 조정하는 데 사용된다.
//예를 들어, 암호화 알고리즘의 입력값으로 사용되는 배열이나, 데이터 전송 프로토콜에서 특정 길이의 메시지를 요구하는 경우에 적합하다.
//BigInt(0)으로 패딩하는 것은, 배열의 요소가 BigInt 타입일 때 타입의 일관성을 유지하기 위한 것이다.

function padArray(array, length) {
  // 패딩 길이 계산:
  // paddingLength는 원하는 최종 배열 길이(length)에서 현재 배열의 길이(array.length)를 뺀 값이다.
  // 이 값은 배열에 추가해야 할 0의 개수를 결정한다.
  const paddingLength = length - array.length;
  console.log('paddingLength', paddingLength);

  // 길이 조건 검사:
  // 만약 paddingLength가 0 이하라면, 즉 원하는 길이가 이미 현재 배열 길이보다 작거나 같다면, 추가적인 패딩 없이 원래의 배열을 그대로 반환한다.
  if (paddingLength <= 0) {
    return array;
  }

  // 패딩 생성 및 배열 확장:
  // Array(paddingLength).fill(BigInt(0))를 사용해, paddingLength 길이만큼의 새 배열을 생성하고, 모든 요소를 BigInt 타입의 0으로 채운다.
  // 이 패딩 배열을 원래의 배열 array에 concat 메서드를 사용하여 이어붙여, paddedArray라는 새로운 배열을 생성한다.
  // 이 과정에서 원래 배열의 모든 요소 뒤에 패딩이 추가된다.
  const padding = Array(paddingLength).fill(BigInt(0));
  const paddedArray = array.concat(padding);
  console.log('padding', padding);
  console.log('paddedArray', paddedArray);

  // 결과 반환:
  // 패딩이 추가된 새 배열 paddedArray를 반환한다.
  // 이 배열은 원하는 length 길이를 만족하게 된다.
  return paddedArray;
}

function parseStringToBigIntArray(input) {
  const bigIntRegex = /([0-9]+)u128/g;
  const matches = input.match(bigIntRegex);

  if (!matches) {
    return [];
  }
  console.log('bigIntRegex', bigIntRegex);
  console.log('matches', matches);

  const bigInts = matches.map((match) => BigInt(match.slice(0, -4)));
  console.log('bigInts', bigInts);
  return bigInts;
}

function getPublicKeyFromFuture(input) {
  const keyRegex = /([0-9]+)field/g;
  const matches = input.match(keyRegex);

  if (!matches) {
    return '';
  }
  console.log('keyRegex', keyRegex);
  console.log('matches', matches);
  return matches[0];
}

function getRandomElement(list) {
  const randomIndex = Math.floor(Math.random() * list.length);
  console.log('randomIndex', randomIndex);
  console.log('list[randomIndex]', list[randomIndex]);
  return list[randomIndex];
}

const removeVisibilitySuffix = (str) => {
  console.log('str.replace(/.public$|.private$/,');
  return str.replace(/\.public$|\.private$/, '');
};

// 예시 URL
//const exampleUrl ="https://aleo-public.s3.us-west-2.amazonaws.com/testnet3/privacy-pride/1.json";

// original ipfs://bafkreibjfoldku25lppuc2eqyrxw23ld7ljk24a3bxk5zlrs2f4xrxdzri/
const exampleUrl =
  'bafkreibjfoldku25lppuc2eqyrxw23ld7ljk24a3bxk5zlrs2f4xrxdzri';

// URL을 아스키코드 8비트로 변환하고 0으로 패딩
const splitUrl = splitStringToBigInts(exampleUrl);
console.log('splitUrl', splitUrl);

const paddedAsciiUrl = padArray(splitUrl, 4);
console.log('Padded Ascii URL:', paddedAsciiUrl);
