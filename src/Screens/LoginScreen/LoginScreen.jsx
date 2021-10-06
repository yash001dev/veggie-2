import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { userLogin } from "../../redux/actions/userActions";
import LoadingBox from "../../components/LoadingBox";
import ErrorBox from "../../components/ErrorBox";
import { LoginContainer } from "./Styles";

const LoginScreen = (props) => {
  const dispatch = useDispatch();
  const { loading, user, error } = useSelector(
    (state) => state.userLoginReducer
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignin = (e) => {
    e.preventDefault();
    dispatch(userLogin(email, password));
  };

  useEffect(() => {
    if (Object.keys(user).length) {
      props.history.push("/");
    }
  }, [props.history, user]);

  return (
    <LoginContainer>
      <form onSubmit={handleSignin}>
        {loading && <LoadingBox />}
        {error && <ErrorBox msg={error} />}
        <div className="form-container">
          <div>
            <label htmlFor="email"> Email</label>
            <input
              type="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <button type="submit" className="general-button">
              Login
            </button>
          </div>
          <Link to="/register">
            <p>New User? Register</p>
          </Link>
        </div>
      </form>
    </LoginContainer>
  );
};

export default LoginScreen;
