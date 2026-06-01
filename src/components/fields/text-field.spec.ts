import { describe, it, expect } from 'vitest'
import { TextField } from './text-field'
import { FontSizesValues } from '../../types/font-sizes'

describe('TextField', () => {
  it('deve criar uma instancia corretamente', () => {
    const text = TextField.text('Hello')
    expect(text.build()).toMatchObject({ text: 'Hello' })
  })

  it('deve permitir text numerico e booleano', () => {
    expect(TextField.text(123).build()).toMatchObject({ text: '123' })
    expect(TextField.text(true).build()).toMatchObject({ text: 'true' })
  })

  it('deve aplicar titleCase corretamente', () => {
    const text = TextField.titleCase('HELLO WORLD')
    expect(text.build()).toMatchObject({ text: 'Hello World' })
  })

  it('deve aplicar padding de codigos numericos', () => {
    const text = TextField.code(123)
    expect(text.build()).toMatchObject({ text: '000123' })
    
    const textCustom = TextField.code(12, 4)
    expect(textCustom.build()).toMatchObject({ text: '0012' })
  })

  it('deve truncar strings longas com withLength', () => {
    const text = TextField.text('Muito longo string').withLength(5)
    expect(text.build()).toMatchObject({ text: 'Muito...' })
  })

  it('nao deve truncar se o limite for maior que a string', () => {
    const text = TextField.text('Curto').withLength(10)
    expect(text.build()).toMatchObject({ text: 'Curto' })
  })

  it('deve aplicar fontes e tamanhos', () => {
    const text = TextField.text('Font')
      .setFont('Roboto')
      .setFontSize(12)
    
    expect(text.build()).toMatchObject({ text: 'Font', font: 'Roboto', fontSize: 12 })

    const textEnum = TextField.text('Enum').setFontSize('ExtraSmall')
    expect(textEnum.build()).toMatchObject({ text: 'Enum', fontSize: FontSizesValues['ExtraSmall'] })
  })

  it('deve aplicar propriedades de estilizacao', () => {
    const text = TextField.text('Estilo')
      .setStyle('h1')
      .setLineHeight(1.5)
      .bold()
      .italics()
      .setAlignment('center')
      .setCharacterSpacing(2)
      .setColor('#ff0000')

    expect(text.build()).toMatchObject({
      text: 'Estilo',
      style: 'h1',
      lineHeight: 1.5,
      bold: true,
      italics: true,
      alignment: 'center',
      characterSpacing: 2,
      color: '#ff0000'
    })
  })

  it('deve aplicar condicional boldIf e highlightIf', () => {
    const t1 = TextField.text('Cond').boldIf(true).highlightIf(true, '#000')
    expect(t1.build()).toMatchObject({ text: 'Cond', bold: true, color: '#000' })

    const t2 = TextField.text('Cond').boldIf(false).highlightIf(false)
    expect(t2.build()).toMatchObject({ bold: false, color: '#545454' })
  })

  it('deve aplicar background e markerColor', () => {
    const t = TextField.text('Fundo').setBackground('#ccc').setMarkerColor('#111')
    expect(t.build()).toMatchObject({ text: 'Fundo', background: '#ccc', markerColor: '#111' })
  })

  it('deve aplicar decorations', () => {
    const t1 = TextField.text('Dec').setDecoration('underline')
    expect(t1.build()).toMatchObject({ text: 'Dec', decoration: 'underline' })

    const t2 = TextField.text('Dec').setDecoration('underline', { style: 'dashed', color: '#f00' })
    expect(t2.build()).toMatchObject({ text: 'Dec', decoration: 'underline', decorationStyle: 'dashed', decorationColor: '#f00' })
  })

  it('deve aplicar margins', () => {
    const t1 = TextField.text('M1').setMargin([10, 20, 10, 20])
    expect(t1.build()).toMatchObject({ text: { text: 'M1' }, margin: [10, 20, 10, 20] }) 

    const t2 = TextField.text('M2').setMargin({ top: 1, right: 2, bottom: 3, left: 4 })
    expect(t2.build()).toMatchObject({ text: { text: 'M2' }, marginTop: 1, marginRight: 2, marginBottom: 3, marginLeft: 4 })
  })
})
