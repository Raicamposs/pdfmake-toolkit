import { ContentStack } from 'pdfmake/interfaces'
import { NumberField, TextField } from './fields'

export const DisplaySum = (
  value: number,
  label: string = 'Total',
): ContentStack => {
  return {
    stack: [
      {
        marginBottom: 2,
        text: TextField.text(label)
          .setFontSize('ExtraSmall')
          .setAlignment('left')
          .build(),
      },
      NumberField.currency(value)
        .highlightsNegative()
        .setAlignment('left')
        .setFontSize('Standard')
        .bold()
        .build(),
    ],
  }
}
