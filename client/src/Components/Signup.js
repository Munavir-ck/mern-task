import React, { useState } from "react";
import { userSchema } from "../Validation/userSignup";
import "react-toastify/dist/ReactToastify.css";
import { useFormik } from "formik";
import { toast, ToastContainer } from "react-toastify";
import { userSignup } from "../API/Services/clientService";
import { useNavigate } from 'react-router-dom';

function Signup() {
     
    const navigate = useNavigate();

  const [imageBase64, setImageBase64] = useState(""); 

  
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageBase64(reader.result); 
      };
      reader.readAsDataURL(file);
    }
  };

  async function onSubmit() {
  
    const formData = {
      name: values.name,
      address: values.address,
      image: imageBase64, 
      password: values.password,
    };

    const response = await userSignup(formData);

    if (response?.status) {
      toast.success(response?.message);
      navigate('/profile');

    } else {
      toast.error(response?.message);
    }
  }

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        name: "",
        address: "",
        password: "",
      },
      validationSchema: userSchema,
      onSubmit,
    });

  return (
    <div>
      <ToastContainer />
      <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
        <div className="container max-w-screen-lg mx-auto">
          <div>
            <h2 className="font-semibold text-xl text-gray-600">
              Registration Form
            </h2>

            <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
              <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                <div className="text-gray-600">
                  <p className="font-medium text-lg">Personal Details</p>
                  <p>Please fill out all the fields.</p>
                </div>

                <form className="lg:col-span-2" onSubmit={handleSubmit}>
                  <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                    <div className="md:col-span-5">
                      <label htmlFor="full_name">Full Name</label>
                      {errors.name && touched.name && (
                        <p className="text-red-600">{errors.name}</p>
                      )}
                      <input
                        name="name"
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        type="text"
                        id="full_name"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        placeholder="Name"
                      />
                    </div>

                    <div className="md:col-span-3">
                      <label htmlFor="address">Address / Street</label>
                      {errors.address && touched.address && (
                        <p className="text-red-600">{errors.address}</p>
                      )}
                      <textarea
                        name="address"
                        id="address"
                        className="h-20 border mt-1 rounded px-4 w-full bg-gray-50"
                        placeholder="Address"
                        value={values.address}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label htmlFor="city">Profile Photo</label>
                      {errors.image && (
                        <p className="text-red-600">{errors.image}</p>
                      )}
                      <input
                        type="file"
                        accept="image/jpeg, image/png, image/gif"
                        name="image"
                        onChange={(e) => {
                          handleImageUpload(e); // Handle image upload and conversion
                          handleChange(e); // Handle formik's handleChange
                        }}
                        onBlur={handleBlur}
                        className="mt-1"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label htmlFor="country">Password</label>
                      {errors.password && touched.password && (
                        <p className="text-red-600">{errors.password}</p>
                      )}
                      <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                        <input
                          placeholder="password"
                          className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent"
                          name="password"
                          value={values.password}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </div>
                    </div>

                    <div className="md:col-span-5 text-right">
                      <div className="inline-flex items-end">
                        <button
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                          type="submit"
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;

