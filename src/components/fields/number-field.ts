import { coalesce, roundABNT } from '@raicamposs/toolkit'
import { Color } from '../../types'
import { TextField } from './text-field'

const DEFAULT_LOCATION = 'pt-BR'

export class NumberField extends TextField {
  private constructor(
    private fieldValue: number,
    value: string,
  ) {
    super(value)
    this.setAlignment('right')
  }

  static integer(value?: number | string, locales: Intl.LocalesArgument = DEFAULT_LOCATION) {
    const fieldValue = roundABNT(coalesce(value, 0), 0)
    const text = fieldValue.toLocaleString(locales, {
      useGrouping: true,
    })

    return new NumberField(fieldValue, text)
  }

  static number(
    value?: number | string,
    options: Omit<Intl.NumberFormatOptions, 'style' | 'currency'> & { locales?: Intl.LocalesArgument } = {},

  ) {
    const { maximumFractionDigits, locales = DEFAULT_LOCATION } = options
    const fieldValue = roundABNT(coalesce(value, 0), maximumFractionDigits)
    const text = fieldValue.toLocaleString(locales, {
      style: 'decimal',
      minimumFractionDigits: 2,
      useGrouping: true,
      ...options,
    })

    return new NumberField(fieldValue, text)
  }

  static percent(value?: number | string, locales: Intl.LocalesArgument = DEFAULT_LOCATION) {
    const fieldValue = roundABNT(coalesce(value, 0), 2)
    const text = fieldValue.toLocaleString(locales, {
      style: 'percent',
      maximumFractionDigits: 2,
    })

    return new NumberField(fieldValue, text)
  }

  static currency(
    value?: number | string,
    options: Omit<Intl.NumberFormatOptions, 'style' | 'currency'> & { locales?: Intl.LocalesArgument } = {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    },
  ) {
    const { maximumFractionDigits, locales } = options
    const fieldValue = roundABNT(coalesce(value, 0), maximumFractionDigits)
    const text = fieldValue.toLocaleString(locales, {
      style: 'currency',
      currency: 'BRL',
      ...options,
    })

    return new NumberField(fieldValue, text)
  }

  highlightsNegative(color: Color = '#ff8080'): NumberField {
    const isDebit: boolean = this.fieldValue < 0
    return this.highlightIf(isDebit, color)
  }
}
