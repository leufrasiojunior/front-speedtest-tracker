/* eslint-disable react/prop-types */
import { Container } from "react-bootstrap";

export const LoadMoreButton = ({
  handleMostrarMais,
  dados,
  dadosLimitados,
  numResultados,
}) => (
  <Container className="w-25">
    <button
      onClick={handleMostrarMais}
      className="btn btn-light"
      disabled={dadosLimitados.length < dados.length ? false : true}
    >
      {dadosLimitados.length < dados.length ? "Carregar Mais" : "Máx. Atingido"}
    </button>
    <span>
      <br />
      Mostrando {numResultados > dados.length
        ? dados.length
        : numResultados} de {dados.length} (
      {numResultados / dados.length < 1
        ? ((numResultados / dados.length) * 100).toFixed(2) + "%"
        : "100%"}
      )
    </span>
  </Container>
);

export const ResetButton = ({ handleReset, dados, dadosLimitados }) => (
  <Container className="w-25">
    <button
      onClick={handleReset}
      className="btn btn-light"
      disabled={dadosLimitados.length == 10 ? true : false}
    >
      {dadosLimitados.length >= dados.length ? "Zerar" : "Zerar"}
    </button>
  </Container>
);
