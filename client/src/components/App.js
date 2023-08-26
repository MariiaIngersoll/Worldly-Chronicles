import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom" 
import AllPosts from "./AllPosts";
import SinglePost from "./SinglePost";
import Home from "./Home";
import Navigation from "./Navigation";


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
          <Navigation />
          <Routes>
            <Route path = "/home" element = {<Home />} />
            <Route exact path="/posts" element={<AllPosts posts={posts} />} />
            <Route path="/posts/:postId" element={<SinglePost posts={posts} />} />  
          </Routes>
      </Router>
    </>
  ) 
}


export default App;
