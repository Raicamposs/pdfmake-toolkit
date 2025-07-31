import { CanvasLine, ContentCanvas } from 'pdfmake/interfaces'
import { Color } from '../types'

export const line = (color: Color, width: number = 520): ContentCanvas => {
  const line: CanvasLine = {
    type: 'line',
    x2: width,
    lineColor: color,
    x1: 0,
    y1: 0,
    y2: 0,
  }

  return {
    canvas: [line],
  }
}

export const dash = (color: Color, width: number = 520): ContentCanvas => {
  const line: CanvasLine = {
    type: 'line',
    dash: { length: 1, space: 1 },
    lineColor: color,
    x2: width,
    x1: 0,
    y1: 0,
    y2: 0,
  }

  return {
    canvas: [line],
  }
}
