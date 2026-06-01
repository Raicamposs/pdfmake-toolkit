import { StyleDictionary } from 'pdfmake/interfaces'

/**
 * Tema padrão injetado no pdfmake para os componentes base da aplicação.
 */
export const baseThemeStyles: StyleDictionary = {
  header: {
    fontSize: 16,
    bold: true,
    color: '#333333',
    margin: [0, 0, 0, 10],
  },
  subheader: {
    fontSize: 14,
    bold: true,
    color: '#444444',
    margin: [0, 10, 0, 5],
  },
  small: {
    fontSize: 8,
    color: '#666666',
  },
}
