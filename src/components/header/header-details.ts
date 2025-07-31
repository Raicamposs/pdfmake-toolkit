import { Content } from 'pdfmake/interfaces'

export const HeaderDetails = (...columns: Content[]): Content => {
  return [
    {
      margin: [0, 0, 0, 15],
      columns,
    },
  ]
}
