import { CustomTableLayout } from 'pdfmake/interfaces'

export const interleavedColorTableLayout: CustomTableLayout = {
  defaultBorder: true,
  hLineColor: () => {
    return '#8C8C8C'
  },
  fillColor: (rowIndex, node) => {
    if (rowIndex === node.table.body.length - 1) {
      return null
    }
    return rowIndex % 2 === 1 ? '#F4F3F4' : null
  },
  hLineWidth: (i, node) => {
    return i === 1 || i === node.table.body.length - 1 ? 0.3 : 0
  },
  vLineWidth: () => {
    return 0
  },
  paddingLeft: () => {
    return 0
  },
  paddingRight: () => {
    return 0
  },
  paddingTop: () => {
    return 1
  },
  paddingBottom: () => {
    return 1
  },
}
