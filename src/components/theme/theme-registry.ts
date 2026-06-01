import { CustomTableLayout, Style, StyleDictionary } from 'pdfmake/interfaces'
import { Color } from '../../types'

export class ThemeRegistry {
  private static instance: ThemeRegistry
  private styles: StyleDictionary = {}
  private defaultStyle: Style = {}
  private colors: Record<string, Color> = {
    tableHeaderFill: '#1E293B', // Slate 800
    tableFooterFill: '#334155', // Slate 700
    tableAlternateRowFill: '#F8FAFC', // Slate 50
    tableBorder: '#E2E8F0', // Slate 200
    tableBorderBlue: '#3B82F6', // Blue 500
  }
  private tableLayouts: Record<string, CustomTableLayout> = {}

  private constructor() {}

  /**
   * Obtém a instância global do ThemeRegistry (Singleton).
   */
  static getInstance(): ThemeRegistry {
    if (!ThemeRegistry.instance) {
      ThemeRegistry.instance = new ThemeRegistry()
    }
    return ThemeRegistry.instance
  }

  /**
   * Adiciona um único estilo ao registro.
   */
  addStyle(name: string, style: Style) {
    this.styles[name] = style
    return this
  }

  /**
   * Adiciona múltiplos estilos ao registro.
   */
  addStyles(styles: StyleDictionary) {
    this.styles = { ...this.styles, ...styles }
    return this
  }

  /**
   * Define o estilo padrão (defaultStyle) do documento.
   */
  setDefaultStyle(style: Style) {
    this.defaultStyle = { ...this.defaultStyle, ...style }
    return this
  }

  /**
   * Recupera todos os estilos registrados.
   */
  getStyles(): StyleDictionary {
    return this.styles
  }

  /**
   * Recupera o estilo padrão registrado.
   */
  getDefaultStyle(): Style {
    return this.defaultStyle
  }

  /**
   * Define uma paleta de cores avulsa.
   */
  setColors(colors: Record<string, Color>) {
    this.colors = { ...this.colors, ...colors }
    return this
  }

  /**
   * Configura o tema inteiro fornecendo apenas uma cor Primária e, opcionalmente, Secundária.
   * O sistema calculará inteligentemente onde aplicá-las.
   */
  setPalette(primary: Color, secondary?: Color) {
    this.colors = {
      ...this.colors,
      tableHeaderFill: primary,
      tableBorderBlue: primary,
      tableFooterFill: secondary ?? this.colors.tableFooterFill,
      // tableAlternateRowFill e tableBorder permanecem com os tons neutros,
      // garantindo a legibilidade do relatório a menos que sejam explicitamente sobrescritos via setColors().
    }
    return this
  }

  /**
   * Recupera a paleta de cores.
   */
  getColors(): Record<string, Color> {
    return this.colors
  }

  /**
   * Adiciona Table Layouts personalizados para tabelas.
   */
  addTableLayouts(layouts: Record<string, CustomTableLayout>) {
    this.tableLayouts = { ...this.tableLayouts, ...layouts }
    return this
  }

  /**
   * Recupera todos os Table Layouts registrados.
   */
  getTableLayouts(): Record<string, CustomTableLayout> {
    return this.tableLayouts
  }

  /**
   * Limpa todos os estilos, configurações e layouts.
   */
  clear() {
    this.styles = {}
    this.defaultStyle = {}
    this.tableLayouts = {}
    this.colors = {
      tableHeaderFill: '#1E293B',
      tableFooterFill: '#334155',
      tableAlternateRowFill: '#F8FAFC',
      tableBorder: '#E2E8F0',
      tableBorderBlue: '#3B82F6',
    }
  }
}
