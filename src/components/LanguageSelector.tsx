import { Form } from "react-bootstrap";
import { AUTO_LANGUAGE, SUPPORTED_LANGAUGES } from "../constants";
import React from "react";
import { SectionType, type FromLang, type Language } from "../type";

type Props =
    | { type: SectionType.From, value: FromLang, onChange: (language: FromLang) => void }
    | { type: SectionType.To , value: Language, onChange: (language: Language) => void };

export const LanguageSelector = ({ onChange, type, value }: Props) => {
  const handleChange = (event : React.ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value as Language);
  };
  return (
    <Form.Select aria-label="Selecciona el idioma" onChange={handleChange} value={value}>
      {type === SectionType.From && <option value={AUTO_LANGUAGE}>Detectar idioma</option>}
      
      {Object.entries(SUPPORTED_LANGAUGES).map(([key, literal]) => (
        <option key={key} value={key}>
          {literal}
        </option>
      ))}
    </Form.Select>
  );
};
