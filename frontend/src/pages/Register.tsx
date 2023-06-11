import { useForm, SubmitHandler } from "react-hook-form";
import { css } from "@emotion/css";

// Icons
import { FaUser } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { AiOutlineLock } from "react-icons/ai";

// components
import Input from "../components/forms/Input";

type RegisterInputs = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

function Register() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterInputs>();

  const onSumbit: SubmitHandler<RegisterInputs> = (data) => {
    // HTTP axios request here
    console.log(data.username, data.email, data.password, data.confirmPassword);
  };

  const inputStyle = css`
    border: none;
  `;

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
          required={true}
        />
        {/* <input {...register("email", { required: true })} placeholder="Email" /> */}
        <Input
          name="email"
          Icon={MdOutlineMailOutline}
          type="email"
          register={register}
          placeholder="email"
          required={true}
        />
        {/* <input
          {...register("password", { required: true })}
          placeholder="Password"
        /> */}
        <Input
          name="password"
          Icon={AiOutlineLock}
          type="password"
          register={register}
          placeholder="password"
          required={true}
        />
        {/* <input
          {...register("confirmPassword", { required: true })}
          placeholder="Confirm password"
        /> */}
        <Input
          name="confirmPassword"
          Icon={AiOutlineLock}
          type="password"
          register={register}
          placeholder="confirm password"
          required={true}
        />
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
      </form>
    </div>
  );
}

export default Register;
