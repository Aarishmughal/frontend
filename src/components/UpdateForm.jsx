import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { Navigate } from "react-router-dom";
const API_URL = "http://localhost:8080/api/items";

const UpdateForm = (props) => {
  const { id } = useParams();
  const [isUpdated, setIsUpdated] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");

  useEffect(() => {
    fetchItem(id); // Ensure props.id is passed to fetchItem
  }, [id]);

  const fetchItem = async (itemId) => {
    try {
      const response = await axios.get(`${API_URL}/${itemId}`);
      const itemData = response.data;
      setName(itemData.name);
      setPrice(itemData.price);
      setQuantity(itemData.quantity);
    } catch (error) {
      console.error("Error fetching item:", error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`${API_URL}/${id}`, {
        name,
        price,
        quantity,
      });
      console.log("Item updated:", response.data);
      setIsUpdated(true);
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  if (isUpdated) {
    return <Navigate to="/" replace />;
  }
  return (
    <div className="row mt-5 mx-5">
      <div className="col-lg">
        <div className="card shadow-lg p-3">
          <div className="row mb-2">
            <div className="col">
              <h1 className="display-2">{props.text}</h1>
              <hr />
            </div>
          </div>
          <form onSubmit={handleUpdate}>
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
              <div className="col-sm-8">
                <button
                  className={props.btnClass}
                  type="submit"
                  style={{ width: "100%" }}
                >
                  {props.btnText}
                </button>
              </div>
              <div className="col">
                <Link
                  to={`/`}
                  className="btn btn-outline-dark"
                  style={{ width: "100%" }}
                >
                  Back
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="col-lg-5">
        <div className="card shadow-lg p-3">
          <div className="row">
            <div className="col">
              <h1 className="display-2">Item Summary</h1>
              <hr />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <table className="table table-hover table-bordered">
                <thead>
                  <tr>
                    <th>Property Name</th>
                    <th>Data Value</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Name</td>
                    <td className="fst-italic">{name}</td>
                  </tr>
                  <tr>
                    <td>Price</td>
                    <td className="fst-italic">${price}</td>
                  </tr>
                  <tr>
                    <td>Quantity</td>
                    <td className="fst-italic">{quantity}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateForm;
