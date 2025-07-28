import "../App.css";
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import Swal from "sweetalert2";
import { IoCloseSharp } from "react-icons/io5";
import { useState } from "react";

export default function Phones() {
  const [phones, setPhones] = useState([
    { name: "iphone x", price: 400, qty: 33 },
    { name: "iphone 11", price: 450, qty: 8 },
    { name: "iphone 13", price: 500, qty: 23 },
  ]);
  const [addModelIndex, setAddModelIndex] = useState(false);
  const [editModelIndex, setEditModelIndex] = useState(false);
  const [editPhoneIndex, setEditPhoneIndex] = useState(-1);
  const [newPhoneName, setNewPhoneName] = useState("");
  const [newPhonePrice, setNewPhonePrice] = useState(0);
  const [newPhoneQty, setNewPhoneQty] = useState(0);
  const [showTable, setShowTable] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (newPhoneName != "" && newPhonePrice != "" && newPhoneQty != "") {
      let newPhoneObj = {
        name: newPhoneName,
        price: newPhonePrice,
        qty: newPhoneQty,
      };
      let copy = [...phones];
      copy.push(newPhoneObj);
      setPhones(copy);
      Swal.fire({
        icon: "success",
        text: "Phone Added",
        timer: 1500,
      });
      setAddModelIndex(false);
    } else {
      Swal.fire({
        icon: "error",
        text: "Please Fill The Phone Data",
        timer: 1700,
      });
    }
  };

  const handleDelete = (index) => {
    let copy = [...phones];
    copy.splice(index, 1);
    setPhones(copy);
  };

  const handleEdit = (event) => {
    event.preventDefault();
    let updatedPhone = {
      name: newPhoneName,
      price: newPhonePrice,
      qty: newPhoneQty,
    };
    let copy = [...phones];
    copy[editPhoneIndex] = updatedPhone;
    setPhones(copy);
    Swal.fire({
      icon: "success",
      text: "Phone Updated",
      timer: 1500,
    });
    setEditModelIndex(false);
  };

  return (
    <div className="App col-12 p-3">
      {/* Add Phone Modal */}
      {addModelIndex ? (
        <div
          className="ourModel d-flex justify-content-center align-items-center"
          onClick={() => setAddModelIndex(false)}
        >
          <form
            className="bg-light border rounded shadow p-4 col-6 animate__animated animate__fadeInDown"
            onSubmit={handleSubmit}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="col-12 d-flex justify-content-between align-items-center p-1">
              <h2>Add New Phone</h2>
              <IoCloseSharp
                className="fs-2"
                onClick={() => setAddModelIndex(false)}
              />
            </div>
            <input
              onChange={(event) => setNewPhoneName(event.target.value)}
              className="form-control my-3"
              type="text"
              placeholder="Enter new phone name"
            />
            <input
              onChange={(event) => setNewPhonePrice(event.target.value)}
              className="form-control my-3"
              type="number"
              placeholder="Enter new phone price"
            />
            <input
              onChange={(event) => setNewPhoneQty(event.target.value)}
              className="form-control my-3"
              type="number"
              placeholder="Enter new phone qty"
            />
            <button className="btn btn-primary">+ Add New</button>
          </form>
        </div>
      ) : null}

      {/* Edit Phone Modal */}
      {editModelIndex ? (
        <div
          className="ourModel d-flex justify-content-center align-items-center"
          onClick={() => setEditModelIndex(false)}
        >
          <form
            className="bg-light border rounded shadow p-4 col-6 animate__animated animate__fadeInDown"
            onSubmit={handleEdit}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="col-12 d-flex justify-content-between align-items-center p-1">
              <h2>Edit Phone Data</h2>
              <IoCloseSharp
                className="fs-2"
                onClick={() => setEditModelIndex(false)}
              />
            </div>
            <input
              defaultValue={newPhoneName}
              onChange={(event) => setNewPhoneName(event.target.value)}
              className="form-control my-3"
              type="text"
              placeholder="Edit phone name"
            />
            <input
              defaultValue={newPhonePrice}
              onChange={(event) => setNewPhonePrice(event.target.value)}
              className="form-control my-3"
              type="number"
              placeholder="Edit phone price"
            />
            <input
              defaultValue={newPhoneQty}
              onChange={(event) => setNewPhoneQty(event.target.value)}
              className="form-control my-3"
              type="number"
              placeholder="Edit phone qty"
            />
            <button className="btn btn-primary">Save Changes</button>
          </form>
        </div>
      ) : null}

      {/* Main UI */}
      <button
        className="btn btn-primary m-3"
        onClick={() => {
          showTable && setAddModelIndex(true);
        }}
      >
        + Add New Phone
      </button>
      <button
        className="btn btn-dark"
        onClick={() => {
          setShowTable(!showTable);
        }}
      >
        Show Table
      </button>
      {showTable && (
        <table className="table table-bordered table-dark col-12">
          <thead>
            <tr>
              <th>-</th>
              <th>Name</th>
              <th>Price</th>
              <th>Qty</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {phones.map((el, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{el.name}</td>
                <td>{el.price} $</td>
                <td>{el.qty} PCS</td>
                <td>
                  <MdDeleteForever
                    className="text-danger fs-3 mx-3"
                    onClick={() => handleDelete(index)}
                  />
                  <FaEdit
                    className="text-warning fs-4"
                    onClick={() => {
                      setEditPhoneIndex(index);
                      setNewPhoneName(el.name);
                      setNewPhonePrice(el.price);
                      setNewPhoneQty(el.qty);
                      setEditModelIndex(true);
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
