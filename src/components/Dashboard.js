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
import { FaEye } from "react-icons/fa";

const Dashboard = () => {
  const [alertConfig, setAlertConfig] = useState({
    color: "",
    isOpen: false,
    message: "",
  });
  const [diares, setDiares] = useState([
    {
      user_id: "123",
      _id: "1",
      name: "My Diary",
      caption: "My diary caption",
      year: "2023",
    },
    {
      user_id: "123",
      _id: "2",
      name: "My Diary123",
      caption: "My diary caption",
      year: "2024",
    },
    {
      user_id: "123",
      _id: "3",
      name: "My Diary456",
      caption: "My diary caption",
      year: "2025",
    },
    {
      user_id: "123",
      _id: "4",
      name: "My Diary789",
      caption: "My diary caption",
      year: "2025",
    },
    {
      user_id: "123",
      _id: "5",
      name: "My Diary901",
      caption: "My diary caption",
      year: "2025",
    },
  ]);

  const [newDiary, setNewDiary] = useState({});
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const [selectedDiary, setSelectedDiary] = useState({});
  const mouseHoverEffect = (item) => {
    console.log("item: ", item);
    setSelectedDiary(item);
  };

  // useEffect(() => {}, [selectedDiary]);

  const changeHandler = (e) => {
    setNewDiary({
      ...newDiary,
      _id: diares.length + 1,
      user_id: "123",
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    console.log("newDiary", newDiary);
    let filteredData = diares.filter((v) => v.year == newDiary.year);
    console.log("filteredData: ", filteredData.length);
    if (filteredData.length > 0) {
      setAlertConfig({
        isOpen: true,
        message: "Cannot create multiple diaries for same year",
      });
      toggle();
    } else {
      setDiares([...diares, newDiary]);
      toggle();
    }
  };

  return (
    <Row>
      <Col xs={12}>
        <Card className="border-0 bg-transparent">
          <CardHeader className="border-0 bg-transparent d-flex justify-content-end">
            <Button color="success" onClick={toggle}>
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

          <Alert
            color="danger"
            isOpen={alertConfig.isOpen}
            toggle={() =>
              setAlertConfig({ ...alertConfig, isOpen: !alertConfig.isOpen })
            }
          >
            {alertConfig.message}
          </Alert>
          <CardBody className="border-0 bg-transparent">
            <Row>
              {diares.length > 0 ? (
                diares.map((diary) => (
                  <Col xs={12} md={3} className="mb-3" key={diary?._id}>
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
                      <a
                        href={`/diary/${diary._id}`}
                        style={{ color: "#fff", textDecoration: "none" }}
                      >
                        <div
                          className={`${
                            selectedDiary?._id === diary?._id ? "active" : ""
                          } hover d-flex justify-content-center align-items-center`}
                        >
                          <FaEye />
                        </div>
                      </a>
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
