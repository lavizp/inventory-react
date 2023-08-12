import http from "../api/http-common";

const login = (data) => {
  return http.post("/auth/login", data);
};
const logout = () => {
  return http.get("/auth/logout");
};
const AuthService = { login, logout };

export default AuthService;
