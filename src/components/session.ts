import { isAssigned } from "@raicamposs/toolkit"
import { Content, ContentStack } from "pdfmake/interfaces"
import { groupByAndOrder } from "../utils"

export type SessionParams<K extends PropertyKey, T> = {
  items: T[]
  groupBy: (item: T, index: number) => K
  header: (key: PropertyKey, item: T[]) => Content
  footer?: (key: PropertyKey, item: T[]) => Content
  builder: (items: T[]) => Content
} | {
  items: T[]
  groupBy: (item: T, index: number) => K
  header: (key: PropertyKey, item: T[]) => Content
  footer?: (key: PropertyKey, item: T[]) => Content
  builderItem: (items: T) => Content
}

export const Session = <K extends PropertyKey, T>(
  params: SessionParams<PropertyKey, T>
): ContentStack => {

  const { items, groupBy, header, footer } = params

  if (!items || items.length === 0) {
    return {
      stack: [],
    }
  }


  const content: Content[] = []
  const group = groupByAndOrder(items, groupBy)


  if ('builder' in params) {
    for (const [key, data = []] of Object.entries(group)) {
      content.push(header(key, data))
      content.push(params.builder(data))
      if (isAssigned(footer)) {
        content.push(footer(key, data))
      }
    }

    return {
      stack: content,
    }
  }

  for (const [key, data = []] of Object.entries(group)) {
    content.push(header(key, data))
    content.push(...data.map(params.builderItem))
    if (isAssigned(footer)) {
      content.push(footer(key, data))
    }
  }

  return {
    stack: content,
  }
}
