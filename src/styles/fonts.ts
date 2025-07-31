import { resolve } from 'node:path'

const path = resolve(__dirname, '..', 'fonts')
export const fonts = {
  Roboto: {
    normal: `${path}/Roboto-Regular.ttf`,
    bold: `${path}/Roboto-Medium.ttf`,
    italics: `${path}/Roboto-Italic.ttf`,
    bolditalics: `${path}/Roboto-MediumItalic.ttf`,
  },
  Arial: {
    normal: `${path}/ARIAL.TTF`,
    bold: `${path}/ARIALBD.TTF`,
    italics: `${path}/ARIALI.TTF`,
    bolditalics: `${path}/ARIALBI.TTF`,
  },
}
