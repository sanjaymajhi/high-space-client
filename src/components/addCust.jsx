import React, { useContext } from "react";
import { Modal, Form, Button, Row, Col, Alert } from "react-bootstrap";
import Context from "./Context";

function AddCust(props) {
  const ctx = useContext(Context);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    ctx.dispatch({ type: "setCustomer", payload: { [name]: value } });
  };

  const handleCloseAddCustModal = () => {
    ctx.dispatch({ type: "setAddCustModal", payload: false });
  };

  const add_cust = (e) => {
    e.preventDefault();
    const headers = new Headers();
    headers.append("content-type", "application/json");

    fetch("/api/add_cust", {
      method: "post",
      body: JSON.stringify(ctx.customer),
      headers: headers,
    })
      .then(async (res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
      })
      .then(() => {
        props.fetchCustList(props.cust_id);
        ctx.dispatch({ type: "setAddCustModal", payload: false });
      })
      .catch((err) => {
        const alert = document.getElementById("add-alert");
        alert.style.display = "block";
        alert.innerHTML = err;
      });
  };

  return (
    <Modal
      show={ctx.addCustModal}
      onHide={handleCloseAddCustModal}
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title>Add Customer</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Alert
          variant={"danger"}
          style={{ display: "none" }}
          id="add-alert"
        ></Alert>
        <Form onChange={handleChange} onSubmit={add_cust}>
          <Row>
            <Col>
              <Form.Group controlId="formBasicFirstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter First Name"
                  name="f_name"
                  required={true}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formBasicLastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Last Name"
                  name="l_name"
                  required={true}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group controlId="formBasicSex">
                <Form.Label>Sex</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Sex (M/F/O)"
                  name="sex"
                  required={true}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formBasicAge">
                <Form.Label>Age</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Add Your Age"
                  name="age"
                  required={true}
                />
              </Form.Group>
            </Col>
          </Row>

          <Button variant="primary" type="submit">
            Add
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default AddCust;
