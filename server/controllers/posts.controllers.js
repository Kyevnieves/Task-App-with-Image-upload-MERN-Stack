import Post from "../models/Posts.js";
import { uploadImage } from "../libs/cloudinary.js";
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

  if (req.files.image) {
    const response = await uploadImage(req.files.image.tempFilePath);
  }

  if (!title || !description) {
    res.json({
      message: "Faltan campos",
    });
    res.status(404).end();
    return;
  }

  const newPost = new Post({ title, description });
  await newPost.save();
  return res.json(newPost);
};

export const updatePost = async (req, res) => {
  const { id } = req.params;
  const updatedPost = await Post.findByIdAndUpdate(id, req.body, { new: true });

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

  !deletedPost
    ? res.status(404).send("Post no encontrado.")
    : res.json({
        message: "Post eliminado",
        deletedPost,
      });
};
