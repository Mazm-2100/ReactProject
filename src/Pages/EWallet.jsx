import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";

export default function EWallet() {
  const myInput = useRef();
  const goToPhones = useNavigate();
  const goToLogin = useNavigate();
  const [balance, setBalance] = useState(+localStorage.getItem("balance") || 0);
  const [transactions, setTransactions] = useState(
    JSON.parse(localStorage.getItem("transactions")) || []
  );
  const [showTrans, setShowTrans] = useState(false);
  const [showBalance, setShowBalance] = useState(false);
  const diposit = () => {
    let value = +myInput.current.value;
    if (value > 0) {
      let newObj = {
        bBalance: balance,
        amount: value,
        type: "diposit",
        aBalance: balance + value,
      };
      let copy = [...transactions];
      copy.push(newObj);
      setTransactions(copy);
      setBalance(balance + value);
      myInput.current.value = "";
      toast.success("diposit is Done");
      localStorage.setItem("balance", balance + value);
      localStorage.setItem("transactions", JSON.stringify(copy));
    } else {
      myInput.current.value = "";
      toast.error("please enter money");
    }
  };
  const withdorw = () => {
    let value = +myInput.current.value;
    if (balance >= value && value > 0) {
      let newObj = {
        bBalance: balance,
        amount: value,
        type: "withdrow",
        aBalance: balance - value,
      };

      let copy = [...transactions];
      copy.push(newObj);
      setTransactions(copy);
      setBalance(balance - value);
      myInput.current.value = "";
      toast.success("Withdrow is Done");
      localStorage.setItem("balance", balance - value);
      localStorage.setItem("transactions", JSON.stringify(copy));
    } else {
      myInput.current.value = "";
      toast.error("No money to withdorw");
    }
  };
  return (
    <div className="p-3">
      <div className="col-12 mb-4 d-flex justify-content-between align-items-center">
        <button
          className="btn btn-warning"
          onClick={() => {
            goToPhones("/phones");
          }}
        >
          Go to Phones system <FaArrowRight />
        </button>
        <button
          className="btn btn-primary"
          onClick={() => {
            goToLogin("/");
          }}
        >
          Login
        </button>
      </div>

      <h1 className="col-10 col-md-7 col-lg-8 col-xl-5 d-flex justify-content-between align-items-center gap-1">
        Your balance is 
        <span className="col d-flex justify-content-center align-items-center"> {showBalance ? balance + " EGP " : " ******** "} </span>
         {showBalance ? (
          <FaEyeSlash
            onClick={() => {
              setShowBalance(false);
            }}
          />
        ) : (
          <FaEye
            onClick={() => {
              setShowBalance(true);
            }}
          />
        )}
      </h1>

      <input
        ref={myInput}
        disabled={!showBalance}
        min={0}
        style={{ height: "7vh" }}
        type="number"
        className="form-control my-2"
        placeholder="Enter amount"
      />
      <div className="col-12 d-flex">
        <button className="btn btn-danger" onClick={withdorw}>
          Withdorw
        </button>
        <button className="btn btn-primary" onClick={diposit}>
          Diposit
        </button>
        {showBalance && (
          <button
            className="btn btn-dark"
            onClick={() => {
              setShowTrans(!showTrans);
            }}
          >
            show transactions
          </button>
        )}
      </div>
      {showTrans && showBalance && (
        <table className="table table-dark table-bordered my-3 animate__animated animate__fadeInUp ">
          <thead>
            <tr>
              <th>-</th>
              <th>Before Balance</th>
              <th>Amount</th>
              <th>Type</th>
              <th>After Balance</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((el, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{el.bBalance}</td>
                  <td>{el.amount}</td>
                  <td>{el.type}</td>
                  <td>{el.aBalance}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}
