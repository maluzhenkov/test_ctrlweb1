export const sortOptions = [
  {
    text: 'По возрастанию цены',
    value: 'ascPrice',
    handler(a, b) {
      return a.price - b.price
    },
  },
  {
    text: 'По убыванию  цены',
    value: 'descPrice',
    handler(a, b) {
      return b.price - a.price
    },
  },
  {
    text: 'По имени продукта',
    value: 'ascProductName',
    handler(a, b) {
      const strA = a.name.toLowerCase()
      const strB = b.name.toLowerCase()
      // сортируем строки по возрастанию
      if (strA < strB) return -1
      if (strA > strB) return 1
      return 0 // Никакой сортировки
    },
  },
]
