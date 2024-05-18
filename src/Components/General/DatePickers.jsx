/* eslint-disable react/prop-types */
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Container } from "react-bootstrap";

const DatePickers = ({
  dataInicio,
  dataFim,
  handleStartDateChange,
  handleEndDateChange,
}) => (
  <Container
    style={{ width: "13vw", margin: "0px" }}
    className="d-flex flex-column flex-wrap align-content-center justify-content-center align-items-center"
  >
    <label htmlFor="startDate">Data de Início:</label>
    <DatePicker
      selected={dataInicio}
      onChange={handleStartDateChange}
      id="startDate"
      className="form-control"
    />
    <label htmlFor="endDate">Data de Fim:</label>
    <DatePicker
      selected={dataFim}
      onChange={handleEndDateChange}
      id="endDate"
      className="form-control"
    />
  </Container>
);

export default DatePickers;
