import { useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

function Authentication({ setUser }) {
  const [signUp, setSignUp] = useState(false);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const handleClick = () => {
    setSignUp((prevState) => !prevState);
  };

  const handleSubmit = (values) => {
    const url = signUp ? "/api/signup/" : "/api/login/"
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((response) => {
        if (response.ok) {
          return response.json()
        } else {
          throw new Error("Invalid credentials")
        }
      })
      .then((data) => {
        setUser(data)
        navigate(`/`)
      })
      .catch((error) => {
        console.error(error)
        setErrorMessage("Invalid credentials. Please check your username and password.")
  
      })
  }

  const formSchema = yup.object().shape({
    username: yup.string().required("Please enter a username."),
    password: yup.string().required("Please enter a password."),
  
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validationSchema: formSchema,
    onSubmit: handleSubmit,
  });

  return (
    <>
      <div className="form-container">
        <form onSubmit={formik.handleSubmit}>
          <h4>{signUp ? "Enter your credentials to sign up!" : "Enter your credentials to log in!"}</h4>
          <br />
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formik.values.username}
            onChange={formik.handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formik.values.password}
            onChange={formik.handleChange}
          />
          {signUp && ( 
            <>

              <input
                type="text"
                name="email"
                placeholder="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
              />
            </>
          )}

          <input type="submit" value={signUp ? "Sign Up" : "Log In"} />

          <h5>{signUp ? "Already a member?" : "Not a member?"}</h5>
          <button type="button" onClick={handleClick}>
            {signUp ? "Log In" : "Sign Up"}
          </button>
          <br />
          <br />
        </form>
        {errorMessage && (
          <div className="errors">
            <h6 style={{ color: "red" }}>{errorMessage}</h6>
          </div>
        )}
        {formik.errors && (
          <div className="errors">
            <ul>
              {Object.values(formik.errors).map((error, index) => (
                <h6 key={index} style={{ color: "red" }}>
                  {error}
                </h6>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}

export default Authentication;