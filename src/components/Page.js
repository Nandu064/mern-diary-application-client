import React, { useContext } from "react";
import { Button, Card, CardBody, CardHeader, Col, Row } from "reactstrap";
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
const Page = () => {
  const { editorContent, setEditorContent } = useContext(AuthState);

  const handleContent = (content) => {
    setEditorContent(content);
  };
  const handleSubmit = () => {
    console.log("editorContent: ", editorContent);
  };
  return (
    <Row className="d-flex justify-content-center mt-3">
      <Col xs={12} md={9}>
        <Card className="border-0 m-2">
          <CardHeader className="bg-transparent border-0 d-flex justify-content-end">
            <Button color="success" onClick={handleSubmit}>
              Add New Page
            </Button>
          </CardHeader>
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
        </Card>
      </Col>
    </Row>
  );
};

export default Page;
