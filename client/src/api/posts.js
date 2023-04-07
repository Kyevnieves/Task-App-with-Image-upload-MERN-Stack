import axios from "axios";
export const getPostsRequest = async () => {
  const response = await axios.get("/posts");
  return response.data;
};

export const createPostRequest = async (post) => {
  const form = new FormData();

  for (let key in post) {
    form.append(key, post[key]);
  }

  const response = await axios.post("/posts", form, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const deletePostRequest = async (id) => {
  const response = await axios.delete(`/posts/${id}`);
  return response.data;
};

export const getPostRequest = async (id) => {
  const response = await axios.get(`/posts/${id}`);
  return response.data;
};

export const updatePostRequest = async (id, newPost) => {
  const form = new FormData();

  for (let key in newPost) {
    form.append(key, newPost[key]);
  }

  const response = await axios.put(`/posts/${id}`, form, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};
