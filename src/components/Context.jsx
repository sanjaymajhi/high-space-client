import React, { useReducer } from "react";

const Context = React.createContext();

function reducer(state, action) {
  switch (action.type) {
    case "setCustList":
      return { ...state, custList: action.payload };
    case "setSelectedCust":
      return { ...state, selectedCust: action.payload };
    case "setAddressList":
      return { ...state, addressList: action.payload };
    case "setAddCustModal":
      return { ...state, addCustModal: action.payload };
    case "setAddAddressModal":
      return { ...state, addAddressModal: action.payload };
    case "setCustomer":
      return { ...state, customer: { ...state.customer, ...action.payload } };
    case "setAddress":
      return { ...state, address: { ...state.address, ...action.payload } };
    default:
      return state;
  }
}

const initialState = {
  custList: [],
  selectedCust: "",
  addressList: [],
  customer: {
    f_name: "",
    l_name: "",
    age: Number,
    sex: "",
  },
  address: {
    cust_id: "",
    h_no: "",
    s_no: Number,
    city: "",
    state: "",
  },
  addCustModal: false,
  addAddressModal: false,
};

export function ContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <Context.Provider value={{ ...state, dispatch }}>
      {children}
    </Context.Provider>
  );
}

export const ContextConsumer = Context.Consumer;

export default Context;
