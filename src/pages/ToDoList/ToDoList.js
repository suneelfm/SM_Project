import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Tooltip } from "@mui/material";
import InputComponent from "../../Components/InputComponent";

export default function ToDoList() {
  const [todolist, settodolist] = useState({ data: [] });
  const [input, setinput] = useState("");
  const [message, setmessage] = useState("");
  const [message2, setmessage2] = useState("");
  const [showModifyPopup, setshowModifyPopup] = useState(false);
  const [modifytodo, setmodifytodo] = useState("");
  const [modificationid, setmodificationid] = useState(null);

  useEffect(() => {
    getToDoList();
  }, []);

  const getToDoList = async () => {
    await axios
      .get("https://asmita-mern.herokuapp.com/todo/get")
      .then((response) => {
        settodolist(response);
      })
      .catch((err) =>
        toast.error(`Error: ${err}`, {
          position: toast.POSITION.BOTTOM_CENTER,
          autoClose: 5000,
          className: "Toastify__toast-body",
        })
      );
  };

  const buttonClick = async () => {
    if (input.trim() !== "") {
      if (/^([a-zA-Z ]){1,250}$/.test(input)) {
        if (
          !todolist.data.some(
            (value) =>
              value.name !== undefined &&
              value.name.toUpperCase() === input.trim().toUpperCase()
          )
        ) {
          setmessage("");
          // setname([input.trim(), ...name]);
          let post = { name: input.trim() };
          await axios
            .post("https://asmita-mern.herokuapp.com/todo/post", post)
            .then((response) => {
              toast.success("Record has been saved succefully", {
                position: toast.POSITION.BOTTOM_CENTER,
                autoClose: 5000,
                className: "Toastify__toast-body",
              });
              setinput("");
              getToDoList();
            })
            .catch((err) =>
              toast.error(`Error: ${err}`, {
                position: toast.POSITION.BOTTOM_CENTER,
                autoClose: 5000,
                className: "Toastify__toast-body",
              })
            );
        } else {
          setmessage("This ToDo is already exist.");
        }
      } else {
        setmessage("Please enter only alphabets with max. length 250.");
      }
    } else {
      setmessage("Please enter your ToDo.");
    }
  };
  const deleteName = async (index) => {
    toast.dismiss();
    await axios
      .post("https://asmita-mern.herokuapp.com/todo/delete", { id: index })
      .then(() => {
        toast.success("Record has been deleted succefully", {
          position: toast.POSITION.BOTTOM_CENTER,
          autoClose: 5000,
          className: "Toastify__toast-body",
        });
        getToDoList();
      })
      .catch((err) =>
        toast.error(`Error: ${err}`, {
          position: toast.POSITION.BOTTOM_CENTER,
          autoClose: 5000,
          className: "Toastify__toast-body",
        })
      );
  };

  const openModifyPopup = (index, todo) => {
    setshowModifyPopup(true);
    setmodifytodo(todo);
    setmodificationid(index);
  };
  const closePopup = () => {
    setshowModifyPopup(false);
    setmessage2("");
  };

  const modifyToDo = async () => {
    if (modifytodo.trim() !== "") {
      if (/^([a-zA-Z ]){1,250}$/.test(modifytodo)) {
        let count = null;
        todolist.data.forEach((value, index) => {
          if (value.name !== undefined) {
            if (value.name.toUpperCase() === modifytodo.trim().toUpperCase()) {
              count = value._id;
            }
          }
        });
        if (count === null || count === modificationid) {
          await axios
            .post("https://asmita-mern.herokuapp.com/todo/byid", {
              _id: modificationid,
              name: modifytodo,
            })
            .then(() => {
              setmessage2("");
              setshowModifyPopup(false);
              toast.success("Record has been updated succefully", {
                position: toast.POSITION.BOTTOM_CENTER,
                autoClose: 5000,
                className: "Toastify__toast-body",
              });
              getToDoList();
            })
            .catch((err) => {
              toast.error(`Error: ${err}`, {
                position: toast.POSITION.BOTTOM_CENTER,
                autoClose: 5000,
                className: "Toastify__toast-body",
              });
            });
        } else {
          setmessage2("This ToDo is already exist.");
        }
      } else {
        setmessage2("Please enter only alphabets with max. length 250.");
      }
    } else {
      setmessage2("Please enter your ToDo.");
    }
  };

  const handleFrom = (event) => {
    event.preventDefault();
  };

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
            ToDo List
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
            / ToDo List
          </div>
        </div>
      </div>
      <div className="row" style={{ overflow: "auto" }}>
        <form className="formcontainer" onSubmit={handleFrom}>
          <div className="row">
            <div className="col-6">
              <InputComponent
                State={input}
                setState={setinput}
                placeHolder={"Enter Your ToDo"}
              />
              <div className="errorDiv">{message}</div>
            </div>
            <div className="col-6" style={{textAlign: 'center'}}>
              <button
                type="submit"
                name=""
                id=""
                btn-lg="btn-block"
                onClick={buttonClick}
                className="buttonProp"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
      <div className="row">
        {todolist.data.length > 0 && (
          <form className="formcontainer">
            <span className="listHead">Your ToDo List</span>
            <ul className="listArea">
              {todolist.data.map((val, index) => (
                <div className="row">
                  <li className="col-6">
                    <pre className="list">{val.name}</pre>
                  </li>
                  <div className="col-3">
                    <Tooltip title="Modify ToDo">
                      <i
                        className="fas fa-pen iconProp"
                        onClick={() => openModifyPopup(val._id, val.name)}
                      />
                    </Tooltip>
                    <Tooltip title="Delete ToDo">
                      <i
                        className="fas fa-trash iconProp"
                        onClick={() => deleteName(val._id)}
                      />
                    </Tooltip>
                  </div>
                </div>
              ))}
            </ul>
          </form>
        )}
      </div>
      {showModifyPopup && (
        <div className=" popupBack">
          <form className="popup" onSubmit={handleFrom}>
            <i className="fas fa-times closeIcon" onClick={closePopup}></i>
            <h5 className="listHead">Modify Your ToDo</h5>
            <input
              type="text"
              placeholder="Enter Your ToDo"
              onChange={(event) => setmodifytodo(event.target.value)}
              value={modifytodo}
              className="updateTextFieldProp"
            />
            <button type="submit" className="buttonProp" onClick={modifyToDo}>
              Update
            </button>
            <div className="errorDiv">{message2}</div>
          </form>
        </div>
      )}
    </>
  );
}
