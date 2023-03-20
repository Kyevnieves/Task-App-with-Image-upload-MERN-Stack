import cloudinary from "cloudinary";
import { config } from "dotenv";
config();

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_APIKEY,
  api_secret: process.env.CLOUDINARY_APISECRET,
  secure: false,
});

export const uploadImage = (filePath) => {
  cloudinary.v2.uploader
    .upload(filePath, { folder: "posts" })
    .then((result) => console.log(result))
    .catch((error) => console.log(error));
};
