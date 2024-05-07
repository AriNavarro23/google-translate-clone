import { type AUTO_LANGUAGE, type SUPPORTED_LANGAUGES } from './constants'

export type Language = keyof typeof SUPPORTED_LANGAUGES
export type AutoLang = typeof AUTO_LANGUAGE
export type FromLang = Language | AutoLang

export interface State {
    fromLanguage: FromLang,
    toLanguage: Language,
    fromText: string,
    result: string,
    loading: boolean
}

export type Action =
| { type: 'INTERCHANGE_LANGUAGES' } 
| { type: 'SET_FROM_LANGUAGE', payload: FromLang }
| { type: 'SET_TO_LANGUAGE', payload: Language }
| { type: 'SET_FROM_TEXT', payload: string}
| { type: 'SET_RESULT', payload: string}

export enum SectionType {
    From = 'from',
    To = 'to'
}