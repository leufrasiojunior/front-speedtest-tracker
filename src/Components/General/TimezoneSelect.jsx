/* eslint-disable react/prop-types */

import Select from "react-select";
import { Container } from "react-bootstrap";
import { RiTimeZoneLine } from "react-icons/ri";

const TimezoneSelect = ({
  fusoHorario,
  handleTimezoneChange,
  opcoesFusoHorario,
}) => (
  <Container className="w-25">
    <label htmlFor="timezone">
      Fuso Horário: <RiTimeZoneLine />
    </label>
    <Select
      options={opcoesFusoHorario}
      onChange={handleTimezoneChange}
      defaultValue={{ value: fusoHorario, label: fusoHorario }}
      aria-label="Selecionar Fuso Horário"
    />
  </Container>
);

export default TimezoneSelect;
