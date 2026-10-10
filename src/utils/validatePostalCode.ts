export const INVALID_CHARACTER_TYPE_MESSAGE =
  '郵便番号は半⾓数字のみまたは半⾓数字とハイフンのみで⼊⼒してください。'
export const INVALID_LENGTH_OR_FORMAT_MESSAGE =
  '郵便番号は半⾓数字でハイフンありの 8 桁かハイフンなしの 7 桁で⼊⼒してください。'

export const validatePostalCode = (postalCode: string) => {
  if (!/^[0-9-]+$/.test(postalCode)) {
    return INVALID_CHARACTER_TYPE_MESSAGE
  }
  if (!/^(\d{7}|\d{3}-\d{4})$/.test(postalCode)) {
    return INVALID_LENGTH_OR_FORMAT_MESSAGE
  }
  return null
}
