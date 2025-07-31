import { Column, Content, ContentColumns } from "pdfmake/interfaces"


export class ColumnsBuilder {
  private data: {
    columns: Column[]
    columnGap: number
  } = {
      columns: [],
      columnGap: 10,
    }

  constructor(columnGap: number) {
    this.data.columnGap = columnGap
  }

  addColumn(width: number, builder: () => Content) {
    const content = builder()
    if (!content || typeof content !== 'object') {
      this.data.columns.push({
        width,
        text: content,
      })
      return this
    }

    this.data.columns.push({
      width,
      ...content
    })
    return this
  }

  build(): ContentColumns {
    return this.data
  }
}
