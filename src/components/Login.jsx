import { useState } from "react";

export default function Login({ lFacade, setLoggedIn, setErrorMessage }) {
  const init = { username: "", password: "" };
  const [loginCredentials, setLoginCredentials] = useState(init);

  const performLogin = (evt) => {
    evt.preventDefault();
    lFacade.login(
      loginCredentials.username,
      loginCredentials.password,
      setLoggedIn,
      setErrorMessage
    );
  };
  const onChange = (evt) => {
    setLoginCredentials({
      ...loginCredentials,
      [evt.target.id]: evt.target.value,
    });
  };

  return (
    <div className="functionalBG row ">
      <h2>Login</h2>
      <form onChange={onChange}>
        <div className="form-group">
          <label className="leftF"> Email adress</label>
          <br />
          <input
            className="form-control"
            placeholder="Example@example.com"
            id="username"
          />
          <p className="opacity-50 leftF">
            We'll never share your email with anyone else
          </p>
        </div>
        <br />
        <br />
        <label className="leftF">Password</label>
        <div className="form-group">
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            id="password"
          />
          <br />

          <button className="btn buttonBG" onClick={performLogin}>
            Login
          </button>
        </div>
      </form>
    </div>
  );
}