/**
 * @fileoverview Módulo para extrair palavras-chave de um título.
 */

/**
 * Define as opções de configuração para a extração de palavras-chave.
 */
interface KeywordExtractionOptions {
  /**
   * Uma lista de palavras a serem ignoradas (stop words).
   * Exemplo: ['o', 'a', 'os', 'as', 'e', 'de', 'para', 'em', 'um', 'uma']
   */
  stopWords?: Set<string>
  /**
   * Um conjunto de caracteres que devem ser removidos do título antes da tokenização.
   * Exemplo: new Set(['.', ',', '!', '?', ':', ';', '(', ')', '[', ']', '{', '}'])
   */
  punctuationToRemove?: Set<string>
  /**
   * Converte todas as palavras-chave para minúsculas. Padrão: true.
   */
  toLowerCase?: boolean
  /**
   * Remove palavras-chave duplicadas. Padrão: true.
   */
  removeDuplicates?: boolean
  /**
   * Filtra palavras-chave com menos caracteres que o valor especificado. Padrão: 3.
   */
  minLength?: number
}

/**
 * Opções padrão para a extração de palavras-chave.
 * Podem ser sobrescritas ao chamar a função `extractKeywords`.
 */
const DEFAULT_OPTIONS: KeywordExtractionOptions = {
  stopWords: new Set([
    'o',
    'a',
    'os',
    'as',
    'e',
    'de',
    'do',
    'da',
    'dos',
    'das',
    'para',
    'em',
    'um',
    'uma',
    'uns',
    'umas',
    'com',
    'por',
    'no',
    'na',
    'nos',
    'nas',
    'ao',
    'aos',
    'à',
    'às',
    'se',
    'que',
    'é',
    'são',
    'está',
    'estão',
    'isso',
    'esse',
    'essa',
    'esse',
    'aqui',
    'ali',
    'ou',
    'nem',
    'mas',
    'mais',
    'menos',
    'mesmo',
    'deste',
    'desta',
    'disto',
    'dele',
    'dela',
    'deles',
    'delas',
    'onde',
    'quando',
    'como',
    'quem',
    'qual',
    'quais',
    'cujo',
    'cuja',
    'cujos',
    'cujas',
    'este',
    'estas',
    'isto',
    'aquele',
    'aquela',
    'aqueles',
    'aquelas',
    'aquilo',
    'tão',
    'toda',
    'todo',
    'todos',
    'todas',
    'muito',
    'muita',
    'muitos',
    'muitas',
    'pouco',
    'pouca',
    'poucos',
    'poucas',
    'tanto',
    'tanta',
    'tantos',
    'tantas',
    'sempre',
    'nunca',
    'já',
    'ainda',
    'agora',
    'depois',
    'antes',
    'durante',
    'apenas',
    'também',
    'após',
    'sob',
    'sobre',
    'entre',
    'contra',
    'ante',
    'até',
    'desde',
    'após',
    'sem',
    'sob',
    'trás',
    'através',
    'diferente',
    'outro',
    'outra',
    'outros',
    'outras',
    'algum',
    'alguma',
    'alguns',
    'algumas',
    'nenhum',
    'nenhuma',
    'nenhuns',
    'nenhumas',
    'cada',
    'tudo',
    'nada',
    'ninguém',
    'alguém',
    'vários',
    'várias',
    'certa',
    'certos',
    'certas',
    'certo',
    'diversos',
    'diversas',
    'ambos',
    'ambas',
    'cada',
    'certo',
    'certos',
    'certa',
    'certas',
    'determinados',
    'determinadas',
    'outros',
    'outras',
    'tais',
    'tal',
    'único',
    'única',
    'vários',
    'várias',
    'ambos',
    'ambas',
    'cada',
    'certo',
    'certos',
    'certa',
    'certas',
    'determinados',
    'determinadas',
    'outros',
    'outras',
    'tais',
    'tal',
    'único',
    'única',
    'vários',
    'várias',
    'etc',
    'i.e.',
    'ex.',
    'vs.',
    'viz.',
    'aka',
    'aka.',
    'vs',
    'e.g.',
  ]),
  punctuationToRemove: new Set([
    '.',
    ',',
    '!',
    '?',
    ':',
    ';',
    '(',
    ')',
    '[',
    ']',
    '{',
    '}',
    '-',
    '_',
    '/',
    '\\',
    "'",
    '"',
    '`',
    '~',
    '@',
    '#',
    '$',
    '%',
    '^',
    '&',
    '*',
    '+',
    '=',
    '|',
    '<',
    '>',
    'º',
    'ª',
    '§',
    '°', // Adicionando alguns caracteres especiais comuns
  ]),
  toLowerCase: true,
  removeDuplicates: true,
  minLength: 3,
}

