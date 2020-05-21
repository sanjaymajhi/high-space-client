import React, { useContext } from "react";
import { Modal, Form, Button, Row, Col, Alert } from "react-bootstrap";
import Context from "./Context";

function AddAddress(props) {
  const ctx = useContext(Context);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    console.log(name, value);
    ctx.dispatch({ type: "setAddress", payload: { [name]: value } });
  };

  const handleCloseAddAddressModal = () => {
    ctx.dispatch({ type: "setAddAddressModal", payload: false });
  };

  const add_address = (e) => {
    e.preventDefault();
    const headers = new Headers();
    headers.append("content-type", "application/json");
    fetch("/api/add_address", {
      method: "post",
      body: JSON.stringify(ctx.address),
      headers: headers,
    })
      .then(async (res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
      })
      .then(() => {
        ctx.dispatch({
          type: "setAddressList",
          payload: [...ctx.addressList, ctx.address],
        });
        ctx.dispatch({ type: "setAddAddressModal", payload: false });
      })
      .catch((err) => {
        const alert = document.getElementById("add-alert");
        alert.style.display = "block";
        alert.innerHTML = err;
      });
  };

  return (
    <Modal
      show={ctx.addAddressModal}
      onHide={handleCloseAddAddressModal}
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title>Add Address</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Alert
          variant={"danger"}
          style={{ display: "none" }}
          id="add-alert"
        ></Alert>
        <Form onChange={handleChange} onSubmit={add_address}>
          <Row>
            <Col>
              <Form.Group controlId="formBasicH_no">
                <Form.Label>House No.</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter House No."
                  name="h_no"
                  required={true}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formBasicS_no">
                <Form.Label>Street No.</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter Street No."
                  name="s_no"
                  required={true}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group controlId="formBasicCity">
                <Form.Label>City</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter City"
                  name="city"
                  required={true}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formBasicState">
                <Form.Label>State</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Add Your State"
                  name="state"
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

export default AddAddress;
