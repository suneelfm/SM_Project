import { Tooltip } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import LoginPage from "../LoginPage/LoginPage";
import ReactTooltip from "react-tooltip";

export default function Layout() {
  const [detailsubmenu, setdetailsubmenu] = useState(false);
  const [user, setuser] = useState("Sign In");
  const [userImage, setuserImage] = useState("/Images/profile.png");
  const [showMenu, setshowMenu] = useState(false);
  const [expandmenu, setexpandmenu] = useState(true);
  const [focuskey, setfocuskey] = useState({ key: "" });

  useEffect(() => {
    setuser(
      sessionStorage.getItem("SMPuser") === null
        ? localStorage.getItem("SMPuser") === null
          ? "Sign In"
          : localStorage.getItem("SMPuser")
        : sessionStorage.getItem("SMPuser")
    );
    setuserImage(
      sessionStorage.getItem("SMPuserimage") === null
        ? localStorage.getItem("SMPuserimage") === null
          ? "/Images/profile.png"
          : localStorage.getItem("SMPuserimage")
        : sessionStorage.getItem("SMPuserimage")
    );
  }, []);

  return (
    <div className="maincontainer">
      <div className="row headerBar">
        <div className="col-2 logo">
          <img
            src="/Images/logo.png"
            alt=""
            style={{
              margin: "0px 0.5vw 0px 0px",
              height: "2.7vw",
              width: "2.7vw",
            }}
          />
          <span
            style={{
              fontSize: "2vw",
              fontWeight: "700",
              verticalAlign: "middle",
            }}
          >
            SM Project
          </span>
        </div>
        <div
          className="col-5"
          style={{ paddingLeft: "0px", paddingRight: "0px", display: "flex" }}
        >
          <Tooltip title={expandmenu ? "Expand Menu" : "Sink menu"}>
            <i
              className="fas fa-bars menuIcon"
              onClick={() =>
                expandmenu ? setexpandmenu(false) : setexpandmenu(true)
              }
            />
          </Tooltip>
          <div className="searchField">
            <div>
              <input
                type={"search"}
                className="searchInput"
                placeholder="Search"
              />
              <div className="searchIcon">
                <i className="fas fa-search"></i>
              </div>
            </div>
          </div>
        </div>
        <div className="col-5">
          <div className="row">
            <div className="col-8">
              <i className="far fa-comment-alt notifyIcon"></i>
              <i className="far fa-bell notifyIcon"></i>
            </div>
            <div
              className="col-4 profile"
              onClick={() =>
                user !== "Sign In" && showMenu
                  ? setshowMenu(false)
                  : setshowMenu(true)
              }
            >
              <img
                src={userImage}
                alt=""
                style={{
                  borderRadius: "50%",
                  height: "2.7vw",
                  width: "2.7vw",
                }}
              />
              <span style={{ marginLeft: "0.6vw" }}>{user}</span>
              <i className="fas fa-caret-down"></i>
            </div>
          </div>
        </div>
      </div>
      <div style={{ height: "100%" }}>
        {user !== "Sign In" && (
          <div
            className="row"
            style={{
              padding: "0px",
              margin: "0px",
              height: "100%",
              display: "flex",
            }}
          >
            <div
              className="sideBarContainer"
              style={expandmenu ? { width: "4%" } : { width: "15%" }}
            >
              <div style={{ overflow: "hidden" }}>
                <Link to="/" style={{ textDecoration: "none" }}>
                  <div
                    className="sideBar"
                    data-tip
                    data-for="homeTip"
                    onClick={() => setfocuskey({ key: "home" })}
                    style={{
                      color:
                        (focuskey.key === "home" ||
                          document.documentURI.split("/").pop() === "") &&
                        "blue",
                    }}
                  >
                    {expandmenu && (
                      <ReactTooltip id="homeTip" place="right" effect="solid">
                        Home
                      </ReactTooltip>
                    )}
                    <i
                      style={{
                        fontSize: expandmenu ? "1.5vw" : "1.1vw",
                        display: "inline",
                        padding: expandmenu && "0 5vw 0 0.8vw",
                        transition: "all 0.5s linear",
                      }}
                      className={"fas fa-home sideBarIcons"}
                    ></i>
                    <span
                      className="col-9"
                      style={{
                        fontSize: "calc(5px + 1.1vw)",
                        padding: "0",
                        whiteSpace: "nowrap",
                      }}
                    >
                      Home
                    </span>
                  </div>
                </Link>
                <Link to="/todolist" style={{ textDecoration: "none" }}>
                  <div
                    className="sideBar"
                    onClick={() => setfocuskey({ key: "todo" })}
                    data-tip
                    data-for="todoListTip"
                    style={{
                      color:
                        (focuskey.key === "todo" ||
                          document.documentURI.split("/").pop() ===
                            "todolist") &&
                        "blue",
                    }}
                  >
                    {expandmenu && (
                      <ReactTooltip
                        id="todoListTip"
                        place="right"
                        effect="solid"
                      >
                        ToDo List
                      </ReactTooltip>
                    )}
                    <i
                      style={{
                        fontSize: expandmenu ? "1.5vw" : "1.1vw",
                        display: "inline",
                        padding: expandmenu && "0 5vw 0 0.8vw",
                        transition: "all 0.5s linear",
                      }}
                      className={"fas fa-list-ul sideBarIcons"}
                    ></i>
                    <span
                      className="col-9"
                      style={{
                        fontSize: "1.1vw",
                        padding: "0",
                        whiteSpace: "nowrap",
                      }}
                    >
                      ToDo List
                    </span>
                  </div>
                </Link>
                <Link to="/calculator" style={{ textDecoration: "none" }}>
                  <div
                    className="sideBar"
                    onClick={() => setfocuskey({ key: "cals" })}
                    data-tip
                    data-for="CalculatorTip"
                    style={{
                      color:
                        (focuskey.key === "cals" ||
                          document.documentURI.split("/").pop() ===
                            "calculator") &&
                        "blue",
                    }}
                  >
                    {expandmenu && (
                      <ReactTooltip
                        id="CalculatorTip"
                        place="right"
                        effect="solid"
                      >
                        Calculator
                      </ReactTooltip>
                    )}
                    <i
                      style={{
                        fontSize: expandmenu ? "1.5vw" : "1.1vw",
                        display: "inline",
                        padding: expandmenu && "0 5vw 0 0.8vw",
                        transition: "all 0.5s linear",
                      }}
                      className={"fas fa-calculator sideBarIcons"}
                    />
                    <span
                      className="col-9"
                      style={{
                        fontSize: "1.1vw",
                        padding: "0",
                        whiteSpace: "nowrap",
                      }}
                    >
                      Calculator
                    </span>
                  </div>
                </Link>
                <div
                  className="sideBar"
                  data-tip
                  data-for="DetailsTip"
                  style={{
                    color:
                      (focuskey.key === "details" ||
                        document.documentURI.split("/").includes("details")) &&
                      "blue",
                  }}
                  onClick={() => {
                    detailsubmenu
                      ? setdetailsubmenu(false)
                      : setdetailsubmenu(true);
                  }}
                >
                  {expandmenu && (
                    <ReactTooltip id="DetailsTip" place="right" effect="solid">
                      Details
                    </ReactTooltip>
                  )}
                  <i
                    style={{
                      fontSize: expandmenu ? "1.5vw" : "1.1vw",
                      display: "inline",
                      padding: expandmenu ? "0 5vw 0 1.1vw" : "0.3vw",
                      transition: "all 0.5s linear",
                    }}
                    className={"fas fa-info sideBarIcons"}
                  ></i>
                  <span
                    className="col-9"
                    style={{
                      fontSize: "1.1vw",
                      padding: "0",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Details
                  </span>
                </div>
                {(detailsubmenu ||
                  document.documentURI.split("/").includes("details")) && (
                  <div
                    style={{
                      width: expandmenu ? "4vw" : "15vw",
                      display: expandmenu && "inline-grid",
                      transition: "all 0.5s linear",
                    }}
                  >
                    <Link
                      to="/details/personalrecords"
                      style={{ textDecoration: "none" }}
                    >
                      <div
                        className="subMenu"
                        onClick={() =>
                          setfocuskey({ key: "details", subkey: "personal" })
                        }
                        data-tip
                        data-for="PersonalRecordsTip"
                        style={{
                          width: expandmenu ? "4vw" : "15vw",
                          color:
                            (focuskey.subkey === "personal" ||
                              document.documentURI
                                .split("/")
                                .includes("personalrecords")) &&
                            "blue",
                        }}
                      >
                        {expandmenu && (
                          <ReactTooltip
                            id="PersonalRecordsTip"
                            place="right"
                            effect="solid"
                          >
                            Personal Records
                          </ReactTooltip>
                        )}
                        <i
                          style={{
                            display: "inline",
                            padding: expandmenu && "0 5vw 0 0.8vw",
                            transition: "all 0.5s linear",
                          }}
                          className={"fas fa-user-secret sideBarIcons"}
                        ></i>
                        <span
                          className="col-10"
                          style={{
                            fontSize: "1.1vw",
                            padding: "0",
                            whiteSpace: "nowrap",
                          }}
                        >
                          Personal Records
                        </span>
                      </div>
                    </Link>
                    <Link
                      to="/details/officialrecords"
                      style={{ textDecoration: "none" }}
                    >
                      <div
                        className="subMenu"
                        onClick={() =>
                          setfocuskey({ key: "details", subkey: "official" })
                        }
                        data-tip
                        data-for="OfficialRecordsTip"
                        style={{
                          width: expandmenu ? "4vw" : "15vw",
                          color:
                            (focuskey.subkey === "official" ||
                              document.documentURI
                                .split("/")
                                .includes("officialrecords")) &&
                            "blue",
                        }}
                      >
                        {expandmenu && (
                          <ReactTooltip
                            id="OfficialRecordsTip"
                            place="top"
                            effect="solid"
                          >
                            Official Records
                          </ReactTooltip>
                        )}
                        <i
                          style={{
                            display: "inline",
                            padding: expandmenu && "0 5vw 0 0.8vw",
                            transition: "all 0.5s linear",
                          }}
                          className={"fas fa-clipboard sideBarIcons"}
                        ></i>
                        <span
                          className="col-10"
                          style={{
                            fontSize: "1.1vw",
                            padding: "0",
                            whiteSpace: "nowrap",
                          }}
                        >
                          Official Records
                        </span>
                      </div>
                    </Link>
                    <Link
                      to="/details/healthrecords"
                      style={{ textDecoration: "none" }}
                    >
                      <div
                        className="subMenu"
                        data-tip
                        data-for="HealthRecordsTip"
                        onClick={() =>
                          setfocuskey({ key: "details", subkey: "health" })
                        }
                        style={{
                          width: expandmenu ? "4vw" : "15vw",
                          color:
                            (focuskey.subkey === "health" ||
                              document.documentURI
                                .split("/")
                                .includes("healthrecords")) &&
                            "blue",
                        }}
                      >
                        {expandmenu && (
                          <ReactTooltip
                            id="HealthRecordsTip"
                            place="right"
                            effect="solid"
                          >
                            Health Records
                          </ReactTooltip>
                        )}
                        <i
                          style={{
                            display: "inline",
                            padding: expandmenu && "0 5vw 0 0.8vw",
                            transition: "all 0.5s linear",
                          }}
                          className={"fas fa-notes-medical sideBarIcons"}
                        ></i>
                        <span
                          // className="col-10"
                          style={{
                            padding: "0",
                            whiteSpace: "nowrap",
                            fontSize: "1.1vw",
                          }}
                        >
                          Health Records
                        </span>
                      </div>
                    </Link>
                  </div>
                )}
                <Link to="/otherrecords" style={{ textDecoration: "none" }}>
                  <div
                    className="sideBar"
                    data-tip
                    data-for="OtherRecordsTip"
                    onClick={() => setfocuskey({ key: "other" })}
                    style={{
                      color:
                        (focuskey.key === "other" ||
                          document.documentURI
                            .split("/")
                            .includes("otherrecords")) &&
                        "blue",
                    }}
                  >
                    {expandmenu && (
                      <ReactTooltip
                        id="OtherRecordsTip"
                        place="right"
                        effect="solid"
                      >
                        Other Records
                      </ReactTooltip>
                    )}
                    <i
                      style={{
                        fontSize: expandmenu ? "1.5vw" : "1.1vw",
                        display: "inline",
                        padding: expandmenu && "0 5vw 0 0.8vw",
                        transition: "all 0.5s linear",
                      }}
                      className={"fas fa-receipt sideBarIcons"}
                    ></i>
                    <span
                      style={{
                        fontSize: "1.1vw",
                        overflow: "hidden",
                        padding: "0",
                        whiteSpace: "nowrap",
                      }}
                    >
                      Other Records
                    </span>
                  </div>
                </Link>
                <Link to="/settings" style={{ textDecoration: "none" }}>
                  <div
                    className="sideBar"
                    data-tip
                    data-for="Settings"
                    onClick={() => setfocuskey({ key: "settings" })}
                    style={{
                      overflow: "hidden",
                      position: "absolute",
                      bottom: "0",
                      width: expandmenu ? "4%" : "15%",
                      whiteSpace: "nowrap",
                      transition: "all 0.5s linear",
                      color:
                        (focuskey.key === "settings" ||
                          document.documentURI
                            .split("/")
                            .includes("settings")) &&
                        "blue",
                    }}
                  >
                    {expandmenu && (
                      <ReactTooltip id="Settings" place="right" effect="solid">
                        Settings
                      </ReactTooltip>
                    )}
                    <i
                      style={{
                        fontSize: expandmenu ? "1.5vw" : "1.1vw",
                        display: "inline",
                        padding: expandmenu && "0 5vw 0 0.8vw",
                        transition: "all 0.5s linear",
                      }}
                      className={"fas fa-cog sideBarIcons"}
                    ></i>
                    <span
                      style={{
                        fontSize: "1.1vw",
                        overflow: "hidden",
                        padding: "0",
                        whiteSpace: "nowrap",
                      }}
                    >
                      Settings
                    </span>
                  </div>
                </Link>
              </div>
            </div>
            <div
              className="outlet"
              style={expandmenu ? { width: "96%" } : { width: "85%" }}
            >
              <div
                style={{
                  height: "86%",
                  overflowY: "auto",
                  overflowX: "hidden",
                }}
              >
                {showMenu && (
                  <div className="profileMenu">
                    <div className="profileMenuItems">
                      Profile
                      <i className="far fa-id-card profileMenuIcon" />
                    </div>
                    <div
                      className="profileMenuItems"
                      onClick={() => {
                        setshowMenu(false);
                        localStorage.removeItem("SMPuser");
                        localStorage.removeItem("SMPuserimage");
                        sessionStorage.removeItem("SMPuser");
                        sessionStorage.removeItem("SMPuserimage");
                        setuser("Sign In");
                      }}
                    >
                      Sign Out
                      <i className="fas fa-sign-out-alt profileMenuIcon" />
                    </div>
                  </div>
                )}
                <Outlet />
              </div>
            </div>
          </div>
        )}
      </div>
      <footer className="row footerContainer">
        <div className="col-12">
          <div className="row">
            <div className="col-6">dsf</div>
            <div className="col-2 ">
              <a
                href="https://www.instagram.com/suneelfm"
                target="_blank"
                rel="noreferrer"
                style={{ textDecoration: "none" }}
              >
                <div className="footericons">
                  <i className="fab fa-instagram"></i>
                  <span style={{ marginLeft: "0.5vw" }}>Instagram</span>
                </div>
              </a>
            </div>
            <div className="col-2">
              <a
                href="https://www.youtube.com/channel/UC0nmwGeKtEcXgKoQc6eRbGg"
                target="_blank"
                rel="noreferrer"
                style={{ textDecoration: "none" }}
              >
                <div className="footericons">
                  <i className="fab fa-youtube"></i>
                  <span style={{ marginLeft: "0.5vw" }}>YouTube</span>
                </div>
              </a>
            </div>
            <div className="col-2">
              <a
                href="https://twitter.com/suneel_fm"
                target="_blank"
                rel="noreferrer"
                style={{ textDecoration: "none" }}
              >
                <div className="footericons">
                  <i className="fab fa-twitter"></i>
                  <span style={{ marginLeft: "0.5vw" }}>Twiter</span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </footer>
      {user === "Sign In" && <LoginPage prop={{ setuser, setuserImage }} />}
    </div>
  );
}
