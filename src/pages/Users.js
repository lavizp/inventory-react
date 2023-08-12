import React, { useState, useEffect } from "react";
import UserService from "../services/UserService";
import { FaPlus } from "react-icons/fa";
import SingleUser from "../components/Users/SingleUser";
const Users = () => {
  const [users, setUsers] = useState([]);

  const addUser = () => {
    // console.log("add");
    setUsers((pre) => {
      let old_data = [...pre];
      let newUser = {
        _id: "new",
        name: "",
        email: "",
        contact: 0,
        role: "cashier",
        password: "password",
        isEdit: "true",
      };
      old_data = old_data.map((a) => ({ ...a, isEdit: false }));
      old_data.push(newUser);

      return old_data;
    });
  };

  useEffect(() => {
    retrieveUsers();
  }, []);

  const retrieveUsers = () => {
    UserService.getAllUsers()
      .then((response) => {
        let data = response.data.users;
        data = data.map((a) => ({
          ...a,
          isEdit: false,
        }));

        setUsers(data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <>
      <div className="container-lg">
        <div className="table-responsive">
          <div className="table-wrapper">
            <div className="table-title">
              <div className="row">
                <div className="col-sm-8">
                  <h2>
                    Employee <b>Details</b>
                  </h2>
                </div>
                <div className="col-sm-4">
                  <button
                    type="button"
                    className="btn btn-info add-new"
                    // onClick={() => setAddingUser(true)}
                    onClick={addUser}
                  >
                    <FaPlus />
                    Add New
                  </button>
                </div>
              </div>
            </div>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users &&
                  users.map((user) => {
                    return (
                      <>
                        <SingleUser
                          {...user}
                          setUsers={setUsers}
                          retrieveUsers={retrieveUsers}
                        />
                      </>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Users;
