import { useRef, useState } from "react";
import toast from "react-hot-toast";

export default function EWallet() {
  const myInput = useRef();
  const [balance, setBalance] = useState(+localStorage.getItem("balance") || 0);
  const [transactions, setTransactions] = useState(
    JSON.parse(localStorage.getItem("transactions")) || []
  );
  const [showTrans, setShowTrans] = useState(false);
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
      toast.error("please enter mony");
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
      toast.error("No mony to withdorw");
    }
  };
  return (
    <div className="p-3">
      <h1>Your balance is {balance} EGP</h1>
      <input
        ref={myInput}
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
        <button
          className="btn btn-dark"
          onClick={() => {
            setShowTrans(!showTrans);
          }}
        >
          show transactions
        </button>
      </div>
      {showTrans && (
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
