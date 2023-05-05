export const VALIDATION_DIGIT = /^\d+$/;
export const VALIDATION_PHONE_NUMBER = /^(?:98|\+98|0098|0)?9[0-9]{9}$/
export const VALIDATION_POSTAL_CODE = /\b(?!(\d)\1{3})[13-9]{4}[1346-9][013-9]{5}\b/;
export const VALIDATION_PASSWORD =/^[A-Za-z0-9]*$/
export const VALIDATION_PERSIAN_ALPHABET = /^[\u0600-\u06FF\s]+$/
export const VALIDATION_NATIONAL_CODE = /^[0-9]{10}$/
export const VALIDATION_EMAIL = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
export const VALIDATION_MAP_POSITION = /^-?\d{1,2}\.\d{1,5}$/
