import { toPersianDigits } from "./toPersianDigits";

var
persianNumbers = [/۰/g, /۱/g, /۲/g, /۳/g, /۴/g, /۵/g, /۶/g, /۷/g, /۸/g, /۹/g],
englishNumbers  = [/0/g, /1/g, /2/g, /3/g, /4/g, /5/g, /6/g, /7/g, /8/g, /9/g];

export const toEnDigits = (str : string) => {
  if(typeof str === 'string'){
    for(var i=0; i<10; i++){
      str = str.replace(persianNumbers[i], i).replace(englishNumbers[i], i);
    }
  }
  return str;
};



export const truncateNumber = (num : number | string, decimalPlaces : number) => {
  return Math.trunc(Number(num) * 10 ** decimalPlaces) / 10 ** decimalPlaces;
}



export const timeStampToPersianDate =(timestamp) => {
  return new Date(timestamp).toLocaleDateString('fa-IR');
}



export const  toPersianPrice = (Num) => {
  Num += '';
  Num = Num.replace(',', ''); Num = Num.replace(',', ''); Num = Num.replace(',', '');
  Num = Num.replace(',', ''); Num = Num.replace(',', ''); Num = Num.replace(',', '');
  let x = Num.split('.');
  let x1 = x[0];
  let x2 = x.length > 1 ? '.' + x[1] : '';
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1))
      x1 = x1.replace(rgx, '$1' + ',' + '$2');
  
      return toPersianDigits( x1 + x2)
}