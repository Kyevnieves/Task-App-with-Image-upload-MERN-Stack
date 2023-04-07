import Post from "../models/Posts.js";
import { uploadImage, deleteImage, convert } from "../libs/cloudinary.js";
import fs from "fs-extra";
export const getPosts = async (req, res) => {
  const posts = await Post.find();
  res.json(posts);
};

export const getPost = async (req, res) => {
  const { id } = req.params;
  const post = await Post.findById(id);

  try {
    !post
      ? res.status(404).json({ message: "Post no encontrado" })
      : res.json(post);
  } catch (error) {
    res.status(500).json({
      message: "Ocurrio un error",
      info: error,
    });
  }
};

export const createPost = async (req, res) => {
  const { title, description } = req.body;
  let image;
  if (req.files?.image) {
    const response = await convert(req.files.image.tempFilePath);
    image = {
      url: response.secure_url,
      public_id: response.public_id,
    };

    await fs.remove(req.files.image.tempFilePath);
    await fs.remove("server/converted/imageConverted.avif");
  }

  if (!title || !description) {
    res.json({
      message: "Faltan campos",
    });
    res.status(404).end();
    return;
  }

  const newPost = new Post({ title, description, image });
  await newPost.save();
  return res.json(newPost);
};

export const updatePost = async (req, res) => {
  const { id } = req.params;
  const post = await Post.findById(id);
  if (post.image.public_id) {
    const idImage = post.image.public_id;
    await deleteImage(idImage);
  }

  let image;

  if (req.files?.image) {
    const response = await convert(req.files.image.tempFilePath);

    image = {
      url: response.secure_url,
      public_id: response.public_id,
    };

    await fs.remove(req.files.image.tempFilePath);
    await fs.remove("server/converted/imageConverted.avif");
  }

  const newValues = {
    title: req.body.title,
    description: req.body.description,
    image,
  };

  const updatedPost = await Post.findByIdAndUpdate(id, newValues, {
    new: true,
  });

  try {
    !updatedPost
      ? res.status(404).send("Post no encontrado.")
      : res.json({
          message: "Post actualizado",
          updatedPost,
        });
  } catch (error) {
    res.status(500).json({
      message: "Ocurrio un error",
      info: error.message,
    });
  }
};

export const deletePost = async (req, res) => {
  const { id } = req.params;
  const deletedPost = await Post.findByIdAndDelete(id);

  if (deletedPost.image.public_id) {
    const idImage = deletedPost.image.public_id;
    await deleteImage(idImage);
  }

  !deletedPost
    ? res.status(404).send("Post no encontrado.")
    : res.json({
        message: "Post eliminado",
        deletedPost,
      });
};
