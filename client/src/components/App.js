import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom"; // Import Route instead of Routes

import AllPosts from "./AllPosts"


function App() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    fetch('http://127.0.0.1:5555/api/posts/')
    .then((r) => r.json())
    .then((posts) => setPosts(posts))
  }, [])

  console.log(posts)

  return (
    <Router>
      <h1>Welcome</h1>

      <Route path="/posts" element={<AllPosts posts={posts} />} />

    </Router>
  );  
}

  export default App;
