import { usePosts } from "../context/postContext";
import { PostCard } from "../components/PostCard";
import { VscEmptyWindow } from "react-icons/vsc";
export function HomePage() {
  const { posts } = usePosts();

  if (posts.length === 0) {
    return (
      <div>
        <h1 className='text-xl text-gray-800'>No hay Posts</h1>
        <VscEmptyWindow className='text-xl text-gray-800' />
      </div>
    );
  }
  return (
    <>
      <h1>Homepage</h1>
      <div className='containerPosts flex flex-wrap gap-4 justify-center'>
        {posts.map((post) => {
          return <PostCard post={post} key={post._id} />;
        })}
      </div>
    </>
  );
}
