export function normalizeMobile(input: string): string {
  let phone = input.replace(/\s|-/g, '')

  if (phone.startsWith('+98')) phone = phone.slice(3)
  if (phone.startsWith('98')) phone = phone.slice(2)
  if (phone.startsWith('0')) phone = phone.slice(1)

  if (!/^9\d{9}$/.test(phone)) throw new Error('Invalid mobile number')

  return '98' + phone
}
