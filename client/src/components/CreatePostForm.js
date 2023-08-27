import React, { useState } from "react";

function CreatePostForm({ locations, addNewPost, users }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [locationsData, setLocationsData] = useState([]);
  const [imageURL, setImageURL] = useState("");

  const handleAddLocation = () => {
    setLocationsData(prev => [...prev, { country: '', city: '' }]);
  };

    
  const handleSubmit = (e) => {
    e.preventDefault();
    const locationsToSubmit = locationsData.filter(l => l.country);
    const randomUser = users[Math.floor(Math.random() * users.length)];
    const postData = {
      title: title,
      content: content,
      user_id: randomUser.id,
      locations: locationsToSubmit,
      images: [imageURL]
    };

    fetch("http://127.0.0.1:5555/api/posts/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    })
      .then((r) => r.json())
      .then((newPost) => addNewPost(newPost));
  };

  return (
    <div>
      <h2>Create a New Post</h2>
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label>Content:</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <label>Locations:</label>
        {locationsData.map((loc, index) => (
          <div key={index}>
            <input
              type="text"
              name={`locationsData[${index}][country]`}
              placeholder="Country"
              value={loc.country}
              onChange={(e) => {
                const updatedLocations = [...locationsData];
                updatedLocations[index].country = e.target.value;
                setLocationsData(updatedLocations);
              }}
            />
            <input
              type="text"
              name={`locationsData[${index}][city]`}
              placeholder="City"
              value={loc.city}
              onChange={(e) => {
                const updatedLocations = [...locationsData];
                updatedLocations[index].city = e.target.value;
                setLocationsData(updatedLocations);
              }}
            />
          </div>
        ))}
        <button type="button" onClick={handleAddLocation}>
          Add Location
        </button>
        <label htmlFor="imageURL">Image URL:</label>
        <input
          type="text"
          id="imageURL"
          value={imageURL}
          onChange={(e) => setImageURL(e.target.value)}
        />

        <button type="submit">Create Post</button>
      </form>
    </div>
  );
}

export default CreatePostForm;