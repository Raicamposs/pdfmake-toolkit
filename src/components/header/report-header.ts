import { Content } from 'pdfmake/interfaces'
import { TextField } from '../fields'
import { Logo } from '../logo'

export const ReportHeader = (
  title: string,
  image: string | undefined | null,
  ...subtitles: string[]
): Content => {
  const stack: Content[] = [
    {
      marginBottom: 4,
      text: TextField.text(title)
        .setFontSize('ExtraLarge')
        .setAlignment('justify')
        .bold()
        .build(),
    },
  ]

  for (const element of subtitles) {
    stack.push(
      TextField.text(element)
        .setAlignment('justify')
        .setFontSize('Small')
        .build(),
    )
  }

  return {
    alignment: 'left',
    marginBottom: 8,
    columns: [
      {
        width: '*',
        alignment: 'left',
        marginRight: 8,
        columnGap: 4,
        stack,
      },
      Logo(image),
    ],
  }
}
