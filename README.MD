# pdfmake-toolkit

Toolkit para facilitar a criação e manipulação de PDFs utilizando [pdfmake](https://github.com/bpampuch/pdfmake).

## Recursos

- Geração de PDFs customizados
- Templates reutilizáveis
- Suporte a tabelas, imagens e estilos

## Instalação

```bash
npm install @raicamposs/pdfmake-toolkit
```

## Uso Básico

```js
const docDefinition = {
  content: [
    DateField.currentDate().build(),
    NumberField.currency(100).bold().build(),
    TextField.text('Lorem ipsum dolor sit amet, consectetur adipiscing elit.').setAlignment('left').bold().build()
  ]
};
```