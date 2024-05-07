import "bootstrap/dist/css/bootstrap.min.css";

import { Container, Row, Col, Button, Stack } from "react-bootstrap";

import "./App.css";
import { ArrowsIcon, SpeakerIcon } from "./components/Icons";
import { LanguageSelector } from "./components/LanguageSelector";
import { TextArea } from "./components/TextArea";
import { AUTO_LANGUAGE, VOICE_FOR_LANGUAGE } from "./constants";
import { useStore } from "./hooks/useStore";
import { SectionType } from "./type";
import { useEffect } from "react";
import { translate } from "./services/translate";
import { useDebounce } from "./hooks/useDebounce";

function App() {
  const {
    fromLanguage,
    toLanguage,
    fromText,
    result,
    loading,
    interchangeLang,
    setFromLang,
    setToLang,
    setFromText,
    setResult,
  } = useStore();

  const DebounceFromText = useDebounce(fromText, 300);

  useEffect(() => {
    if (DebounceFromText === "") return;

    translate({ fromLanguage, toLanguage, text: DebounceFromText })
      .then((result) => {
        //hago comparacion para ver si el resultado es nulo o undefind
        //sino deberia hacerlo a mano para hacer ===, !result no compara eso
        if (result == null) return;
        setResult(result);
      })
      .catch(() => {
        setResult("Error");
      });
    //para actualizar el estado al escribir texto, y cuando se cambia de idioma
  }, [DebounceFromText, fromLanguage, toLanguage]);


  const handleSearch = () => {
      navigator.clipboard.writeText(result).catch(() => {})
  }

  const handleSpeak = () => {
  const utterance = new SpeechSynthesisUtterance(result);
  utterance.lang = VOICE_FOR_LANGUAGE(toLanguage);
  utterance.rate = 0.9;
  speechSynthesis.speak(utterance);
  }

  return (
    <Container fluid>
      <h1>Google Translate</h1>

      <Row>
        <Col>
          <Stack gap={2}>
            <LanguageSelector
              type={SectionType.From}
              value={fromLanguage}
              onChange={setFromLang}
            />
            <TextArea
              type={SectionType.From}
              value={fromText}
              onChange={setFromText}
              placeholder={""}
            />
          </Stack>
        </Col>

        <Col xs="auto">
          <Button
            variant="Link"
            disabled={fromLanguage === AUTO_LANGUAGE}
            onClick={interchangeLang}
          >
            <ArrowsIcon />
          </Button>
        </Col>

        <Col>
          <Stack gap={2}>
            <LanguageSelector
              type={SectionType.To}
              value={toLanguage}
              onChange={setToLang}
            />
            <div style={{ position: "relative" }}>
              <TextArea
                loading={loading}
                type={SectionType.To}
                value={result}
                onChange={setResult}
                placeholder={""}
              />
              <div style={{position:'absolute', left:'0', bottom:'0', display:'flex'}}>
                <Button 
                variant="link" 
                onClick={handleSpeak}>
                  <SpeakerIcon />
                </Button>
              </div>
              <Button
                variant="link"
                style={{ position: "absolute", right: 0, bottom: 0 }}
                onClick={handleSearch}
              >
                <ArrowsIcon />
              </Button>
            </div>
          </Stack>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
