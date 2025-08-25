import { useRef } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const myPass = useRef();
  const myName = useRef();
  const navigate = useNavigate();

  let login = (event) => {
    event.preventDefault();
    if (myPass.current.value == "1234"&& myName.current.value == "Mohamed") {
      toast.success("Login successed");
      navigate("/EWallet");
    } else {
      toast.error("wrong password");
    }
  };
  return (
    <div
      className="bg-light col-12 d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <form
        onSubmit={login}
        className="col-10 col-md-7 col-lg-5 p-4 shadow border bg-light rounded d-flex flex-column justify-content-between gap-4"
      >
        <h1>Login</h1>
        <input
          ref={myName}
          type="text"
          className="form-control"
          placeholder="Enter Your Username"
        />
        <input
          ref={myPass}
          type="password"
          className="form-control"
          placeholder="Enter Your Password"
        />
        <button className="btn btn-dark">login</button>
      </form>
    </div>
  );
}
