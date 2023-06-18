import { css } from "@emotion/css";

import { useForm, SubmitHandler } from "react-hook-form";

// Component
import Input from "../forms/Input";
import { axiosPrivate } from "../../apis/AxiosPrivate";

interface NoteModalProps {
  onClose: any;
  onComplete: any;
}

export default function NoteModal({ onClose, onComplete }: NoteModalProps) {
  interface NoteInputs {
    title: string;
    content: string;
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NoteInputs>();

  async function onCreate(inputs: NoteInputs) {
    try {
      const { data } = await axiosPrivate.post("/note/add", {
        title: inputs.title,
        content: inputs.content,
      });
      if (data.success) {
        // add the refresh function here later
        onComplete();
        onClose();
      }
    } catch (error) {
      console.log("There was an error adding this note.");
    }
  }

  const onSubmit: SubmitHandler<NoteInputs> = (data) => {
    onCreate(data);
  };

  return (
    <div
      className={css`
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 1000;
        display: flex;
        justify-content: center;
        align-items: center;
      `}
    >
      <div
        className={css`
          width: 100%;
          max-width: 300px;
          background-color: white;
          padding: 10px;
          box-sizing: border-box;
          border-radius: 5px;
          position: relative;
        `}
      >
        <button
          className={css`
            position: absolute;
            right: 10px;
          `}
          onClick={() => {
            onClose();
          }}
        >
          Close
        </button>
        <h1>Create a note</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            register={register}
            name="title"
            required={true}
            placeholder="title"
            error={Boolean(errors.title)}
          />
          <textarea
            placeholder="Content"
            className={css`
              font-size: 16px;
              padding: 5px;
              box-sizing: border-box;
              outline: none;
              width: 100%;
              height: 150px;
              border-radius: 5px;
              &:focus {
                border: 2px solid dodgerblue;
              }
            `}
            {...register("content")}
          ></textarea>
          <button
            className={css`
              width: 100%;
              border: none;
              background-color: dodgerblue;
              color: white;
              padding: 5px;
              border-radius: 5px;
              cursor: pointer;
            `}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
