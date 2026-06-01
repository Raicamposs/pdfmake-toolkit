import { coalesce } from '@raicampos/toolkit'
import { CustomTableLayout } from 'pdfmake/interfaces'
import { ThemeRegistry } from '../../components/theme/theme-registry'

export const customTableLayouts: Record<string, CustomTableLayout> = {
  customLayout01: {
    hLineWidth: (i, node) => {
      if (i === 0 || i === node.table.body.length) {
        return 0
      }
      return i === node.table.headerRows ? 2 : 1
    },
    vLineWidth: () => {
      return 0
    },
    hLineColor: (i) => {
      return i === 1 ? 'black' : '#bbbbbb'
    },
    paddingLeft: (i) => {
      return i === 0 ? 0 : 8
    },
    paddingRight: (i, node) => {
      return i === coalesce(node.table?.widths?.length, 0) - 1 ? 0 : 8
    },
    fillColor: (i, node) => {
      const colors = ThemeRegistry.getInstance().getColors()
      if (i === 0) {
        return colors.tableHeaderFill
      }
      if (i === node.table.body.length - 1) {
        return colors.tableFooterFill
      }

      return i % 2 === 0 ? colors.tableAlternateRowFill : null
    },
  },
  borderBlue: {
    hLineColor: () => ThemeRegistry.getInstance().getColors().tableBorderBlue,
    vLineColor: () => ThemeRegistry.getInstance().getColors().tableBorderBlue,
  },
}
