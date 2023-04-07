import cloudinary from "cloudinary";
import sharp from "sharp";
import { config } from "dotenv";
config();

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_APIKEY,
  api_secret: process.env.CLOUDINARY_APISECRET,
  secure: false,
});

export const uploadImage = async (filePath) => {
  return await cloudinary.v2.uploader.upload(filePath, {
    folder: "posts",
  });
};

export const deleteImage = async (id) => {
  return await cloudinary.v2.uploader.destroy(id);
};

export const convert = async (filePath) => {
  let uploadedImage = null;
  await sharp(filePath)
    .avif({ quality: 80 })
    .toBuffer()
    .then(async (data) => {
      const response = await sharp(data).toFile(
        "server/converted/imageConverted.avif"
      );
      uploadedImage = await uploadImage("server/converted/imageConverted.avif");
    });
  return {
    secure_url: uploadedImage.secure_url,
    public_id: uploadedImage.public_id,
  };
};
