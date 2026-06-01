# @raicampos/pdfmake-toolkit

Uma biblioteca moderna, fortemente tipada e com uma API fluente (*Fluent Builder*) projetada para facilitar a criação e manipulação de relatórios e documentos PDF com a engine [pdfmake](https://github.com/bpampuch/pdfmake).

A motivação deste toolkit é reduzir significativamente o código repetitivo (*boilerplate*) necessário para construir PDFs complexos. Em vez de lidar com grandes árvores de objetos literais JavaScript, você cria seus documentos encadeando métodos declarativos que trazem formatação automática, tipagem rigorosa, controle semântico de cores e internacionalização inteligente.

---

## 🚀 Principais Recursos

- **Fluent API (Padrão Builder)**: Métodos encadeáveis para documentos, tabelas, campos numéricos e textuais.
- **ThemeRegistry Global (Singleton)**: Gerenciamento inteligente de design. Define fontes, cores e estilos globais com paletas pré-estudadas para UI Moderna (Slate & Blue).
- **Tipagem Forte (TypeScript)**: Totalmente integrado ao ecosistema do pdfmake. Reduz drasticamente a chance de declarar propriedades incorretas.
- **Fields Semânticos Nativos**:
  - `TextField`: Para strings convencionais (com `withLength`, `boldIf`, `titleCase`).
  - `NumberField`: Para formatação ABNT/BRL em Inteiros, Decimais, Moeda e Porcentagem (utilizando `Intl`).
  - `DateField`: Para formatação impecável de Datas, Horários e Datetimes (UTC-safe).
- **Construtor de Tabelas Avançado**: `DataTableBuilder` para geração automática de tabelas padronizadas, com *layouts* dinâmicos de cores zebradas e highlights de campos.

---

## 📦 Instalação

Como o toolkit é um *wrapper* sobre as definições do `pdfmake`, você deve garantir que ambas as bibliotecas estejam instaladas no seu projeto.

```bash
npm install @raicampos/pdfmake-toolkit
# ou
yarn add @raicampos/pdfmake-toolkit
# ou
pnpm add @raicampos/pdfmake-toolkit
```

*(Dependendo da sua estrutura, você também precisará configurar as fontes globais para o próprio pacote `pdfmake`).*

---

## 📖 Como Usar - Guia Completo

### 1. Inicializando e Customizando o Tema (Opcional)

O toolkit vem com um tema Padrão Moderno, garantindo que suas tabelas e textos fiquem bonitos sem nenhum esforço. Mas, caso precise customizar a aparência com as cores da sua empresa, basta chamar o `ThemeRegistry` no início da sua aplicação.

```typescript
import { ThemeRegistry } from '@raicampos/pdfmake-toolkit';

// Defina sua cor principal (Primary) e o sistema recalculará headers e bordas.
// Ex: '#3B82F6' (Azul Tailwind)
ThemeRegistry.getInstance()
  .setPalette('#3B82F6', '#334155') // Primary e Secondary
  .addStyles({
    header: { fontSize: 18, bold: true },
    title: { fontSize: 24, bold: true, color: '#1E293B' },
    muted: { fontSize: 9, color: '#94A3B8' }
  });
```

---

### 2. Criando o Documento (`DocumentBuilder`)

O orquestrador `DocumentBuilder` elimina a necessidade de montar o objeto root do PDF manualmente.

```typescript
import { DocumentBuilder, TextField } from '@raicampos/pdfmake-toolkit';

const builder = DocumentBuilder.create()
  .setPageSize('A4')
  .setPageOrientation('portrait')
  .setPageMargins([40, 60, 40, 60])
  // Adiciona o cabeçalho padronizado do documento
  .addContent(
    TextField.text('Relatório Financeiro de Vendas')
      .setStyle('title')
      .setAlignment('center')
      .setMargin([0, 0, 0, 20]) // [left, top, right, bottom]
      .build()
  );

// Retorna o objeto `TDocumentDefinitions` que o pdfMake espera!
const docDefinition = builder.build();

// pdfMake.createPdf(docDefinition).download('vendas.pdf');
```

---

### 3. Conhecendo os Fields

Os Fields são o coração do toolkit. Eles formatam os valores, aplicam tipagens visuais e garantem que tudo retorne objetos `Content` válidos para o pdfmake.

#### 📝 TextField

Lida com texto bruto, espaçamentos, estilos, cortes, cores condicionais, etc.

```typescript
import { TextField } from '@raicampos/pdfmake-toolkit';

// Negrito básico
TextField.text('Este texto').bold().build();

// Truncamento (limita em 15 caracteres)
TextField.text('Um texto muito grande que vai quebrar').withLength(15).build();

// Estilização Condicional (Ideal para laços de repetição)
const isPendente = true;
TextField.text('Fatura Pendente')
  .boldIf(isPendente)
  .highlightIf(isPendente, '#EF4444') // Muda a fonte para vermelho se pendente
  .build();

// Code/Zeros à esquerda
TextField.code(45, 4).build(); // Saída: "0045"
```

#### 💰 NumberField

Extensão poderosa do `TextField`, lida nativamente com o objeto global `Intl` e a API interna `roundABNT` para gerar números estritos.

```typescript
import { NumberField } from '@raicampos/pdfmake-toolkit';

// Moedas (Real Brasileiro)
NumberField.currency(1500.5).build(); // R$ 1.500,50
NumberField.currency(-50).highlightsNegative().build(); // R$ -50,00 pintado de vermelho nativo!

// Inteiros puros
NumberField.integer(1234.56).build(); // 1.235 (arredonda automaticamente)

// Decimais Avançados
NumberField.number(10.5555, { maximumFractionDigits: 3 }).build(); // 10,556

// Porcentagens
NumberField.percent(0.12).build(); // 12%
```

#### 🕒 DateField

Gerencia `Date` objects de forma segura para fuso horários, reduzindo bugs visuais de timezone (UTC).

```typescript
import { DateField } from '@raicampos/pdfmake-toolkit';

// Data Básica
DateField.date('2024-01-15T12:00:00Z').build(); // 15/01/24 (Alinhado ao centro por default)

// DateTime (Data e Hora)
DateField.datetime(new Date()).build(); // Ex: 15/01/24 14:30

// Time (Apenas a hora)
DateField.time('2024-01-15T12:30:45Z').build(); // 12:30:45

// Helpers úteis
DateField.currentDate().build(); // Retorna Data estática do moment atual
DateField.now().build(); // Retorna Date e Time estática atual
```

---

### 4. Tabelas Inteligentes (`DataTableBuilder`)

Em aplicações normais, gerar tabelas em `pdfmake` significa trabalhar com arrays aninhados de arrays (linhas e colunas), controlando alinhamentos manuais em todas as células. O `DataTableBuilder` resolve isso emulando o funcionamento de bibliotecas modernas.

```typescript
import { DataTableBuilder, TextField, NumberField } from '@raicampos/pdfmake-toolkit';

type ItemFatura = { 
  produto: string; 
  quantidade: number; 
  valorUnitario: number; 
};

const dados: ItemFatura[] = [
  { produto: 'Notebook XPS', quantidade: 1, valorUnitario: 8500.0 },
  { produto: 'Mouse Sem Fio', quantidade: 2, valorUnitario: 120.0 }
];

const tabela = DataTableBuilder.create<ItemFatura>(dados)
  // .addColumn({ config da Coluna })
  .addColumn({
    header: 'Descrição do Produto',
    width: '*', // Preenche todo espaço restante disponível
    accessor: (row) => TextField.text(row.produto).build()
  })
  .addColumn({
    header: 'Qtd.',
    width: 40,
    accessor: (row) => NumberField.integer(row.quantidade).build()
  })
  .addColumn({
    header: 'Vlr. Unitário',
    width: 80,
    accessor: (row) => NumberField.currency(row.valorUnitario).build()
  })
  .addColumn({
    header: 'Subtotal',
    width: 80,
    accessor: (row) => NumberField.currency(row.quantidade * row.valorUnitario).bold().build()
  })
  .build();

// O objeto 'tabela' é nativo pdfmake, com cores, headers, alternância
// de cores (zebrado) nas linhas preenchidos magicamente.
```

## 📐 Layouts e Estilos (Behind the scenes)

Por debaixo dos panos, quando você injeta uma tabela criada pelo `DataTableBuilder` ou pelo `TableBuilder` genérico, nosso interceptor utiliza um `tableLayout` customizado chamado `interleavedColorTableLayout`.

Isso garante que:
1. Linhas ímpares fiquem brancas e pares recebam a cor *Slate 50*.
2. As bordas do cabeçalho ganham o *Blue 500* para destaque.
3. Seus documentos transmitam uma impressão visual de alta qualidade sem esforço.

---

## 🤝 Contribuindo

Sinta-se livre para abrir _Issues_ para relatar problemas ou _Pull Requests_ com melhorias e inovações para a Fluent API.

1. Faça o fork do projeto
2. Crie uma branch para a sua feature (`git checkout -b feature/minha-feature`)
3. Faça o commit de suas alterações seguindo o padrão (`git commit -m 'feat: adicionando suporte a Tooltip na tabela'`)
4. Faça o push para a branch (`git push origin feature/minha-feature`)
5. Abra um PR!

---

**@raicampos/pdfmake-toolkit** é mantido sob licença MIT. Desenvolvido com foco em Arquitetura Limpa e Manutenibilidade.