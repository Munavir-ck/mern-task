import React, { useState } from "react";
import { editProfile } from "../API/Services/clientService";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

function EditProfile({ user, setIsEdit, isEdit, edit, setEdit }) {
  const navigate = useNavigate();
  const initialValues = {
    name: user?.name || "",
    address: user?.address || "",
  };

  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setSubmit] = useState(false);

  const validate = (values) => {
    const errors = {};

    if (!values.name) {
      errors.name = "Name is required";
    }

    if (!values.address) {
      errors.address = "Address is required";
    }

    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    setSubmit(true);
    const errors = validate(formValues);

    if (Object.keys(errors).length === 0 && isSubmit) {
      try {
        const response = await editProfile(formValues);
        toast.success(response?.message);
        setEdit(!edit);
        setIsEdit(!isEdit);
      } catch (error) {
        console.error("An error occurred while editing the profile.", error);
      }
    } else {
      setFormErrors(errors);
    }
  };

  return (
    <div className="bg-white p-3 shadow-sm rounded-sm">
      <div className="grid grid-cols-2">
        <div className="px-4 py-2 font-semibold">First Name :</div>
        <input
          type="text"
          name="name"
          value={formValues.name}
          onChange={handleChange}
          className={`border ${
            formErrors.name ? "border-red-500" : "border-gray-300"
          } px-2 py-1 rounded-lg focus:outline-none focus:border-blue-500`}
          required
          placeholder={formErrors.name || "Enter your name"}
        />
      </div>
      <div className="grid grid-cols-2">
        <div className="px-4 py-2 font-semibold">Permanent Address :</div>
        <input
          type="text"
          name="address"
          value={formValues.address}
          onChange={handleChange}
          className={`border ${
            formErrors.address ? "border-red-500" : "border-gray-300"
          } px-2 py-1 rounded-lg focus:outline-none focus:border-blue-500`}
          required
          placeholder={formErrors.address || "Enter your address"}
        />
      </div>
      <button onClick={handleEdit} className="h-11 w-28 bg-blue-700 rounded">
        Submit
      </button>
    </div>
  );
}

export default EditProfile;
