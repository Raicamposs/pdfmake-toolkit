import { Content, ContextPageSize } from 'pdfmake/interfaces'
import { DateField } from '../fields/date-field'

type HeadersProps = {
  currentPage: number
  pageCount: number
  pageSize: {
    height: number
    width: number
    orientation: 'portrait' | 'landscape'
  }
}

export class HeaderBuilder {
  private currentPage: HeadersProps['currentPage']
  private pageCount: HeadersProps['pageCount']
  private pageSize: HeadersProps['pageSize']

  constructor(props: HeadersProps) {
    this.currentPage = props.currentPage
    this.pageCount = props.pageCount
    this.pageSize = props.pageSize
  }

  build(): Content {
    return [
      DateField.now()
        .setFontSize('Small')
        .setStyle('overline')
        .setAlignment('right')
        .setMargin([0, 5, 10, 0])
        .build(),
    ]
  }
}

export const header = (
  currentPage: number,
  pageCount: number,
  pageSize: ContextPageSize,
): Content => {
  return [
    DateField.now()
      .setFontSize('Small')
      .setStyle('overline')
      .setAlignment('right')
      .setMargin([0, 5, 10, 0])
      .build(),
  ]
}
