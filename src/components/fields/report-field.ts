export type ReportFieldProps = {
  margin: [number, number, number, number] | [number, number] | number
  marginLeft: number
  marginTop: number
  marginRight: number
  marginBottom: number

  colSpan: number
  rowSpan: number
  width: number
}

export abstract class ReportField {
  private props: Partial<ReportFieldProps> = {}

  setMargin(
    margin:
      | ReportFieldProps['margin']
      | {
          top?: ReportFieldProps['marginTop']
          right?: ReportFieldProps['marginRight']
          bottom?: ReportFieldProps['marginBottom']
          left?: ReportFieldProps['marginLeft']
        },
  ) {
    if (typeof margin === 'object' && 'top' in margin) {
      this.props.marginTop = margin.top
      this.props.marginLeft = margin.left
      this.props.marginRight = margin.right
      this.props.marginBottom = margin.bottom
      return this
    }
    this.props.margin = margin as ReportFieldProps['margin']
    return this
  }

  setColSpan(colSpan: number) {
    this.props.colSpan = colSpan
    return this
  }

  setRowSpan(rowSpan: number) {
    this.props.rowSpan = rowSpan
    return this
  }

  setWidth(width: number) {
    this.props.width = width
    return this
  }

  build() {
    return this.props
  }
}
