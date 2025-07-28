export default function LoginPage() {
  return (
    <div className="col-12 d-flex justify-content-center align-items-center" style={{height:"100vh"}}>
      <form onSubmit={(event)=>{event.preventDefault()}} className="col-6 p-3 shadow border bg-light rounded d-flex flex-column justify-content-between gap-3">
        <h1>Login</h1>
        <input type="text" className="form-control" placeholder="Enter Your Name" />
        <input type="email" className="form-control" placeholder="Enter Your Email" />
        <input type="password" className="form-control" placeholder="Enter Your Password" />
        <button className="btn btn-dark">login</button>
      </form>
    </div>
  )
}
