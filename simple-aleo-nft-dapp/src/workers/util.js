export function getSettingsFromNumber(settingNum) {
  const bitStringArray = settingNum
    .toString(2)
    .padStart(32, "0")
    .split("")
    .reverse();
  console.log("bitStringArray", bitStringArray);
  return {
    initialized: bitStringArray[0] === "1",
    active: bitStringArray[1] === "1",
    whiteList: bitStringArray[2] === "1",
    frozen: bitStringArray[3] === "1",
  };
}
//test url
//https://aleo-public.s3.us-west-2.amazonaws.com/testnet3/privacy-pride/1.json
function getBit(setting) {
  return setting ? "1" : "0";
}

export function convertSettingsToNumber(settings) {
  console.log("call convertSettingsToNumber", settings);
  const { frozen, active, whiteList, initialized } = settings;
  console.log("after convertSettingsToNumber", settings);
  const bitString = `${getBit(frozen)}${getBit(whiteList)}${getBit(
    active
  )}${getBit(initialized)}`;

  console.log("bitString", bitString);
  return parseInt(bitString, 2);
}

export function safeParseInt(value) {
  const parsedValue = parseInt(value, 10);
  console.log("parsedValue", parsedValue);
  return isNaN(parsedValue) ? 0 : parsedValue;
}

export function stringToBigInt(input) {
  console.log("call stringToBigInt", stringToBigInt);
  console.log("input", input);
  const encoder = new TextEncoder();
  const encodedBytes = encoder.encode(input);
  console.log("encoder", encoder);
  console.log("encodedBytes", encodedBytes);

  let bigIntValue = BigInt(0);
  console.log("bigIntValue", bigIntValue);

  for (let i = 0; i < encodedBytes.length; i++) {
    const byteValue = BigInt(encodedBytes[i]);
    console.log("byteValue", byteValue);

    const shiftedValue = byteValue << BigInt(8 * i);
    console.log("shiftedValue", shiftedValue);

    bigIntValue = bigIntValue | shiftedValue;
    console.log("bigIntValue", bigIntValue);
  }

  return bigIntValue;
}

export function bigIntToString(bigIntValue) {
  console.log("call bigIntToString", bigIntToString);
  console.log("bigIntValue", bigIntValue);
  const bytes = [];
  let tempBigInt = bigIntValue;
  console.log("tempBigInt", tempBigInt);
  while (tempBigInt > BigInt(0)) {
    const byteValue = Number(tempBigInt & BigInt(255));
    console.log("byteValue", byteValue);

    bytes.push(byteValue);
    console.log("bytes", bytes);

    tempBigInt = tempBigInt >> BigInt(8);
    console.log("tempBigInt", tempBigInt);
  }

  const decoder = new TextDecoder();
  console.log("decoder", decoder);
  const asciiString = decoder.decode(Uint8Array.from(bytes));
  console.log("asciiString", asciiString);
  return asciiString;
}

export function splitStringToBigInts(input) {
  const chunkSize = 16;
  const numChunks = Math.ceil(input.length / chunkSize);
  const bigInts = [];
  console.log("numChunks", numChunks);
  for (let i = 0; i < numChunks; i++) {
    const chunk = input.substr(i * chunkSize, chunkSize);
    console.log("chunk", chunk);

    const bigIntValue = stringToBigInt(chunk);
    console.log("bigIntValue", bigIntValue);

    bigInts.push(bigIntValue);
    console.log("bigInts", bigInts);
  }

  return bigInts;
}

export function joinBigIntsToString(bigInts) {
  let result = "";

  for (let i = 0; i < bigInts.length; i++) {
    const chunkString = bigIntToString(bigInts[i]);
    console.log("chunkString", chunkString);
    result += chunkString;
    console.log("result", result);
  }

  return result;
}

export function padArray(array, length) {
  const paddingLength = length - array.length;
  console.log("paddingLength", paddingLength);
  if (paddingLength <= 0) {
    return array;
  }

  const padding = Array(paddingLength).fill(BigInt(0));
  const paddedArray = array.concat(padding);
  console.log("padding", padding);
  console.log("paddedArray", paddedArray);
  return paddedArray;
}

