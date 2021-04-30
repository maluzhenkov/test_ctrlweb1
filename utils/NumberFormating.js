export function currency(num, locale = 'ru-RU', currency = 'RUB') {
  return Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(num)
}

export function unit(num, locale = 'ru-RU') {
  const kg = num / 1000
  if (kg >= 1) {
    return Intl.NumberFormat(locale, {
      style: 'unit',
      unit: 'kilogram',
      maximumFractionDigits: 1,
    }).format(kg)
  }
  return Intl.NumberFormat(locale, {
    style: 'unit',
    unit: 'gram',
  }).format(num)
}
