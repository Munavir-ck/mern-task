import axios from "../Axios";

export const userSignup = async (value) => {

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const response = await axios.post("/signup", value, config);
    localStorage.setItem("token", response.data.token)
    return response.data;
  } catch (error) {
    console.log(error);
    console.log("error in clientRegister service");
  }
};
export const userProfile = async () => {

    const config = {
        headers: {
            Authorization: localStorage.getItem("token"),
          },
    }
    try {
      const response = await axios.get("/profile" ,config);
      return response.data;
    } catch (error) {
      console.log(error);
      console.log("error in clientRegister service");
    }
  };

 export  const editProfileImage=async(image)=>{
    
    const config = {
        headers: {
            Authorization: localStorage.getItem("token"),
          },
    }
    try {
        const response = await axios.patch("/edit_profile_image" ,{data:image},config);
        return response.data;
      } catch (error) {
        console.log(error);
        console.log("error in clientRegister service");
      }

  }
  export  const editProfile=async(value)=>{
    
    const config = {
        headers: {
            Authorization: localStorage.getItem("token"),
          },
    }
    try {
        const response = await axios.patch("/edit_profile",value,config);
        return response.data;
      } catch (error) {
        console.log(error);
        console.log("error in clientRegister service");
      }

  }