export const FontSizesValues = {
  ExtraSmall: 8,
  Small: 9,
  Standard: 10,
  StandardPlus: 11,
  Medium: 12,
  Large: 14,
  ExtraLarge: 16,
  TitleSmall: 18,
  TitleMedium: 20,
  TitleLarge: 24,
  TitleGiant: 30,
  TitleHuge: 36,
  TitleMax: 48,
} as const

/**
 * Represents the valid font size keys from the FontSizesValues constant.
 * ExtraSmall = 8
 * Small = 9
 * Standard = 10
 * StandardPlus = 11
 * Medium = 12
 * Large = 14
 * ExtraLarge = 16
 * TitleSmall = 18
 * TitleMedium = 20
 * TitleLarge = 24
 * TitleGiant = 30
 * TitleHuge = 36
 * TitleMax = 48
 *
 * @typedef {keyof typeof FontSizesValues} FontSizes
 */
export type FontSizes = keyof typeof FontSizesValues | number
