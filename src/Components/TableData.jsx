import api from "./api/ApiConnect";
import { useState, useEffect } from "react";
import ModalCustom from "./Modal";
import { Container, Row } from "react-bootstrap";
import { saveAs } from "file-saver";
import Loader from "./Spinner";

function bpsToMbps(bps) {
  return bps / 1000000;
}

const App = () => {
  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [totalRows, setTotalRows] = useState(0);
  const [pageSize, setPageSize] = useState(15);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [id, setId] = useState();
  const [modalShow, setModalShow] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(
          `/list?pageSize=${pageSize}&page=${currentPage}`
        );
        setData(response.data.data);
        setTotalPages(response.data.totalPages);
        setTotalRows(response.data.totalRows);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [pageSize, currentPage]);

  const handlePageSizeChange = (event) => {
    setLoading(true);
    setPageSize(Number(event.target.value));
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setLoading(true);
    setCurrentPage(page);
  };

  const handleRowClick = async (id, event) => {
    if (event.target.type === "checkbox" || event.target.id === "box") {
      return;
    }
    setModalShow(true);
    setId(id);
    try {
      const response = await api.get(`/specified/${id}`);
      setSelectedRecord(response.data);
    } catch (error) {
      console.error("Error fetching record details:", error);
    }
  };

  const handleCheckboxChange = (id, event) => {
    if (id === "selectAll") {
      if (event.target.checked) {
        const allIds = data.map((item) => item.id);
        setSelectedItems(allIds);
      } else {
        setSelectedItems([]);
      }
      setSelectAll(event.target.checked);
    } else {
      if (selectedItems.includes(id)) {
        setSelectedItems(selectedItems.filter((item) => item !== id));
      } else {
        setSelectedItems([...selectedItems, id]);
      }
      setSelectAll(selectedItems.length === data.length - 1);
    }
  };

  const renderPagination = () => {
    const pages = [];
    for (let i = 1; i <= Math.min(3, totalPages); i++) {
      pages.push(
        <button
          className="btn btn-primary marginRight"
          key={i}
          onClick={() => handlePageChange(i)}
          disabled={i === currentPage}
        >
          {i}
        </button>
      );
    }
    const currentPageIndex = Math.min(
      Math.max(currentPage - 2, 4),
      totalPages - 2
    );
    const lastPageIndex = Math.min(currentPageIndex + 2, totalPages);
    for (let i = currentPageIndex; i <= lastPageIndex; i++) {
      pages.push(
        <button
          className="btn btn-primary marginRight"
          key={i}
          onClick={() => handlePageChange(i)}
          disabled={i === currentPage}
        >
          {i}
        </button>
      );
    }

    return pages;
  };

  const formatCreatedAt = (createdAt) => {
    const date = new Date(createdAt);
    const formattedDate = `${date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    })} ${date.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    })}`;
    return formattedDate;
  };

  const startIndex = (currentPage - 1) * pageSize + 1;
  const endIndex = Math.min(currentPage * pageSize, totalRows);

  const exportToCsv = async () => {
    try {
      let exportData;
      if (selectedItems.length > 0) {
        exportData = data.filter((item) => selectedItems.includes(item.id));
      } else {
        const response = await api.get(`/allresults`);
        exportData = response.data;
      }
      let csvContent = "";
      const headerRow = Object.keys(exportData[0]).join(";");
      csvContent += headerRow + "\n";
      exportData.forEach((row) => {
        const rowData = Object.values(row).map((value) => {
          return JSON.stringify(value);
        });
        csvContent += rowData.join(";") + "\n";
      });
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8" });
      saveAs(blob, "data.csv");
    } catch (error) {
      console.error("Error exporting data:", error);
    }
  };

  return (
    <Container className="py-5">
      <Container className="col-lg-10 mx-auto">
        <Container className="card-body p-5 bg-white rounded">
          <h1>All Results</h1>
          <Container className="table-responsive">
            <Row style={{ paddingRight: "13px" }} className="mb-2">
              <div className="col-sm-12 col-md-6">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignContent: "space-between",
                  }}
                >
                  <label className="d-flex align-items-center">
                    Show
                    <select
                      className="custom-select custom-select-sm form-control form-control-sm"
                      id="pageSize"
                      value={pageSize}
                      onChange={handlePageSizeChange}
                      style={{
                        display: "flex",
                        marginLeft: "7px",
                        marginRight: "7px",
                        paddingLeft: "8px",
                        paddingRight: "24px",
                        width: "49px !important",
                      }}
                    >
                      <option value="5">5</option>
                      <option value="15">15</option>
                      <option value="25">25</option>
                      <option value="50">50</option>
                      <option value="100">100</option>
                    </select>
                    Entries
                  </label>
                </div>
              </div>
              <div className="col-sm-12 col-md-6 d-flex justify-content-end">
                <button
                  className="btn btn-secondary buttons-copy buttons-html5"
                  onClick={exportToCsv}
                >
                  Export as CSV
                </button>
              </div>
            </Row>
            {!loading ? (
              <>
                <Row className="col-sm-12">
                  <table
                    className="table table-striped table-bordered dataTable no-footer table-hover text-center"
                    style={{ width: "100%" }}
                  >
                    <thead className="thead-light">
                      <tr role="row">
                        <th
                          onClick={() =>
                            handleCheckboxChange("selectAll", {
                              target: { checked: !selectAll },
                            })
                          }
                        >
                          <input
                            type="checkbox"
                            checked={selectAll}
                            onChange={(event) =>
                              handleCheckboxChange("selectAll", event)
                            }
                          />
                        </th>
                        <th>Id</th>
                        <th>Ping/ms</th>
                        <th>Download/Mbps</th>
                        <th>Upload/Mbps</th>
                        <th>Status</th>
                        <th>Created At</th>
                        <th>Scheduled</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data &&
                        data.map((item, index) => (
                          <tr
                            key={index}
                            onClick={(event) => handleRowClick(item.id, event)}
                            style={{ cursor: "pointer" }}
                          >
                            <td
                              id="box"
                              onClick={(event) =>
                                handleCheckboxChange(item.id, event)
                              }
                            >
                              <input
                                type="checkbox"
                                checked={selectedItems.includes(item.id)}
                                onChange={(event) =>
                                  handleCheckboxChange(item.id, event)
                                }
                              />
                            </td>
                            <td>{item.id}</td>
                            <td>
                              {item.ping !== null ? item.ping.toFixed(3) : ""}
                            </td>

                            <td>
                              {bpsToMbps(item.download * 8).toFixed(2)} Mbps
                            </td>
                            <td>
                              {bpsToMbps(item.upload * 8).toFixed(2)} Mbps
                            </td>
                            <td>{item.status}</td>
                            <td>{formatCreatedAt(item.created_at)}</td>
                            <td>
                              {item.scheduled === 1 ? (
                                <div
                                  style={{
                                    backgroundColor: "green",
                                    width: "10px",
                                    height: "10px",
                                    borderRadius: "50%",
                                  }}
                                ></div>
                              ) : null}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </Row>
                <Row className="align-items-center">
                  <div className="col-sm-12 col-md-5">
                    <div className="dataTables_info col">
                      Showing {startIndex} to {endIndex} of {totalRows} results
                    </div>
                  </div>
                  <div className="col-sm-12 col-md-7 dataTables_paginate ">
                    {/* <div className="dataTables_info col "> */}
                    <div className="d-flex justify-content-end">
                      <button
                        className="btn btn-primary active marginRight"
                        onClick={() =>
                          handlePageChange(Math.max(currentPage - 1, 1))
                        }
                        disabled={currentPage === 1}
                      >
                        Previous
                      </button>
                      {renderPagination()}
                      <button
                        style={{ marginRight: "10px" }}
                        className="btn btn-primary active"
                        onClick={() =>
                          handlePageChange(
                            Math.min(currentPage + 1, totalPages)
                          )
                        }
                        disabled={currentPage >= totalPages}
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </Row>
              </>
            ) : (
              <Loader />
            )}

            <ModalCustom
              show={modalShow}
              onHide={() => setModalShow(false)}
              data={selectedRecord}
              id={id}
            />
          </Container>
        </Container>
      </Container>
    </Container>
  );
};

export default App;
