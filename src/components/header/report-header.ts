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
      text: TextField.text(title).setStyle('reportHeaderTitle').build(),
    },
  ]

  for (const element of subtitles) {
    stack.push(
      TextField.text(element).setStyle('reportHeaderSubtitle').build(),
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
