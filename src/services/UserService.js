import http from "../api/http-common";

const getAllUsers = () => {
  return http.get("/user");
};
const createUser = (data) => {
  return http.post("/auth/register", data);
};

const getSingleUser = (id) => {
  // console.log("id", id);
  return http.get(`/user/${id}`);
};
const updateUser = ({ _id, data }) => {
  const { name, email, contact, role } = data[0];
  const updatedUser = {
    name,
    email,
    contact,
    role,
  };
  // console.log(updatedUser, "updated");
  return http.patch(`/user/${_id}`, updatedUser);
};
const deleteUser = (id) => {
  return http.delete(`/user/${id}`);
};
const updatePassword = ({ id, data }) => {
  const { currentPassword, newPassword, confirmPassword } = data;
  data = {
    currentPassword,
    newPassword,
    confirmPassword,
  };
  console.log("data from service", data, id);
  return http.patch(`/user/changepassword/${id}`, data);
};
const UserService = {
  getAllUsers,
  createUser,
  getSingleUser,
  updateUser,
  deleteUser,
  updatePassword,
};

export default UserService;
