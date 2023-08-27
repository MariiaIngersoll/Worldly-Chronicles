import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom" 
import AllPosts from "./AllPosts";
import SinglePost from "./SinglePost";
import Home from "./Home";
import Navigation from "./Navigation";
import Contact from "./Contact";
import AllLocations from "./AllLocations";
import CreatePostForm from "./CreatePostForm";
import LocationPosts from "./LocationPosts";

function App() {
  const [posts, setPosts] = useState([]);
  const [locations, setLocations] = useState([]);
  const [users,setUsers ] = useState([])
  console.log(users)
  console.log(posts)
  console.log(locations)

  useEffect(() => {
    fetch('http://127.0.0.1:5555/api/posts')
      .then((r) => r.json())
      .then((postsData) => {
        setPosts(postsData);
      });
  }, []);

  const addNewPost = (newPost) => {
    setPosts((prevPosts) => [...prevPosts, newPost]);
  };

  useEffect(() => {
    fetch('http://127.0.0.1:5555/api/locations')
      .then((r) => r.json())
      .then((locationsData) => setLocations(locationsData));
  }, []);

  useEffect(() => {
    fetch('http://127.0.0.1:5555/api/users')
      .then((r) => r.json())
      .then((data) => {
        setUsers(data)
      });
  }, []);


  return (
    <>
      <Router>
        <Navigation />
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route exact path="/posts" element={<AllPosts posts={posts} />} />
          <Route path="/posts/:postId" element={<SinglePost posts={posts} />} /> 
          <Route path="/create/post" element={<CreatePostForm users = {users} posts={posts} locations={locations} addNewPost={addNewPost} />} />
          <Route path="/contact" element={<Contact />} /> 
          <Route path="/locations" element={<AllLocations locations={locations}/>} />
          <Route path="/locations/:country" element={<LocationPosts />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;