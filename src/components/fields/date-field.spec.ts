import { describe, it, expect, vi } from 'vitest'
import { DateField } from './date-field'

describe('DateField', () => {
  it('deve formatar data vazia', () => {
    const field = new DateField(undefined)
    expect(field.build()).toMatchObject({ text: '', alignment: 'center' })
  })

  it('deve formatar data customizada', () => {
    const field = new DateField('2024-01-15T12:00:00Z', 'pt-BR', { timeZone: 'UTC' })
    const text = (field.build() as any).text
    expect(text).toContain('2024')
  })

  it('deve formatar date usando UTC para evitar erros de timezone', () => {
    const field = DateField.date('2024-01-15T12:00:00Z', { timeZone: 'UTC' })
    const result = field.build() as any
    expect(result.text).toMatch(/15\/01\/24/)
    expect(result.alignment).toBe('center')
  })

  it('deve formatar datetime', () => {
    const field = DateField.datetime('2024-01-15T12:30:00Z', { timeZone: 'UTC' })
    const result = field.build() as any
    expect(result.text).toMatch(/15\/01\/24/)
    expect(result.text).toContain('12:30')
  })

  it('deve formatar time', () => {
    const field = DateField.time('2024-01-15T12:30:45Z', { timeZone: 'UTC' })
    const result = field.build() as any
    expect(result.text).toMatch(/12:30:45/)
  })

  it('deve formatar currentDate e now', () => {
    vi.useFakeTimers()
    const mockDate = new Date('2024-02-20T10:00:00Z')
    vi.setSystemTime(mockDate)

    const dateField = DateField.currentDate()
    expect((dateField.build() as any).text).toBeTruthy()

    const nowField = DateField.now()
    expect((nowField.build() as any).text).toBeTruthy()

    vi.useRealTimers()
  })
})
