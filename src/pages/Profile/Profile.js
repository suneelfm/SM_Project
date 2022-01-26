import { Button, Link, Tooltip } from "@mui/material";
import { width } from "@mui/system";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

export default function Profile() {
  const [userdetails, setuserdetails] = useState({});
  const [editEnabledKey, seteditEnabledKey] = useState("");
  const [isedited, setisedited] = useState(false);

  const name = useRef();
  const userName = useRef();
  const mailid = useRef();

  const details = useSelector((state) => state.signInReducer.loggedInUser);
  useEffect(() => {
    setuserdetails({ ...details });
  }, [details]);

  useEffect(() => {
    if (
      details.userName !== userdetails.userName ||
      details.mailid !== userdetails.mailid ||
      details.name !== userdetails.name ||
      details.img !== userdetails.img
    ) {
      setisedited(true);
    } else {
      setisedited(false);
    }
  }, [
    userdetails.userName,
    userdetails.name,
    userdetails.mailid,
    userdetails.img,
  ]);

  useEffect(() => {
    if (editEnabledKey !== "") {
      switch (editEnabledKey) {
        case "name":
          name.current.focus();

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

  return (
    <>
      <div className="row" style={{ padding: "0px", marginTop: "1vw" }}>
        <div className="col-12" style={{ padding: "0px 1vw" }}>
          <div
            style={{
              color: "rgb(37, 37, 138)",
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
            / Profile
          </div>
        </div>
      </div>
      <div className="row col-12">
        <div
          className="row col-12"
          style={{
            backgroundColor: "white",
            padding: "0",
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
                src={userdetails.img}
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
                    <input type="file" hidden />
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
                  ref={name}
                  value={userdetails.name}
                  onBlur={() => seteditEnabledKey("")}
                  onChange={(event) =>
                    setuserdetails({ ...userdetails, name: event.target.value })
                  }
                  style={{
                    outline: "none",
                    color: "inherit",
                    backgroundColor: "white",
                  }}
                />
              ) : (
                <div>
                  {userdetails.name}
                  <Tooltip title="Edit Name">
                    <i
                      onClick={() => seteditEnabledKey("name")}
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
                  onBlur={() => seteditEnabledKey("")}
                  value={userdetails.userName}
                  onChange={(event) =>
                    setuserdetails({
                      ...userdetails,
                      userName: event.target.value,
                    })
                  }
                  style={{
                    outline: "none",
                    color: "inherit",
                    backgroundColor: "white",
                  }}
                />
              ) : (
                <div>
                  {userdetails.userName}
                  <Tooltip title="Edit username">
                    <i
                      onClick={() => seteditEnabledKey("userName")}
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
                  onBlur={() => seteditEnabledKey("")}
                  value={userdetails.mailid}
                  onChange={(event) =>
                    setuserdetails({
                      ...userdetails,
                      mailid: event.target.value,
                    })
                  }
                  style={{
                    outline: "none",
                    color: "inherit",
                    backgroundColor: "white",
                  }}
                />
              ) : (
                <div>
                  {userdetails.mailid}
                  <Tooltip title="Change Email">
                    <i
                      onClick={() => seteditEnabledKey("mailid")}
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
            {isedited && <button className="buttonProp">Save Changes</button>}
          </div>
        </div>
      </div>
    </>
  );
}
