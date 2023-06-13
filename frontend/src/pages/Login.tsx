import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
// CSS
import { css } from "@emotion/css";

// Components
import Input from "../components/forms/Input";
import { MdEmail, MdPassword } from "react-icons/md";
import { Link } from "react-router-dom";
import { axiosPublic } from "../apis/AxiosInstance";

function Login() {
  interface LoginInputs {
    email: string;
    password: string;
  }

  interface message_type {
    content: string;
    error: boolean;
  }

  const [message, setMessage] = useState<message_type>({
    content: "",
    error: false,
  });

  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm<LoginInputs>();

  // function onSubmit(data: LoginInputs) {}
  const onSubmit: SubmitHandler<LoginInputs> = (data) => {
    // create the login function
    onLogin(data);
  };

  async function onLogin(inputs: LoginInputs) {
    const { email, password } = inputs;
    try {
      const { data } = await axiosPublic.post("/auth/login", {
        email,
        password,
      });
      if (data.success) {
        // set message and redirect
        setMessage({
          content: data.message + " Redirecting you.",
          error: !data.success,
        });
        localStorage.setItem("token", data.token);
        localStorage.setItem("refreshToken", data.refreshToken);
        setTimeout(() => {
          window.location.href = "/";
        }, 3000);
      }
    } catch (error) {
      // set error message
      setMessage({
        content: error.response.data.message,
        error: !error.response.data.success,
      });
    }
  }

  return (
    <div
      className={css`
        width: 100%;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
      `}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={css`
          background-color: white;
          border-radius: 10px;
          box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1);
          display: flex;
          flex-direction: column;
          padding: 25px;
          box-sizing: border-box;
          width: 100%;
          max-width: 340px;
        `}
      >
        <h1
          className={css`
            text-align: center;
            margin: 0;
            margin-bottom: 10px;
          `}
        >
          Login
        </h1>
        <Input
          name="email"
          type="email"
          placeholder="email"
          register={register}
          Icon={MdEmail}
          required={true}
          error={Boolean(errors.email)}
        />
        {errors.email && (
          <small
            className={css`
              color: red;
              margin-bottom: 5px;
            `}
          >
            Email field is required.
          </small>
        )}
        <Input
          name="password"
          placeholder="password"
          register={register}
          Icon={MdPassword}
          required={true}
          error={Boolean(errors.email)}
        />
        {errors.password && (
          <small
            className={css`
              color: red;
              margin-bottom: 5px;
            `}
          >
            Password field is required.
          </small>
        )}
        {message.content && (
          <div
            className={css`
              text-align: center;
              margin-bottom: 5px;
            `}
          >
            {message.error ? (
              <small
                className={css`
                  color: red;
                  margin-bottom: 5px;
                  text-align: center;
                  font-size: 12px;
                `}
              >
                {message.content}
              </small>
            ) : (
              <small
                className={css`
                  color: green;
                  margin-bottom: 5px;
                  text-align: center;
                  font-size: 12px;
                `}
              >
                {message.content}
              </small>
            )}
          </div>
        )}
        <button
          className={css`
            background-color: dodgerblue;
            color: white;
            border: none;
            border-radius: 5px;
            padding: 10px;
            cursor: pointer;
            &:hover {
              background-color: #135698;
            }
          `}
        >
          Login
        </button>
        <div
          className={css`
            font-size: 14px;
            text-align: center;
            display: block;
            margin-top: 5px;
            text-decoration: none;
          `}
        >
          Don't have an account?{" "}
          <Link
            to="/register"
            className={css`
              text-decoration: none;
            `}
          >
            register.
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
