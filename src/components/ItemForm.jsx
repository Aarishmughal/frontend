import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
const API_URL = "http://localhost:8080/api/items";

const ItemForm = (props) => {
  const [isAdded, setIsAdded] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(API_URL, {
        name,
        price,
        quantity,
      });
      console.log("Item created:", response.data);
      setIsAdded(true);
    } catch (error) {
      console.error("Error creating item:", error);
    }
  };
  if(isAdded){
    return <Navigate to="/" replace/>
  }
  return (
    <div className="row mt-5">
      <div className="col-lg-3"></div>
      <div className="col-lg">
        <div className="card shadow-lg p-3">
          <div className="row mb-2">
            <div className="col">
              <h1 className="display-2">{props.text}</h1>
              <hr />
            </div>
          </div>
          <form onSubmit={handleAdd}>
            <div className="row mb-2">
              <div className="col">
                <label className="form-text" htmlFor="name">
                  Name
                </label>
                <input
                  className="form-control"
                  onChange={(e) => setName(e.target.value)}
                  required
                  value={name}
                  name="name"
                  id="name"
                />
              </div>
            </div>
            <div className="row mb-2">
              <div className="col">
                <label className="form-text" htmlFor="price">
                  Price
                </label>
                <div className="input-group">
                  <span className="input-group-text">$</span>
                  <input
                    className="form-control"
                    onChange={(e) => setPrice(e.target.value)}
                    required
                    value={price}
                    name="price"
                    id="price"
                  />
                </div>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col">
                <label className="form-text" htmlFor="quantity">
                  Quantity
                </label>
                <input
                  className="form-control"
                  onChange={(e) => setQuantity(e.target.value)}
                  required
                  value={quantity}
                  name="quantity"
                  id="quantity"
                />
              </div>
            </div>
            <div className="row">
              <div className="col-8">
                <button
                  className={props.btnClass}
                  type="submit"
                  style={{ width: "100%" }}
                >
                  {props.btnText}
                </button>
              </div>
              <div className="col">
                <Link to={`/`} className="btn btn-outline-dark" style={{width:"100%"}}>Back</Link>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="col-lg-3"></div>
    </div>
  );
};

export default ItemForm;
