/* eslint-disable react/prop-types */
import { Chart } from "react-google-charts";
import { Card, Container } from "react-bootstrap";
import moment from "moment-timezone";
import Loader from "../Spinner";
import { BsDownload, BsUpload, BsClock } from "react-icons/bs";

const ChartComponent = ({ data, fusoHorario, title, dataKey, yAxisLabel }) => (
  <>
    <Card>
      <h5 className="card-header">
        {dataKey == "download" ? (
          <BsDownload style={{ marginRight: "5px" }} />
        ) : dataKey == "upload" ? (
          <BsUpload style={{ marginRight: "5px" }} />
        ) : (
          <BsClock style={{ marginRight: "5px" }} />
        )}
        {title}
      </h5>
      <Card.Body>
        {data.length > 0 ? (
          <Chart
            width={"100%"}
            height={"400px"}
            chartType="LineChart"
            loader={
              <Container>
                <Loader />
              </Container>
            }
            data={[
              ["Hora", yAxisLabel, { role: "annotation" }],
              ...data.map((entry) => {
                const date = moment
                  .tz(entry.created_at, "YYYY-MM-DDTHH:mm:ss.SSSZ", "UTC")
                  .tz(fusoHorario);
                const hora = date.format("DD/MM HH:mm");
                const value =
                  dataKey === "ping"
                    ? entry[dataKey]
                    : ((entry[dataKey] * 8) / 1000000).toFixed(2);
                const annotation = parseFloat(value);
                return [hora, parseFloat(value), annotation];
              }),
            ]}
            options={{
              curveType: "function",
              annotations: {
                alwaysOutside: true,
                textStyle: {
                  bold: true,
                  italic: true,
                  fontSize: 12,
                  color: "#000",
                  auraColor: "none",
                },
              },
              legend: {
                position: "bottom",
                textStyle: { color: "#212529", fontSize: 16 },
              },

              tooltip: { isHtml: true },
              backgroundColor: "#fff",
              fontSize: "999px",
              maxValue: 100,
              chartArea: {
                width: "95%",
                height: "65%",
                right: "2%",
                top: "10%",
              },
              hAxis: {
                textStyle: { color: "#333" },
              },
              vAxis: {
                textStyle: { color: "#333" },
              },
            }}
            className="mb-3"
          />
        ) : (
          <Container>Nenhum dado disponível</Container>
        )}
      </Card.Body>
    </Card>
  </>
);

export default ChartComponent;
