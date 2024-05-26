import React, { useState } from "react";
import { Modal, Form, Button, Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import SimpleSnackbar from "../Snackbar";


const AddModal = ({
  show,
  itemName,
  handleCloseModel,
  fun,
  snackBarText,
  snackBarStatus,
  content,
  setContent,
}) => {
  // const [openSnackbar, setOpenSnackbar] = useState(false);
  const [newText, setNewText] = useState("");

  const handleSaveChanges = () => {
    if (typeof content === "string") {
      fun(newText.trim());
      // setTimeout(() => {
      //   setOpenSnackbar(true);
      // }, 1000);
      setNewText("");
    } else {
      fun(content);
      // setTimeout(() => {
      //   setOpenSnackbar(true);
      // }, 1000);
    }
    handleCloseModel();
  };

  return (
    <>
      <Modal centered show={show} onHide={handleCloseModel} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{`Add ${itemName}`}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Form>
              <Form.Group className="mb-4" controlId="exampleForm.ControlTextarea1">
                <Form.Label>{`Write ${itemName} here`}</Form.Label>
                {typeof content === "string" ? (
                  <Form.Control
                    onChange={(e) => setNewText(e.target.value)}
                    as="textarea"
                    rows={3}
                    value={newText}
                    placeholder={`Enter ${itemName}`}
                    className="custom-input"
                  />
                ) : (
                  Object.keys(content).map((key, index) => (
                    <Form.Group key={index} className="mb-3">
                      {key === "image" ? (
                        <Form.Group controlId="formFile" className="mb-3">
                          <Form.Label>Upload Image</Form.Label>
                          <Form.Control
                            onChange={(e) =>
                              setContent((prevContent) => ({
                                ...prevContent,
                                [key]: e.target.files[0],
                              }))
                            }
                            type="file"
                            className="custom-input"
                          />
                        </Form.Group>
                      ) : (
                        <>
                          <Form.Label>{`Add ${key}`}</Form.Label>
                          <Form.Control
                            onChange={(e) =>
                              setContent((prevContent) => ({
                                ...prevContent,
                                [key]: e.target.value,
                              }))
                            }
                            as="textarea"
                            rows={3}
                            value={content[key]}
                            placeholder={`Enter ${key}`}
                            className="custom-input"
                          />
                        </>
                      )}
                    </Form.Group>
                  ))
                )}
              </Form.Group>
            </Form>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Container>
            <Row className="justify-content-end">
              <Col xs="auto">
                <Button variant="secondary" onClick={handleCloseModel}>
                  Close
                </Button>
              </Col>
              <Col xs="auto">
                <Button variant="primary" onClick={handleSaveChanges}>
                  Save Changes
                </Button>
              </Col>
            </Row>
          </Container>
        </Modal.Footer>
      </Modal>

      {/* <SimpleSnackbar
        open={openSnackbar}
        setOpen={setOpenSnackbar}
        text={snackBarText}
        status={snackBarStatus}
      /> */}
    </>
  );
};

export default AddModal;
