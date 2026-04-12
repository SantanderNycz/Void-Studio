import { createContext, useContext, useState, type ReactNode } from 'react'
import { translations, type Lang } from './i18n'

type TranslationShape = typeof translations[Lang]

interface LangContextType {
  lang: Lang
  t: TranslationShape
  toggle: () => void
}

const LangContext = createContext<LangContextType | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('pt')

  const toggle = () => setLang((l) => (l === 'pt' ? 'en' : 'pt'))

  return (
    <LangContext.Provider value={{ lang, t: translations[lang], toggle }}>
      {children}
    </LangContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LangContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}
