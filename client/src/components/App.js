import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom" 
import AllPosts from "./AllPosts";


function App() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    fetch('http://127.0.0.1:5555/api/posts/')
    .then((r) => r.json())
    .then((posts) => {
      console.log(posts);
      setPosts(posts)})
  }, [])


  return (
    <>
      <Router>
          <Routes>
             <Route path="/posts" element={<AllPosts posts = {posts}/>} />
          </Routes>
      </Router>
    </>
  ) 
}


export default App;
