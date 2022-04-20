import en from './en'
import es from './es'
import ptBR from './pt-BR'

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
    code: 'pt-BR',
    name: 'Português'
  },
]

export const messages = {
  en,
  es,
  'pt-BR': ptBR
}

export default {
  locales,
  defaultLocale: 'pt-BR',
  strategy: 'no_prefix',
  vueI18n: {
    fallbackLocale: 'pt-BR',
    messages
  }
}
