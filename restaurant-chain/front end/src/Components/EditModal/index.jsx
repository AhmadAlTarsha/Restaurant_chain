import React, { useState } from "react";

import { Modal, Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import SimpleSnackbar from "../Snackbar";

//!file import
// import SimpleSnackbar from "../Snackbar";

const EditModal = ({
  content,
  show,
  setContent,
  id,
  itemName,
  handleCloseModel,
  fun,
  snackBarText,
  snackBarStatus,
}) => {
  const [openSnackbar, setOpenSnackbar] = useState(false);

  return (
    <>
      <Modal centered show={show} onHide={handleCloseModel}>
        <Modal.Header closeButton>
          <Modal.Title>{`Edit ${itemName}`}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>current name</Form.Label>
              {typeof content === "string" ? (
                <Form.Control
                  onChange={(e) => {
                    setContent(e.target.value);
                  }}
                  value={content}
                  as="textarea"
                  rows={3}
                />
              ) : (
                Object.keys(content).map((key, index) => {
                  return (
                    <Form.Control
                      key={index}
                      onChange={(e) => {
                        setContent((prevContent) => ({
                          ...prevContent,
                          [key]: e.target.value,
                        }));
                      }}
                      value={content[key]}
                      as="textarea"
                      rows={3}
                    />
                  );
                })
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
              // if (content === "") {
              //   console.log(true);
              //   console.log(content);
              //   setContent();
              //   console.log(content);
              // } else {
              //   console.log(false);
              //   console.log(content);
              // }

              fun(id, content);
              setTimeout(() => {
                setOpenSnackbar(true);
              }, 1000);
            }}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>{" "}
      <SimpleSnackbar
        open={openSnackbar}
        setOpen={setOpenSnackbar}
        text={snackBarText}
        status={snackBarStatus}
      />
    </>
  );
};

export default EditModal;
