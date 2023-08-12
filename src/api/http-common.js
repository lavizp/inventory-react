import axios from "axios";

export default axios.create({
  withCredentials: true,
  credentials: "include",
  headers: {
    "Content-Type": "application/json",
  },
});
