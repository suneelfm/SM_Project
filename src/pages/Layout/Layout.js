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
              style={
                expandmenu
                  ? { width: "4%" }
                  : { width: "15%", overflow: "hidden" }
              }
            >
              <div className="container">
                <Link to="/" style={{ textDecoration: "none" }}>
                  <div
                    className="row sideBar"
                    data-tip
                    data-for="homeTip"
                    style={
                      expandmenu
                        ? { fontSize: "1.5vw", justifyContent: "center" }
                        : { fontSize: "1.1vw" }
                    }
                  >
                    {expandmenu && (
                      <ReactTooltip id="homeTip" place="top" effect="solid">
                        Home
                      </ReactTooltip>
                    )}
                    <i
                      className={
                        !expandmenu
                          ? "fas fa-home sideBarIcons col-1"
                          : "fas fa-home sideBarIcons"
                      }
                    ></i>
                    {!expandmenu && (
                      <span
                        className="col-9"
                        style={{ padding: "0", whiteSpace: "nowrap" }}
                      >
                        Home
                      </span>
                    )}
                  </div>
                </Link>
                <Link to="/todolist" style={{ textDecoration: "none" }}>
                  <div
                    className="row sideBar"
                    data-tip
                    data-for="todoListTip"
                    style={
                      expandmenu
                        ? { fontSize: "1.5vw", justifyContent: "center" }
                        : { fontSize: "1.1vw" }
                    }
                  >
                    {expandmenu && (
                      <ReactTooltip id="todoListTip" place="top" effect="solid">
                        ToDo List
                      </ReactTooltip>
                    )}
                    <i
                      className={
                        !expandmenu
                          ? "fas fa-list-ul sideBarIcons col-1"
                          : "fas fa-list-ul sideBarIcons"
                      }
                    ></i>
                    {!expandmenu && (
                      <span
                        className="col-9"
                        style={{ padding: "0", whiteSpace: "nowrap" }}
                      >
                        ToDo List
                      </span>
                    )}
                  </div>
                </Link>
                <Link to="/calculator" style={{ textDecoration: "none" }}>
                  <div
                    className="row sideBar"
                    data-tip
                    data-for="CalculatorTip"
                    style={
                      expandmenu
                        ? { fontSize: "1.5vw", justifyContent: "center" }
                        : { fontSize: "1.1vw" }
                    }
                  >
                    {expandmenu && (
                      <ReactTooltip
                        id="CalculatorTip"
                        place="top"
                        effect="solid"
                      >
                        Calculator
                      </ReactTooltip>
                    )}
                    <i
                      className={
                        !expandmenu
                          ? "fas fa-calculator sideBarIcons col-1"
                          : "fas fa-calculator sideBarIcons"
                      }
                    ></i>
                    {!expandmenu && (
                      <span
                        className="col-9"
                        style={{ padding: "0", whiteSpace: "nowrap" }}
                      >
                        Calculator
                      </span>
                    )}
                  </div>
                </Link>
                <div
                  className="row sideBar"
                  data-tip
                  data-for="DetailsTip"
                  style={
                    expandmenu
                      ? { fontSize: "1.5vw", justifyContent: "center" }
                      : { fontSize: "1.1vw" }
                  }
                  onClick={() => {
                    detailsubmenu
                      ? setdetailsubmenu(false)
                      : setdetailsubmenu(true);
                  }}
                  // onBlur={setdetailsubmenu(false)}
                >
                  {expandmenu && (
                    <ReactTooltip id="DetailsTip" place="top" effect="solid">
                      Details
                    </ReactTooltip>
                  )}
                  <i
                    className={
                      !expandmenu
                        ? "fas fa-info sideBarIcons col-1"
                        : "fas fa-info sideBarIcons"
                    }
                  ></i>
                  {!expandmenu && (
                    <span
                      className="col-9"
                      style={{ padding: "0", whiteSpace: "nowrap" }}
                    >
                      Details
                    </span>
                  )}
                </div>
                {detailsubmenu && (
                  <div
                    className="container"
                    style={
                      expandmenu
                        ? {
                            padding: "0 0.5vw",
                            display: "inline-grid",
                            justifyContent: "center",
                          }
                        : { padding: "0 0.5vw" }
                    }
                  >
                    <Link
                      to="/details/personalrecords"
                      style={{ textDecoration: "none" }}
                    >
                      <div
                        className="row subMenu"
                        data-tip
                        data-for="PersonalRecordsTip"
                      >
                        {expandmenu && (
                          <ReactTooltip
                            id="PersonalRecordsTip"
                            place="top"
                            effect="solid"
                          >
                            Personal Records
                          </ReactTooltip>
                        )}
                        <i
                          className={
                            !expandmenu
                              ? "fas fa-user-secret sideBarIcons col-1"
                              : "fas fa-user-secret sideBarIcons"
                          }
                        ></i>
                        {!expandmenu && (
                          <span
                            className="col-10"
                            style={{ padding: "0", whiteSpace: "nowrap" }}
                          >
                            Personal Records
                          </span>
                        )}
                      </div>
                    </Link>
                    <Link
                      to="/details/officialrecords"
                      style={{ textDecoration: "none" }}
                    >
                      <div
                        className="row subMenu"
                        data-tip
                        data-for="OfficialRecordsTip"
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
                          className={
                            !expandmenu
                              ? "fas fa-clipboard sideBarIcons col-1"
                              : "fas fa-clipboard sideBarIcons"
                          }
                        ></i>
                        {!expandmenu && (
                          <span
                            className="col-10"
                            style={{ padding: "0", whiteSpace: "nowrap" }}
                          >
                            Official Records
                          </span>
                        )}
                      </div>
                    </Link>
                    <Link
                      to="/details/healthrecords"
                      style={{ textDecoration: "none" }}
                    >
                      <div
                        className="row subMenu"
                        data-tip
                        data-for="HealthRecordsTip"
                      >
                        {expandmenu && (
                          <ReactTooltip
                            id="HealthRecordsTip"
                            place="top"
                            effect="solid"
                          >
                            Health Records
                          </ReactTooltip>
                        )}
                        <i
                          className={
                            !expandmenu
                              ? "fas fa-notes-medical sideBarIcons col-1"
                              : "fas fa-notes-medical sideBarIcons"
                          }
                        ></i>
                        {!expandmenu && (
                          <span
                            className="col-10"
                            style={{ padding: "0", whiteSpace: "nowrap" }}
                          >
                            Health Records
                          </span>
                        )}
                      </div>
                    </Link>
                  </div>
                )}
                <Link to="/otherrecords" style={{ textDecoration: "none" }}>
                  <div
                    className="row sideBar"
                    data-tip
                    data-for="OtherRecordsTip"
                    style={
                      expandmenu
                        ? { fontSize: "1.5vw", justifyContent: "center" }
                        : { fontSize: "1.1vw" }
                    }
                  >
                    {expandmenu && (
                      <ReactTooltip
                        id="OtherRecordsTip"
                        place="top"
                        effect="solid"
                      >
                        Other Records
                      </ReactTooltip>
                    )}
                    <i
                      className={
                        !expandmenu
                          ? "fas fa-receipt sideBarIcons col-1"
                          : "fas fa-receipt sideBarIcons"
                      }
                    ></i>
                    {!expandmenu && (
                      <span
                        className="col-9"
                        style={{ padding: "0", whiteSpace: "nowrap" }}
                      >
                        Other Records
                      </span>
                    )}
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
