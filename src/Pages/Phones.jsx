import "../App.css";
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import Swal from "sweetalert2";
import { IoCloseSharp } from "react-icons/io5";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";

export default function Phones() {
  const goToEWallet = useNavigate();
  const goToLogin = useNavigate();
  const [phones, setPhones] = useState(
    JSON.parse(localStorage.getItem("phones")) || []
  );
  const [addModalIndex, setAddModalIndex] = useState(false);
  const [editModalIndex, setEditModalIndex] = useState(false);
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
      localStorage.setItem("phones", JSON.stringify(copy));
      Swal.fire({
        icon: "success",
        text: "Phone Added",
        timer: 1500,
      });
      setAddModalIndex(false);
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
    localStorage.setItem("phones", JSON.stringify(copy));
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
    localStorage.setItem("phones", JSON.stringify(copy));

    Swal.fire({
      icon: "success",
      text: "Phone Updated",
      timer: 1500,
    });
    setEditModalIndex(false);
  };

  return (
    <div className="App col-12 p-3">
      <div className="col-12 mb-4 d-flex justify-content-between align-items-center">
        <button
          className="btn btn-warning"
          onClick={() => {
            goToEWallet("/EWallet");
          }}
        >
          Go to EWallet system <FaArrowRight />
        </button>
        <button className="btn btn-primary" onClick={()=>{goToLogin("/login")}}>Login</button>
      </div>
      {/* Add Phone Modal */}
      {addModalIndex && (
        <div
          className="ourModal d-flex justify-content-center align-items-center"
          onClick={() => setAddModalIndex(false)}
        >
          <form
            className="bg-light border rounded shadow p-4 col-11 col-md-8 col-lg-6 animate__animated animate__fadeInDown"
            onSubmit={handleSubmit}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="col-12 d-flex justify-content-between align-items-center p-1">
              <h2>Add New Phone</h2>
              <IoCloseSharp
                className="fs-2"
                onClick={() => setAddModalIndex(false)}
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
      )}
      {/* Edit Phone Modal */}
      {editModalIndex && (
        <div
          className="ourModal d-flex justify-content-center align-items-center"
          onClick={() => setEditModalIndex(false)}
        >
          <form
            className="bg-light border rounded shadow p-4 col-11 col-md-8 col-lg-6 animate__animated animate__fadeInDown"
            onSubmit={handleEdit}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="col-12 d-flex justify-content-between align-items-center p-1">
              <h2>Edit Phone Data</h2>
              <IoCloseSharp
                className="fs-2"
                onClick={() => setEditModalIndex(false)}
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
      )}
      {/* Main UI */}
      <h1>Phones Shop</h1>
      <button
        className="btn btn-primary"
        onClick={() => {
          showTable && setAddModalIndex(true);
        }}
      >
        + Add New Phone
      </button>
      <button
        className="btn btn-dark m-3"
        onClick={() => {
          setShowTable(!showTable);
        }}
      >
        Show Table
      </button>
      {showTable && (
        <table className="table table-bordered table-dark col-12 animate__animated animate__fadeInUp">
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
                      setEditModalIndex(true);
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