export function parseStringToBigIntArray(input) {
  const bigIntRegex = /([0-9]+)u128/g;
  const matches = input.match(bigIntRegex);

  if (!matches) {
    return [];
  }
  console.log("bigIntRegex", bigIntRegex);
  console.log("matches", matches);

  const bigInts = matches.map((match) => BigInt(match.slice(0, -4)));
  console.log("bigInts", bigInts);
  return bigInts;
}

export function getPublicKeyFromFuture(input) {
  const keyRegex = /([0-9]+)field/g;
  const matches = input.match(keyRegex);

  if (!matches) {
    return "";
  }
  console.log("keyRegex", keyRegex);
  console.log("matches", matches);
  return matches[0];
}

export function getRandomElement(list) {
  const randomIndex = Math.floor(Math.random() * list.length);
  console.log("randomIndex", randomIndex);
  console.log("list[randomIndex]", list[randomIndex]);
  return list[randomIndex];
}

export const removeVisibilitySuffix = (str) => {
  console.log("str.replace(/.public$|.private$/,");
  return str.replace(/\.public$|\.private$/, "");
};

// Example Usage
// const settingsNumber = 9;
// const settingsObject = getSettingsFromNumber(settingsNumber);
// console.log("Settings Object:", settingsObject);

// const newSettings = {
//   initialized: true,
//   active: false,
//   whiteList: true,
//   frozen: false,
// };
// console.log("newSettings", newSettings);
// const newSettingsNumber = convertSettingsToNumber(newSettings);
// console.log("New Settings Number:", newSettingsNumber);

// const stringValue = "Aleo Privacy";
// const stringToBigIntValue = stringToBigInt(stringValue);
// console.log("String to BigInt:", stringToBigIntValue);

// const bigIntToStringValue = bigIntToString(stringToBigIntValue);
// console.log("BigInt to String:", bigIntToStringValue);

// const splitString = "0123456789ABCDEFGH";
// const splitBigInts = splitStringToBigInts(splitString);
// console.log("Split String to BigInts:", splitBigInts);

// const joinedString = joinBigIntsToString(splitBigInts);
// console.log("Join BigInts to String:", joinedString);

// const arrayToPad = [BigInt(123), BigInt(456)];
// const paddedArray = padArray(arrayToPad, 5);
// console.log("Padded Array:", paddedArray);

// const inputString = "123u128 456u128 789u128";
// const parsedBigIntArray = parseStringToBigIntArray(inputString);
// console.log("Parsed BigInt Array:", parsedBigIntArray);

// const futureInput = "123field 456field 789field";
// const publicKeyFromFuture = getPublicKeyFromFuture(futureInput);
// console.log("Public Key from Future:", publicKeyFromFuture);

// const sampleList = [1, 2, 3, 4, 5];
// const randomElement = getRandomElement(sampleList);
// console.log("Random Element:", randomElement);

// const visibilityString = "example.public";
// const withoutVisibilitySuffix = removeVisibilitySuffix(visibilityString);
// console.log("Without Visibility Suffix:", withoutVisibilitySuffix);

export  function urlToAsciiPadding(url) {
  console.log("-----------------------------");
  console.log("-----------urlToAsciiPadding------------------");
  const asciiString = bigIntToString(stringToBigInt(url));
  const asciiBigInts = splitStringToBigInts(asciiString);
  const paddedAsciiBigInts = padArray(asciiBigInts, 8);
  const paddedAsciiString = joinBigIntsToString(paddedAsciiBigInts);

  return paddedAsciiString;
}

// 예시 URL
//const exampleUrl ="https://aleo-public.s3.us-west-2.amazonaws.com/testnet3/privacy-pride/1.json";
const exampleUrl = "https://google.com/";
// URL을 아스키코드 8비트로 변환하고 0으로 패딩
const paddedAsciiUrl = urlToAsciiPadding(exampleUrl);
console.log("paddedAsciiUrl", paddedAsciiUrl);
console.log("Padded Ascii URL:", paddedAsciiUrl);
