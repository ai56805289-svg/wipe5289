// 문자 주문 설정 (번호는 노출 금지 - 버튼 기능만 사용)
const SMS_PHONE_NUMBER = "01056805289";
const SMS_DEFAULT_MESSAGE = "안녕하세요. CLEARMAX PRO 와이퍼 문자 주문 문의드립니다.\n\n차종: \n수량: 3쌍\n가격: 20,000원 (무료배송)\n\n주문 확인 부탁드립니다.";

function sendSMS(brand, model, adapter, size) {
  let msg;
  if (brand && model) {
    msg = `안녕하세요. CLEARMAX PRO 와이퍼 문자 주문 문의드립니다.\n\n차종: ${brand} ${model}\n어댑터: ${adapter}\n사이즈: ${size}\n수량: 3쌍\n가격: 20,000원 (무료배송)\n\n주문 확인 부탁드립니다.`;
  } else {
    msg = SMS_DEFAULT_MESSAGE;
  }
  const encoded = encodeURIComponent(msg);
  window.location.href = `sms:${SMS_PHONE_NUMBER}?body=${encoded}`;
}

// 67개 차종 호환 데이터
const wiperData = [
  { no: 1, brand: "BMW", model: "3 Series E90", adapter: "S510", size: '19"/24"' },
  { no: 2, brand: "BMW", model: "5 Series E60", adapter: "S500", size: '23"/24"' },
  { no: 3, brand: "BMW", model: "7 Series F01/F02", adapter: "S690", size: '18"/26"' },
  { no: 4, brand: "BMW", model: "X3 Series F25 / ActiveHybrid 7 / INDIVIDUAL", adapter: "S580", size: '20"/26"' },
  { no: 5, brand: "BMW", model: "X5 Series E70 2007-2011", adapter: "S580", size: '20"/24"' },
  { no: 6, brand: "BMW", model: "X5 Series E70 2012-2013", adapter: "S500", size: '20"/24"' },
  { no: 7, brand: "BMW", model: "X6 Series E71 2008-2012", adapter: "S580", size: '20"/24"' },
  { no: 8, brand: "BMW", model: "X6 Series E71 2013-2014", adapter: "S500", size: '20"/24"' },
  { no: 9, brand: "BMW", model: "5 Series 550i / NEW 5GT", adapter: "S690", size: '19"/26"' },
  { no: 10, brand: "BMW", model: "5 Series 535Li / F10/F11", adapter: "S690", size: '18"/26"' },
  { no: 11, brand: "BMW", model: "5 Series 528Li / F10/F11", adapter: "S690", size: '18"/26"' },
  { no: 12, brand: "BMW", model: "7 Series 730Li F01/F02 / NEW GT", adapter: "S690", size: '19"/26"' },
  { no: 13, brand: "BMW", model: "NEW 7 Series 730Li F01/F02 / NEW GT", adapter: "S690", size: '19"/26"' },
  { no: 14, brand: "BMW", model: "7 Series 750i", adapter: "S560", size: '19"/26"' },
  { no: 15, brand: "BMW", model: "NEW 7 Series 740Li / F10/F11/NEW GT", adapter: "S690", size: '19"/26"' },
  { no: 16, brand: "Benz", model: "S Class W221", adapter: "S560", size: '28"/28"' },
  { no: 17, brand: "Benz", model: "E Class W211", adapter: "S570", size: '26"/26"' },
  { no: 18, brand: "Benz", model: "C Class C203/W203", adapter: "S520", size: '22"/22"' },
  { no: 19, brand: "Benz", model: "C Class C204/W204", adapter: "S690", size: '24"/24"' },
  { no: 20, brand: "Benz", model: "C Class C200 / W204 2014", adapter: "S590", size: '22"/24"' },
  { no: 21, brand: "Benz", model: "C Class C260", adapter: "S590", size: '22"/24"' },
  { no: 22, brand: "Benz", model: "C Class C180", adapter: "S570", size: '24"/24"' },
  { no: 23, brand: "Benz", model: "C Class C200/W204", adapter: "S570", size: '24"/24"' },
  { no: 24, brand: "Benz", model: "C Class CLS350 / W219", adapter: "S570", size: '24"/24"' },
  { no: 25, brand: "Benz", model: "C Class C260/W204", adapter: "S590", size: '24"/24"' },
  { no: 26, brand: "Benz", model: "C Class C300/W204/W218", adapter: "S560", size: '24"/24"' },
  { no: 27, brand: "Benz", model: "C Class C200K/NEW CL 클래스", adapter: "S560", size: '26"/26"' },
  { no: 28, brand: "Benz", model: "E Class W212 2009-2014", adapter: "S560", size: '24"/26"' },
  { no: 29, brand: "Benz", model: "E Class W212 2014-now", adapter: "S500", size: '24"/24"' },
  { no: 30, brand: "Audi", model: "A6 C5/C6/C7 2006-2012", adapter: "S600", size: '22"/22"' },
  { no: 31, brand: "Audi", model: "A6 C5/C6/C7 2012-2016", adapter: "S630", size: '21"/26"' },
  { no: 32, brand: "Audi", model: "A6 2017", adapter: "S630", size: '21"/26"' },
  { no: 33, brand: "Audi", model: "A4 B8/B9 2009-now", adapter: "S630", size: '20"/24"' },
  { no: 34, brand: "Audi", model: "A4 B8/B9 2008-2015", adapter: "S630", size: '20"/24"' },
  { no: 35, brand: "Audi", model: "A8 4H/D4 2003-2008 /D3/4E", adapter: "S520", size: '24"/24"' },
  { no: 36, brand: "Audi", model: "A8 4H/D4 2009-now", adapter: "S630", size: '21"/27"' },
  { no: 37, brand: "Audi", model: "Q5 8R 2008-2013", adapter: "S630", size: '20"/24"' },
  { no: 38, brand: "Audi", model: "Q5 8R 2013-now", adapter: "S630", size: '20"/24"' },
  { no: 39, brand: "Audi", model: "Q7 4L 2006-2015", adapter: "S510", size: '24"/26"' },
  { no: 40, brand: "Audi", model: "Q7 4L 2015-now /4M/ NEW Q7", adapter: "S630", size: '20"/26"' },
  { no: 41, brand: "VW", model: "Passat / B6", adapter: "U-HOOK", size: '20"/21"' },
  { no: 42, brand: "VW", model: "New Passat", adapter: "S630", size: '19"/24"' },
  { no: 43, brand: "VW", model: "New Jetta", adapter: "S630", size: '19"/24"' },
  { no: 44, brand: "VW", model: "Tiguan", adapter: "S590", size: '21"/24"' },
  { no: 45, brand: "VW", model: "New Tiguan", adapter: "S630", size: '20"/24"' },
  { no: 46, brand: "BMW Mini", model: "Countryman", adapter: "S510", size: '19"/20"' },
  { no: 47, brand: "BMW Mini", model: "Faceman", adapter: "S510", size: '19"/20"' },
  { no: 48, brand: "BMW Mini", model: "Cooper Coupe", adapter: "S510", size: '18"/20"' },
  { no: 49, brand: "Jaguar", model: "XF", adapter: "S510", size: '19"/23"' },
  { no: 50, brand: "Jaguar", model: "NEW XE", adapter: "S590", size: '17"/26"' },
  { no: 51, brand: "Jaguar", model: "XJ", adapter: "S510", size: '19"/23"' },
  { no: 52, brand: "Chrysler", model: "NEW 300C", adapter: "U-HOOK", size: '22"/22"' },
  { no: 53, brand: "Lexus", model: "ES350", adapter: "U-HOOK", size: '19"/24"' },
  { no: 54, brand: "Lexus", model: "ES240", adapter: "U-HOOK", size: '19"/24"' },
  { no: 55, brand: "Lexus", model: "LS Series", adapter: "U-HOOK", size: '16"/24"' },
  { no: 56, brand: "Honda", model: "ACCORD", adapter: "U-HOOK", size: '22"/24"' },
  { no: 57, brand: "Ford", model: "TAURUS 2007-2008", adapter: "S510", size: '20"/24"' },
  { no: 58, brand: "Ford", model: "NEW TAURUS", adapter: "S510", size: '20"/26"' },
  { no: 59, brand: "Landrover", model: "DISCOVERY4", adapter: "U-HOOK", size: '22"/22"' },
  { no: 60, brand: "Landrover", model: "RANGEROVER (U-HOOK)", adapter: "U-HOOK", size: '20"/24"' },
  { no: 61, brand: "Landrover", model: "RANGEROVER (S580)", adapter: "S580", size: '22"/22"' },
  { no: 62, brand: "Landrover", model: "RANGEROVER Sport", adapter: "U-HOOK", size: '24"/24"' },
  { no: 63, brand: "Landrover", model: "FREELANDER", adapter: "U-HOOK", size: '20"/26"' },
  { no: 64, brand: "Landrover", model: "Evoque (S590)", adapter: "S590", size: '22"/24"' },
  { no: 65, brand: "Landrover", model: "Evoque (S590 21\")", adapter: "S590", size: '21"/23"' },
  { no: 66, brand: "Infiniti", model: "G35", adapter: "U-HOOK", size: '16"/26"' },
  { no: 67, brand: "Jeep", model: "WRANGLER", adapter: "U-HOOK", size: '15"/15"' }
];

const brandColors = {
  "BMW": "#0066cc",
  "Benz": "#666",
  "Audi": "#cc0000",
  "VW": "#1a7dc4",
  "BMW Mini": "#1a1a2e",
  "Jaguar": "#2d5a1b",
  "Chrysler": "#8b4513",
  "Lexus": "#8b0000",
  "Honda": "#cc0000",
  "Ford": "#003087",
  "Landrover": "#4a7c59",
  "Infiniti": "#333",
  "Jeep": "#5c7a3e"
};
