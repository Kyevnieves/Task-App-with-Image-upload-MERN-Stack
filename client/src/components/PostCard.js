import toast from "react-hot-toast";
import { usePosts } from "../context/postContext";
import { useNavigate } from "react-router-dom";
export function PostCard({ post }) {
  const { deletePost } = usePosts();
  const navigate = useNavigate();
  const handleDelete = (_id) => {
    toast((t) => (
      <div className='p-4'>
        <p>Do you want to delete?</p>
        <div className='flex flex-wrap gap-2 mt-4 justify-center items-center'>
          <button
            className='px-3 py-1 rounded-md bg-red-500 text-white font-bold'
            onClick={() => {
              deletePost(_id);
              toast.dismiss(t.id);
            }}
          >
            Delete
          </button>
          <button
            className='px-3 py-1 rounded-md bg-slate-600 text-white font-bold'
            onClick={() => toast.dismiss(t.id)}
          >
            Cancel
          </button>
        </div>
      </div>
    ));
  };
  return (
    <div className='w-full md:w-1/4 bg-slate-800 px-8 py-6 text-white rounded-md'>
      {post.image == null ? (
        <img
          src='https://upload.wikimedia.org/wikipedia/commons/6/66/Sin_datos.jpg'
          className='rounded-md mb-4'
          alt='Post img'
        />
      ) : (
        <img src={post.image.url} className='rounded-md mb-4' alt='Post img' />
      )}
      <h3>{post.title}</h3>
      <p className='text-slate-300'>{post.description}</p>
      <div className='actions flex items-center mt-4 justify-between'>
        <button
          className='px-3 py-1 font-bold hover:bg-transparent hover:outline rounded-md bg-red-500 transition-all ease-in-out duration-100 outline-1'
          data-id={post._id}
          onClick={() => handleDelete(post._id)}
        >
          Eliminar
        </button>
        <button
          className='px-3 py-1 font-bold hover:bg-transparent hover:outline rounded-md bg-slate-600 transition-all ease-in-out duration-100 outline-1'
          onClick={() => navigate(`/posts/${post._id}`)}
        >
          Editar
        </button>
      </div>
    </div>
  );
}
