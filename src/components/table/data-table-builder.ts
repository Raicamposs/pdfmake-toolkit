import { ContentTable, Size, TableCell } from 'pdfmake/interfaces'
import { TableBuilder } from './table-builder'

export class DataTableBuilder<T> {
  private items: T[]
  private tableBuilder: TableBuilder

  private columns: Array<{
    headerText: string
    headerAlignment: 'left' | 'center' | 'right'
    width: Size
    cellRenderer: (item: T) => TableCell
  }> = []

  private constructor(items: T[]) {
    this.items = items
    this.tableBuilder = TableBuilder.create()
  }

  static create<T>(items: T[]) {
    return new DataTableBuilder<T>(items)
  }

  setLayout(layout: Parameters<TableBuilder['setLayout']>[0]) {
    this.tableBuilder.setLayout(layout)
    return this
  }

  addColumn(
    headerText: string,
    width: Size,
    cellRenderer: (item: T) => TableCell,
    headerAlignment: 'left' | 'center' | 'right' = 'left'
  ) {
    this.columns.push({ headerText, width, cellRenderer, headerAlignment })
    return this
  }

  build(): ContentTable {
    if (this.columns.length === 0) {
      throw new Error('DataTableBuilder must have at least one column.')
    }

    // Apply headers
    this.columns.forEach((col) => {
      if (col.headerAlignment === 'center') {
        this.tableBuilder.addHeaderCenter(col.headerText, col.width)
      } else if (col.headerAlignment === 'right') {
        this.tableBuilder.addHeaderRight(col.headerText, col.width)
      } else {
        this.tableBuilder.addHeaderLeft(col.headerText, col.width)
      }
    })

    // Apply rows
    this.items.forEach((item) => {
      const row = this.columns.map((col) => col.cellRenderer(item))
      this.tableBuilder.addRow(row)
    })

    return this.tableBuilder.build()
  }
}
