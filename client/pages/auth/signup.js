export default function Signup() {
  return (
    <form>
      <h1>Sign up</h1>
      <div className="form-group">
        <label>Email Address</label>
        <input className="form-control" />
      </div>
      <div className="form-group">
        <label>Password</label>
        <input type="password" className="form-control" />
      </div>
      <button className="btn btn-primary">Sign up</button>
    </form>
  );
}
