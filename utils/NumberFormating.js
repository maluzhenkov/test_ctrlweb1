// похоже NODE server не шарит за unit и maximumFractionDigits у Intl

export function currency(num, locale = 'ru-RU') {
  return (
    new Intl.NumberFormat(locale, { maximumFractionDigits: 0 }).format(num) +
    ' ₽'
  )
}

export function unit(num) {
  const kg = num / 1000
  if (kg >= 1) {
    return kg.toFixed(1) + ' кг'
  }
  return num + ' г'
}
