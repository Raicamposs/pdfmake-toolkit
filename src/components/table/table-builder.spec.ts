import { describe, it, expect } from 'vitest'
import { TableBuilder } from './table-builder'

describe('TableBuilder', () => {
  it('deve montar uma tabela com layout padrao e uma linha', () => {
    const table = TableBuilder.create()
      .addHeader('Nome', '*')
      .addHeaderCenter('Idade', 50)
      .addRow(['Joao', '30'])
      .build()

    expect(table.layout).toBe('interleavedColorTableLayout')
    expect(table.table.headerRows).toBe(1)
    expect(table.table.widths).toEqual(['*', 50])
    expect(table.table.body.length).toBe(2)
  })

  it('deve permitir alterar o layout', () => {
    const table = TableBuilder.create()
      .setLayout('noBorders')
      .addHeader('Teste', '*')
      .build()

    expect(table.layout).toBe('noBorders')
  })

  it('deve criar headers com alinhamentos esquerdos e direitos', () => {
    const table = TableBuilder.create()
      .addHeaderLeft('Esq', 50)
      .addHeaderRight('Dir', 50)
      .build()

    const headers = table.table.body[0]
    expect(headers[0]).toMatchObject({ alignment: 'left' })
    expect(headers[1]).toMatchObject({ alignment: 'right' })
  })

  it('deve usar buildDefaultHeader com estilo tableHeader', () => {
    const builder = TableBuilder.create()
    const headerField = builder.buildDefaultHeader('Padrao')
    expect(headerField.build()).toMatchObject({ text: 'Padrao', style: 'tableHeader' })
  })
})
