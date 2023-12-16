import React, { useState, useEffect, useContext } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import "../styles/dashboard.css";
import { Alert } from "reactstrap";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import SweetAlert2 from "react-sweetalert2";
import axios from "axios";
import { API_URL, getUserDetails } from "../helpers/constants";

const Dashboard = () => {
  const [alertConfig, setAlertConfig] = useState({
    color: "",
    isOpen: false,
    message: "",
  });

  const [alertProps, setAlertProps] = useState({
    show: false,
    title: "",
    text: "",
  });
  const [diares, setDiares] = useState([]);

  const [newDiary, setNewDiary] = useState({});
  const [modal, setModal] = useState(false);
  const [count, setCount] = useState(5);
  const toggle = () => setModal(!modal);
  const [selectedDiary, setSelectedDiary] = useState({});
  const mouseHoverEffect = (item) => {
    setSelectedDiary(item);
  };

  const getDiaries = () => {
    const user = getUserDetails();
    if (user?._id) {
      axios.get(`${API_URL}/diary/${user?._id}`).then((res) => {
        console.log("res: ", res.data);
        setDiares(res.data);
      });
    }
  };

  useEffect(() => {
    getDiaries();
  }, []);

  const changeHandler = (e) => {
    setNewDiary({
      ...newDiary,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    let filteredData = diares.filter((v) => v.year == newDiary.year);
    console.log("filteredData: ", filteredData.length);
    if (filteredData.length > 0) {
      setAlertConfig({
        isOpen: true,
        message: "Cannot create multiple diaries for same year",
      });
      toggle();
    } else {
      // setDiares([...diares, newDiary]);
      const user = getUserDetails();
      let payload = { ...newDiary, user_id: user?._id };

      console.log("payload: ", payload);
      axios.post(`${API_URL}/diary/add-diary`, payload).then((res) => {
        setDiares([...diares, res.data]);
        console.log("res: ", res);
        toggle();
      });
    }
  };

  const handleDelete = () => {
    console.log(selectedDiary?._id);
    axios
      .delete(`${API_URL}/diary/delete/${selectedDiary?._id}`)
      .then((res) => {
        console.log("res: ", res);
        getDiaries();
      });
  };

  useEffect(() => {
    if (alertConfig.isOpen) {
      let count = 5;
      setInterval(() => {
        count = count - 1;
        if (count === 0) {
          console.log("count: ", count);
          setAlertConfig({
            color: "",
            isOpen: false,
            message: "",
          });
        }
      }, 1000);
    }
  }, [alertConfig]);

  return (
    <Row>
      <Col xs={12}>
        <Card className="border-0 bg-transparent">
          <CardHeader className="border-0 bg-transparent d-flex justify-content-end">
            <Button color="primary" onClick={toggle}>
              Add New Diary
            </Button>
          </CardHeader>
          {
            <Modal isOpen={modal} toggle={toggle}>
              <ModalHeader toggle={toggle}>Add Todo</ModalHeader>
              <ModalBody>
                <form>
                  <Row className="mb-2">
                    <Col xs={3}>
                      <label>Name</label>
                    </Col>
                    <Col xs={9}>
                      <input
                        name="name"
                        style={{ width: "100%" }}
                        type="text"
                        placeholder="Enter Name"
                        onChange={(e) => {
                          changeHandler(e);
                        }}
                      />
                    </Col>
                  </Row>
                  <Row className="mb-2">
                    <Col xs={3}>
                      <label>Caption</label>
                    </Col>
                    <Col xs={9}>
                      <input
                        name="caption"
                        style={{ width: "100%" }}
                        type="text"
                        placeholder="Enter Caption"
                        onChange={(e) => {
                          changeHandler(e);
                        }}
                      />
                    </Col>
                  </Row>
                  <Row className="mb-2">
                    <Col xs={3}>
                      <label>Year</label>
                    </Col>
                    <Col xs={9}>
                      <input
                        name="year"
                        style={{ width: "100%" }}
                        type="text"
                        placeholder="Enter Year"
                        onChange={(e) => {
                          changeHandler(e);
                        }}
                      />
                    </Col>
                  </Row>
                </form>
              </ModalBody>
              <ModalFooter>
                <Button color="success" onClick={() => handleSubmit()}>
                  Add New Diary
                </Button>{" "}
                <Button color="secondary" onClick={toggle}>
                  Cancel
                </Button>
              </ModalFooter>
            </Modal>
          }

          {alertConfig.isOpen && (
            <Alert
              color="danger"
              isOpen={alertConfig.isOpen}
              toggle={() =>
                setAlertConfig({ ...alertConfig, isOpen: !alertConfig.isOpen })
              }
            >
              {alertConfig.message}
            </Alert>
          )}
          <SweetAlert2
            {...alertProps}
            onResolve={() => {
              setAlertProps({
                show: false,
                title: "",
                text: "",
              });
            }}
            onConfirm={handleDelete}
          />
          <CardBody className="border-0 bg-transparent">
            <Row>
              {diares.length > 0 ? (
                diares.map((diary) => (
                  <Col xs={12} md={3} sm={6} className="mb-3" key={diary?._id}>
                    <Card
                      className="diary-card"
                      // onMouseOver={(e) => mouseHoverEffect(diary)}
                      onClick={() => mouseHoverEffect(diary)}
                    >
                      <CardBody className="diary-card-body">
                        <h4>{diary.year}</h4>
                        <strong>{diary.name}</strong>
                        <div>
                          <small>{diary.caption}</small>
                        </div>
                      </CardBody>
                      <div
                        className={`${
                          selectedDiary?._id === diary?._id ? "active" : ""
                        } hover d-flex justify-content-center align-items-center`}
                      >
                        <Row className="hide">
                          <Col xs={3}>
                            <a
                              href={`/diary/${diary._id}`}
                              style={{ color: "#fff", textDecoration: "none" }}
                            >
                              <FaEye />
                            </a>
                          </Col>
                          <Col xs={3}>
                            <FaEdit style={{ cursor: "pointer" }}></FaEdit>
                          </Col>
                          <Col xs={3}>
                            <FaTrash
                              style={{ cursor: "pointer" }}
                              onClick={() => {
                                console.log("clicked");
                                setAlertProps({
                                  icon: "error",
                                  show: true,
                                  title: "Are you sure you want to delete",
                                  text: "Deleting your thoughts will never be a reversible process",
                                  showCloseButton: true,
                                  confirmButtonText: "Yes",
                                  confirmButtonColor: "#198754",
                                  showCancelButton: true,
                                });
                              }}
                            />
                          </Col>
                        </Row>
                      </div>
                    </Card>
                  </Col>
                ))
              ) : (
                <div>
                  <Col xs={12} md={12} className="text-center">
                    No Diaries found...
                  </Col>
                </div>
              )}
            </Row>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default Dashboard;
