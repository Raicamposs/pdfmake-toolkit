import { Content } from 'pdfmake/interfaces'

export const Space = (size: 2 | 4 | 8 | 12 | 16 | 20 | 24): Content => {
  return {
    marginBottom: size,
    text: '',
  }
}
