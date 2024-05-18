import { useState, useEffect, useCallback, useMemo } from "react";
import { Container } from "react-bootstrap";
import api from "./api/ApiConnect";
import moment from "moment-timezone";
import Loader from "./Spinner";
import DatePickers from "./General/DatePickers";
import TimezoneSelect from "./General/TimezoneSelect";
import { LoadMoreButton, ResetButton } from "./General/TopButtons";
import ChartComponent from "./General/ChartComponent";

const DownloadChats = () => {
  const [dados, setDados] = useState([]);
  const [dataInicio, setDataInicio] = useState(new Date());
  const [dataFim, setDataFim] = useState(new Date());
  const [fusoHorario, setFusoHorario] = useState("UTC");
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState(null);
  const [numResultados, setNumResultados] = useState(10);

  const buscarDados = useCallback(async () => {
    setCarregando(true);
    setErro(null);
    try {
      const dataAtual = moment();
      const diferencaUTCMinutos = dataAtual.utcOffset();

      const dataInicioUTC = moment(dataInicio)
        .startOf("day")
        .subtract(diferencaUTCMinutos, "minutes");

      const dataFimUTC = moment(dataFim).subtract(
        diferencaUTCMinutos,
        "minutes"
      );

      const dataInicioFormatada = dataInicioUTC.format(
        "YYYY-MM-DDTHH:mm:ss.SSSZ"
      );
      const dataFimFormatada = dataFimUTC.format("YYYY-MM-DDTHH:mm:ss.SSSZ");
      const dataAtualFormatada = dataAtual
        .subtract(diferencaUTCMinutos, "minutes")
        .format("YYYY-MM-DDTHH:mm:ss.SSSZ");

      const resposta = await api.get("/data", {
        params: {
          inicio: dataInicioFormatada,
          fim: dataFimFormatada,
          horaAtual: dataAtualFormatada,
        },
      });

      setDados(resposta.data);
    } catch (erro) {
      setErro("Erro ao buscar dados. Tente novamente mais tarde.");
    } finally {
      setCarregando(false);
    }
  }, [dataInicio, dataFim]);

  useEffect(() => {
    buscarDados();
  }, [buscarDados]);

  const handleStartDateChange = (date) => {
    setDataInicio(date);
  };

  const handleEndDateChange = (date) => {
    setDataFim(date);
  };

  const handleTimezoneChange = (selectedOption) => {
    setFusoHorario(selectedOption.value);
  };

  const handleBuscarClick = () => {
    buscarDados();
  };

  const handleMostrarMais = () => {
    if (numResultados >= dados.length) {
      setNumResultados(numResultados);
    } else {
      setNumResultados((prev) => prev + 10);
    }
  };
  const handleReset = () => {
    setNumResultados(10);
  };

  const opcoesFusoHorario = useMemo(
    () => moment.tz.names().map((tz) => ({ value: tz, label: tz })),
    []
  );

  const dadosLimitados = dados.slice(0, numResultados);

  return (
    <Container>
      <Container
        className="d-flex flex-row align-content-between flex-wrap align-items-center justify-content-between p-4 rounded-3"
        style={{ textAlignLast: "center" }}
      >
        <DatePickers
          dataInicio={dataInicio}
          dataFim={dataFim}
          handleStartDateChange={handleStartDateChange}
          handleEndDateChange={handleEndDateChange}
        />
        <TimezoneSelect
          fusoHorario={fusoHorario}
          handleTimezoneChange={handleTimezoneChange}
          opcoesFusoHorario={opcoesFusoHorario}
        />
        <LoadMoreButton
          handleMostrarMais={handleMostrarMais}
          dados={dados}
          dadosLimitados={dadosLimitados}
          numResultados={numResultados}
        />
        <ResetButton
          handleReset={handleReset}
          dados={dados}
          dadosLimitados={dadosLimitados}
        />
        <Container className="w-25">
          <button className="btn btn-light" onClick={handleBuscarClick}>
            Buscar
          </button>
        </Container>
      </Container>
      {carregando ? (
        <Container>
          <Loader />
        </Container>
      ) : erro ? (
        <Container className="text-center text-danger">{erro}</Container>
      ) : (
        <>
          <Container className="d-flex gap-4 flex-column text-center">
            <ChartComponent
              data={dadosLimitados}
              fusoHorario={fusoHorario}
              title="Download (Mbps)"
              dataKey="download"
              yAxisLabel="Download (Mbps)"
            />
            <ChartComponent
              data={dadosLimitados}
              fusoHorario={fusoHorario}
              title="Upload (Mbps)"
              dataKey="upload"
              yAxisLabel="Upload (Mbps)"
            />
            <ChartComponent
              data={dadosLimitados}
              fusoHorario={fusoHorario}
              title="Ping(ms)"
              dataKey="ping"
              yAxisLabel="Ping (ms)"
            />
          </Container>
        </>
      )}
    </Container>
  );
};

export default DownloadChats;
