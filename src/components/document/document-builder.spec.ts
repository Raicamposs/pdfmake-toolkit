import { describe, it, expect, beforeEach } from 'vitest'
import { DocumentBuilder } from './document-builder'
import { ThemeRegistry } from '../theme/theme-registry'

describe('DocumentBuilder', () => {
  beforeEach(() => {
    ThemeRegistry.getInstance().clear()
  })

  it('deve instanciar um novo documento vazio', () => {
    const builder = new DocumentBuilder()
    const def = builder.build()

    expect(def).toHaveProperty('content')
    expect(def.content).toEqual([])
  })

  it('deve adicionar conteudos corretamente', () => {
    const builder = new DocumentBuilder()
      .addContent('Parágrafo 1')
      .addContent({ text: 'Parágrafo 2' })

    const def = builder.build()

    expect(def.content).toEqual(['Parágrafo 1', { text: 'Parágrafo 2' }])
  })

  it('deve definir as configuracoes gerais da pagina via Fluent API', () => {
    const def = new DocumentBuilder()
      .info({ title: 'Relatorio Teste', author: 'Autor' })
      .pageSize('A4')
      .pageOrientation('landscape')
      .pageMargins([10, 20, 10, 20])
      .watermark('RASCUNHO')
      .build()

    expect(def.info?.title).toBe('Relatorio Teste')
    expect(def.info?.author).toBe('Autor')
    expect(def.pageSize).toBe('A4')
    expect(def.pageOrientation).toBe('landscape')
    expect(def.pageMargins).toEqual([10, 20, 10, 20])
    expect(def.watermark).toBe('RASCUNHO')
  })

  it('deve injetar cabecalho e rodape', () => {
    const headerFunc = () => 'Cabecalho'
    const def = new DocumentBuilder()
      .header(headerFunc)
      .footer('Rodape Fixo')
      .build()

    expect(def.header).toBe(headerFunc)
    expect(def.footer).toBe('Rodape Fixo')
  })

  it('deve injetar os estilos globais do ThemeRegistry automaticamente', () => {
    // Configura o tema global
    ThemeRegistry.getInstance()
      .setDefaultStyle({ font: 'Helvetica', fontSize: 10 })
      .addStyle('h1', { fontSize: 24, bold: true })

    // Constrói o documento
    const def = new DocumentBuilder()
      .addContent({ text: 'Hello', style: 'h1' })
      .build()

    expect(def.defaultStyle).toMatchObject({ font: 'Helvetica', fontSize: 10 })
    expect(def.styles).toHaveProperty('h1')
    expect(def.styles?.h1).toMatchObject({ fontSize: 24, bold: true })
  })
})
