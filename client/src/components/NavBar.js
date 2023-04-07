import { Link } from "react-router-dom";
export function NavBar() {
  return (
    <div className='w-full bg-red-300 flex flex-wrap items-center justify-between px-6 py-4'>
      <div className='text-3xl'>Logo</div>
      <div className='pages hidden md:block'>
        <ul className='flex gap-2'>
          <Link to='/'>Homepage</Link>
          <Link to='/new'>Create Post</Link>
        </ul>
      </div>
      <button className='md:hidden'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='w-6 h-6'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5'
          />
        </svg>
      </button>
      <div className='pages-mobile w-full py-2 md:hidden'>
        <ul className='flex flex-col justify-center items-center'>
          <Link to='/' className='my-2'>
            Homepage
          </Link>
          <Link to='/new'>Create Post</Link>
        </ul>
      </div>
    </div>
  );
}
