import { randomModifier } from "../data/random";

export const isEmpty = (obj) => {
  for (const key in obj) {
    if (!obj[key]) {
      return true;
    }
    return false;
  }
};

// 이름에 따라 조사 바꾸기
export function Josa(txt, josa) {
  let code = txt.charCodeAt(txt.length - 1) - 44032;
  let cho = 19,
    jung = 21,
    jong = 28;
  let i1, i2, code1, code2;

  // 원본 문구가 없을때는 빈 문자열 반환
  if (txt.length == 0) return "";

  // 한글이 아닐때
  if (code < 0 || code > 11171) return txt;

  if (code % 28 == 0) return txt + Josa.get(josa, false);
  else return txt + Josa.get(josa, true);
}
Josa.get = function (josa, jong) {
  // jong : true면 받침있음, false면 받침없음

  if (josa == "을" || josa == "를") return jong ? "을" : "를";
  if (josa == "이" || josa == "가") return jong ? "이" : "가";
  if (josa == "은" || josa == "는") return jong ? "은" : "는";
  if (josa == "와" || josa == "과") return jong ? "와" : "과";

  // 알 수 없는 조사
  return "**";
};
// 출처 : https://taegon.kim/archives/24

// 랜덤 수식어 붙이기
export const addRandomModifier = (name) => {
  const randomNumber = getRandomNumber(0, randomModifier.length - 1);

  return `${randomModifier[randomNumber]} ${name}`;
};

const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
