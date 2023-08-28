import React, { useState } from "react";

function CreatePostForm({ locations, addNewPost, users }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [locationsData, setLocationsData] = useState([]);
  const [imageURLs, setImageURLs] = useState([]); 

  const handleAddLocation = () => {
    setLocationsData(prev => [...prev, { country: '', city: '' }]);
  };

  const handleAddImage = () => {
    setImageURLs(prev => [...prev, '']);
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
      images: imageURLs
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
    <div className="form-container">
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

        {imageURLs.map((url, index) => (
          <div key={index}>
            <input
              type="text"
              placeholder="Image URL"
              value={url}
              onChange={(e) => {
                const updatedImageURLs = [...imageURLs];
                updatedImageURLs[index] = e.target.value;
                setImageURLs(updatedImageURLs);
              }}
            />
          </div>
        ))}
        <div className="button-container">
          <button type="button" onClick={handleAddLocation}>
            Add Location
          </button>
          <button type="button" onClick={handleAddImage}>
            Add Image
          </button>
          <button type="submit">Create Post</button>
        </div>
      </form>
    </div>
  );
}

export default CreatePostForm;