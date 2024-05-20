import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Card } from "react-bootstrap";
import api from "./api/ApiConnect";
import Loader from "./Spinner";
import { BsDownload, BsUpload, BsClock } from "react-icons/bs";

function bpsToMbps(bps) {
  return bps / 1000000;
}

function Avarages() {
  const [data, setData] = useState(null);

  useEffect(() => {
    api
      .get("/averages")
      .then((response) => {
        const transformedData = {
          ...response.data,
          averageDownload: bpsToMbps(response.data.averageDownload * 8),
          averageUpload: bpsToMbps(response.data.averageUpload * 8),
        };
        setData(transformedData);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <>
      <Container
        style={{ marginTop: "20px" }}
        className="d-flex justify-content-center"
      >
        {data ? (
          <Row xs={1} sm={1} md={3}>
            <Col style={{ textAlign: "center" }}>
              <Card
                style={{
                  width: "18rem",
                  textAlign: "center",
                  marginBottom: "20px",
                }}
                className="boxShadow"
              >
                <Card.Header>
                  <BsDownload style={{ marginRight: "5px" }} />
                  Download Médio
                </Card.Header>
                <Card.Body>
                  <Card.Text>{data.averageDownload.toFixed(2)} Mbps</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card
                style={{
                  width: "18rem",
                  textAlign: "center",
                  marginBottom: "20px",
                }}
                className="boxShadow"
              >
                <Card.Header>
                  <BsUpload style={{ marginRight: "5px" }} />
                  Upload Médio
                </Card.Header>
                <Card.Body>
                  <Card.Text>{data.averageUpload.toFixed(2)} Mbps</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card
                style={{
                  width: "18rem",
                  textAlign: "center",
                  marginBottom: "20px",
                }}
                className="boxShadow"
              >
                <Card.Header>
                  <BsClock style={{ marginRight: "5px" }} />
                  Ping Médio
                </Card.Header>
                <Card.Body>
                  <Card.Text>
                    {data ? data.averagePing.toFixed(2) : null} Ms
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        ) : (
          <Loader />
        )}
      </Container>
    </>
  );
}

export default Avarages;
