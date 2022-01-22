import React from "react";

export default function Home() {
  return (
    <>
      <div
        style={{
          width: "100%",
          paddingRight: "10px",
          backgroundColor: "rgb(211, 224, 224)",
          height: "100%",
          overflow: "auto",
        }}
      >
        <div className="row" style={{ padding: "0 2.5vw", marginTop: "1vw" }}>
          <div className="col-12" style={{ padding: "0px 1vw" }}>
            <div
              style={{
                color: "rgb(37, 37, 138)",
                marginBottom: "0px",
                fontSize: "1.6vw",
              }}
            >
              Home
            </div>
          </div>
        </div>
        <div className="row" style={{ height: "100%" }}>
          <div className="col-8">
            <div className="row rowProp">
              <div className="card col-lg-5 cardProp">
                <div>
                  <div style={{ paddingBottom: "0.3vw" }}>
                    <h5
                      className="card-title"
                      style={{
                        fontSize: "1.5vw",
                        margin: "0",
                        color: "rgb(37, 37, 138)",
                      }}
                    >
                      Releases{" "}
                      <small style={{ color: "rgb(152, 152, 202)" }}>
                        | Today
                      </small>
                      <span className="dotMenuIcon">...</span>
                    </h5>
                  </div>
                  <div style={{ marginTop: "0.5vw" }}>
                    <div className="row">
                      <div className="col-3" style={{ padding: "0" }}>
                        <div
                          className="cardiconProp"
                          style={{
                            backgroundColor: "rgb(231, 231, 250)",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <i
                            className="fas fa-truck"
                            style={{ fontSize: "2vw", color: "rgb(37, 37, 138)" }}
                          />
                        </div>
                      </div>
                      <div className="col-8">
                        <div>
                          <h4
                            style={{
                              color: "rgb(37, 37, 138)",
                              fontSize: "1.4vw",
                            }}
                          >
                            214
                          </h4>
                        </div>
                        <div>
                          <span
                            style={{
                              fontSize: "1.1vw",
                              color: "rgb(26, 150, 43)",
                              fontWeight: "600",
                            }}
                          >
                            12%
                          </span>
                          <span
                            style={{
                              fontSize: "1.1vw",
                              color: "rgb(152, 152, 202)",
                            }}
                          >
                            increase
                          </span>
                        </div>
                        <span style={{ fontSize: "1.1vw" }}>
                          (it should be dynamic)
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card col-lg-5 cardProp">
                <div>
                  <div style={{ paddingBottom: "0.3vw" }}>
                    <h5
                      className="card-title"
                      style={{
                        fontSize: "1.5vw",
                        color: "rgb(37, 37, 138)",
                        margin: "0",
                      }}
                    >
                      Revenue{" "}
                      <small style={{ color: "rgb(152, 152, 202)" }}>
                        | This Month
                      </small>
                      <span className="dotMenuIcon">
                        <i className="fas fa-ellipsis-h"></i>
                      </span>
                    </h5>
                  </div>
                  <div style={{ marginTop: "0.5vw" }}>
                    <div className="row">
                      <div className="col-3" style={{ padding: "0" }}>
                        <div
                          className="cardiconProp"
                          style={{
                            backgroundColor: "rgb(192, 241, 195)",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <img
                            src="../Images/us-dollar-icon-712064.png"
                            alt=""
                            style={{ height: "2vw", width: "2vw" }}
                          />
                        </div>
                      </div>

                      <div className="col-8">
                        <div>
                          <h4
                            style={{
                              color: "rgb(37, 37, 138)",
                              fontSize: "1.4vw",
                            }}
                          >
                            $3,214
                          </h4>
                        </div>
                        <div>
                          <span
                            style={{
                              fontSize: "1.1vw",
                              color: "rgb(26, 150, 43)",
                              fontWeight: "600",
                            }}
                          >
                            12%
                          </span>
                          <span
                            style={{
                              fontSize: "1.1vw",
                              color: "rgb(152, 152, 202)",
                            }}
                          >
                            increase
                          </span>
                        </div>
                        <span style={{ fontSize: "1.1vw" }}>
                          (it should be dynamic)
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row rowProp">
              <div className="card col-11 cardProp">
                <div>
                  <div style={{ paddingBottom: "0.3vw" }}>
                    <h5
                      className="card-title"
                      style={{
                        fontSize: "1.5vw",
                        color: "rgb(37, 37, 138)",
                        margin: "0",
                      }}
                    >
                      Customers{" "}
                      <small style={{ color: "rgb(152, 152, 202)" }}>
                        | This Year
                      </small>
                      <span className="dotMenuIcon">...</span>
                    </h5>
                  </div>
                  <div style={{ marginTop: "0.5vw" }}>
                    <div className="row">
                      <div className="col-2">
                        <div
                          className="cardiconProp"
                          style={{
                            backgroundColor: "rgb(241, 226, 192)",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <i
                            className="fas fa-user-friends"
                            style={{ fontSize: "2vw", color: "orange" }}
                          ></i>
                        </div>
                      </div>
                      <div className="col-10">
                        <div>
                          <h4
                            style={{
                              color: "rgb(37, 37, 138)",
                              fontSize: "1.4vw",
                            }}
                          >
                            1234
                          </h4>
                        </div>
                        <div>
                          <span
                            style={{
                              fontSize: "1.1vw",
                              color: "rgb(252, 0, 0)",
                              fontWeight: "600",
                            }}
                          >
                            12%
                          </span>
                          <span
                            style={{
                              fontSize: "1.1vw",
                              color: "rgb(152, 152, 202)",
                            }}
                          >
                            decrease
                          </span>
                        </div>
                        <span style={{ fontSize: "1.1vw" }}>
                          (it should be dynamic)
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row rowProp">
              <div
                className="card col-11 cardProp"
                style={{ height: "50vw !important" }}
              >
                <div>
                  <div style={{ paddingBottom: "0.3vw" }}>
                    <h5
                      className="card-title"
                      style={{
                        fontSize: "1.5vw",
                        color: "rgb(37, 37, 138)",
                        margin: "0",
                      }}
                    >
                      Reports{" "}
                      <small style={{ color: "rgb(152, 152, 202)" }}>
                        | Today
                      </small>
                      <span className="dotMenuIcon">...</span>
                    </h5>
                    <span style={{ fontSize: "1.1vw" }}>
                      (it should be dynamic)
                    </span>
                  </div>
                  <div
                    className=""
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      marginTop: "0.5vw",
                    }}
                  >
                    <img
                      src="../Images/graph.png"
                      alt=""
                      style={{
                        margin: "auto",
                        display: "flex",
                        height: "25vw",
                        width: "45vw",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-4">
            <div className="row rowProp">
              <div
                className="card col-12"
                style={{
                  height: "auto",
                  display: "flex",
                  padding: "2vw",
                }}
              >
                <div>
                  <div style={{ paddingBottom: "0.3vw" }}>
                    <h5
                      className="card-title"
                      style={{
                        fontSize: "1.5vw",
                        color: "rgb(37, 37, 138)",
                        margin: "0",
                      }}
                    >
                      Recent Activity{" "}
                      <small style={{ color: "rgb(152, 152, 202)" }}>
                        | Today
                      </small>
                      <span className="dotMenuIcon">...</span>
                    </h5>
                    <span style={{ fontSize: "1.1vw" }}>
                      (it should be dynamic)
                    </span>
                  </div>
                  <div
                    style={{
                      marginTop: "0.2vw",
                      height: "25vw",
                      paddingTop: "0.3vw",
                      overflowX: "hidden",
                      overflowY: "auto",
                    }}
                  >
                    <div className="row">
                      <div className="col-sm-2 textProp">20 min</div>
                      <div className=" col-sm-1 ">
                        <div
                          className="dot "
                          style={{ backgroundColor: "black" }}
                        ></div>
                        <div
                          style={{
                            borderLeft: "0.15vw solid gray",
                            height: "4vw",
                            marginLeft: "0.25vw",
                          }}
                        ></div>
                      </div>
                      <div className="col-sm-9 textProp">
                        dqpgfgf hjgki ukiohyu <b>gkiukioh </b>ioyuo ylhyfghgf
                        jgf jfjfjfgj
                      </div>
                    </div>

                    <div className="row ">
                      <div className="col-sm-2 textProp">20 min</div>
                      <div className="col-sm-1 ">
                        <div
                          className="dot "
                          style={{ backgroundColor: "green" }}
                        ></div>
                        <div
                          style={{
                            borderLeft: "0.15vw solid gray",
                            height: "4vw",
                            marginLeft: "0.25vw",
                          }}
                        ></div>
                      </div>
                      <div className="col-sm-9 textProp">
                        dgfgf hj <b>gkiukioh </b>yuioyuoyl
                      </div>
                    </div>

                    <div className="row ">
                      <div className="col-sm-2 textProp">20 min</div>
                      <div className="col-sm-1 ">
                        <div
                          className="dot "
                          style={{ backgroundColor: "red" }}
                        ></div>
                        <div
                          style={{
                            borderLeft: "0.15vw solid gray",
                            height: "4vw",
                            marginLeft: "0.25vw",
                          }}
                        ></div>
                      </div>
                      <div className="col-sm-9 textProp">
                        dg fgfhjgki <b>gkiu kioh </b>ukiohyu ioyuoyl
                      </div>
                    </div>

                    <div className="row ">
                      <div className="col-sm-2 textProp">20 min</div>
                      <div className="col-sm-1 ">
                        <div
                          className="dot "
                          style={{ backgroundColor: "blue" }}
                        ></div>
                        <div
                          style={{
                            borderLeft: "0.15vw solid gray",
                            height: "4vw",
                            marginLeft: "0.25vw",
                          }}
                        ></div>
                      </div>
                      <div className="col-sm-9 textProp">
                        dgfgf hjgki <b>gkiu kioh </b>ukiohyui oyuoyl
                      </div>
                    </div>

                    <div className="row ">
                      <div className="col-sm-2 textProp">20 min</div>
                      <div className="col-sm-1 ">
                        <div
                          className="dot "
                          style={{ backgroundColor: "gray" }}
                        ></div>
                        <div
                          style={{
                            borderLeft: "0.15vw solid gray",
                            height: "4vw",
                            marginLeft: "0.25vw",
                          }}
                        ></div>
                      </div>
                      <div className="col-sm-9 textProp">
                        dgfgf hj <b>gkiukioh </b>gkiukioh yuioyuoyl
                      </div>
                    </div>

                    <div className="row ">
                      <div className="col-sm-2 textProp">20 min</div>
                      <div className="col-sm-1 ">
                        <div
                          className="dot "
                          style={{ backgroundColor: "yellow" }}
                        ></div>
                        <div
                          style={{
                            borderLeft: "0.15vw solid gray",
                            height: "4vw",
                            marginLeft: "0.25vw",
                          }}
                        ></div>
                      </div>
                      <div className="col-sm-9 textProp">
                        dgfg fhjgki <b>gkiukioh </b>ukiohy uioyuoyl
                      </div>
                    </div>

                    <div className="row ">
                      <div className="col-sm-2 textProp">20 min</div>
                      <div className="col-sm-1 ">
                        <div
                          className="dot "
                          style={{ backgroundColor: "yellow" }}
                        ></div>
                        <div
                          style={{
                            borderLeft: "0.15vw solid gray",
                            height: "4vw",
                            marginLeft: "0.25vw",
                          }}
                        ></div>
                      </div>
                      <div className="col-sm-9 textProp">
                        dgfg fhjgki <b>gkiukioh </b>ukiohy uioyuoyl
                      </div>
                    </div>

                    <div className="row ">
                      <div className="col-sm-2 textProp">20 min</div>
                      <div className="col-sm-1 ">
                        <div
                          className="dot "
                          style={{ backgroundColor: "rgb(0, 174, 255)" }}
                        ></div>
                        <div
                          style={{
                            borderLeft: "0.15vw solid gray",
                            height: "4vw",
                            marginLeft: "0.25vw",
                          }}
                        ></div>
                      </div>
                      <div className="col-sm-9 textProp">
                        dgfg fhjgki <b>gkiukioh </b>ukiohy uioyuoyl
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row rowProp ">
              <div
                className="card col-12 "
                style={{
                  height: "auto",
                  display: "flex",
                  padding: "2vw",
                }}
              >
                <div>
                  <div style={{ paddingBottom: "0.3vw" }}>
                    <h5
                      className="card-title "
                      style={{
                        fontSize: "1.5vw",
                        color: "rgb(37, 37, 138)",
                        display: "inline",
                        margin: "0",
                      }}
                    >
                      Budget Report{" "}
                      <small style={{ color: "rgb(152, 152, 202)" }}>
                        | This Month
                      </small>
                      <span className="dotMenuIcon">...</span>
                    </h5>
                  </div>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <span style={{ fontWeight: "600" }}>
                      <label
                        style={{
                          backgroundColor: "rgb(104, 104, 247)",
                          height: "1vw",
                          width: "2vw",
                          borderRadius: "0.3vw",
                          marginBottom: "-0.2vw",
                        }}
                        for="Allocate Budget"
                      ></label>
                      <span style={{ fontSize: "1vw", color: "grey" }}>
                        {" "}
                        Allocated Budget
                      </span>
                    </span>
                    <span style={{ marginLeft: "1vw", fontWeight: "600" }}>
                      <label
                        style={{
                          backgroundColor: "rgb(153, 212, 158)",
                          height: "1vw",
                          width: "2vw",
                          borderRadius: "0.3vw",
                          marginBottom: "-0.2vw",
                        }}
                        for="Allocate Budget"
                      ></label>
                      <span style={{ fontSize: "1vw", color: "grey" }}>
                        {" "}
                        Actual Spending
                      </span>
                    </span>
                  </div>
                  <div
                    className=""
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      marginTop: "0.5vw",
                    }}
                  >
                    <img
                      src="../Images/budget graph.png"
                      alt=""
                      style={{ margin: "auto", height: "25vw", width: "40vw" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
