import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";

function EditPost() {
  const [errors, setErrors] = useState(null);
  const navigate = useNavigate();
  const { postId } = useParams();

  const [post, setPost] = useState({});

  const formSchema = yup.object().shape({
    title: yup.string().required("Title is required"),
    content: yup.string().required("Content is required"),
  });

  useEffect(() => {
    fetch(`/api/posts/${postId}`)
      .then((response) => response.json())
      .then((data) => {
        setPost(data);
        formik.setValues({
          title: data.title || "",
          content: data.content || "",
        });
      })
      .catch((error) => {
        console.error("Error fetching post:", error);
      });
  }, [postId]);

  const formik = useFormik({
    initialValues: {
      title: post.title,
      content: post.content,
    },
    validationSchema: formSchema,
    onSubmit: (values) => {
      console.log("onSubmit function called");

      fetch(`/api/posts/${postId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            throw new Error("Error updating post");
          }
        })
        .then((updatedPost) => {
          setPost(updatedPost);
          console.log("Updated Post Data:", updatedPost);
          navigate(`/posts/${postId}`);
        })
        .catch((error) => {
          console.error("Error updating post:", error);
          setErrors("An error occurred while updating the post.");
        });
    },
  });
  return (
    <div className="form-container">
      <h2>Edit Post</h2>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            name="title"
            type="text"
            value={formik.values.title}
            onChange={formik.handleChange}
          />
          {formik.touched.title && formik.errors.title && (
            <div className="error">{formik.errors.title}</div>
          )}
        </div>
        <div>
          <label>Content:</label>
          <textarea
            name="content"
            value={formik.values.content}
            onChange={formik.handleChange}
          />
          
          {formik.touched.content && formik.errors.content && (
            <div className="error">{formik.errors.content}</div>
          )}
        </div>
        <div>
          <button type="submit">Save</button>
        </div>
        {errors && <div className="error">{errors}</div>}
      </form>
    </div>
  );
}

export default EditPost;

