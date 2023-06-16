import { css } from "@emotion/css";

// React
import { useState } from "react";

// icons
import { FaStickyNote, FaUser, FaUserCircle } from "react-icons/fa";
import { AiFillFileAdd } from "react-icons/ai";
import { Link } from "react-router-dom";
import RequireAuth from "../auth/RequireAuth";

export default function Navbar() {
  const [toggleMenu, setToggleMenu] = useState(false);
  return (
    <div
      className={css`
        position: fixed;
        top: 0;
        background-color: dodgerblue;
        width: 100%;
        padding: 10px;
        box-sizing: border-box;
        color: white;
        display: flex;
        justify-content: space-between;
        align-items: center;
      `}
    >
      <div className={css``}>
        <h2
          className={css`
            display: flex;
            align-items: center;
          `}
        >
          <div
            className={css`
              display: inline-block;
              font-size: 20px;
              line-height: 0;
              margin-right: 5px;
            `}
          >
            <FaStickyNote />
          </div>
          noti
        </h2>
      </div>
      <div
        className={css`
          display: flex;
          align-items: center;
        `}
      >
        {/* If not authorized */}
        <RequireAuth
          noAuth={true}
          element={
            <div
              className={css`
                a {
                  color: white;
                  text-decoration: none;
                }
              `}
            >
              <Link
                to="/login"
                className={css`
                  margin-right: 15px;
                `}
              >
                Login
              </Link>
              <Link to="/register">Register</Link>
            </div>
          }
        />
        {/* If authorized */}
        <RequireAuth
          // enableRedirect={true}
          // redirectLink="https://google.com"
          element={
            <div
              className={css`
                position: relative;
              `}
            >
              <button
                onClick={() => {
                  setToggleMenu((prev) => !prev);
                }}
                className={css`
                  line-height: 0;
                  font-size: 25px;
                  background: none;
                  border: none;
                  color: white;
                  cursor: pointer;
                `}
              >
                <FaUserCircle />
              </button>
              {toggleMenu && (
                <div
                  className={css`
                    position: absolute;
                    top: 1;
                    right: 0;
                    background-color: white;
                    padding: 5px 0;
                    box-sizing: border-box;
                    width: 150px;

                    border-radius: 5px;
                    box-shadow: 1px 1px 15px 1px rgba(0, 0, 0, 0.5);

                    a {
                      font-size: 18px;
                      text-decoration: none;
                      color: black;
                      display: block;
                      text-align: center;
                      &:hover {
                        color: white;
                        background-color: dodgerblue;
                      }
                    }
                  `}
                >
                  <Link to="/dashboard">Dashboard</Link>
                  <hr />
                  <div
                    className={css`
                      display: flex;
                      justify-content: center;
                    `}
                  >
                    <button
                      className={css`
                        //   margin-top: 5px;
                        margin: 5px;
                        box-sizing: border-box;
                        padding: 5px;
                        background-color: dodgerblue;
                        color: white;
                        border: none;
                        border-radius: 5px;
                        width: 100%;
                        cursor: pointer;
                      `}
                    >
                      <span
                        className={css`
                          position: relative;
                          top: 1px;
                        `}
                      >
                        {" "}
                        <AiFillFileAdd />
                      </span>
                      Add note
                    </button>
                  </div>
                </div>
              )}
            </div>
          }
        />
      </div>
    </div>
  );
}
