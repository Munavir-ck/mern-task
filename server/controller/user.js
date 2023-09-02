import bcrypt from "bcrypt";
import userDb from "../model/user.js";
import { cloudinary } from "../utilities/cloudinary.js";
import jwt from "jsonwebtoken";


const signup = async (req, res) => {
  try {
    const { name, password, address, image } = req.body;
    const profile = "profile-image";

    
 
    const result = await cloudinary.uploader
      .upload(image, {
        folder: profile,
      })
      .catch((err) => {
        console.log(err);
      });

    console.log(result.secure_url);

    const img = result.secure_url;
    const user = false;

  
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password.trim(), salt);

      await userDb
        .create({
          name,
          image:img,
          address,
          password: hashPassword,
        })
        .then((data) => {
            console.log(555555555555);
            const ID=data._id 
            const token = jwt.sign({ ID}, process.env.JWT_SECRET_KEY, {
                expiresIn: 3000,
              });
              res.status(200).json({ status: true, message: "success" ,token: token});
        })
        .catch((err) => {
            res.status(500).json({ error: 'Internal server error' });
        });
   
  } catch (error) {
    console.log(error);
  }
 
};


const get_profile= async (req,res)=>{

    try {
        const ID=req.userId

        console.log(ID,33333333333333);

        const result= await userDb.findById(ID)

        console.log(result);

        res.status(200).json({result,status:true})
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' }); 
    }

}

const edit_profile_image = async (req, res) => {
  
    try {
        const profile = "profile-image";
  
      const userID = req.userId;

 
      const result = await cloudinary.uploader
        .upload(req.body.data, {
          folder: profile,
        })
        .catch((err) => {
          console.log(err);
        });
  
      await userDb
        .findOneAndUpdate({ _id: userID }, { image: result.secure_url })
        .then((data) => {
            res.status(200).json({ status: true, data ,message:"sucess"});
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
  };

  const edit_profile=async(req,res)=>{

    try {

        console.log(req.body);
        const { address, name } = req.body;
        const userID = req.userId;
      
      const result=  await userDb.findByIdAndUpdate(userID, { address: address, name: name });
        
        res.status(200).json({ message: 'User updated successfully',status:true  ,result});
      } catch (error) {
  
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      }


  }

export { signup,get_profile,edit_profile_image ,edit_profile};
