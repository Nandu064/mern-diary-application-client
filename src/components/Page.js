import React, { useContext, useEffect, useState } from "react";
import {
  Alert,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Row,
} from "reactstrap";
import { useLocation, useParams } from "react-router-dom";
import SunEditor from "suneditor-react";
import { AuthState } from "../context/AuthState";
import {
  align,
  fontColor,
  fontSize,
  formatBlock,
  hiliteColor,
  horizontalRule,
  lineHeight,
  list,
  paragraphStyle,
  link,
} from "suneditor/src/plugins";
import { API_URL, getUserDetails } from "../helpers/constants";
import axios from "axios";
const Page = (props) => {
  const { editorContent, setEditorContent } = useContext(AuthState);
  const [alertConfig, setAlertConfig] = useState({
    color: "",
    isOpen: false,
    message: "",
  });
  const { diary_id } = useParams();

  const handleContent = (content) => {
    setEditorContent(content);
  };
  const handleSubmit = () => {
    const user = getUserDetails();
    console.log("editorContent: ", editorContent);
    const payload = {
      user_id: user?._id,
      diary_id,
      content: editorContent,
    };
    axios.post(`${API_URL}/page/add-page`, payload).then((res) => {
      console.log("res: ", res);
      if (res.data) {
        setAlertConfig({
          color: "success",
          isOpen: true,
          message: res.data.message ?? "",
        });
        setEditorContent("");
      }
    });
  };

  return (
    <>
      {alertConfig.isOpen && (
        <Alert
          color={alertConfig.color}
          isOpen={alertConfig.isOpen}
          toggle={() =>
            setAlertConfig({ ...alertConfig, isOpen: !alertConfig.isOpen })
          }
          style={{
            position: "fixed",
            top: "12%",
            right: "10px",
            zIndex: 999,
          }}
        >
          {alertConfig.message}
        </Alert>
      )}
      <Row className="d-flex justify-content-center mt-3">
        <Col xs={12} md={9}>
          <Card className="border-0 m-2">
            <CardBody className="border-0">
              <SunEditor
                className="sunEditor"
                placeholder="Enter your thoughts..."
                height="300px"
                onChange={handleContent}
                defaultValue={editorContent}
                setContents={editorContent}
                setOptions={{
                  buttonList: [
                    ["undo", "redo"],
                    ["fontSize", "formatBlock"],
                    ["paragraphStyle"],
                    [
                      "bold",
                      "underline",
                      "italic",
                      "strike",
                      "subscript",
                      "superscript",
                    ],
                    ["fontColor", "hiliteColor"],
                    ["removeFormat"],
                    "/",
                    ["align", "horizontalRule", "list", "lineHeight"],
                    ["link"],
                    ["preview"],
                  ],
                  plugins: [
                    align,
                    fontColor,
                    fontSize,
                    formatBlock,
                    hiliteColor,
                    horizontalRule,
                    lineHeight,
                    list,
                    paragraphStyle,
                    link,
                  ],
                }}
              />
            </CardBody>
            <CardFooter className="bg-transparent border-0 d-flex justify-content-end">
              <Button color="success" onClick={handleSubmit}>
                Submit
              </Button>
            </CardFooter>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Page;
