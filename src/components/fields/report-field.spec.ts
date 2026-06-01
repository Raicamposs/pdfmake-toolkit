import { describe, it, expect } from 'vitest'
import { ReportField } from './report-field'

// Como ReportField é abstrata, criamos uma classe concreta para testar
class TestField extends ReportField {}

describe('ReportField', () => {
  it('deve aplicar margin array/number corretamente', () => {
    const field = new TestField()
    field.setMargin(10)
    expect(field.build()).toEqual({ margin: 10 })

    field.setMargin([1, 2, 3, 4])
    expect(field.build()).toEqual({ margin: [1, 2, 3, 4] })
  })

  it('deve aplicar margin como object (top, right, bottom, left)', () => {
    const field = new TestField()
    field.setMargin({ top: 10, right: 20, bottom: 30, left: 40 })
    expect(field.build()).toEqual({
      marginTop: 10,
      marginRight: 20,
      marginBottom: 30,
      marginLeft: 40
    })
  })

  it('deve permitir objetos margin com chaves faltantes', () => {
    const field = new TestField()
    field.setMargin({ top: 10, left: 40 })
    expect(field.build()).toEqual({
      marginTop: 10,
      marginLeft: 40,
      marginRight: undefined,
      marginBottom: undefined
    })
  })

  it('deve aplicar colSpan, rowSpan e width', () => {
    const field = new TestField()
    field.setColSpan(2).setRowSpan(3).setWidth(100)
    
    expect(field.build()).toEqual({
      colSpan: 2,
      rowSpan: 3,
      width: 100
    })
  })
})
