import React, { useContext, useRef } from "react";
import { FaEdit, FaSave } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";

import CustomerService from "../../services/CustomerService";
import { AuthContext } from "../../context/AuthContext";

import { validateNumber } from "../../utils/validateNumber";
const SingleCustomer = ({
  _id,
  name,
  address,
  contact,
  number,
  isEdit,
  setCustomers,
  retrieveCustomer,
}) => {
  const { user } = useContext(AuthContext);
  console.log(user.role);
  console.log(_id, name, address, contact);
  const edit_focus = useRef();

  const editCustomer = (_id) => {
    if (_id == null || _id == "") {
      return;
    }
    setTimeout(() => {
      edit_focus.current.focus();
    }, 500);

    setCustomers((pre) => {
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
  const saveCustomer = (_id) => {
    if (_id == null || _id == "") {
      return;
    }
    if (Math.abs(contact).toString().length < 10) {
      alert("Enter 10 digit number");
      return;
    }
    if (_id == "new") {
      setCustomers((pre) => {
        let old_data = [...pre];
        console.log("old data", old_data);
        old_data = old_data.map((a) => ({ ...a }));

        const data = old_data.filter(
          (Customer) =>
            Customer._id === _id &&
            delete Customer._id &&
            delete Customer.isEdit
        );

        // console.log("updated data", data[0]);
        CustomerService.createCustomer(data[0]).then((response) => {
          let tempCustomer = response.data.Customer;
          tempCustomer = { ...tempCustomer, isEdit: false };
          old_data.push(tempCustomer);
        });
        old_data = old_data.filter((a) => a._id !== undefined);
        console.log(old_data, "new");

        return old_data;
      });
      setTimeout(() => retrieveCustomer(), 500);
    } else {
      setCustomers((pre) => {
        let old_data = [...pre];
        console.log(old_data, "old");
        old_data = old_data.map((a) => ({ ...a }));
        let index = old_data.map((a) => a._id).findIndex((a) => a == _id);

        if (index == -1) {
          return;
        }

        const data = old_data.filter(
          (Customer) =>
            Customer._id === _id &&
            delete Customer.isEdit &&
            delete Customer._id
        );
        console.log("updated data", data, _id);
        CustomerService.updateCustomer({ _id, data });
        old_data[index]._id = _id;
        old_data[index].isEdit = false;

        return old_data;
      });
    }
  };

  function handleEditName(_id, e) {
    let current_val = e.target.value;
    console.log("data=>", current_val);
    if (current_val.trim() === "") {
      // Handle validation error, e.g., show error message or prevent saving
      return;
    }
    setCustomers((pre) => {
      let old_data = [...pre];

      let index = old_data.map((a) => a._id).findIndex((a) => a == _id);

      if (index == -1) {
        return;
      }

      old_data[index].name = current_val;

      return old_data;
    });
  }
  function handleEditAddress(_id, e) {
    let current_val = e.target.value;
    console.log("data=>", current_val);
    if (current_val.trim() === "") {
      // Handle validation error, e.g., show error message or prevent saving
      return;
    }
    setCustomers((pre) => {
      let old_data = [...pre];

      let index = old_data.map((a) => a._id).findIndex((a) => a == _id);

      if (index == -1) {
        return;
      }

      old_data[index].address = current_val;

      return old_data;
    });
  }
  function handleEditContact(_id, e) {
    let current_val = e.target.value;
    console.log("data=>", current_val);

    setCustomers((pre) => {
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
  //   setCustomers((pre) => {
  //     let old_data = [...pre];
  //     old_data = old_data.map((a) => ({
  //       ...a,
  //       isEdit: false,
  //     }));

  //     return old_data;
  //   });
  // }

  function deleteCustomer(_id) {
    if (_id && _id !== "new") {
      CustomerService.deleteCustomer(_id);
    }

    setCustomers((pre) => {
      let old_data = [...pre];
      console.log("old", old_data);
      let new_data = old_data.filter((a) => a._id !== _id);

      console.log("new", new_data);
      return new_data;
    });
  }

  // if (user.role === "manager") {
  return (
    <tr key={_id}>
      <td>{number}</td>
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
            type="text"
            value={address}
            onChange={(e) => handleEditAddress(_id, e)}
            // onBlur={handleBlur}
          />
        ) : (
          <>{address}</>
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
        <button
          className={isEdit ? ` button-icon add` : `button-icon edit`}
          title={isEdit ? "Add" : "Edit"}
          data-toggle="tooltip"
          onClick={() => (isEdit ? saveCustomer(_id) : editCustomer(_id))}
          // onClick={() => editCustomer(_id)}
        >
          {isEdit ? <FaSave /> : <FaEdit />}
        </button>

        <button
          className="delete button-icon"
          title="Delete"
          data-toggle="tooltip"
          onClick={() => deleteCustomer(_id)}
        >
          <FaTrash />
        </button>
      </td>
    </tr>
  );
  // }
  // return (
  //   <tr key={_id}>
  //     <td>{number}</td>
  //     <td>
  //       {isEdit ? (
  //         <input
  //           ref={edit_focus}
  //           value={name}
  //           onChange={(e) => handleEditName(_id, e)}
  //           // onBlur={handleBlur}
  //         />
  //       ) : (
  //         <>{name}</>
  //       )}
  //     </td>
  //     <td>
  //       {isEdit ? (
  //         <input
  //           type="text"
  //           value={address}
  //           onChange={(e) => handleEditAddress(_id, e)}
  //           // onBlur={handleBlur}
  //         />
  //       ) : (
  //         <>{address}</>
  //       )}
  //     </td>
  //     <td>
  //       {isEdit ? (
  //         <input
  //           type="text"
  //           value={contact}
  //           onChange={(e) => handleEditContact(_id, e)}
  //           // onBlur={handleBlur}
  //         />
  //       ) : (
  //         <>{contact}</>
  //       )}
  //     </td>
  //   </tr>
  // );
};

export default SingleCustomer;
