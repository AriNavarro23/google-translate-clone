import { Form } from "react-bootstrap";
import { SectionType } from "../type";
import React from "react";

interface Props {
  type: SectionType;
  placeholder: string;
  loading?: boolean;
  onChange: (value: string) => void;
  value: string;
}

//estilos comunes entre ambos
const commonStyles = { height: "200px", border: 0, resize: "none" };

const getPlaceholder = ({ type, loading, value, onChange }: Props) => {
  if (type === SectionType.From) return "Texto a traducir";
  if (loading === true) return "Cargando...";
  return "Traducción";
};

export const TextArea = ({ type, loading, value, onChange }: Props) => {
  //si es tipo from se aplica commonStyles, sino se aplica con otro backgroundColor
  const styles =
    type === SectionType.From
      ? commonStyles
      : { ...commonStyles, backgroundColor: "#f5f5f5" };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  return (
    <Form.Control
      autoFocus={type === SectionType.From}
      as="textarea" //que elemento quiere renderizar ( de bootstrap)
      disabled={type === SectionType.To }
      placeholder={getPlaceholder({ type, loading })}
      style={styles}
      value={value}
      onChange={handleChange}
    />
  );
};
