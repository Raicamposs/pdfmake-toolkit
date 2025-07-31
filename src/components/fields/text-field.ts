import { isAssigned, StringUtils } from '@raicamposs/toolkit'
import { ContentText } from 'pdfmake/interfaces'
import { Alignment, Color, Decoration, DecorationStyle } from '../../types'
import { FontSizes, FontSizesValues } from '../../types/font-sizes'

type TextFieldProperties = ContentText

export class TextField {
  private props: TextFieldProperties = {
    text: '',
    bold: false,
    italics: false,
    alignment: 'left',
    fontSize: 8,
    color: '#545454',
    font: 'Arial',
  }

  constructor(text: string) {
    this.props.text = text
  }

  static text(text: string | number | boolean) {
    return new TextField(text.toString())
  }
  static titleCase(text: string) {
    const titleCase = StringUtils.toTitleCase(text)
    return new TextField(titleCase)
  }

  static code(text: string | number, maxLength: number = 6) {
    return new TextField(text.toString().padStart(maxLength, '0'))
  }

  withLength(length: number) {
    const { text } = this.props

    if (typeof text !== 'string') {
      return this
    }

    if (!text || text.length <= length) {
      return this
    }

    this.props.text = text.substring(0, length) + '...'
    return this
  }

  setFont(font: string) {
    this.props.font = font
    return this
  }

  setFontSize(fontSize: FontSizes) {
    if (typeof fontSize === 'number') {
      this.props.fontSize = fontSize
      return this
    }
    this.props.fontSize = FontSizesValues[fontSize]
    return this
  }

  setStyle(style: string) {
    this.props.style = style
    return this
  }

  setLineHeight(lineHeight: number) {
    this.props.lineHeight = lineHeight
    return this
  }

  bold() {
    this.props.bold = true
    return this
  }

  italics() {
    this.props.italics = true
    return this
  }

  setAlignment(alignment: Alignment) {
    this.props.alignment = alignment
    return this
  }

  setCharacterSpacing(characterSpacing: number) {
    this.props.characterSpacing = characterSpacing
    return this
  }

  setColor(color: Color) {
    this.props.color = color
    return this
  }

  highlightIf(condition: boolean, color: Color = '#ff8080') {
    if (condition) {
      return this.setColor(color)
    }
    return this
  }

  boldIf(condition: boolean) {
    if (condition) {
      return this.bold()
    }
    return this
  }

  setBackground(background: Color) {
    this.props.background = background
    return this
  }

  setMarkerColor(markerColor: Color) {
    this.props.markerColor = markerColor
    return this
  }

  setDecoration(
    decoration: Decoration | Decoration[],
    options?: {
      style: DecorationStyle
      color: Color
    },
  ) {
    this.props.decoration = decoration

    if (isAssigned(options)) {
      this.props.decorationStyle = options.style
      this.props.decorationColor = options.color
    }

    return this
  }

  setMargin(
    margin:
      | TextFieldProperties['margin']
      | {
        top?: number
        right?: number
        bottom?: number
        left?: number
      },
  ) {
    if (typeof margin === 'object' && 'top' in margin) {
      this.props.marginTop = margin.top
      this.props.marginLeft = margin.left
      this.props.marginRight = margin.right
      this.props.marginBottom = margin.bottom
      return this
    }
    this.props.margin = margin as TextFieldProperties['margin']
    return this
  }

  build(): ContentText {
    const {
      marginTop,
      marginLeft,
      marginRight,
      marginBottom,
      margin,
      ...props
    } = this.props

    if (
      [marginTop, marginLeft, marginRight, marginBottom, margin].some(
        isAssigned,
      )
    ) {
      return {
        text: props,
        marginTop,
        marginLeft,
        marginRight,
        marginBottom,
        margin,
      }
    }

    return props
  }
}
