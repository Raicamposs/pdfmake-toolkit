import { isAssigned } from "@raicampos/toolkit"
import { Content, ContentStack } from "pdfmake/interfaces"
import { groupByAndOrder } from "../utils"

export type BaseSessionParams<K extends PropertyKey, T> = {
  items: T[]
  groupBy: (item: T, index: number) => K
  header: (key: PropertyKey, item: T[]) => Content
  footer?: (key: PropertyKey, item: T[]) => Content
}

export type SessionGroupParams<K extends PropertyKey, T> = BaseSessionParams<K, T> & {
  builder: (items: T[]) => Content
}

export type SessionItemParams<K extends PropertyKey, T> = BaseSessionParams<K, T> & {
  builderItem: (items: T) => Content
}

export type SessionParams<K extends PropertyKey, T> =
  | SessionGroupParams<K, T>
  | SessionItemParams<K, T>

const isGroupSession = <K extends PropertyKey, T>(
  params: SessionParams<K, T>
): params is SessionGroupParams<K, T> => 'builder' in params;

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


  if (isGroupSession(params)) {
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
