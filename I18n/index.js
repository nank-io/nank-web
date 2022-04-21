import en from './en'
import es from './es'
import ptBR from './ptBr'

export const locales = [
  {
    code: 'en',
    name: 'English'
  },
  {
    code: 'es',
    name: 'Español'
  },
  {
    code: 'pt',
    name: 'Português'
  },
]

export const messages = {
  en,
  es,
  pt: ptBR
}

export default {
  locales,
  defaultLocale: 'pt',
  strategy: 'no_prefix',
  vueI18n: {
    fallbackLocale: 'pt',
    messages
  }
}
