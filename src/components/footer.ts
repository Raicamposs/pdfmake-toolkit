import { Content, ContextPageSize } from 'pdfmake/interfaces'
import { TextField } from './fields'


export const footer = (
  currentPage: number,
  pageCount: number,
  pageSize: ContextPageSize,
): Content => {
  return {
    columns: [
      {
        width: 80,
        text: TextField.text(`${currentPage} de ${pageCount}`)
          .setFontSize('ExtraSmall')
          .setAlignment('right')
          .setMargin([0, 5, 10, 0])
          .build(),
      },
    ],
    margin: [10, 0],
  }
}
