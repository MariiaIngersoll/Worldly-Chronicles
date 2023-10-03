import React from "react";
import * as yup from "yup";
import { useNavigate } from "react-router";
import { useFormik } from "formik";

function CreatePostForm({ addNewPost, users }) {
  const navigate = useNavigate();

  const formSchema = yup.object().shape({
    title: yup.string().required('YOU MUST ENTER A TITLE!').typeError('Title must be a string'),
    content: yup.string().required('Content is required').min(10, 'Content must be at least 10 characters'),
  });
// WORK ON VALIDATES DATA TYPE! 
  const formik = useFormik({
    initialValues: {
      title: '',
      content: '',
      locations_data: [{ country: '', city: '' }],
      images: [''],
    },
    validationSchema: formSchema,
    onSubmit: (values) => {
      const randomUser = users[Math.floor(Math.random() * users.length)];
      const newValues = {
        ...values,
        user_id: randomUser.id,
      };
      console.log("New Values:", newValues);

      fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newValues),
      }).then((res) => {
        if (res.ok) {
          res.json().then((post) => {
            addNewPost(post);
            navigate(`/posts/${post.id}`);
          });
        }
      });
    },
  });

  const handleAddLocation = () => {
    formik.setFieldValue('locations_data', [...formik.values.locations_data, { country: '', city: '' }]);
  };

  const handleRemoveLocation = (index) => {
    const updatedLocations = [...formik.values.locations_data];
    updatedLocations.splice(index, 1);
    formik.setFieldValue('locations_data', updatedLocations);
  };

  const handleAddImage = () => {
    formik.setFieldValue('images', [...formik.values.images, '']);
  };

  return (
    <div className="form-container">
      <h2>Create a New Post</h2>
      <form onSubmit={formik.handleSubmit}>
        <label>Title:</label>
        <input
          name='title'
          type="text"
          value={formik.values.title}
          onChange={formik.handleChange}
          rows={4}
        />

        <label>Content:</label>
        <textarea
          name='content'
          value={formik.values.content}
          onChange={formik.handleChange}
        />

        <div>
          <h4>Locations:</h4>
          {formik.values.locations_data.map((loc, index) => (
            <div key={index}>
              <input
                name={`locations_data[${index}].country`}
                type="text"
                placeholder="Country"
                value={loc.country}
                onChange={(e) => formik.setFieldValue(`locations_data[${index}].country`, e.target.value)}
              />
              <input
                name={`locations_data[${index}].city`}
                placeholder="City"
                type="text"
                value={loc.city}
                onChange={(e) => formik.setFieldValue(`locations_data[${index}].city`, e.target.value)}
              />
              {index > 0 && (
                <button
                  type="button"
                  onClick={() => handleRemoveLocation(index)}
                >
                  Remove Location
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddLocation}
          >
            Add Location
          </button>
        </div>

        {formik.values.images.map((url, index) => (
          <div key={index}>
            <input
              name={`images[${index}]`}
              type="text"
              placeholder="Image URL"
              value={url}
              onChange={(e) => formik.setFieldValue(`images[${index}]`, e.target.value)}
            />
            {index > 0 && (
              <button
                type="button"
                onClick={() => {
                  const updatedImageURLs = [...formik.values.images];
                  updatedImageURLs.splice(index, 1);
                  formik.setFieldValue('images', updatedImageURLs);
                }}
              >
                Remove Image
              </button>
            )}
          </div>
        ))}
        <div className="button-container">
          <button type="button" onClick={handleAddImage}>
            Add Image
          </button>
          <button type="submit">Create Post</button>
        </div>
      </form>
      {formik.errors && (
        <div className="errors">
          <ul>
            {Object.values(formik.errors).map((error, index) => (
              <h4 key={index} style={{ color: 'red' }}>{error}</h4>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default CreatePostForm;