import { Link } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import DropDownComponent from "../../Components/DropDownComponent";
import TableCompontent from "../../Components/TableCompontent";
import axios from "axios";
import ViewModel from "./ViewModel";
import { toastMessage } from "../../Components/toastMessage";
import { basicURL } from "../../basicURL/basicURL";

export default function OfficialRecords() {
  const [employeeName, setemployeeName] = useState({
    value: "employeeSelect",
    id: "",
  });
  const [dateofJoin, setdateofJoin] = useState(null);
  const [department, setdepartment] = useState("Department*");
  const [dateofLeaving, setdateofLeaving] = useState(null);
  const [nameerror, setnameerror] = useState(null);
  const [joindateerror, setjoindateerror] = useState(null);
  const [depterror, setdepterror] = useState(null);
  const [dob, setdob] = useState(null);
  const [tabledata, settabledata] = useState([]);
  const [officeRecords, setofficeRecords] = useState({ data: [] });
  const [showModifyData, setShowModifyData] = useState(false);
  const [modificationid, setmodificationid] = useState(null);
  const [showViewPopup, setshowViewPopup] = useState(false);
  const [Viewimage, setViewimage] = useState(null);
  const [viewEmpname, setviewEmpname] = useState(null);
  const [viewdoj, setviewdoj] = useState(null);
  const [viewdol, setviewdol] = useState(null);
  const [viewdpt, setviewdpt] = useState(null);
  const [image, setimage] = useState(null);
  const details = useSelector(
    (state) => state.signInReducer.personalDetails.details.data
  );
  const mode = useSelector((state) => state.signInReducer.isDarkMode);

  const DipartmentList = ["Account", "HR", "Curriculum", "Sports"];

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const handleFrom = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    getDetails();
  }, []);

  const getDetails = async () => {
    await axios
      .get(`${basicURL}/official/get`)
      .then((response) => {
        setofficeRecords(response);
        console.log(response);
      })
      .catch((err) => {
        toastMessage({ appearance: "error", message: `Error: ${err}` });
      });
  };

  const clearDetails = async () => {
    setemployeeName({
      value: "employeeSelect",
      id: "",
    });
    setdateofJoin(null);
    setdateofLeaving(null);
    setdepartment(null);
    setjoindateerror(null);
    setnameerror(null);
    setdepterror(null);
    setimage(null);
    setShowModifyData(false);
  };

  const openModifyPopup = (detail) => {
    setShowModifyData(true);
    const machedname = details.filter(
      (item) => item.firstName === detail.empName.split(" ").shift()
    );
    getimage(machedname[0]._id);
    debugger;
    console.log(
      details.filter(
        (item) => item.firstName === detail.empName.split(" ").shift()
      )
    );
    setemployeeName({
      value: detail.empName !== undefined ? detail.empName : "",
      id: machedname[0]._id,
    });

    let jdt = [];
    if (detail.doj !== undefined) {
      jdt = detail.doj.split("-");
    }
    let jmonth = months[parseInt(jdt[1]) - 1];
    setdateofJoin(
      detail.doj !== undefined
        ? new Date(jmonth + " " + jdt[0] + ", " + jdt[2])
        : null
    );
    let ldt = [];
    if (detail.dol !== undefined) {
      ldt = detail.dol.split("-");
    }
    let lmonth = months[parseInt(ldt[1]) - 1];
    setdateofLeaving(
      detail.dol !== undefined
        ? new Date(lmonth + " " + ldt[0] + ", " + ldt[2])
        : null
    );
    setmodificationid(officeRecords.data[detail._id - 1]._id);
    setdepartment(detail.department);
  };

  const convertDate = (item) => {
    let date = item;
    if (date !== null) {
      let dt = date.split("-");
      let cdate = parseInt(dt[2]) + 1 + "-" + dt[1] + "-" + dt[0];
      return cdate;
    }
    // const dd = String(item.getDate()).padStart(2, "0");
    // const mm = String(item.getMonth() + 1).padStart(2, "0"); //January is 0!
    // const yyyy = item.getFullYear();
    // return dd + "-" + mm + "-" + yyyy;
  };

  const onSave = async () => {
    const dtl = {
      empName: null,
      doj: null,
      dol: null,
      department: null,
      empId: employeeName.id,
    };
    if (employeeName.value === "employeeSelect") {
      setnameerror("Please select employee name.");
    } else {
      setnameerror("");
    }
    if (dateofJoin === null) {
      setjoindateerror("Please select date of join.");
    } else {
      setjoindateerror(null);
    }
    if (department === "Department*") {
      setdepterror("Please select department.");
    } else {
      setdepterror(null);
    }
    if (showModifyData) {
      if (
        employeeName.value !== "employeeSelect" &&
        dateofJoin !== "" &&
        dateofLeaving !== "" &&
        department !== "Department*"
      ) {
        dtl.empName = employeeName.value;
        dtl.doj = dateofJoin;
        dtl.dol = dateofLeaving;
        dtl.department = department;
        const mdtl = { ...dtl, _id: modificationid };
        await axios
          .post(`${basicURL}/official/update`, mdtl)
          .then(() => {
            getDetails();
            setemployeeName({
              value: "employeeSelect",
              id: "",
            });
            setimage(null);
            setdepartment("Department*");
            setdateofJoin(null);
            setdateofLeaving(null);
            setShowModifyData(false);
            toastMessage({
              appearance: "success",
              message: "Record updated succefully.",
            });
          })
          .catch((err) => {
            toastMessage({
              appearance: "error",
              message: "Error: " + err.message,
            });
          });
      }
    } else {
      if (
        employeeName.value !== "employeeSelect" &&
        dateofJoin !== "" &&
        // dateofLeaving !== "" &&
        department !== "Department*"
      ) {
        const exist = officeRecords.data.filter(
          (item) => employeeName.value === item.empName
        );
        if (exist.length > 0) {
          toastMessage({
            appearance: "error",
            message: "Official record is already exist for this employee.",
          });
        } else {
          dtl.empName = employeeName.value;
          dtl.doj = dateofJoin;
          dtl.dol = dateofLeaving;
          dtl.department = department;
          await axios
            .post(`${basicURL}/official/save`, dtl)
            .then(() => {
              getDetails();
              setemployeeName({
                value: "employeeSelect",
                id: "",
              });
              setdepartment("Department*");
              setdateofJoin(null);
              setdateofLeaving(null);
              setimage(null);
              toastMessage({
                appearance: "success",
                message: "Record saved succefully.",
              });
            })
            .catch((err) => {
              toastMessage({ appearance: "error", message: "Error" + { err } });
            });
        }
      }
    }
  };

  const deleteName = async (index) => {
    await axios
      .post(`${basicURL}/official/delete`, {
        id: officeRecords.data[index - 1]._id,
      })
      .then(() => {
        getDetails();
        toastMessage({
          appearance: "success",
          message: "Record deleted succefully.",
        });
        setemployeeName({
          value: "employeeSelect",
          id: "",
        });
        setdepartment("Department*");
        setdateofJoin(null);
        setdateofLeaving(null);
        setimage(null);
        setShowModifyData(false);
      })
      .catch((err) => {
        toastMessage({ appearance: "error", message: `Error: ${err.message}` });
      });
  };

  const viewOfficialDeatils = (detail) => {
    setshowViewPopup(true);
    const machedname =
      details !== undefined &&
      details.filter(
        (item) => item.firstName === detail.empName.split(" ").shift()
      );
    getimage(machedname !== null && machedname[0]._id, true);
    setviewEmpname(detail.empName);
    setviewdoj(detail.doj);
    setviewdol(detail.dol);
    setviewdpt(detail.department);
  };

  const handleNameField = async (event) => {
    const d_id = event.target[event.target.selectedIndex].id;
    setemployeeName({
      value: event.target.value,
      id: d_id,
    });
    const matcheddetail = details.filter((item) => d_id === item._id);
    getimage(d_id);
    let dt = [];
    if (matcheddetail[0].dob !== undefined) {
      let date = matcheddetail[0].dob;
      dt = date.split("-");
    }
    let month = months[parseInt(dt[1]) - 1];
    setdob(new Date(month + " " + (parseInt(dt[2]) + 1) + ", " + dt[0]));
  };

  const getimage = async (d_id, isview) => {
    isview ? setViewimage(null) : setimage(null);
    await axios
      .get(`${basicURL}/personal/imageget/${d_id}`)
      .then((resp) => {
        isview
          ? setViewimage(resp.data.convertedImg.image)
          : setimage(resp.data.convertedImg.image);
      })
      .catch((err) => {
        toastMessage({
          appearance: "info",
          message: `Profile phote is not available.`,
        });
      });
  };

  const headers = [
    "Sl. No.",
    "Employee Name",
    "Date of Joining",
    "Date of Leaving",
    "Dapartment",
  ];

  useEffect(() => {
    const dtllist = [];
    officeRecords.data.forEach((item, index) => {
      const dtl = {};

      dtl._id = index + 1;
      dtl.empName = item.empName;
      dtl.doj = convertDate(item.doj);
      dtl.dol = convertDate(item.dol);
      // dtl.dob = convertDate(item);
      dtl.department = item.department;
      dtllist.push(dtl);
    });
    settabledata(dtllist);
  }, [officeRecords.data]);

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
            Official Records
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
            / Official Records
          </div>
        </div>
      </div>
      <div className="row">
        <form
          className={mode ? "formcontainerDark" : "formcontainerLight"}
          onSubmit={handleFrom}
        >
          <div className="row">
            <div
              className="col-10"
              style={{ padding: "0", marginTop: "0.8vw" }}
            >
              <div className="row">
                <div className="col-sm-6" style={{ padding: "0" }}>
                  <select
                    onChange={handleNameField}
                    value={employeeName.value}
                    className={
                      mode
                        ? "fieldPropDark browser-default custom-select"
                        : "fieldPropLight browser-default custom-select"
                    }
                    name="Name"
                    id="edn"
                    disabled={showModifyData}
                  >
                    <option
                      value="employeeSelect"
                      name="employeeSelect"
                      id="employeeSelect"
                      hidden
                    >
                      Select Employee Name*
                    </option>
                    {details !== undefined &&
                      details.map((item) => (
                        <option id={item._id}>
                          {(item.firstName === undefined
                            ? ""
                            : item.firstName) +
                            " " +
                            (item.lastName === undefined ? "" : item.lastName)}
                        </option>
                      ))}
                  </select>
                  <div className="errorDiv">{nameerror}</div>
                </div>
                <div className="col-sm-6" style={{ padding: "0" }}>
                  <DatePicker
                    className={mode ? "fieldPropDark" : "fieldPropLight"}
                    placeholderText="Date of Joining*"
                    dateFormat="dd-MM-yyyy"
                    selected={dateofJoin}
                    onChange={(date) => setdateofJoin(date)}
                    minDate={dob}
                    showYearDropdown
                  />
                  <div className="errorDiv">{joindateerror}</div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-6" style={{ padding: "0" }}>
                  <DatePicker
                    className={mode ? "fieldPropDark" : "fieldPropLight"}
                    placeholderText="Date of Leaving"
                    dateFormat="dd-MM-yyyy"
                    selected={dateofLeaving}
                    onChange={(date) => setdateofLeaving(date)}
                    minDate={dateofJoin}
                    showYearDropdown
                  />
                </div>
                <div className="col-sm-6" style={{ padding: "0" }}>
                  <DropDownComponent
                    Value={department}
                    onchange={(event) => setdepartment(event.target.value)}
                    placeHolder={"Department*"}
                    options={DipartmentList}
                  />
                  <div className="errorDiv">{depterror}</div>
                </div>
              </div>
            </div>
            <div className="col-2" style={{ padding: "0" }}>
              <img
                src={`data:image/png;base64,${image}`}
                alt=""
                loading="lazy"
                style={{
                  height: "8vw",
                  width: "8vw",
                  margin: "1.1vw 2vw 0.5vw 2vw",
                  borderRadius: "0.5vw",
                }}
              />
            </div>
          </div>
          {/* <div className="row">
            <div className="col-sm-6">
              <select
                onChange={(event) => seteducation(event.target.value)}
                value={education}
                className="fieldProp"
                name="Education"
                id="edn"
              >
                <option value={"employeeSelect"} disabled hidden>
                  Education
                </option>
                <option>BE</option>
                <option>B.Sc</option>
                <option>B.Com</option>
                <option>BA</option>
              </select>
              <div className="errorDiv">{eduerror}</div>
            </div>
            
          </div> */}
          <div className="row buttonContainer">
            <button
              onClick={clearDetails}
              className="buttonProp"
              type="reset"
              // style={{ background: "rgb(49, 86, 207)" }}
            >
              <b>Clear All</b>
            </button>

            {showModifyData ? (
              <button
                id="save"
                onClick={onSave}
                className="buttonProp"
                // style={{ marginRight: '0px' }}
              >
                <b>Update</b>
              </button>
            ) : (
              <button
                id="save"
                onClick={onSave}
                className="buttonProp"
                // style={{ marginRight: '0px' }}
              >
                <b>Save</b>
              </button>
            )}
          </div>
        </form>
      </div>
      {tabledata.length > 0 && (
        <div className="row">
          <form className={mode ? "formcontainerDark" : "formcontainerLight"}>
            <TableCompontent
              columnHeaderList={headers}
              isViewColumnRequired={true}
              onClickOfView={viewOfficialDeatils}
              isActionColumnRequired={true}
              onClickofModify={openModifyPopup}
              onClickofDelete={deleteName}
              data={tabledata}
              columnnoToDisplayinConfirmation={2}
              downloadApiURL={
                "https://asmita-mern.herokuapp.com/official/exceldownload"
              }
              documentname={"Employee Official Details"}
            />
          </form>
        </div>
      )}
      {showViewPopup && (
        <div className=" popupBack">
          <div className="row">
            <form
              className={mode ? "viewpopupDark" : "viewpopupLight"}
              onSubmit={handleFrom}
            >
              <i
                className="fas fa-times closeIcon"
                onClick={() => setshowViewPopup(false)}
              ></i>
              <h5 className="listHead">Official Details</h5>
              <ViewModel
                empName={viewEmpname}
                dateOfJoining={viewdoj}
                dateOfLeaving={viewdol}
                Department={viewdpt}
                image={Viewimage}
              />
            </form>
          </div>
        </div>
      )}
    </>
  );
}
