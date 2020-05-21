import React, { useEffect, useContext } from "react";
import Context from "./Context";
import AddCust from "./addCust";
import AddAddress from "./addAddress";

function LandingPage() {
  const ctx = useContext(Context);

  const fetchCustList = () => {
    fetch("/api/cust_list")
      .then((res) => {
        if (!res.ok) {
          throw new Error();
        }
        return res.json();
      })
      .then((data) => {
        document.getElementById("no-cust").style.display = "none";
        ctx.dispatch({ type: "setCustList", payload: data.list });
      })
      .catch(
        (err) => (document.getElementById("no-cust").style.display = "block")
      );
  };

  useEffect(() => {
    fetchCustList();
  }, []);

  const fetchAddressList = (e, id) => {
    e.preventDefault();
    if (ctx.selectedCust !== "") {
      document.getElementById(ctx.selectedCust).style.backgroundColor =
        "inherit";
      document.getElementById(ctx.selectedCust).style.color = "black";
    }

    ctx.dispatch({
      type: "setAddress",
      payload: { cust_id: id },
    });

    ctx.dispatch({
      type: "setSelectedCust",
      payload: e.target.parentNode.id,
    });

    document.getElementById(e.target.parentNode.id).style.backgroundColor =
      "#222222";
    document.getElementById(e.target.parentNode.id).style.color = "white";

    fetch("/api/" + id + "/addresses")
      .then((res) => {
        if (!res.ok) {
          throw new Error();
        }
        return res.json();
      })
      .then((data) => {
        document.getElementById("no-add").style.display = "none";
        ctx.dispatch({ type: "setAddressList", payload: data.list });
      })
      .catch((err) => {
        ctx.dispatch({ type: "setAddressList", payload: [] });
        document.getElementById("no-add").style.display = "block";
      });
  };

  return (
    <div id="main">
      <div id="header">
        <h1>High Space task</h1>
      </div>
      <div id="cust_list">
        <div id="head">
          <h2>Customer List</h2>
          <button
            onClick={() =>
              ctx.dispatch({ type: "setAddCustModal", payload: true })
            }
          >
            Add Customer
          </button>
        </div>

        <ul>
          <li>
            <span>
              <strong>Sr.No.</strong>{" "}
            </span>
            <span>
              <strong>Cust Id</strong>{" "}
            </span>
            <span>
              <strong>Name</strong>{" "}
            </span>
            <span>
              <strong>Age</strong>{" "}
            </span>
            <span>
              <strong>Sex</strong>{" "}
            </span>
          </li>
          <h3 style={{ display: "none" }} id="no-cust">
            No Customers, Please add some
          </h3>
          {ctx.custList.map((cust, index) => (
            <li
              key={index}
              onClick={(e) => fetchAddressList(e, cust._id)}
              id={index}
            >
              <span>{index + 1}</span>
              <span>{cust.cust_id}</span>
              <span>{cust.f_name + " " + cust.l_name}</span>
              <span>{cust.age}</span>
              <span>{cust.sex}</span>
            </li>
          ))}
        </ul>
      </div>
      <div id="address_list">
        <div id="head">
          <h2>Address List of Customer</h2>
          <button
            onClick={() =>
              ctx.dispatch({ type: "setAddAddressModal", payload: true })
            }
            disabled={ctx.address.cust_id !== "" ? false : true}
          >
            Add Address For {Number(ctx.selectedCust) + 1}
          </button>
        </div>
        <ul>
          <li>
            <span>
              <strong>Sr. No.</strong>{" "}
            </span>
            <span>
              <strong>House No.</strong>{" "}
            </span>
            <span>
              <strong>Street No.</strong>{" "}
            </span>
            <span>
              <strong>City</strong>{" "}
            </span>
            <span>
              <strong>State</strong>{" "}
            </span>
          </li>
          {ctx.selectedCust === "" && <h3>Please select customer...</h3>}
          <h3 style={{ display: "none" }} id="no-add">
            No Addresses for this customer, Please add some
          </h3>
          {ctx.addressList.map((address, index) => (
            <li key={address._id}>
              <span>{index + 1}</span>
              <span>{address.h_no}</span>
              <span>{address.s_no}</span>
              <span>{address.city}</span>
              <span>{address.state}</span>
            </li>
          ))}
        </ul>
      </div>
      <AddCust fetchCustList={fetchCustList} />
      <AddAddress />
    </div>
  );
}

export default LandingPage;
