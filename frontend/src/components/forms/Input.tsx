import React, { ReactElement } from "react";
import { css } from "@emotion/css";

interface InputProps {
  register: any;
  name: string;
  label?: string;
  placeholder?: string;
  type?: string;
  Icon?: React.FC;
  required?: boolean;
}

// const Input: React.FC<InputProps> = ({
//     register,
//     name,
//     label,
//     placeholder,
//     type,
//     icon,
//     ...rest
// }) => {
function Input({
  register,
  name,
  label,
  placeholder,
  type,
  Icon,
  required,
  ...rest
}: InputProps): ReactElement {
  return (
    <div
      className={css`
        position: relative;
        margin-bottom: 5px;
        width: 100%;
      `}
    >
      {label && <label htmlFor={name}>{label}</label>}
      <div>
        {Icon && (
          <div
            className={css`
              position: absolute;
              top: 11px;
              left: 10px;
              color: gray;
              border-right: 1px solid gray;
              padding-right: 4px;
            `}
          >
            <Icon />
          </div>
        )}
        <input
          className={css`
            width: 100%;

            border: 1px solid grey;
            border-radius: 5px;
            outline: none;
            ${Icon ? "padding: 10px 10px 10px 38px;" : "padding: 5px;"}
            box-sizing: border-box;
            font-size: 16px;
          `}
          name={name}
          type={type || "text"}
          placeholder={placeholder}
          {...register(name, { required: required })}
        />
      </div>
    </div>
  );
}

export default Input;
