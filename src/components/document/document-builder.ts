import {
  Content,
  DynamicBackground,
  DynamicContent,
  Margins,
  PageOrientation,
  PageSize,
  TDocumentDefinitions,
  TDocumentInformation,
  Watermark
} from 'pdfmake/interfaces'
import { ThemeRegistry } from '../theme/theme-registry'

export class DocumentBuilder {
  private def: TDocumentDefinitions = {
    content: [],
  }

  /**
   * Define informações de metadados do documento.
   */
  info(info: TDocumentInformation) {
    this.def.info = info
    return this
  }

  /**
   * Define o tamanho da página.
   */
  pageSize(size: PageSize) {
    this.def.pageSize = size
    return this
  }

  /**
   * Define a orientação da página.
   */
  pageOrientation(orientation: PageOrientation) {
    this.def.pageOrientation = orientation
    return this
  }

  /**
   * Define as margens da página.
   */
  pageMargins(margins: Margins) {
    this.def.pageMargins = margins
    return this
  }

  /**
   * Define o cabeçalho global do documento.
   */
  header(header: Content | DynamicContent) {
    this.def.header = header
    return this
  }

  /**
   * Define o rodapé global do documento.
   */
  footer(footer: Content | DynamicContent) {
    this.def.footer = footer
    return this
  }

  /**
   * Define uma marca d'água no documento.
   */
  watermark(watermark: string | Watermark) {
    this.def.watermark = watermark
    return this
  }

  /**
   * Define um background global para as páginas.
   */
  background(background: Content | DynamicBackground) {
    this.def.background = background
    return this
  }

  /**
   * Registra imagens que podem ser referenciadas por nome no documento.
   */
  images(images: { [key: string]: string }) {
    this.def.images = images
    return this
  }

  /**
   * Adiciona um conteúdo ao corpo principal do documento.
   */
  addContent(content: Content) {
    if (Array.isArray(this.def.content)) {
      this.def.content.push(content)
    } else {
      this.def.content = [this.def.content, content]
    }
    return this
  }

  /**
   * Compila e finaliza a montagem do objeto de definição do documento.
   * Ele injeta automaticamente os Estilos definidos no ThemeRegistry global.
   */
  build(): TDocumentDefinitions {
    const registry = ThemeRegistry.getInstance()

    return {
      ...this.def,
      styles: {
        ...this.def.styles,
        ...registry.getStyles(),
      },
      defaultStyle: {
        ...this.def.defaultStyle,
        ...registry.getDefaultStyle(),
      },
    }
  }
}
