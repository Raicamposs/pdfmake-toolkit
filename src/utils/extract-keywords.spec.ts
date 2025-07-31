import { describe, expect, it } from 'vitest'
import { extractKeywords } from './extract-keywords'

describe('extractKeywords', () => {
  it('should extract keywords from a simple title', () => {
    const title = 'Aprenda TypeScript: Clean Code e Boas Práticas'
    const result = extractKeywords(title)
    expect(result).toEqual([
      'aprenda',
      'typescript',
      'clean',
      'code',
      'boas',
      'práticas',
    ])
  })

  it('should use custom stopWords, minLength and toLowerCase options', () => {
    const title = 'O Guia Completo para Desenvolvedores Frontend (2025)'
    const result = extractKeywords(title, {
      stopWords: new Set(['o', 'para', 'e']),
      minLength: 4,
      toLowerCase: false,
    })
    expect(result).toEqual([
      'Guia',
      'Completo',
      'Desenvolvedores',
      'Frontend',
      '2025',
    ])
  })

  it('should not remove duplicates if removeDuplicates is false', () => {
    const title = 'JavaScript e React: Criando Interfaces de Usuário Incríveis!!! JavaScript'
    const result = extractKeywords(title, { removeDuplicates: false })
    expect(result).toEqual([
      'javascript',
      'react',
      'criando',
      'interfaces',
      'usuário',
      'incríveis',
      'javascript',
    ])
  })

  it('should remove punctuation and filter short words', () => {
    const title = 'Oi! Eu sou o Goku.'
    const result = extractKeywords(title)
    expect(result).toEqual(['goku'])
  })

  it('should handle empty string', () => {
    expect(extractKeywords('')).toEqual([])
  })

  it('should handle string with only stop words', () => {
    expect(extractKeywords('o e de para')).toEqual([])
  })

  it('should respect custom punctuationToRemove', () => {
    const title = 'Hello, world! Test?'
    const result = extractKeywords(title, {
      punctuationToRemove: new Set([',']),
    })
    // Only comma is removed, so "world!" and "Test?" remain with punctuation
    expect(result).toEqual(['hello', 'world!', 'test?'])
  })

  it('should work with minLength = 1', () => {
    const title = 'A B C D'
    const result = extractKeywords(title, { minLength: 1, stopWords: new Set() })
    expect(result).toEqual(['a', 'b', 'c', 'd'])
  })

  it('should handle titles with numbers', () => {
    const title = 'Top 10 dicas para 2024!'
    const result = extractKeywords(title)
    expect(result).toEqual(['top', 'dicas', '2024'])
  })

  it('should handle titles with repeated stop words', () => {
    const title = 'e e e e e'
    expect(extractKeywords(title)).toEqual([])
  })

  it('should handle titles with only punctuation', () => {
    expect(extractKeywords('!!!...,,,;;;')).toEqual([])
  })

  it('should not fail if options are undefined', () => {
    expect(() => extractKeywords('Testando sem opções')).not.toThrow()
  })
})