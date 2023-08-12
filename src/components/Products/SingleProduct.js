import React, { useContext, useRef, useState } from "react";
import { FaEdit, FaPlus, FaSave, FaTimes } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import getCurrentDate from "../../utils/currentDate";

import ProductService from "../../services/ProductService";
import { AuthContext } from "../../context/AuthContext";

const SingleProduct = ({
  _id,
  name,
  purchasePrice,
  sellingPrice,
  profit,
  quantity,
  expiryDate,
  number,
  isEdit,
  setProducts,
  retrieveProducts,
}) => {
  const { user } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updateQuantity, setUpdateQuantity] = useState(0);
  const edit_focus = useRef();

  const editProduct = (_id) => {
    if (_id == null || _id == "") {
      return;
    }

    setTimeout(() => {
      edit_focus.current.focus();
    }, 500);

    setProducts((pre) => {
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

  const saveProduct = (_id) => {
    if (_id == null || _id == "") {
      return;
    }
    if (sellingPrice < purchasePrice) {
      alert("Invalid selling price");
      return;
    }
    if (purchasePrice <= 0) {
      alert("Invalid purchase price");
      return;
    }
    if (expiryDate === getCurrentDate()) {
      alert("Invalid expiry date");
      return;
    }
    console.log("selling", sellingPrice);
    console.log("pu", purchasePrice);
    if (_id == "new") {
      if (profit < 1) {
        alert("Invalid Selling Price");
        return;
      }
      setProducts((pre) => {
        let old_data = [...pre];
        console.log("old data", old_data);
        old_data = old_data.map((a) => ({ ...a }));

        const data = old_data.filter(
          (product) =>
            product._id === _id && delete product._id && delete product.isEdit
        );
        // console.log("updated data", data[0]);

        // console.log("sel", sellingPrice);
        // console.log("spu", purchasePrice);
        if (!sellingPrice) {
          alert("Invalid Selling Price");
          // old_data = old_data.filter((a) => a._id !== undefined);
          // console.log(old_data, "new");
          console.log(pre);
          return pre;
        }
        ProductService.createProduct(data[0]).then((response) => {
          let tempProduct = response.data.product;
          tempProduct = { ...tempProduct, isEdit: false };
          old_data.push(tempProduct);
        });
        old_data = old_data.filter((a) => a._id !== undefined);
        console.log(old_data, "new");

        setTimeout(() => retrieveProducts(), 500);
        return old_data;
      });
    } else {
      setProducts((pre) => {
        let old_data = [...pre];

        old_data = old_data.map((a) => ({ ...a }));
        let index = old_data.map((a) => a._id).findIndex((a) => a == _id);

        if (index == -1) {
          return;
        }

        const data = old_data.filter(
          (product) =>
            product._id === _id && delete product.isEdit && delete product._id
        );
        // console.log("updated data", data, _id);
        ProductService.updateProduct({ _id, data });
        old_data[index].isEdit = false;

        return old_data;
      });
    }
  };

  function handleEditName(_id, e) {
    let current_val = e.target.value;
    console.log("data=>", current_val);

    setProducts((pre) => {
      let old_data = [...pre];

      let index = old_data.map((a) => a._id).findIndex((a) => a == _id);

      if (index == -1) {
        return;
      }

      old_data[index].name = current_val;

      return old_data;
    });
  }

  function handleEditPurchasePrice(_id, e) {
    let current_val = e.target.value;
    console.log("data=>", current_val);

    setProducts((pre) => {
      let old_data = [...pre];

      let index = old_data.map((a) => a._id).findIndex((a) => a === _id);

      if (index === -1) {
        return;
      }

      // let sellingPrice = parseFloat(old_data[index].sellingPrice);

      old_data[index].purchasePrice = current_val;

      // Calculate profit if selling price is greater than or equal to purchase price
      // if (sellingPrice >= parseFloat(current_val)) {
      //   old_data[index].profit = (
      //     sellingPrice - parseFloat(current_val)
      //   ).toFixed(2);
      // }

      return old_data;
    });
  }

  function handleEditSellingPrice(_id, e) {
    let current_val = e.target.value;
    if (current_val !== Number) {
      e.preventDefault();
    }
    console.log("data=>", current_val);

    setProducts((pre) => {
      let old_data = [...pre];

      let index = old_data.map((a) => a._id).findIndex((a) => a === _id);

      if (index === -1) {
        return;
      }

      // let purchasePrice = parseFloat(old_data[index].purchasePrice);

      // Validate if selling price is greater than purchase price
      // if (
      //   parseFloat(current_val) >= purchasePrice &&
      //   parseFloat(current_val) > 0
      // ) {
      old_data[index].sellingPrice = current_val;

      old_data[index].profit = parseFloat(current_val) - purchasePrice;
      if (old_data[index].profit < 0) {
        old_data[index].profit = 0;
      }
      old_data[index].profit = old_data[index].profit.toFixed(2);
      // }
      return old_data;
    });
  }

  function handleEditQuantity(_id, e) {
    let current_val = e.target.value;
    console.log("data=>", current_val);

    setProducts((pre) => {
      let old_data = [...pre];

      let index = old_data.map((a) => a._id).findIndex((a) => a == _id);

      if (index == -1) {
        return;
      }

      old_data[index].quantity = current_val;

      return old_data;
    });
  }

  function deleteProduct(_id) {
    if (_id && _id !== "new") {
      ProductService.deleteProduct(_id);
    }

    setProducts((pre) => {
      let old_data = [...pre];
      console.log("old", old_data);
      let new_data = old_data.filter((a) => a._id !== _id);

      console.log("new", new_data);
      return new_data;
    });
  }
  function addQuantity(e, _id) {
    e.preventDefault();
    setIsModalOpen(true);
    if (_id == null || _id === "") {
      return;
    }
    console.log(_id, updateQuantity);

    const quantity = updateQuantity;

    setProducts((pre) => {
      let old_data = [...pre];
      old_data = old_data.map((a) => ({ ...a }));
      let index = old_data.map((a) => a._id).findIndex((a) => a === _id);

      if (index === -1) {
        return;
      }

      ProductService.addQuantity({ _id, quantity })
        .then(() => retrieveProducts())
        .then((err) => console.log(err));
      setIsModalOpen(false);
      return old_data;
    });
  }

  const handleEditExpiryDate = (_id, e) => {
    const newExpiryDate = e.target.value.slice(0, 10);

    setProducts((prevProducts) => {
      const updatedProducts = prevProducts.map((product) => {
        if (product._id === _id) {
          return { ...product, expiryDate: newExpiryDate };
        }
        return product;
      });

      return updatedProducts;
    });
  };
  const validateNumber = (e) => {
    const key = e.key;

    // Allow backspace, delete, and arrow keys
    if (
      key === "Backspace" ||
      key === "Delete" ||
      key === "ArrowLeft" ||
      key === "ArrowRight"
    ) {
      return;
    }

    // Prevent input if the value is not a number from 0 to 9
    if (!/^[0-9]$/.test(key)) {
      e.preventDefault();
    }
  };
  // console.log("id", _id);
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  if (isModalOpen) {
    return (
      <div
        className={` ${
          isModalOpen ? "  modal-overlay show-modal " : "modal-overlay "
        }  `}
      >
        <div className="modal-container dark-blue">
          <div className="container-sm-2">
            <div className="modal-content ">
              <h2 style={{ marginBottom: "1.5rem" }}>Add Quantity</h2>
              <form>
                <div className="form-group">
                  <label htmlFor="name">Enter Quantity</label>
                  <input
                    type="text"
                    id="quantity"
                    name="quantity"
                    onChange={(e) => {
                      setUpdateQuantity(e.target.value);
                    }}
                    required
                    className="form-control"
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={(e) => {
                    addQuantity(e, _id);
                  }}
                >
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
    );
  }
  if (_id === "new") {
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
              value={purchasePrice}
              onChange={(e) => handleEditPurchasePrice(_id, e)}
              // onBlur={handleBlur}
              pattern="[0-9]"
              onKeyDown={validateNumber}
            />
          ) : (
            <>{purchasePrice}</>
          )}
        </td>
        <td>
          {isEdit ? (
            <input
              type="text"
              value={sellingPrice}
              onChange={(e) => handleEditSellingPrice(_id, e)}
              // onBlur={handleBlur}
              pattern="[0-9]"
              onKeyDown={validateNumber}
            />
          ) : (
            <>{sellingPrice}</>
          )}
        </td>
        <td>
          {isEdit ? (
            <input
              type="text"
              value={profit}
              // onChange={(e) => handleEditSellingPrice(_id, e)}
              // onBlur={handleBlur}
              disabled
            />
          ) : (
            <>{profit}</>
          )}
        </td>

        <td>
          {isEdit ? (
            <input
              type="text"
              value={quantity}
              onChange={(e) => handleEditQuantity(_id, e)}
              // onBlur={handleBlur}
              pattern="[0-9]"
              onKeyDown={validateNumber}
            />
          ) : (
            <>{quantity}</>
          )}
        </td>
        <td>
          {isEdit ? (
            <input
              type="date"
              value={expiryDate.slice(0, 10)}
              onChange={(e) => handleEditExpiryDate(_id, e)}
              min={getCurrentDate()}
              // onBlur={handleBlur}
              // onKeyDown={validateNumber}
            />
          ) : (
            <>{expiryDate.slice(0, 10)}</>
          )}
        </td>
        {/* <td>
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
      </td> */}

        <td>
          <button
            className={isEdit ? ` button-icon add` : `button-icon edit`}
            title={isEdit ? "Add" : "Edit"}
            data-toggle="tooltip"
            onClick={() => (isEdit ? saveProduct(_id) : editProduct(_id))}
          >
            {isEdit ? <FaSave /> : <FaEdit />}
          </button>

          <button
            className="delete button-icon"
            title="Delete"
            data-toggle="tooltip"
            onClick={() => deleteProduct(_id)}
          >
            <FaTrash />
          </button>
          <button
            className=" button-icon"
            title="Add quantity"
            data-toggle="tooltip"
            onClick={(e) => addQuantity(e, _id)}
          >
            <FaPlus />
          </button>
        </td>
      </tr>
    );
  }
  if (user.role === "manager") {
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
              type="number"
              value={purchasePrice}
              onChange={(e) => handleEditPurchasePrice(_id, e)}
              // onBlur={handleBlur}
              onKeyDown={validateNumber}
            />
          ) : (
            <>{purchasePrice}</>
          )}
        </td>
        <td>
          {isEdit ? (
            <input
              type="number"
              value={sellingPrice}
              onChange={(e) => handleEditSellingPrice(_id, e)}
              onKeyDown={validateNumber}
              // onBlur={handleBlur}
            />
          ) : (
            <>{sellingPrice}</>
          )}
        </td>
        <td>
          {isEdit ? (
            <input
              type="number"
              value={profit < 0 ? 0 : profit}
              // onChange={(e) => handleEditSellingPrice(_id, e)}
              // onBlur={handleBlur}
              disabled
            />
          ) : (
            <>{profit < 0 ? 0 : profit}</>
          )}
        </td>

        <td>
          {isEdit ? (
            <input
              type="number"
              value={quantity}
              onChange={(e) => handleEditQuantity(_id, e)}
              // onBlur={handleBlur}
              onKeyDown={validateNumber}
            />
          ) : (
            <>{quantity}</>
          )}
        </td>
        <td>
          {isEdit ? (
            <input
              type="date"
              value={expiryDate.slice(0, 10)}
              onChange={(e) => handleEditExpiryDate(_id, e)}
              min={getCurrentDate()}
              // onBlur={handleBlur}
              // onKeyDown={validateNumber}
            />
          ) : (
            <>{expiryDate.slice(0, 10)}</>
          )}
        </td>

        <td>
          <button
            className={isEdit ? ` button-icon add` : `button-icon edit`}
            title={isEdit ? "Add" : "Edit"}
            data-toggle="tooltip"
            onClick={() => (isEdit ? saveProduct(_id) : editProduct(_id))}
          >
            {isEdit ? <FaSave /> : <FaEdit />}
          </button>

          <button
            className="delete button-icon"
            title="Delete"
            data-toggle="tooltip"
            onClick={() => deleteProduct(_id)}
          >
            <FaTrash />
          </button>
          <button
            className=" button-icon"
            title="Add Quantity"
            data-toggle="tooltip"
            // onClick={() => addQuantity(_id)}
            onClick={() => setIsModalOpen(true)}
          >
            <FaPlus />
          </button>
        </td>
      </tr>
    );
  }
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
      {/* <td>
        {isEdit ? (
          <input
            type="text"
            min={0}
            value={purchasePrice}
            onChange={(e) => handleEditPurchasePrice(_id, e)}
            onKeyDown={validateNumber}
            // onBlur={handleBlur}
          />
        ) : (
          <>{purchasePrice}</>
        )}
      </td> */}
      <td>
        {isEdit ? (
          <input
            type="text"
            value={sellingPrice}
            onChange={(e) => handleEditSellingPrice(_id, e)}
            // onBlur={handleBlur}
            onKeyDown={validateNumber}
          />
        ) : (
          <>{sellingPrice}</>
        )}
      </td>
      <td>
        {isEdit ? (
          <input
            type="text"
            value={quantity}
            onChange={(e) => handleEditQuantity(_id, e)}
            // onBlur={handleBlur}
            onKeyDown={validateNumber}
          />
        ) : (
          <>{quantity}</>
        )}
      </td>
      <td>
        {isEdit ? (
          <input
            type="date"
            value={expiryDate.slice(0, 10)}
            onChange={(e) => handleEditExpiryDate(_id, e)}
            min={getCurrentDate()}
            // onBlur={handleBlur}
            // onKeyDown={validateNumber}
          />
        ) : (
          <>{expiryDate.slice(0, 10)}</>
        )}
      </td>
    </tr>
  );
};

export default SingleProduct;
