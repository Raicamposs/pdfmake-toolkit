import { coalesce } from '@raicamposs/toolkit'
import {
  CustomTableLayout
} from 'pdfmake/interfaces'

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
      if (i === 0) {
        return '#7b90be'
      }
      if (i === node.table.body.length - 1) {
        return '#acb3c1'
      }

      return i % 2 === 0 ? '#f3f3f3' : null
    },
  },
  borderBlue: {
    hLineColor: () => {
      return '#5f96d4'
    },
    vLineColor: () => {
      return '#5f96d4'
    },
  },
}
