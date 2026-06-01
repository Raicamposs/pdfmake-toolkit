import { describe, expect, it } from 'vitest'
import { DataTableBuilder } from './data-table-builder'

describe('DataTableBuilder', () => {
  type User = { id: number; name: string }

  it('deve gerar uma tabela com as colunas mapeadas dinamicamente', () => {
    const data: User[] = [
      { id: 1, name: 'Raian' },
      { id: 2, name: 'Campos' },
    ]

    const table = DataTableBuilder.create(data)
      .addColumn('ID', 50, (user) => user.id.toString(), 'center')
      .addColumn('Nome', '*', (user) => user.name)
      .build()

    expect(table).toBeDefined()
    expect(table.layout).toBe('interleavedColorTableLayout')
    
    // Verifica headers (o builder insere text em uma estrutura de Content)
    const headerRow = table.table.body[0]
    expect(headerRow.length).toBe(2)
    
    // Verifica mapeamento correto das rows
    expect(table.table.body.length).toBe(3) // 1 header + 2 rows
    expect(table.table.widths).toEqual([50, '*'])
    
    // Verifica renderização das células
    const firstDataRow = table.table.body[1]
    expect(firstDataRow[0]).toBe('1')
    expect(firstDataRow[1]).toBe('Raian')
  })

  it('deve disparar um erro se o build for chamado sem colunas', () => {
    const data: User[] = [{ id: 1, name: 'Raian' }]
    const table = DataTableBuilder.create(data)

    expect(() => table.build()).toThrowError('DataTableBuilder must have at least one column.')
  })
})
