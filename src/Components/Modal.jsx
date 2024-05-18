/* eslint-disable react/prop-types */
import { Col, Container, Row, Button, Modal, Card } from "react-bootstrap";

function bpsToMbps(bps) {
  return (bps / 125000).toFixed(2);
}

function ModalCustom({ show, onHide, data, id }) {
  if (data) {
    const { upload, download, ping, server } = data;
    return (
      <>
        <Modal
          show={show}
          aria-labelledby="contained-modal-title-vcenter"
          size="xl"
          onHide={onHide}
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">#{id}</Modal.Title>
          </Modal.Header>
          <Modal.Body className="d-flex" sm={2}>
            {/* <Container className="d-flex flex-wrap align-content-center container-sm"> */}
            <Row className="d-flex col-8 align-content-center">
              <Col
                className="col-10 d-flex flex-column gap-4"
                style={{ boxSizing: "content-box" }}
              >
                <Row xs={1} md={1} className="h-25 align-items-center">
                  <Container className="d-flex gap-3">
                    <div>
                      <div>
                        <span>Download</span>
                      </div>
                      <div>
                        <input
                          className="form-control"
                          type="text"
                          value={bpsToMbps(download.bandwidth)}
                          readOnly
                        ></input>
                      </div>
                    </div>
                    <div>
                      <div>
                        <span>Upload</span>
                      </div>
                      <div>
                        <input
                          className="form-control"
                          type="text"
                          value={bpsToMbps(upload.bandwidth)}
                          readOnly
                        ></input>
                      </div>
                    </div>
                    <div>
                      <div>
                        <span>Ping</span>
                      </div>
                      <div>
                        <input
                          className="form-control"
                          type="text"
                          value={ping.latency}
                          readOnly
                        ></input>
                      </div>
                    </div>
                  </Container>
                </Row>
                <Row xs={1} md={1} className=" d-flex align-content-end">
                  <Container className="d-flex gap-3 w-100">
                    <div>
                      <div>
                        <span>Download Jitter (ms)</span>
                      </div>
                      <div>
                        <input
                          className="form-control"
                          type="text"
                          value={download.latency.jitter}
                          readOnly
                        ></input>
                      </div>
                    </div>
                    <div>
                      <div>
                        <span>Download Latency High</span>
                      </div>
                      <div>
                        <input
                          className="form-control"
                          type="text"
                          value={download.latency.high}
                          readOnly
                        ></input>
                      </div>
                    </div>
                    <div>
                      <div>
                        <span>Download Latency low</span>
                      </div>
                      <div>
                        <input
                          className="form-control"
                          type="text"
                          value={download.latency.low}
                          readOnly
                        ></input>
                      </div>
                    </div>
                  </Container>
                </Row>
                <Row xs={1} md={1} className="h-25">
                  <Container className="d-flex gap-3 w-100">
                    <div>
                      <div>
                        <span>Download Latency iqm</span>
                      </div>
                      <div>
                        <input
                          className="form-control"
                          type="text"
                          value={download.latency.jitter}
                          readOnly
                        ></input>
                      </div>
                    </div>
                    <div>
                      <div>
                        <span>Upload Jitter (ms)</span>
                      </div>
                      <div>
                        <input
                          className="form-control"
                          type="text"
                          value={upload.latency.jitter}
                          readOnly
                        ></input>
                      </div>
                    </div>
                    <div>
                      <span>Upload Latency High</span>
                      <div>
                        <input
                          className="form-control"
                          type="text"
                          value={upload.latency.high}
                          readOnly
                        ></input>
                      </div>
                    </div>
                  </Container>
                </Row>
                <Row xs={1} md={1} className="h-25">
                  <Container className="d-flex gap-3 w-100">
                    <div>
                      <div>
                        <span>Upload Latency low</span>
                      </div>
                      <div>
                        <input
                          className="form-control"
                          type="text"
                          value={upload.latency.low}
                          readOnly
                        ></input>
                      </div>
                    </div>
                    <div>
                      <div>
                        <span>Upload Latency iqm</span>
                      </div>
                      <div>
                        <input
                          className="form-control"
                          type="text"
                          value={upload.latency.iqm}
                          readOnly
                        ></input>
                      </div>
                    </div>
                    <div>
                      <div>
                        <span>Ping Jitter (ms)</span>
                      </div>
                      <div>
                        <input
                          className="form-control"
                          type="text"
                          value={ping.jitter}
                          readOnly
                        ></input>
                      </div>
                    </div>
                  </Container>
                </Row>
              </Col>
            </Row>
            <Col className="col-4">
              <Card>
                <Card.Body>
                  <Card.Title>Server</Card.Title>
                  <Card.Text>
                    <Col>
                      <li>Server ID: {server.id}</li>
                      <li>Name: {server.name}</li>
                      <li>Host: {server.host}</li>
                    </Col>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            {/* </Container> */}
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={onHide}>Close</Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
  return null;
}

export default ModalCustom;
