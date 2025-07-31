import { Content } from 'pdfmake/interfaces'
import { TextField } from '../fields'

export const TableGroupHeader = (...values: string[]): Content => {
  return {
    columns: values.map((value, index) => {
      return {
        width: index === value.length - 1 ? '*' : 'auto',
        marginRight: index === value.length - 1 ? 0 : 2,
        text: TextField.text(value)
          .bold()
          .setFontSize('StandardPlus')
          .build(),
      }
    }),
  }
}

export const TableGroupSubHeader = (...values: string[]): Content => {
  return {
    columns: values.map((value, index) => {
      return {
        width: index === value.length - 1 ? '*' : 'auto',
        marginRight: index === value.length - 1 ? 0 : 2,
        text: TextField.text(value)
          .bold()
          .setFontSize('Standard')
          .build(),
      }
    }),
  }
}

export const EntityTableGroupHeader = (
  id: number | string,
  name: string,
): Content => {
  return {
    columns: [
      {
        width: '*',
        text: TextField.text(name)
          .bold()
          .setFontSize('StandardPlus')
          .build(),
      },
      typeof id === 'number'
        ? {
          width: 'auto',
          text: TextField.code(id)
            .bold()
            .setFontSize('StandardPlus')
            .build(),
        }
        : {
          width: 'auto',
          text: TextField.text(id)
            .bold()
            .setFontSize('StandardPlus')
            .build(),
        },
    ],
  }
}
