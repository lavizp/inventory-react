import React, { useRef } from "react";
import { FaEdit, FaSave } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";

import UserService from "../../services/UserService";
import { validateNumber } from "../../utils/validateNumber";

const SingleUser = ({
  _id,
  name,
  email,
  contact,
  isEdit,
  role,
  setUsers,
  retrieveUsers,
}) => {
  const edit_focus = useRef();

  const editUser = (_id) => {
    if (_id == null || _id == "") {
      return;
    }

    setTimeout(() => {
      edit_focus.current.focus();
    }, 500);

    setUsers((pre) => {
      let old_data = [...pre];

      old_data = old_data.map((a) => ({ ...a, isEdit: false }));
      let index = old_data.map((a) => a._id).findIndex((a) => a == _id);

      if (index == -1) {
        return;
      }

      old_data[index].isEdit = true;

      return old_data;
    });
  };
  const saveUser = (_id) => {
    if (_id == null || _id == "") {
      return;
    }

    if (_id == "new") {
      setUsers((pre) => {
        let old_data = [...pre];
        console.log("old data", old_data);
        old_data = old_data.map((a) => ({ ...a }));

        const data = old_data.filter(
          (user) => user._id === _id && delete user._id && delete user.isEdit
        );
        // console.log("updated data", data[0]);
        UserService.createUser(data[0])
          .then((response) => {
            let tempUser = response.data.user;
            tempUser = { ...tempUser, isEdit: false };
            old_data.push(tempUser);
          })
          .catch((err) =>
            err.response.status === 400
              ? alert("provide unique email and phone number")
              : alert("Something went wrong")
          );
        old_data = old_data.filter((a) => a._id !== undefined);
        console.log(old_data, "new");

        return old_data;
      });
      setTimeout(() => retrieveUsers(), 500);
    } else {
      setUsers((pre) => {
        let old_data = [...pre];

        old_data = old_data.map((a) => ({ ...a }));
        let index = old_data.map((a) => a._id).findIndex((a) => a == _id);

        if (index == -1) {
          return;
        }

        const data = old_data.filter(
          (user) => user._id === _id && delete user.isEdit && delete user._id
        );
        // console.log("updated data", data);
        UserService.updateUser({ _id, data });
        old_data[index].isEdit = false;

        return old_data;
      });
    }
  };

  function handleEditName(_id, e) {
    let current_val = e.target.value;
    console.log("data=>", current_val);

    setUsers((pre) => {
      let old_data = [...pre];

      let index = old_data.map((a) => a._id).findIndex((a) => a == _id);

      if (index == -1) {
        return;
      }

      old_data[index].name = current_val;

      return old_data;
    });
  }
  function handleEditEmail(_id, e) {
    let current_val = e.target.value;
    console.log("data=>", current_val);

    setUsers((pre) => {
      let old_data = [...pre];

      let index = old_data.map((a) => a._id).findIndex((a) => a == _id);

      if (index == -1) {
        return;
      }

      old_data[index].email = current_val;

      return old_data;
    });
  }
  function handleEditRole(_id, e) {
    let current_val = e.target.value;
    console.log("data=>", current_val);

    setUsers((pre) => {
      let old_data = [...pre];

      let index = old_data.map((a) => a._id).findIndex((a) => a == _id);

      if (index == -1) {
        return;
      }

      old_data[index].role = current_val;

      return old_data;
    });
  }
  function handleEditContact(_id, e) {
    let current_val = e.target.value;
    console.log("data=>", current_val);

    setUsers((pre) => {
      let old_data = [...pre];

      let index = old_data.map((a) => a._id).findIndex((a) => a == _id);

      if (index == -1) {
        return;
      }

      old_data[index].contact = current_val;

      return old_data;
    });
  }
  // function handleBlur() {
  //   setUsers((pre) => {
  //     let old_data = [...pre];
  //     old_data = old_data.map((a) => ({
  //       ...a,
  //       isEdit: false,
  //     }));

  //     return old_data;
  //   });
  // }

  function deleteUser(_id) {
    if (_id && _id !== "new") {
      UserService.deleteUser(_id);
    }

    setUsers((pre) => {
      let old_data = [...pre];
      console.log("old", old_data);
      let new_data = old_data.filter((a) => a._id !== _id);

      console.log("new", new_data);
      return new_data;
    });
  }

  return (
    <tr key={_id}>
      <td>
        {isEdit ? (
          <input
            ref={edit_focus}
            value={name}
            onChange={(e) => handleEditName(_id, e)}
            // onBlur={handleBlur}
          />
        ) : (
          <>{name}</>
        )}
      </td>
      <td>
        {isEdit ? (
          <input
            type="email"
            value={email}
            onChange={(e) => handleEditEmail(_id, e)}
            // onBlur={handleBlur}
          />
        ) : (
          <>{email}</>
        )}
      </td>
      <td>
        {isEdit ? (
          <input
            type="text"
            value={contact}
            onChange={(e) => handleEditContact(_id, e)}
            // pattern="^(98|97|96)\d{8}$"
            maxLength={10}
            onKeyDown={validateNumber}
          />
        ) : (
          <>{contact}</>
        )}
      </td>
      <td>
        {isEdit ? (
          <select
            name="role"
            id="role"
            value={role}
            onChange={(e) => handleEditRole(_id, e)}
          >
            <option value="cashier">cashier</option>
            <option value="manager">manager</option>
          </select>
        ) : (
          <>{role}</>
        )}
      </td>

      <td>
        <button
          className={isEdit ? ` button-icon add` : `button-icon edit`}
          title={isEdit ? "Add" : "Edit"}
          data-toggle="tooltip"
          onClick={() => (isEdit ? saveUser(_id) : editUser(_id))}
        >
          {isEdit ? <FaSave /> : <FaEdit />}
        </button>

        <button
          className="delete button-icon"
          title="Delete"
          data-toggle="tooltip"
          onClick={() => deleteUser(_id)}
        >
          <FaTrash />
        </button>
      </td>
    </tr>
  );
};

export default SingleUser;