/**
 * Remove a pontuação de uma string.
 * @param text A string de entrada.
 * @param punctuationSet Um conjunto de caracteres de pontuação a serem removidos.
 * @returns A string sem pontuação.
 */
function removePunctuation(text: string, punctuationSet: Set<string>): string {
  let cleanedText = text
  for (const punc of punctuationSet) {
    cleanedText = cleanedText.split(punc).join('')
  }
  return cleanedText
}

/**
 * Extrai palavras-chave de um título, aplicando filtragens e transformações.
 *
 * @param title O título do qual as palavras-chave serão extraídas.
 * @param options Opções de configuração para a extração de palavras-chave.
 * Se não fornecidas, as `DEFAULT_OPTIONS` serão utilizadas.
 * @returns Um array de strings contendo as palavras-chave extraídas e processadas.
 *
 * @example
 * ```typescript
 * const title1 = "Aprenda TypeScript: Clean Code e Boas Práticas";
 * const keywords1 = extractKeywords(title1);
 * console.log(keywords1); // Saída esperada: ['aprenda', 'typescript', 'clean', 'code', 'boas', 'práticas']
 *
 * const title2 = "O Guia Completo para Desenvolvedores Frontend (2025)";
 * const customOptions = {
 * stopWords: new Set(['o', 'para', 'e']),
 * minLength: 4,
 * toLowerCase: false
 * };
 * const keywords2 = extractKeywords(title2, customOptions);
 * console.log(keywords2); // Saída esperada: ['Guia', 'Completo', 'Desenvolvedores', 'Frontend', '2025']
 *
 * const title3 = "JavaScript e React: Criando Interfaces de Usuário Incríveis!!!";
 * const keywords3 = extractKeywords(title3, { removeDuplicates: false });
 * console.log(keywords3); // Saída esperada: ['javascript', 'react', 'criando', 'interfaces', 'usuário', 'incríveis']
 * ```
 */
export function extractKeywords(
  title: string,
  options?: KeywordExtractionOptions,
): string[] {
  // Combina as opções padrão com as opções fornecidas pelo usuário
  const currentOptions: KeywordExtractionOptions = {
    ...DEFAULT_OPTIONS,
    ...options,
  }

  let processedTitle = title

  // 1. Converter para minúsculas (se ativado)
  if (currentOptions.toLowerCase) {
    processedTitle = processedTitle.toLowerCase()
  }

  // 2. Remover pontuação
  if (
    currentOptions.punctuationToRemove &&
    currentOptions.punctuationToRemove.size > 0
  ) {
    processedTitle = removePunctuation(
      processedTitle,
      currentOptions.punctuationToRemove,
    )
  }

  // 3. Tokenizar (dividir em palavras)
  // Usa uma regex para dividir por um ou mais espaços em branco
  const words = processedTitle.split(/\s+/).filter((word) => word.length > 0)

  // 4. Filtrar stop words e comprimento mínimo
  let filteredKeywords = words.filter((word) => {
    const isStopWord = currentOptions.stopWords?.has(word) ?? false
    const isTooShort = currentOptions.minLength
      ? word.length < currentOptions.minLength
      : false
    return !isStopWord && !isTooShort
  })

  // 5. Remover duplicatas (se ativado)
  if (currentOptions.removeDuplicates) {
    filteredKeywords = Array.from(new Set(filteredKeywords))
  }

  return filteredKeywords
}
