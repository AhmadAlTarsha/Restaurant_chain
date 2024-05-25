import React, { useState } from "react";

import { Modal, Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import SimpleSnackbar from "../Snackbar";



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
             
              {typeof content === "string" ? (
                <> <Form.Label>current name</Form.Label>
                <Form.Control
                  onChange={(e) => {
                    setContent(e.target.value);
                  }}
                  value={content}
                  as="textarea"
                  rows={3}
                /></>
                
              ) : (
                Object.keys(content).map((key, index) => {
                  
                  return (<><Form.Label>current {key}</Form.Label>
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
                    /></>
                    
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
             

              fun(id, content);
              setTimeout(() => {
                setOpenSnackbar(true);
              }, 1000);
            }}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
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
