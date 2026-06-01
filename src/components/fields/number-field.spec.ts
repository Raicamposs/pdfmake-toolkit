import { describe, it, expect } from 'vitest'
import { NumberField } from './number-field'

describe('NumberField', () => {
  it('deve formatar inteiro corretamente', () => {
    const field = NumberField.integer(1234.56)
    expect(field.build()).toMatchObject({ text: '1.235', alignment: 'right' }) // roundABNT arredonda e locale pt-BR formata
  })

  it('deve formatar numero com options', () => {
    const field = NumberField.number(1234.567, { maximumFractionDigits: 1 })
    expect(field.build()).toMatchObject({ text: '1.234,6', alignment: 'right' }) // roundABNT(1234.567, 1) -> 1234.6 -> '1.234,6'
  })

  it('deve formatar porcentagem', () => {
    const field = NumberField.percent(0.1234) // 12.34% -> roundABNT to 2 fraction digits is early?
    // Wait, NumberField.percent uses roundABNT(coalesce(value, 0), 2). So 0.1234 becomes 0.12. Then toLocaleString('percent') -> 12%
    expect(field.build()).toMatchObject({ text: '12%', alignment: 'right' })
  })

  it('deve formatar moeda', () => {
    const field = NumberField.currency(1234.56)
    // O texto exato varia com a versão do Node (R$ 1.234,56 ou R$1.234,56).
    // Faremos um assert que contenha os valores principais.
    const text = (field.build() as any).text
    expect(text).toContain('R$')
    expect(text).toContain('1.234,56')
    expect((field.build() as any).alignment).toBe('right')
  })

  it('deve destacar valores negativos', () => {
    const field = NumberField.currency(-10).highlightsNegative('#f00')
    const result = field.build() as any
    expect(result.color).toBe('#f00')

    const fieldPos = NumberField.currency(10).highlightsNegative('#f00')
    const resultPos = fieldPos.build() as any
    expect(resultPos.color).toBe('#545454')
  })

  it('deve tratar valores undefined', () => {
    expect(NumberField.integer().build()).toMatchObject({ text: '0', alignment: 'right' })
  })
})
