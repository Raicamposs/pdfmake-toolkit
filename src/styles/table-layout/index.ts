import { CustomTableLayout } from 'pdfmake/interfaces'
import { interleavedColorTableLayout } from './interleaved-color-table-layout'

export const tableLayouts: Record<string, CustomTableLayout> = {
  default: interleavedColorTableLayout,
  interleavedColorTableLayout,
}
