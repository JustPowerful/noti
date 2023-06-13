import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { css } from "@emotion/css";

// Icons
import { FaUser } from "react-icons/fa";
import { MdEmail, MdOutlineMailOutline, MdPassword } from "react-icons/md";
import { AiOutlineLock } from "react-icons/ai";

// Axios
import { axiosPublic } from "../apis/AxiosInstance";
// components
import Input from "../components/forms/Input";
import { Link } from "react-router-dom";

function Register() {
  interface RegisterInputs {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
  }
  // React State
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
  } = useForm<RegisterInputs>();

  async function onRegister(inputs: RegisterInputs) {
    const { username, email, password, confirmPassword } = inputs;
    if (password !== confirmPassword) {
      return setMessage({ content: "Passwords does not match!", error: true });
    }
    try {
      const { data } = await axiosPublic.post("/auth/register", {
        username: username,
        email: email,
        password: password,
      });
      if (data.success) {
        setMessage({ content: data.message, error: !data.success });
      }
    } catch (error: any) {
      setMessage({
        content: error.response.data.message,
        error: !error.response.data.success,
      });
    }
  }

  const onSumbit: SubmitHandler<RegisterInputs> = (data) => {
    onRegister(data);
  };

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
        onSubmit={handleSubmit(onSumbit)}
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
        {/* <input
          {...register("username", { required: true })}
          placeholder="Username"
          className={inputStyle}
        /> */}
        <h1
          className={css`
            text-align: center;
            margin: 0;
            margin-bottom: 10px;
          `}
        >
          Register
        </h1>
        <Input
          name="username"
          Icon={FaUser}
          register={register}
          placeholder="username"
          error={Boolean(errors.username)}
          required={true}
        />
        {errors.username && (
          <small
            className={css`
              color: red;
              margin-bottom: 5px;
            `}
          >
            Username field is required.
          </small>
        )}

        {/* <input {...register("email", { required: true })} placeholder="Email" /> */}
        <Input
          name="email"
          Icon={MdEmail}
          type="email"
          register={register}
          placeholder="email"
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
        {/* <input
          {...register("password", { required: true })}
          placeholder="Password"
        /> */}
        <Input
          name="password"
          Icon={MdPassword}
          type="password"
          register={register}
          placeholder="password"
          required={true}
          error={Boolean(errors.password)}
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
        {/* <input
          {...register("confirmPassword", { required: true })}
          placeholder="Confirm password"
        /> */}
        <Input
          name="confirmPassword"
          Icon={MdPassword}
          type="password"
          register={register}
          placeholder="confirm password"
          required={true}
          error={Boolean(errors.confirmPassword)}
        />
        {errors.confirmPassword && (
          <small
            className={css`
              color: red;
              margin-bottom: 5px;
            `}
          >
            Please confirm your password.
          </small>
        )}
        {message.content &&
          (message.error ? (
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
          ))}
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
          Register
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
          Already have an account?{" "}
          <Link
            to="/login"
            className={css`
              text-decoration: none;
            `}
          >
            login.
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Register;
