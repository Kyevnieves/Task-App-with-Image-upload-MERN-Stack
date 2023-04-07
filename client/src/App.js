import "./App.css";
import { HomePage, NotFoundPage, PostForm } from "./pages";
import { Routes, Route } from "react-router-dom";
import { PostProvider } from "./context/postContext";
import { NavBar } from "./components/NavBar";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className='bg-neutral-300 min-h-screen'>
      <NavBar />
      <div className='mx-auto px-10 container my-6'>
        <PostProvider>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/new' element={<PostForm />} />
            <Route path='/posts/:id' element={<PostForm />} />
            <Route path='*' element={<NotFoundPage />} />
          </Routes>
          <Toaster />
        </PostProvider>
      </div>
    </div>
  );
}

export default App;
