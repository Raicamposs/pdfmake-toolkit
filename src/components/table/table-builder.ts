import { ContentTable, Size, Table, TableCell } from 'pdfmake/interfaces'
import { TextField } from '../fields'

type TableProperties = {
  headerRows: Table['headerRows']
  layout:
    | 'noBorders'
    | 'headerLineOnly'
    | 'lightHorizontalLines'
    | 'interleavedColorTableLayout'
}

export type Header = {
  text: string
  width: Size
  style?: string
}

export class TableBuilder {
  private headers: TableCell[] = []
  private widths: Size[] = []
  private rows: TableCell[][] = []
  private props: TableProperties = {
    layout: 'interleavedColorTableLayout',
    headerRows: 1,
  }

  static create() {
    return new TableBuilder()
  }

  setLayout(layout: TableProperties['layout']) {
    this.props.layout = layout
    return this
  }

  buildDefaultHeader(text: string) {
    return TextField.text(text)
      .setFontSize('ExtraSmall')
      .setColor('#404040')
      .setMargin({
        bottom: 2,
      })
  }

  addHeader(text: string, width: Size) {
    const header = this.buildDefaultHeader(text).build()
    return this.addHeaderCustom(header, width)
  }

  addHeaderCenter(text: string, width: Size) {
    const header = this.buildDefaultHeader(text).setAlignment('center').build()
    return this.addHeaderCustom(header, width)
  }

  addHeaderLeft(text: string, width: Size) {
    const header = this.buildDefaultHeader(text).setAlignment('left').build()
    return this.addHeaderCustom(header, width)
  }

  addHeaderRight(text: string, width: Size) {
    const header = this.buildDefaultHeader(text).setAlignment('right').build()
    return this.addHeaderCustom(header, width)
  }

  addHeaderCustom(header: TableCell, width: Size) {
    this.widths.push(width)
    this.headers.push(header)
    return this
  }

  addRow(row: TableCell[]) {
    this.rows.push(row)
    return this
  }

  build(): ContentTable {
    return {
      layout: this.props.layout,
      table: {
        headerRows: this.props.headerRows,
        body: [this.headers, ...this.rows],
        widths: this.widths,
      },
    }
  }
}
