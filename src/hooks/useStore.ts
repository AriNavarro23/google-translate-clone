import { useReducer } from 'react';
import { type State, type Action, Language, FromLang } from '../type';
import { AUTO_LANGUAGE } from '../constants';

//1 step create a initial state
const initialState: State= {
    fromLanguage: 'auto',
    toLanguage: 'en',
    fromText: '',
    result: '',
    loading: false
  }
  

//2 step create a reducer
function reducer (state: State, action :Action){
    const {type} = action
  
    //logica del estado dentro del reducer
    //porque asi lo evitamos en los componentes
    if ( type === 'INTERCHANGE_LANGUAGES'){
      if(state.fromLanguage === AUTO_LANGUAGE ) return state

      return {
        ...state,
        fromLanguage: state.toLanguage,
        toLanguage: state.fromLanguage
      }
    }
  
    if(type === 'SET_FROM_LANGUAGE'){
      return {
        ...state,
        fromLanguage: action.payload
      }
    }
  
    if(type === 'SET_TO_LANGUAGE'){
      return {
        ...state,
        toLanguage: action.payload
      }
    }
  
    if(type === 'SET_FROM_TEXT'){
      return {
        ...state,
        loading: true,
        fromText: action.payload,
        result:''
      }
    }
  
    if(type === 'SET_RESULT'){
      return {
        ...state,
        loading: false,
        result: action.payload
  
      }
    }
    return state
  }


  export function useStore(){
    //3 step use useReducer
    const [{
        fromLanguage,
        toLanguage,
        fromText,
        result,
        loading
      }, dispatch ] = useReducer(reducer, initialState)
      
    // paso los dispatch para poder cambairlos desde aca
    const interchangeLang = () => {
        dispatch({ type: 'INTERCHANGE_LANGUAGES'})
    }

    const setFromLang = (payload: FromLang) => {
        dispatch({ type: 'SET_FROM_LANGUAGE', payload})
    }

    const setToLang = (payload:Language) => {
        dispatch({ type: 'SET_TO_LANGUAGE', payload})
    }

    const setFromText = (payload:string) => {
        dispatch({ type: 'SET_FROM_TEXT', payload})
    }

    const setResult = (payload:string) => {
        dispatch({ type: 'SET_RESULT', payload})
    }

        return {
            fromLanguage,
            toLanguage,
            fromText,
            result,
            loading,
            interchangeLang,
            setFromLang,
            setToLang,
            setFromText,
            setResult
        }
    }