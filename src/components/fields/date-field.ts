import { coalesce, isNullOrUndefined } from '@raicamposs/toolkit'
import { TextField } from './text-field'

const DEFAULT_TIME_ZONE = 'America/Sao_Paulo'
const DEFAULT_LOCATION = 'pt-BR'

type DateFieldOptions = {
  locales?: Intl.LocalesArgument,
  timeZone?: string | undefined,
}

export class DateField extends TextField {
  constructor(
    value: string | Date | undefined,
    locales: Intl.LocalesArgument = DEFAULT_LOCATION,
    options: Intl.DateTimeFormatOptions = {},
  ) {
    if (isNullOrUndefined(value)) {
      super('')
      this.setAlignment('center')
      return
    }

    const text = new Intl.DateTimeFormat(locales, {
      ...options,
      timeZone: coalesce(options.timeZone, DEFAULT_TIME_ZONE),
    }).format(new Date(value))
    super(text)
    this.setAlignment('center')
  }

  static currentDate() {
    return DateField.date(new Date())
  }

  static now() {
    return DateField.datetime(new Date())
  }

  static date(value: string | Date, { locales, timeZone }: DateFieldOptions = {}) {
    return new DateField(value, locales, {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit',
      timeZone,
    })
  }

  static datetime(value: string | Date, { locales, timeZone }: DateFieldOptions = {}) {
    return new DateField(value, locales, {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      timeZone,
    })
  }

  static time(value: string | Date, { locales, timeZone }: DateFieldOptions = {}) {
    return new DateField(value, locales, {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZone,
    })
  }
}
