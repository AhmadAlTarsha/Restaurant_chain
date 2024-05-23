
import React, { useState } from "react";


import { Modal, Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

// import SimpleSnackbar from "../Snackbar";

const AddModal = ({
  show,
  itemName,
  handleCloseModel,
  fun,
  snackBarText,
  snackBarStatus,
  content,
  setContent,
  emptyContent,
}) => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [newText, setNewText] = useState("");

  return (
    <>
      <Modal centered show={show} onHide={handleCloseModel}>
        <Modal.Header closeButton>
          <Modal.Title>{`Add ${itemName}`}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label>{`write ${itemName} here `}</Form.Label>
              {typeof content === "string" ? (
                <Form.Control
                  onChange={(e) => setNewText(e.target.value)}
                  as="textarea"
                  rows={3}
                />
              ) : (
                Object.keys(content).map((key, index) => (
                  <Form.Group key={index}>
                    {key === "image" ? (
                      <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>Upload Image</Form.Label>
                        <Form.Control  onChange={(e) =>
                            setContent((prevContent) => ({
                              ...prevContent,
                              [key]: e.target.files[0],
                            }))
                          } type="file" />
                      </Form.Group>
                    ) : (
                      <>
                        <Form.Label>{`Add ${key} `}</Form.Label>
                        <Form.Control
                          onChange={(e) =>
                            setContent((prevContent) => ({
                              ...prevContent,
                              [key]: e.target.value,
                            }))
                          }
                          as="textarea"
                          rows={3}
                        />
                      </>
                    )}
                  </Form.Group>
                ))
              )}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModel}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              if (typeof content === "string") {
                fun(newText.trim());
                setTimeout(() => {
                  setOpenSnackbar(true);
                }, 1000);
                setNewText("");
              } else {
                fun(content);
                // setTimeout(() => {
                //   setOpenSnackbar(true);
                // }, 1000);
              }
            }}
          >
            Save Changes
          </Button>
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
