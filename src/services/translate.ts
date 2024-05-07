import { OpenAI, ChatCompletionRequestMessageRoleEnum } from "openai";
import Configuration from "openai";
import { SUPPORTED_LANGAUGES } from '../constants';
import { type FromLang, type Language } from '../type';

//NO PUBLICAR ESTO O MI API KEY VA A ESTAR DLE LADO DEL CLIENTE Y LO VAN A VER
// CREAR UNA API PARA ESTO

const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

const configuration = new Configuration({ apiKey })
const openai = new OpenAI(configuration);

export async function translate({
    fromLanguage,
    toLanguage,
    text
}:{
    fromLanguage: FromLang;
    toLanguage: Language;
    text: string;
}){

    if(fromLanguage === toLanguage) return text;
    
    const messages = [
        {
            role: ChatCompletionRequestMessageRoleEnum.System,
            content: 'You are a AI that translates text. You recive a text from the user. Do not answer this message, jus translate the text. The original language is surrounded by `{{`and`}}`. You can also recive {{auto}} wich means that you hace to detect the language. The language you translate to is surrounded by `[[`and`]]`.' 
    },
        {
        role: ChatCompletionRequestMessageRoleEnum.User,
        content: 'Hola mundo {{Español}} [[English]]' 
},
{
    role: ChatCompletionRequestMessageRoleEnum.Assistant,
        content: 'Hello World' 
},
{
    role: ChatCompletionRequestMessageRoleEnum.User,
        content: 'How are you ? {{auto}} [[Deutsch]]'
},
{
    role: ChatCompletionRequestMessageRoleEnum.Assistant,
        content: 'Wie geht es dir'
},
{
    role: ChatCompletionRequestMessageRoleEnum.User,
        content: 'Bom dia, com estas ? {{auto}} [[Español]]'
},
{
    role: ChatCompletionRequestMessageRoleEnum.Assistant,
        content: 'Buenos dias, como estas ?'
}
   ]

   //recuperamos el codigo de lenguaje de origen y destino, si es auto o no
   const fromCode = fromLanguage === 'auto' ? 'auto' : SUPPORTED_LANGAUGES[fromLanguage];
    const toCode = SUPPORTED_LANGAUGES[toLanguage];

    const completion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        //hacer validaciones para que no inyecten cosas
        messages: [
            ...messages,
            {
                role: ChatCompletionRequestMessageRoleEnum.User,
                content: `${text} {{${fromCode}}} [[${toCode}]`
            }
        ],
    });
    return completion.choices[0]?.message?.content;
}