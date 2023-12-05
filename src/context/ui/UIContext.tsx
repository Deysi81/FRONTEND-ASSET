import { createContext } from 'react'

interface ContextProps {
  getData: boolean
  openData: () => void
  closeData: () => void
}

export const UIContext = createContext({} as ContextProps)
