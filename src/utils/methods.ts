const persianNumbers = [/۰/g, /۱/g, /۲/g, /۳/g, /۴/g, /۵/g, /۶/g, /۷/g, /۸/g, /۹/g];
const englishNumbers = [/0/g, /1/g, /2/g, /3/g, /4/g, /5/g, /6/g, /7/g, /8/g, /9/g];

export const toEnDigits = (str: string) => {
  if (typeof str === 'string') {
    for (let i = 0; i < 10; i++) {
      str = str.replace(persianNumbers[i], i.toString()).replace(englishNumbers[i], i.toString());
    }
  }
  return str;
};

export const truncateNumber = (num: number, decimalPlaces: number): number => {
  return Math.trunc(Number(num) * 10 ** decimalPlaces) / 10 ** decimalPlaces;
}

export const toPersianDigits = (requestDigits: string | number) => {
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];

  if (typeof requestDigits === 'number') {
    return requestDigits.toString().replace(/\d/g, (e) => persianDigits[parseInt(e)]);
  }

  if (typeof requestDigits === 'string') {
    return requestDigits.replace(/\d/g, (e) => persianDigits[parseInt(e)]);
  }

  return "";
};