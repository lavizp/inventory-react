import React, { useEffect, useState } from "react";

import UserService from "../services/UserService";
import { useGlobalContext } from "../context/AuthContext";
import { FaTimes } from "react-icons/fa";

function Profile() {
  const { user } = useGlobalContext();
  const [singleUser, setSingleUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage the visibility of the modal
  const [isNameModalOpen, setIsNameModalOpen] = useState(false); // State to manage the visibility of the modal

  const getSingleUser = () => {
    UserService.getSingleUser(user.userId).then((res) => {
      setSingleUser(res.data.user);
    });
  };

  useEffect(() => {
    user && getSingleUser();
  }, []);

  const handleOpenModal = () => {
    console.log(isModalOpen);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handlOpenNameModal = () => {
    console.log(isModalOpen);
    setIsNameModalOpen(true);
  };

  const handleCloseNameModal = () => {
    setIsNameModalOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let currentPassword = e.target.currentPassword.value;
    let newPassword = e.target.newPassword.value;
    let confirmPassword = e.target.confirmPassword.value;
    if (newPassword !== confirmPassword) {
      alert("New Passwrod and Current Password should be same");
      return;
    }
    if (newPassword === currentPassword) {
      alert("New Passwrod should be different from current password");
      return;
    }
    const id = user.userId;
    let data = {
      currentPassword,
      newPassword,
      confirmPassword,
    };

    UserService.updatePassword({ id, data })
      .then((res) => {
        console.log(res.data);
        if (res.status === 200) {
          alert("Password changed");
          e.target.currentPassword.value = "";
          e.target.newPassword.value = "";
          e.target.confirmPassword.value = "";
          handleCloseModal();
        }
      })
      .catch((err) => {
        console.log("msg", err.response);
        if (err.response.status === 400) {
          alert(err.response.data.msg);
          return;
        }
      });
  };
  const handleSubmitName = (e) => {
    e.preventDefault();
    let name = e.target.name.value;
    const data = [
      {
        name,
      },
    ];
    UserService.updateUser({ _id: user.userId, data })
      .then(() => {
        // Update the singleUser state with the updated name
        setSingleUser((prevState) => ({
          ...prevState,
          name: name,
        }));
        e.target.name.value = "";
        e.target.password.value = "";
        handleCloseNameModal();
      })
      .catch((err) => {
        console.log("msg", err.response);
        if (err.response.status === 400) {
          alert(err.response.data.msg);
        }
      });
    // getSingleUser();
    handleCloseNameModal();
  };

  if (singleUser) {
    return (
      <div>
        <section className="vh-100">
          <div className="container py-5 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col col-lg-6 mb-4 mb-lg-0">
                <div className="card mb-3" style={{ borderRadius: ".5rem" }}>
                  <div className="row g-0">
                    <div
                      className="col-md-4 gradient-custom text-center text-white position-relative"
                      style={{
                        borderTopLeftRadius: ".5rem",
                        borderBottomLeftRadius: ".5rem",
                      }}
                    >
                      <div className="position-absolute top-50 start-50 translate-middle">
                        <h5>{singleUser.name}</h5>
                        <p>{singleUser.role}</p>
                      </div>
                    </div>
                    <div className="col-md-8">
                      <div className="card-body p-4">
                        <h6>Personal Information</h6>
                        <hr className="mt-0 mb-4" />
                        <div className="row pt-1">
                          <div className="col-8 mb-3">
                            <h6>Email</h6>
                            <p className="text-muted">{singleUser.email}</p>
                          </div>
                        </div>
                        <h6>Change Information</h6>
                        <hr className="mt-0 mb-4" />
                        <div className="row pt-1">
                          <div className="col-6 mb-3">
                            <h6>
                              <button onClick={handleOpenModal}>
                                Change Password
                              </button>
                            </h6>
                          </div>

                          <div className="col-6 mb-3">
                            <h6>
                              <button onClick={handlOpenNameModal}>
                                Change Name
                              </button>
                            </h6>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Modal for change pwaasord */}
        <div
          className={` ${
            isModalOpen ? "  modal-overlay show-modal " : "modal-overlay "
          }  `}
        >
          <div className="modal-container dark-blue">
            <div className="container-sm-2">
              <div className="modal-content ">
                <h2 style={{ marginBottom: "1.5rem" }}>Change Password</h2>
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="currentPassword">Current Password</label>
                    <input
                      type="password"
                      id="currentPassword"
                      name="currentPassword"
                      required
                      className="form-control"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="newPassword">New Password</label>
                    <input
                      type="password"
                      id="newPassword"
                      name="newPassword"
                      required
                      className="form-control"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      required
                      className="form-control"
                    />
                  </div>

                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </form>
              </div>
            </div>
            <button className="close-modal-btn" onClick={handleCloseModal}>
              <FaTimes />
            </button>
          </div>
        </div>
        {/* Modal for change name */}
        <div
          className={` ${
            isNameModalOpen ? "  modal-overlay show-modal " : "modal-overlay "
          }  `}
        >
          <div className="modal-container dark-blue">
            <div className="container-sm-2">
              <div className="modal-content ">
                <h2 style={{ marginBottom: "1.5rem" }}>Change Name</h2>
                <form onSubmit={handleSubmitName}>
                  <div className="form-group">
                    <label htmlFor="name">New Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="currentPassword"> Password</label>
                    <input
                      type="password"
                      id="password"
                      name="assword"
                      required
                      className="form-control"
                    />
                  </div>

                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </form>
              </div>
            </div>
            <button className="close-modal-btn" onClick={handleCloseNameModal}>
              <FaTimes />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

export default Profile;
