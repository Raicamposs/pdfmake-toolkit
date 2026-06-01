import { describe, expect, beforeEach, it } from 'vitest'
import { ThemeRegistry } from './theme-registry'

describe('ThemeRegistry', () => {
  let registry: ThemeRegistry

  beforeEach(() => {
    registry = ThemeRegistry.getInstance()
    registry.clear() // Garante que o estado está limpo antes de cada teste
  })

  it('deve retornar sempre a mesma instância (Singleton)', () => {
    const anotherRegistry = ThemeRegistry.getInstance()
    expect(registry).toBe(anotherRegistry)
  })

  it('deve adicionar e recuperar estilos individuais corretamente', () => {
    registry.addStyle('header', { fontSize: 18, bold: true })
    registry.addStyle('body', { fontSize: 12 })

    const styles = registry.getStyles()
    
    expect(styles).toHaveProperty('header')
    expect(styles.header?.fontSize).toBe(18)
    
    expect(styles).toHaveProperty('body')
    expect(styles.body?.fontSize).toBe(12)
  })

  it('deve adicionar múltiplos estilos (StyleDictionary) corretamente', () => {
    registry.addStyles({
      h1: { fontSize: 24, bold: true },
      h2: { fontSize: 20, italics: true }
    })

    const styles = registry.getStyles()
    
    expect(styles).toHaveProperty('h1')
    expect(styles).toHaveProperty('h2')
    expect(styles.h2?.italics).toBe(true)
  })

  it('deve definir e recuperar o defaultStyle corretamente', () => {
    registry.setDefaultStyle({ font: 'Roboto', fontSize: 10 })

    const defaultStyle = registry.getDefaultStyle()
    
    expect(defaultStyle.font).toBe('Roboto')
    expect(defaultStyle.fontSize).toBe(10)
  })

  it('deve fundir (merge) novos estilos sem sobrescrever estilos completamente diferentes', () => {
    registry.addStyles({ h1: { fontSize: 24 } })
    registry.addStyles({ h2: { fontSize: 20 } })

    const styles = registry.getStyles()
    expect(styles).toHaveProperty('h1')
    expect(styles).toHaveProperty('h2')
  })

  it('deve permitir definir e recuperar cores individuais', () => {
    registry.setColors({ tableHeaderFill: '#fff' })
    expect(registry.getColors().tableHeaderFill).toBe('#fff')
  })

  it('deve configurar paleta de cores via setPalette', () => {
    registry.setPalette('#ff0000', '#00ff00')
    const colors = registry.getColors()
    expect(colors.tableHeaderFill).toBe('#ff0000')
    expect(colors.tableBorderBlue).toBe('#ff0000')
    expect(colors.tableFooterFill).toBe('#00ff00')
    expect(colors.tableAlternateRowFill).toBe('#F8FAFC') // Neutro mantido
  })

  it('deve configurar paleta de cores apenas com primary', () => {
    // Para testar fallback do secondary, precisamos saber o valor default, que eh #334155
    registry.setPalette('#0000ff')
    const colors = registry.getColors()
    expect(colors.tableHeaderFill).toBe('#0000ff')
    expect(colors.tableFooterFill).toBe('#334155') // default mantido
  })

  it('deve gerenciar layouts customizados', () => {
    const layout = { defaultBorder: false }
    registry.addTableLayouts({ meuLayout: layout as any })
    expect(registry.getTableLayouts().meuLayout).toBe(layout)
  })
})
