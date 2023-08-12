import React, { useState, useRef, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import AuthService from "../services/AuthService";
import { useGlobalContext } from "../context/AuthContext";

const Login = () => {
  const { addUser, user } = useGlobalContext();
  const userRef = useRef();
  const [role, setRole] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (email && password) {
        const credentials = {
          email,
          password,
        };
        // const response = await AuthService.login(credentials);
        AuthService.login(credentials)
          .then((response) => addUser(response.data.user))
          .then((response) => setRole(response.data.user.role))
          .catch((error) => {
            console.log(error);
            // if (error) {
            //   alert("Invalid email,password");
            // }
            return;
          });

        // console.log(JSON.stringify(response?.data));
        // const token = await response.data.token;
        // const name = await response.data.user.name;
        // const userId = await response.data.user.userId;
        // const role = await response.data.user.role;
        // addUser({ token, userId, name, role });

        if (role === "cashier") {
          navigate("/home");
        }
        if (role === "manager") {
          navigate("/dashboard");
        }
        setEmail("");
        setPassword("");
      }
    } catch (error) {
      if (!error?.response) {
        setErrMsg("No server Response");
      } else if (!error?.response?.status === 400) {
        setErrMsg("Missing email or password");
      } else if (!error?.response?.status === 401) {
        setErrMsg("unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
    }
  };
  return (
    <section>
      {user &&
        (user.role === "manager" ? (
          <Navigate to="/dashboard" />
        ) : (
          <Navigate to="/home" />
        ))}
      {errMsg && <p aria-live="assertive">{errMsg}</p>}
      <div
        className="page-wrapper"
        id="main-wrapper"
        data-layout="vertical"
        data-navbarbg="skin6"
        data-sidebartype="full"
        data-sidebar-position="fixed"
        data-header-position="fixed"
      >
        <div className="position-relative overflow-hidden radial-gradient min-vh-100 d-flex align-items-center justify-content-center">
          <div className="d-flex align-items-center justify-content-center w-100">
            <div className="row justify-content-center w-100">
              <div className="col-md-8 col-lg-6 col-xxl-3">
                <div className="card mb-0">
                  <div className="card-body">
                    <a
                      href="./index.html"
                      className="text-nowrap logo-img text-center d-block py-3 w-100"
                    >
                      <img
                        src="../assets/images/logos/dark-logo.svg"
                        width="180"
                        alt=""
                      />
                    </a>
                    <p className="text-center">Aananda Mart</p>
                    <form>
                      <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                          Email
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          id="email"
                          ref={userRef}
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          aria-describedby="emailHelp"
                        />
                      </div>
                      <div className="mb-4">
                        <label htmlFor="password" className="form-label">
                          Password
                        </label>
                        <input
                          type="password"
                          className="form-control"
                          id="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                      </div>
                      {/* <div className="d-flex align-items-center justify-content-between mb-4">
                        <a className="text-primary fw-bold" href="./index.html">
                          Forgot Password ?
                        </a>
                      </div> */}
                      <button
                        type="submit"
                        className="btn btn-primary w-100 py-8 fs-4 mb-4 rounded-2"
                        onClick={handleSubmit}
                      >
                        Log In
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
