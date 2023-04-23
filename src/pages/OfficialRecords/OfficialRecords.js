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
  const [employeeName, setEmployeeName] = useState({
    value: "employeeSelect",
    id: "",
  });
  const [dateOfJoin, setDateOfJoin] = useState(null);
  const [department, setDepartment] = useState("Department*");
  const [dateOfLeaving, setDateOfLeaving] = useState(null);
  const [nameError, setNameError] = useState(null);
  const [joinDateError, setJoinDateError] = useState(null);
  const [deptError, setDeptError] = useState(null);
  const [dob, setDob] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [officeRecords, setOfficeRecords] = useState({ data: [] });
  const [showModifyData, setShowModifyData] = useState(false);
  const [modificationId, setModificationId] = useState(null);
  const [showViewPopup, setShowViewPopup] = useState(false);
  const [viewImage, setViewImage] = useState(null);
  const [viewEmpName, setViewEmpName] = useState(null);
  const [viewDoj, setViewDoj] = useState(null);
  const [viewDol, setViewDol] = useState(null);
  const [viewDpt, setViewDpt] = useState(null);
  const [image, setImage] = useState(null);
  const details = useSelector(
    (state) => state.signInReducer.personalDetails.details.data
  );
  const mode = useSelector((state) => state.signInReducer.isDarkMode);

  const DepartmentList = ["Account", "HR", "Curriculum", "Sports"];

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
        setOfficeRecords(response);
        console.log(response);
      })
      .catch((err) => {
        toastMessage({ appearance: "error", message: `Error: ${err}` });
      });
  };

  const clearDetails = async () => {
    setEmployeeName({
      value: "employeeSelect",
      id: "",
    });
    setDateOfJoin(null);
    setDateOfLeaving(null);
    setDepartment(null);
    setJoinDateError(null);
    setNameError(null);
    setDeptError(null);
    setImage(null);
    setShowModifyData(false);
  };

  const openModifyPopup = (detail) => {
    setShowModifyData(true);
    const matchedName = details.filter(
      (item) => item.firstName === detail.empName.split(" ").shift()
    );
    getImage(matchedName[0]._id);
    console.log(
      details.filter(
        (item) => item.firstName === detail.empName.split(" ").shift()
      )
    );
    setEmployeeName({
      value: detail.empName !== undefined ? detail.empName : "",
      id: matchedName[0]._id,
    });

    let jdt = [];
    if (detail.doj !== undefined) {
      jdt = detail.doj.split("-");
    }
    let jmonth = months[parseInt(jdt[1]) - 1];
    setDateOfJoin(
      detail.doj !== undefined
        ? new Date(jmonth + " " + jdt[0] + ", " + jdt[2])
        : null
    );
    let ldt = [];
    if (detail.dol !== undefined) {
      ldt = detail.dol.split("-");
    }
    let lmonth = months[parseInt(ldt[1]) - 1];
    setDateOfLeaving(
      detail.dol !== undefined
        ? new Date(lmonth + " " + ldt[0] + ", " + ldt[2])
        : null
    );
    setModificationId(officeRecords.data[detail._id - 1]._id);
    setDepartment(detail.department);
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
      setNameError("Please select employee name.");
    } else {
      setNameError("");
    }
    if (dateOfJoin === null) {
      setJoinDateError("Please select date of join.");
    } else {
      setJoinDateError(null);
    }
    if (department === "Department*") {
      setDeptError("Please select department.");
    } else {
      setDeptError(null);
    }
    if (showModifyData) {
      if (
        employeeName.value !== "employeeSelect" &&
        dateOfJoin !== "" &&
        dateOfLeaving !== "" &&
        department !== "Department*"
      ) {
        dtl.empName = employeeName.value;
        dtl.doj = dateOfJoin;
        dtl.dol = dateOfLeaving;
        dtl.department = department;
        const mdtl = { ...dtl, _id: modificationId };
        await axios
          .post(`${basicURL}/official/update`, mdtl)
          .then(() => {
            getDetails();
            setEmployeeName({
              value: "employeeSelect",
              id: "",
            });
            setImage(null);
            setDepartment("Department*");
            setDateOfJoin(null);
            setDateOfLeaving(null);
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
        dateOfJoin !== "" &&
        // dateOfLeaving !== "" &&
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
          dtl.doj = dateOfJoin;
          dtl.dol = dateOfLeaving;
          dtl.department = department;
          await axios
            .post(`${basicURL}/official/save`, dtl)
            .then(() => {
              getDetails();
              setEmployeeName({
                value: "employeeSelect",
                id: "",
              });
              setDepartment("Department*");
              setDateOfJoin(null);
              setDateOfLeaving(null);
              setImage(null);
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
        setEmployeeName({
          value: "employeeSelect",
          id: "",
        });
        setDepartment("Department*");
        setDateOfJoin(null);
        setDateOfLeaving(null);
        setImage(null);
        setShowModifyData(false);
      })
      .catch((err) => {
        toastMessage({ appearance: "error", message: `Error: ${err.message}` });
      });
  };

  const viewOfficialDetails = (detail) => {
    setShowViewPopup(true);
    const matchedName =
      details !== undefined &&
      details.filter(
        (item) => item.firstName === detail.empName.split(" ").shift()
      );
    getImage(matchedName !== null && matchedName[0]._id, true);
    setViewEmpName(detail.empName);
    setViewDoj(detail.doj);
    setViewDol(detail.dol);
    setViewDpt(detail.department);
  };

  const handleNameField = async (event) => {
    const d_id = event.target[event.target.selectedIndex].id;
    setEmployeeName({
      value: event.target.value,
      id: d_id,
    });
    const matchedDetail = details.filter((item) => d_id === item._id);
    getImage(d_id);
    let dt = [];
    if (matchedDetail[0].dob !== undefined) {
      let date = matchedDetail[0].dob;
      dt = date.split("-");
    }
    let month = months[parseInt(dt[1]) - 1];
    setDob(new Date(month + " " + (parseInt(dt[2]) + 1) + ", " + dt[0]));
  };

  const getImage = async (d_id, isview) => {
    isview ? setViewImage(null) : setImage(null);
    await axios
      .get(`${basicURL}/personal/imageget/${d_id}`)
      .then((resp) => {
        isview
          ? setViewImage(resp.data.convertedImg.image)
          : setImage(resp.data.convertedImg.image);
      })
      .catch((err) => {
        toastMessage({
          appearance: "info",
          message: `Profile photo is not available.`,
        });
      });
  };

  const headers = [
    "Sl. No.",
    "Employee Name",
    "Date of Joining",
    "Date of Leaving",
    "Department",
  ];

  useEffect(() => {
    const dtlList = [];
    officeRecords.data.forEach((item, index) => {
      const dtl = {};

      dtl._id = index + 1;
      dtl.empName = item.empName;
      dtl.doj = convertDate(item.doj);
      dtl.dol = convertDate(item.dol);
      // dtl.dob = convertDate(item);
      dtl.department = item.department;
      dtlList.push(dtl);
    });
    setTableData(dtlList);
  }, [officeRecords.data]);

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
                  <div className="errorDiv">{nameError}</div>
                </div>
                <div className="col-sm-6" style={{ padding: "0" }}>
                  <DatePicker
                    className={mode ? "fieldPropDark" : "fieldPropLight"}
                    placeholderText="Date of Joining*"
                    dateFormat="dd-MM-yyyy"
                    selected={dateOfJoin}
                    onChange={(date) => setDateOfJoin(date)}
                    minDate={dob}
                    showYearDropdown
                  />
                  <div className="errorDiv">{joinDateError}</div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-6" style={{ padding: "0" }}>
                  <DatePicker
                    className={mode ? "fieldPropDark" : "fieldPropLight"}
                    placeholderText="Date of Leaving"
                    dateFormat="dd-MM-yyyy"
                    selected={dateOfLeaving}
                    onChange={(date) => setDateOfLeaving(date)}
                    minDate={dateOfJoin}
                    showYearDropdown
                  />
                </div>
                <div className="col-sm-6" style={{ padding: "0" }}>
                  <DropDownComponent
                    Value={department}
                    onchange={(event) => setDepartment(event.target.value)}
                    placeHolder={"Department*"}
                    options={DepartmentList}
                  />
                  <div className="errorDiv">{deptError}</div>
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
      {tableData.length > 0 && (
        <div className="row">
          <form className={mode ? "formcontainerDark" : "formcontainerLight"}>
            <TableCompontent
              columnHeaderList={headers}
              isViewColumnRequired={true}
              onClickOfView={viewOfficialDetails}
              isActionColumnRequired={true}
              onClickofModify={openModifyPopup}
              onClickofDelete={deleteName}
              data={tableData}
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
                onClick={() => setShowViewPopup(false)}
              ></i>
              <h5 className="listHead">Official Details</h5>
              <ViewModel
                empName={viewEmpName}
                dateOfJoining={viewDoj}
                dateOfLeaving={viewDol}
                Department={viewDpt}
                image={viewImage}
              />
            </form>
          </div>
        </div>
      )}
    </>
  );
}
