import { CustomTableLayout } from 'pdfmake/interfaces'
import { ThemeRegistry } from '../../components/theme/theme-registry'

export const interleavedColorTableLayout: CustomTableLayout = {
  defaultBorder: true,
  hLineColor: () => {
    return ThemeRegistry.getInstance().getColors().tableBorder
  },
  fillColor: (rowIndex, node) => {
    if (rowIndex === node.table.body.length - 1) {
      return null
    }
    return rowIndex % 2 === 1 ? ThemeRegistry.getInstance().getColors().tableAlternateRowFill : null
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
