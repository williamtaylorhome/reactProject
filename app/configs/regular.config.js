// Commonly used regular rules
// eslint-disable-next-line
export const regExpConfig = {
  IDcard: /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/, // ID card
  mobile: /^1([3|4|5|7|8|])\d{9}$/, // phone number
  telephone: /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/, // Fixed telephone
  num: /^[0-9]*$/, // number
  phoneNo: /(^1([3|4|5|7|8|])\d{9}$)|(^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$)/, // Phone or cell phone
  policeNo: /^[0-9A-Za-z]{4,10}$/, // Account number 4 consists of 10 digits or letters
  pwd: /^[0-9A-Za-z]{6,16}$/, // The password consists of 6 16 digits or letters
  isNumAlpha: /^[0-9A-Za-z]*$/, // letters or numbers
  isAlpha: /^[a-zA-Z]*$/, // Whether letters
  isNumAlphaCn: /^[0-9a-zA-Z\u4E00-\uFA29]*$/, // Whether it is numbers or letters or Chinese characters
  isPostCode: /^[\d-]*$/i, // Is the zip code
  isNumAlphaUline: /^[0-9a-zA-Z_]*$/, // Whether it is numbers, letters or underscores
  isNumAndThanZero: /^([1-9]\d*(\.\d+)?|0)$/, // Is it an integer and greater than 0/^[1 9]\d*(\.\d+)?$/
  isNormalEncode: /^(\w||[\u4e00-\u9fa5]){0,}$/, // Whether it is a non-special character (including numbers, letters and underlines in Chinese)
  isTableName: /^[a-zA-Z][A-Za-z0-9#$_-]{0,29}$/, // Table Name
  isInt: /^-?\d+$/, // integer
  isTableOtherName: /^[\u4e00-\u9fa5]{0,20}$/, // Alias
// isText_30: /^(\W|\w{1,2}){0,15}$/, //Regular
// isText_20: /^(\W|\w{1,2}){0,10}$/, //Regular
  isText_30: /^(\W|\w{1}){0,30}$/, // Match 30 characters. The characters can be letters, numbers, underscores, and non-letters. One Chinese character counts as 1 character.
  isText_50: /^(\W|\w{1}){0,50}$/, // Match 50 characters. The characters can be letters, numbers, underscores, and non-letters. One Chinese character counts as 1 character.
  isText_20: /^(\W|\w{1}){0,20}$/, // Match 20 characters. The characters can be letters, numbers, underscores, and non-letters. One Chinese character counts as 1 character.
  isText_100: /^(\W|\w{1}){0,100}$/, // Match 100 characters. The characters can be letters, numbers, underscores, and non-letters. One Chinese character counts as 1 character.
  isText_250: /^(\W|\w{1}){0,250}$/, // Match 250 characters. The characters can be letters, numbers, underscores, and non-letters. One Chinese character counts as 1 character.
  isNotChina: /^[^\u4e00-\u9fa5]{0,}$/, // Not a Chinese IDcard: /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([ 0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/, //ID card
  IDcardAndAdmin: /^(([1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X))|(admin))$/, // ID card or admin account
  IDcardTrim: /^\s*(([1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3})|([1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X))|(admin))\s*$/, // ID card
  num1: /^[1-9]*$/, // number
  companyNO: /^qqb_[0-9a-zA-Z_]{1,}$/, // Company personnel account
  imgType: /image\/(png|jpg|jpeg|gif)$/, // Upload image type
  isChina: /^[\u4e00-\u9fa5]{2,8}$/,
  isNozeroNumber: /^\+?[1-9]\d*$/, // positive integer greater than zero
  float: /^\d+(\.?|(\.\d+)?)$/, // Matches positive integers or decimals or 0. This special value
}

