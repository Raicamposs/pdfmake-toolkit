
import { isEmpty } from '@raicamposs/toolkit'
import { Content, ContentImage } from 'pdfmake/interfaces'

export const Logo = (
  image: string | undefined | null,
): ContentImage | Content => {
  if (!isEmpty(image))
    return {
      image: image!,
      width: 35,
      height: 35,
      fit: [35, 35],
    }

  return []
}
