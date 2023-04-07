import { useState, createContext, useContext, useEffect } from "react";
import {
  getPostsRequest,
  createPostRequest,
  deletePostRequest,
  getPostRequest,
  updatePostRequest,
} from "../api/posts";
const PostContext = createContext();

export const usePosts = () => {
  const context = useContext(PostContext);
  return context;
};

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);

  const getPosts = async () => {
    const Posts = await getPostsRequest();
    setPosts(Posts);
  };

  const createPost = async (post) => {
    const res = await createPostRequest(post);
    setPosts([...posts, res]);
  };

  const deletePost = async (id) => {
    await deletePostRequest(id);
    const newPosts = posts.filter((post) => post._id !== id);
    setPosts(newPosts);
  };

  const getPost = async (id) => {
    const response = await getPostRequest(id);
    return response;
  };

  const updatePost = async (id, newPost) => {
    const response = await updatePostRequest(id, newPost);
    const newPosts = posts.map((post) =>
      post._id === id ? response.updatedPost : post
    );
    setPosts(newPosts);
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <PostContext.Provider
      value={{
        posts,
        setPosts,
        getPost,
        getPosts,
        createPost,
        deletePost,
        updatePost,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};
