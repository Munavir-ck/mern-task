import React, { useEffect, useState } from "react";
import { editProfileImage, userProfile } from "../API/Services/clientService";
import EditProfile from "./EditProfile";
import { toast, ToastContainer } from "react-toastify";

function Profile() {
  const [user, setUser] = useState("");
  const [imageBase64, setImageBase64] = useState("");
  const[isEdit,setIsEdit]= useState(false)
  const[edit,setEdit]=useState(false)

  const handleImage = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageBase64(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEdit= ()=>{
    setEdit(!edit)
  }

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await userProfile();
        setUser(response.result);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, [isEdit]);

  useEffect(() => {
    async function editProfile() {
      if (imageBase64) {
        const response = await editProfileImage(imageBase64);
        toast.success(response?.message);
        setIsEdit(!isEdit)
      }
    }

    editProfile();
  }, [imageBase64]);

  return (
    <div className="bg-gray-100 h-screen">
          <ToastContainer />
      <div className="w-full text-white bg-main-color">
        <div
          x-data="{ open: false }"
          className="flex flex-col max-w-screen-xl px-4 mx-auto md:items-center md:justify-between md:flex-row md:px-6 lg:px-8"
        >
          <div className="p-4 flex flex-row items-center justify-between">
            <a
              href="#"
              className="text-lg font-semibold tracking-widest uppercase rounded-lg focus:outline-none focus:shadow-outline"
            >
              profile
            </a>
          </div>
          <nav className="flex-col flex-grow pb-4 md:pb-0 hidden md:flex md:justify-end md:flex-row">
            <div className="relative" x-data="{ open: false }"></div>
          </nav>
        </div>
      </div>

      <div className="container mx-auto my-5 p-5">
        <div className="md:flex no-wrap md:-mx-2 ">
          <div className="w-full md:w-3/12 md:mx-2">
            <div className="bg-white p-3 border-t-4 border-green-400">
              <div className="image overflow-hidden">
                <img
                  className="h-auto w-full mx-auto"
                  src={user?.image}
                  alt="profile"
                />
              </div>
              <h1 className="text-gray-900 font-bold text-xl leading-8 my-1">
                {user?.name}
              </h1>

              <ul className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                <li className="flex items-center py-3">
                  <div classNameName="py-6 px-3 mt-32 sm:mt-0">
                    <button
                      classNameName="bg-green-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                      type="button"
                    >
                      Edit Image
                      <label className="block">
                        <span className="sr-only">Choose File</span>
                        <input
                          type="file"
                          onChange={handleImage}
                          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        />
                      </label>
                    </button>
                  </div>
                </li>
                <li className="flex items-center py-3">
                  <span>Member since</span>
                  <span className="ml-auto">Nov 07, 2016</span>
                </li>
              </ul>
            </div>

            <div className="my-4"></div>

            <div className="bg-white p-3 hover:shadow"></div>
          </div>

          <div className="w-full space-y-3  md:w-9/12 mx-2 h-64 ">
            <div className="bg-white p-3 shadow-sm rounded-sm">
              <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                <span clas="text-green-500">
                  <svg
                    className="h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </span>
                <span className="tracking-wide">About</span>
              </div>
              <div className="text-gray-700">
                <div className="grid md:grid-cols-1 text-sm">
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">First Name :</div>
                    <div className="px-4 py-2"> {user?.name}</div>
                  </div>

                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">
                      Permanant Address :
                    </div>
                    <div className="px-4 py-2">{user?.address}</div>
                  </div>
                </div>
                <button   onClick={handleEdit} className="h-11 w-11 bg-gray-600 rounded">edit </button>
              </div>
            </div>{
                edit&&
          <EditProfile user={user} isEdit={isEdit} setIsEdit={setIsEdit} edit={edit} setEdit={setEdit}/>
            }
          </div>

        </div>
      </div>
    </div>
  );
}

export default Profile;
