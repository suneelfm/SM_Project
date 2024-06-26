import { Button, Tooltip } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import validator from "validator";
import { toastMessage } from "../../Components/toastMessage";

export default function Profile() {
  const [userDetails, setUserDetails] = useState({});
  const [editEnabledKey, setEditEnabledKey] = useState("");
  const [isEdited, setIsEdited] = useState(false);
  const [error, setError] = useState({
    name: "",
    username: "",
    mailid: "",
    image: "",
  });

  const mode = useSelector((state) => state.signInReducer.isDarkMode);

  const namefield = useRef();
  const userName = useRef();
  const mailid = useRef();

  const dispatch = useDispatch();

  const details = useSelector((state) => state.signInReducer.loggedInUser);
  useEffect(() => {
    setUserDetails({ ...details });
  }, [details]);

  useEffect(() => {
    if (
      details.userName !== userDetails.userName ||
      details.mailid !== userDetails.mailid ||
      details.name !== userDetails.name ||
      details.img?.name !== userDetails.img?.name
    ) {
      setIsEdited(true);
    } else {
      setIsEdited(false);
    }
  }, [
    userDetails.userName,
    userDetails.name,
    userDetails.mailid,
    userDetails.img?.name,
  ]);

  useEffect(() => {
    if (editEnabledKey !== "") {
      switch (editEnabledKey) {
        case "name":
          namefield.current.focus();

          break;
        case "userName":
          userName.current.focus();

          break;
        case "mailid":
          mailid.current.focus();

          break;

        default:
          break;
      }
    }
  }, [editEnabledKey]);

  const handleSubmit = () => {
    const err = { ...error };
    if (!userDetails.name) {
      err.name = "Please enter your full name.";
    } else if (/^([a-zA-Z ]){1,15}$/.test(userDetails.name)) {
      err.name = "";
    } else {
      err.name = "Only alphabets up to 15 characters are allowed";
    }

    if (validator.isEmail(userDetails.mailid)) {
      err.mailid = "";
    } else {
      err.mailid = "Please enter valid Email";
    }

    // if (!password) {
    //   setpswerror("Please enter password.");
    // } else if (
    //   validator.isStrongPassword(password, {
    //     minLength: 8,
    //     minLowercase: 1,
    //     minUppercase: 1,
    //     minNumbers: 1,
    //     minSymbols: 1,
    //   })
    // ) {
    //   setpswerror("");
    // } else {
    //   setpswerror(
    //     "At least 1 upper case, 1 lower case, 1 number, 1 special character and min. 8 characters required"
    //   );
    // }

    if (!userDetails.userName) {
      err.username = "Please enter your user name.";
    } else if (/^([a-z0-9-_]){4,10}$/.test(userName)) {
      err.username = "";
    } else {
      err.username = `Only lower case alphnumarics with "-" and "_" at least 4 up to 10 characters are allowed without space`;
    }

    const validImageExtensions = ["jpeg", "png", "jpg"];
    const ext =
      userDetails.img.name !== "" && userDetails.img.name.split(".").pop();

    if (
      ext !== false &&
      !(validImageExtensions.indexOf(ext.toLocaleLowerCase()) !== -1) &&
      userDetails.img.name !== ""
    ) {
      err.image = "Please select file only of type jpeg, jpg or png";
    } else {
      err.image = "";
    }

    setError(err);
    getProfileChanges();
  };

  const getProfileChanges = () => {
    if (
      error.username === "" &&
      error.name === "" &&
      error.mailid === "" &&
      error.image === ""
    ) {
      dispatch({
        type: "UpdateProfile",
        userDetails,
      });
      setIsEdited(false);
      toastMessage({
        appearance: "success",
        message: "User has been registered successfully.",
      });
    }
  };

  return (
    <>
      <div className="row" style={{ padding: "0px", marginTop: "1vw" }}>
        <div className="col-12" style={{ padding: "0px 1vw" }}>
          <div
            style={{
              color: mode ? "cornflowerblue" : "rgb(37, 37, 138)",
              marginBottom: "0px",
              fontSize: "1.6vw",
            }}
          >
            Profile
          </div>
          <div
            style={{
              color: "rgb(152, 152, 202)",
              marginBottom: "0px",
              fontSize: "1.15vw",
            }}
          >
            <Link
              to="/"
              className="link"
              style={{ color: "rgb(152, 152, 202)", marginBottom: "0px" }}
            >
              Home
            </Link>{" "}
            /{" "}
            <Link
              to="/settings"
              className="link"
              style={{ color: "rgb(152, 152, 202)", marginBottom: "0px" }}
            >
              Settings
            </Link>{" "}
            / Profile
          </div>
        </div>
      </div>
      <div className="row col-12">
        <div
          className="row col-12"
          style={{
            backgroundColor: mode ? "#202124" : "white",
            padding: "0",
            color: mode ? "white" : "black",
            marginTop: "1vw",
            borderRadius: "0.5vw",
          }}
        >
          <div
            className="row col-12"
            style={{
              borderBottom: "0.15vw solid rgb(211, 224, 224)",
              padding: "0",
            }}
          >
            <div
              className="col-3"
              style={{ display: "grid", justifyContent: "center" }}
            >
              <img
                src={userDetails.img?.name}
                alt=""
                loading="lazy"
                style={{
                  height: "10vw",
                  width: "10vw",
                  margin: "1vw",
                  borderRadius: "0.5vw",
                }}
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: "1vw",
                }}
              >
                <Tooltip title="Change Profile Photo">
                  <Button
                    className="buttonProp"
                    variant="contained"
                    component="label"
                    style={{ backgroundColor: "rgb(152, 152, 202)" }}
                  >
                    <i className="fas fa-cloud-upload-alt" />
                    <input
                      type="file"
                      onChange={(event) => {
                        setUserDetails({
                          ...userDetails,
                          img: event.target.files[0],
                        });
                      }}
                      hidden
                    />
                  </Button>
                </Tooltip>
              </div>
            </div>
            <div
              className="col-8"
              style={{
                display: "flex",
                alignItems: "center ",
                fontWeight: "600",
                fontSize: "calc(4px + 1.5vw)",
                color: "rgb(37, 37, 138)",
              }}
            >
              {editEnabledKey === "name" ? (
                <input
                  ref={namefield}
                  value={userDetails.name}
                  onBlur={() => setEditEnabledKey("")}
                  onChange={(event) =>
                    setUserDetails({ ...userDetails, name: event.target.value })
                  }
                  style={{
                    outline: "none",
                    color: "inherit",
                    backgroundColor: "inherit",
                  }}
                />
              ) : (
                <div>
                  {userDetails.name}
                  <Tooltip title="Edit Name">
                    <i
                      onClick={() => setEditEnabledKey("name")}
                      className="fas fa-pen iconProp"
                      style={{ marginLeft: "1vw" }}
                      // onClick={() => onClickofModify(item)}
                    />
                  </Tooltip>
                </div>
              )}
            </div>
          </div>
          {/* <table className="table">
            <tbody>
              <tr className="trow">
                <td className="tcol">
                  <div></div>
                </td>
              </tr>
              <tr className="trow">
                <td className="tcol">
                  <div>User Name: -</div>
                  <div>Email: -</div>
                </td>
              </tr>
            </tbody>
          </table> */}
          <div
            className="row col-12"
            style={{ fontSize: "calc(2px + 1.1vw)", padding: "0.5vw" }}
          >
            <div className="col-2">User Name: -</div>
            <div className="col-10">
              {editEnabledKey === "userName" ? (
                <input
                  ref={userName}
                  onBlur={() => setEditEnabledKey("")}
                  value={userDetails.userName}
                  onChange={(event) =>
                    setUserDetails({
                      ...userDetails,
                      userName: event.target.value,
                    })
                  }
                  style={{
                    outline: "none",
                    color: "inherit",
                    backgroundColor: "inherit",
                  }}
                />
              ) : (
                <div>
                  {userDetails.userName}
                  <Tooltip title="Edit username">
                    <i
                      onClick={() => setEditEnabledKey("userName")}
                      className="fas fa-pen iconProp"
                      style={{ marginLeft: "1vw" }}
                      // onClick={() => onClickofModify(item)}
                    />
                  </Tooltip>
                </div>
              )}
            </div>
          </div>
          <div
            className="row col-12"
            style={{ fontSize: "calc(2px + 1.1vw)", padding: "0.5vw" }}
          >
            <div className="col-2">Email: -</div>
            <div className="col-10">
              {editEnabledKey === "mailid" ? (
                <input
                  ref={mailid}
                  onBlur={() => setEditEnabledKey("")}
                  value={userDetails.mailid}
                  onChange={(event) =>
                    setUserDetails({
                      ...userDetails,
                      mailid: event.target.value,
                    })
                  }
                  style={{
                    outline: "none",
                    color: "inherit",
                    backgroundColor: "inherit",
                  }}
                />
              ) : (
                <div>
                  {userDetails.mailid}
                  <Tooltip title="Change Email">
                    <i
                      onClick={() => setEditEnabledKey("mailid")}
                      className="fas fa-pen iconProp"
                      style={{ marginLeft: "1vw" }}
                      // onClick={() => onClickofModify(item)}
                    />
                  </Tooltip>
                </div>
              )}
            </div>
          </div>
          <div
            className="row col-12"
            style={{
              display: "flex",
              justifyContent: "center",
              padding: "1vw",
            }}
          >
            {isEdited && (
              <button onClick={handleSubmit} className="buttonProp">
                Save Changes
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
