import { Tooltip } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import LoginPage from "../LoginPage/LoginPage";
import ReactTooltip from "react-tooltip";
import { useSelector } from "react-redux";
import "./LayoutStyle.css";

export default function Layout() {
  const [detailSubMenu, setDetailSubMenu] = useState(false);
  const [user, setUser] = useState("Sign In");
  const [userImage, setUserImage] = useState("/Images/profile.png");
  const [showMenu, setShowMenu] = useState(false);
  const [expandMenu, setExpandMenu] = useState(true);
  const [focusKey, setFocusKey] = useState({ key: "" });

  const mode = useSelector((state) => state.signInReducer.isDarkMode);

  const state = useSelector((state) => state.signInReducer);

  useEffect(() => {
    const currUser =
      sessionStorage.getItem("SMPuser") === null
        ? localStorage.getItem("SMPuser") === null
          ? "Sign In"
          : localStorage.getItem("SMPuser")
        : sessionStorage.getItem("SMPuser");
    const matched = state.loginUserArray.filter(
      (item) => item.userName === currUser
    );
    if (matched.length > 0) {
      setUser(matched[0]?.name);
    }
    const userImage =
      sessionStorage.getItem("SMPuserimage") === "" ||
      sessionStorage.getItem("SMPuserimage") === null
        ? localStorage.getItem("SMPuserimage") === "" ||
          localStorage.getItem("SMPuserimage") === null
          ? "/Images/profile.png"
          : localStorage.getItem("SMPuserimage")
        : sessionStorage.getItem("SMPuserimage");
    setUserImage(userImage);
  }, []);

  return (
    <div className="maincontainer">
      <div className={mode ? "row headerBarDark" : "row headerBarLight"}>
        <div
          className="col-2 logo"
          style={{ color: mode ? "cornflowerblue" : "rgb(37, 37, 138)" }}
        >
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
          <Tooltip title={expandMenu ? "Expand Menu" : "Sink menu"}>
            <i
              className="fas fa-bars menuIcon"
              style={{ color: mode ? "cornflowerblue" : "rgb(37, 37, 138)" }}
              onClick={() =>
                expandMenu ? setExpandMenu(false) : setExpandMenu(true)
              }
            />
          </Tooltip>
          <div className={mode ? "searchFieldDark" : "searchFieldLight"}>
            <div>
              <input
                type={"search"}
                className={mode ? "searchInputDark" : "searchInputLight"}
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
              style={{ color: mode ? "cornflowerblue" : "rgb(37, 37, 138)" }}
              onClick={() =>
                user !== "Sign In" && showMenu
                  ? setShowMenu(false)
                  : setShowMenu(true)
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
        {user !== null && (
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
              className={
                mode ? "sideBarContainerDark" : "sideBarContainerLight"
              }
              style={{ width: expandMenu ? "5%" : "15%" }}
            >
              <div
                style={{
                  overflowX: "hidden",
                  overflowY: "auto",
                  height: "85vh",
                }}
              >
                <Link to="/" style={{ textDecoration: "none" }}>
                  <div
                    className={mode ? "sideBar dark" : "sideBar"}
                    data-tip
                    data-for="homeTip"
                    onClick={() => setFocusKey({ key: "home" })}
                    style={{
                      color:
                        (focusKey.key === "home" ||
                          document.documentURI.split("/").pop() === "") &&
                        "blue",
                    }}
                  >
                    {expandMenu && (
                      <ReactTooltip id="homeTip" place="right" effect="solid">
                        Home
                      </ReactTooltip>
                    )}
                    <i
                      style={{
                        fontSize: expandMenu
                          ? "calc(5px + 1.5vw)"
                          : "calc(2.5px + 1.1vw)",
                        display: "inline",
                        padding: expandMenu && "0 5vw 0 0.8vw",
                        transition: "all 0.5s linear",
                      }}
                      className={"fas fa-home sideBarIcons"}
                    ></i>
                    <span
                      className="col-9"
                      style={{
                        fontSize: "calc(2.5px + 1.1vw)",
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
                    className={mode ? "sideBar dark" : "sideBar"}
                    onClick={() => setFocusKey({ key: "todo" })}
                    data-tip
                    data-for="todoListTip"
                    style={{
                      color:
                        (focusKey.key === "todo" ||
                          document.documentURI.split("/").pop() ===
                            "todolist") &&
                        "blue",
                    }}
                  >
                    {expandMenu && (
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
                        fontSize: expandMenu
                          ? "calc(5px + 1.5vw)"
                          : "calc(2.5px + 1.1vw)",
                        display: "inline",
                        padding: expandMenu && "0 5vw 0 0.8vw",
                        transition: "all 0.5s linear",
                      }}
                      className={"fas fa-list-ul sideBarIcons"}
                    ></i>
                    <span
                      className="col-9"
                      style={{
                        fontSize: "calc(2.5px + 1.1vw)",
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
                    className={mode ? "sideBar dark" : "sideBar"}
                    onClick={() => setFocusKey({ key: "cals" })}
                    data-tip
                    data-for="CalculatorTip"
                    style={{
                      color:
                        (focusKey.key === "cals" ||
                          document.documentURI.split("/").pop() ===
                            "calculator") &&
                        "blue",
                    }}
                  >
                    {expandMenu && (
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
                        fontSize: expandMenu
                          ? "calc(5px + 1.5vw)"
                          : "calc(2.5px + 1.1vw)",
                        display: "inline",
                        padding: expandMenu && "0 5vw 0 0.8vw",
                        transition: "all 0.5s linear",
                      }}
                      className={"fas fa-calculator sideBarIcons"}
                    />
                    <span
                      className="col-9"
                      style={{
                        fontSize: "calc(2.5px + 1.1vw)",
                        padding: "0",
                        whiteSpace: "nowrap",
                      }}
                    >
                      Calculator
                    </span>
                  </div>
                </Link>
                <div
                  className={mode ? "sideBar dark" : "sideBar"}
                  data-tip
                  data-for="DetailsTip"
                  style={{
                    color:
                      (focusKey.key === "details" ||
                        document.documentURI.split("/").includes("details")) &&
                      "blue",
                  }}
                  onClick={() => {
                    detailSubMenu
                      ? setDetailSubMenu(false)
                      : setDetailSubMenu(true);
                  }}
                >
                  {expandMenu && (
                    <ReactTooltip id="DetailsTip" place="right" effect="solid">
                      Details
                    </ReactTooltip>
                  )}
                  <i
                    style={{
                      fontSize: expandMenu
                        ? "calc(5px + 1.5vw)"
                        : "calc(2.5px + 1.1vw)",
                      display: "inline",
                      padding: expandMenu ? "0 5vw 0 1.1vw" : "0.3vw",
                      transition: "all 0.5s linear",
                    }}
                    className={"fas fa-info sideBarIcons"}
                  ></i>
                  <span
                    className="col-9"
                    style={{
                      fontSize: "calc(2.5px + 1.1vw)",
                      padding: "0",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Details
                  </span>
                </div>
                {(detailSubMenu ||
                  document.documentURI.split("/").includes("details")) && (
                  <div
                    style={{
                      width: expandMenu ? "4vw" : "15vw",
                      display: expandMenu && "inline-grid",
                      transition: "all 0.5s linear",
                    }}
                  >
                    <Link
                      to="/details/personalrecords"
                      style={{ textDecoration: "none" }}
                    >
                      <div
                        className={mode ? "subMenu dark" : "subMenu"}
                        onClick={() =>
                          setFocusKey({ key: "details", subkey: "personal" })
                        }
                        data-tip
                        data-for="PersonalRecordsTip"
                        style={{
                          width: expandMenu ? "5vw" : "15vw",
                          color:
                            (focusKey.subkey === "personal" ||
                              document.documentURI
                                .split("/")
                                .includes("personalrecords")) &&
                            "blue",
                        }}
                      >
                        {expandMenu && (
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
                            fontSize: "calc(1px + 1vw)",
                            display: "inline",
                            padding: expandMenu && "0 5vw 0 0.8vw",
                            transition: "all 0.5s linear",
                          }}
                          className={"fas fa-user-secret sideBarIcons"}
                        />
                        <span
                          className="col-10"
                          style={{
                            fontSize: "calc(1.5px + 1.1vw)",
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
                        className={mode ? "subMenu dark" : "subMenu"}
                        onClick={() =>
                          setFocusKey({ key: "details", subkey: "official" })
                        }
                        data-tip
                        data-for="OfficialRecordsTip"
                        style={{
                          width: expandMenu ? "5vw" : "15vw",
                          color:
                            (focusKey.subkey === "official" ||
                              document.documentURI
                                .split("/")
                                .includes("officialrecords")) &&
                            "blue",
                        }}
                      >
                        {expandMenu && (
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
                            fontSize: "calc(1px + 1vw)",
                            display: "inline",
                            padding: expandMenu && "0 5vw 0 0.8vw",
                            transition: "all 0.5s linear",
                          }}
                          className={"fas fa-clipboard sideBarIcons"}
                        ></i>
                        <span
                          className="col-10"
                          style={{
                            fontSize: "calc(1.5px + 1.1vw)",
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
                        className={mode ? "subMenu dark" : "subMenu"}
                        data-tip
                        data-for="HealthRecordsTip"
                        onClick={() =>
                          setFocusKey({ key: "details", subkey: "health" })
                        }
                        style={{
                          width: expandMenu ? "5vw" : "15vw",
                          color:
                            (focusKey.subkey === "health" ||
                              document.documentURI
                                .split("/")
                                .includes("healthrecords")) &&
                            "blue",
                        }}
                      >
                        {expandMenu && (
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
                            fontSize: "calc(1px + 1vw)",
                            display: "inline",
                            padding: expandMenu && "0 5vw 0 0.8vw",
                            transition: "all 0.5s linear",
                          }}
                          className={"fas fa-notes-medical sideBarIcons"}
                        ></i>
                        <span
                          // className="col-10"
                          style={{
                            padding: "0",
                            whiteSpace: "nowrap",
                            fontSize: "calc(1.5px + 1.1vw)",
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
                    className={mode ? "sideBar dark" : "sideBar"}
                    data-tip
                    data-for="OtherRecordsTip"
                    onClick={() => setFocusKey({ key: "other" })}
                    style={{
                      color:
                        (focusKey.key === "other" ||
                          document.documentURI
                            .split("/")
                            .includes("otherrecords")) &&
                        "blue",
                    }}
                  >
                    {expandMenu && (
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
                        fontSize: expandMenu
                          ? "calc(5px + 1.5vw)"
                          : "calc(2.5px + 1.1vw)",
                        display: "inline",
                        padding: expandMenu && "0 5vw 0 0.8vw",
                        transition: "all 0.5s linear",
                      }}
                      className={"fas fa-receipt sideBarIcons"}
                    ></i>
                    <span
                      style={{
                        fontSize: "calc(2.5px + 1.1vw)",
                        overflow: "hidden",
                        padding: "0",
                        whiteSpace: "nowrap",
                      }}
                    >
                      Other Records
                    </span>
                  </div>
                </Link>
              </div>
              <Link to="/settings" style={{ textDecoration: "none" }}>
                <div
                  className={mode ? "sideBar dark" : "sideBar"}
                  data-tip
                  data-for="Settings"
                  onClick={() => setFocusKey({ key: "settings" })}
                  style={{
                    overflow: "hidden",
                    position: "fixed",
                    bottom: "0",
                    width: expandMenu ? "5%" : "15%",
                    whiteSpace: "nowrap",
                    transition: "all 0.5s linear",
                    color:
                      (focusKey.key === "settings" ||
                        document.documentURI.split("/").includes("settings")) &&
                      "blue",
                  }}
                >
                  {expandMenu && (
                    <ReactTooltip id="Settings" place="right" effect="solid">
                      Settings
                    </ReactTooltip>
                  )}
                  <i
                    style={{
                      fontSize: expandMenu
                        ? "calc(5px + 1.5vw)"
                        : "calc(2.5px + 1.1vw)",
                      display: "inline",
                      padding: expandMenu && "0 5vw 0 0.8vw",
                      transition: "all 0.5s linear",
                    }}
                    className={"fas fa-cog sideBarIcons"}
                  ></i>
                  <span
                    style={{
                      fontSize: "calc(2.5px + 1.1vw)",
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
            <div
              className={mode ? "outletDark" : "outletLight"}
              style={{ width: expandMenu ? "95%" : "85%" }}
            >
              <div
                style={{
                  height: "85%",
                  overflowY: "auto",
                  overflowX: "hidden",
                }}
              >
                {showMenu && (
                  <div className="profileMenu">
                    {/* <div className="profileMenuItems">
                      Profile
                      <i className="far fa-id-card profileMenuIcon" />
                    </div> */}
                    <div
                      className="profileMenuItems"
                      onClick={() => {
                        setShowMenu(false);
                        localStorage.removeItem("SMPuser");
                        localStorage.removeItem("SMPuserimage");
                        sessionStorage.removeItem("SMPuser");
                        sessionStorage.removeItem("SMPuserimage");
                        setUser("Sign In");
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
      {user === "Sign In" && <LoginPage prop={{ setUser, setUserImage }} />}
    </div>
  );
}
