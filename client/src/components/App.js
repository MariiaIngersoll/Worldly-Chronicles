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
import Authentication from "./Authentication";
import EditPost from "./EditPost";


function App() {
  const [posts, setPosts] = useState([]);
  const [locations, setLocations] = useState([]);
  const [users,setUsers ] = useState([])
  const [user, setUser] = useState(null);
  

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
      .then((locationsData) => {
        console.log(locationsData); 
        setLocations(locationsData);
      });
  }, []);

  useEffect(() => {
    fetch('http://127.0.0.1:5555/api/users')
      .then((r) => r.json())
      .then((data) => {
        setUsers(data)
        console.log(data)
      });
  }, []);


  const handleDelete = (post_by_id) => {
    console.log(post_by_id)
    fetch(`/api/posts/${post_by_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          console.log("Post has been deleted successfully!");
          setPosts((prevPosts) =>
            prevPosts.filter((post) => post.id !== post_by_id)
          );
        } else {
          console.error("Failed");
        }
      })
      .catch((error) => {
        console.error("Error while deleting post! :( ", error);
      });
  };

  useEffect(() => {
    fetch("/api/check_session/").then((res) => {
      if (res.ok){
        res.json().then((user) => setUser(user));
      }
    });
  }, []);

  if (!user) {
    return (
      <>
        <Router>
          <Authentication setUser={setUser}/>
        </Router>
      </>
    )
  }

  return (
    <>
      <Router>
        <Navigation user={user} setUser={setUser}/>
        <Routes>
          <Route path="/" element={<Home user={user}/>} />
          <Route exact path="/posts" element={<AllPosts posts={posts} setPosts={setPosts} />} />
          <Route path="/posts/:postId" element={<SinglePost handleDelete = {handleDelete} posts={posts} />} /> 
          <Route path="/create/post" element={<CreatePostForm  users = {users} addNewPost={addNewPost} />} />
          <Route path="/posts/edit/:postId" element={<EditPost setPosts={setPosts} posts = {posts}/>} />
          <Route path="/contact" element={<Contact />} /> 
          <Route path="/locations" element={<AllLocations setLocations ={setLocations} locations={locations}/>} />
          <Route path="/locations/:country" element={<LocationPosts />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;