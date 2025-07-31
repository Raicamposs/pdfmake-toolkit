import { ContentStack } from 'pdfmake/interfaces'
import { NumberField, TextField } from './fields'

export const DisplayCounter = (
  count: number,
  label: string = 'Registros',
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
      NumberField.integer(count)
        .setFontSize('Standard')
        .setAlignment('left')
        .bold()
        .build(),
    ],
  }
}
