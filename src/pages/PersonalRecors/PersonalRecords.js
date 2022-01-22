import React, { createContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Table from "./table";
import "react-datepicker/dist/react-datepicker.css";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useDispatch } from "react-redux";
import AddModifyComponent from "./AddModifyComponent";
import { getPersonalRecords } from "../../Redux/Actions/getPersonalRecords";
import { toastMessage } from "../../Components/toastMessage";
import { basicURL } from "../../basicURL/basicURL";

const PersonalDetails = createContext();

export default function PersonalRecords() {
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [education, seteducation] = useState("Qualification*");
  const [dateofBirth, setdateofBirth] = useState(null);
  const [gender, setgender] = useState(null);
  const [employeePhoto, setemployeePhoto] = useState([{ type: "", name: "" }]);
  const [details, setdetails] = useState({ data: [] });
  const [eduerror, seteduerror] = useState("");
  const [fnerror, setfnerror] = useState("");
  const [lnerror, setlnerror] = useState("");
  const [dateerror, setdateerror] = useState("");
  const [gendererror, setgendererror] = useState(null);
  const [showModifyPopup, setshowModifyPopup] = useState(false);
  const [modificationid, setmodificationid] = useState(null);
  const [modifyFirstName, setmodifyFirstName] = useState("");
  const [modifyLastName, setmodifyLastName] = useState("");
  const [modifyeducation, setmodifyeducation] = useState("Qualification*");
  const [modifydateofBirth, setmodifydateofBirth] = useState("");
  const [modifygender, setmodifygender] = useState(null);
  const [moeduerror, setmoeduerror] = useState("");
  const [mofnerror, setmofnerror] = useState("");
  const [molnerror, setmolnerror] = useState("");
  const [modateerror, setmodateerror] = useState("");
  const [mogendererror, setmogendererror] = useState(null);
  const [fileerror, setfileerror] = useState(null);
  const [mofileerror, setmofileerror] = useState(null);
  const [id, setid] = useState(null);

  const edumsg = "Please select your education.";
  const fnmsg = "Please enter your first name.";
  const dobmsg = "Please enter your date of birth.";
  const charmsg = "Please enter only alphabets with max. length 20.";
  const dispatch = useDispatch();

  const handleFrom = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    getDetails();
  }, []);

  const getDetails = async () => {
    await axios
      .get(`${basicURL}/personal/get`)
      .then((response) => {
        setdetails(response);
        dispatch(getPersonalRecords());
      })
      .catch((err) => {
        toastMessage({ appearance: "error", message: `Error: ${err}` });
      });
  };

  const onsave = async () => {
    const dtl = {
      firstName: "",
      lastName: "",
      education: "",
      dob: null,
      gender: null,
    };
    const validImageExtensions = ["jpeg", "png", "jpg"];
    const ext =
      employeePhoto[0].name !== "" && employeePhoto[0].name.split(".").pop();
    if (education === "Qualification*") {
      seteduerror(edumsg);
    } else {
      dtl.education = education;
      seteduerror("");
    }

    if (firstName.trim() === "") {
      setfnerror(fnmsg);
    } else {
      if (/^([a-zA-Z ]){1,20}$/.test(firstName)) {
        dtl.firstName = firstName.trim();
        setfnerror("");
      } else {
        setfnerror(charmsg);
      }
    }

    if (/^([a-zA-Z ]){1,20}$/.test(lastName) || lastName === "") {
      dtl.lastName = lastName.trim();
      setlnerror("");
    } else {
      setlnerror(charmsg);
    }

    if (dateofBirth === null) {
      setdateerror(dobmsg);
    } else {
      // const dd = String(dateofBirth.getDate()).padStart(2, "0");
      // const mm = String(dateofBirth.getMonth() + 1).padStart(2, "0"); //January is 0!
      // const yyyy = dateofBirth.getFullYear();
      dtl.dob = dateofBirth;
      setdateerror("");
    }

    if (gender === null) {
      setgendererror("Please select gender");
    } else {
      setgendererror(null);
      dtl.gender = gender;
    }

    if (
      ext !== false &&
      !(validImageExtensions.indexOf(ext.toLocaleLowerCase()) !== -1) &&
      employeePhoto[0].name !== ""
    ) {
      setfileerror("Please select file only of type jpeg, jpg or png");
    } else {
      setfileerror(null);
    }

    if (
      dtl.education !== "" &&
      dtl.firstName !== "" &&
      dtl.dob !== null &&
      dtl.gender !== null &&
      fileerror === null
    ) {
      await axios
        .post(`${basicURL}/personal/post`, dtl)
        .then(async (response) => {
          setid(response.data.id);
          setfirstName("");
          setlastName("");
          seteducation("Qualification");
          setdateofBirth("");
          setgender(null);
          // await uploadImage(response);
          toastMessage({
            appearance: "success",
            message: "Record has been saved succefully.",
          });
          await getDetails();
        })
        .catch((err) => {
          toastMessage({ appearance: "error", message: `Error: ${err}` });
        });
    }
  };

  useEffect(() => {
    if (id) {
      uploadImage(id);
    }
  }, [id]);

  const uploadImage = (imgid) => {
    const reader = new FileReader();
    reader.onloadend = async () => {
      const formData = new FormData();
      formData.append("file", employeePhoto[0]);
      await axios
        .post(
          `${basicURL}/personal/upload/${imgid}`,
          formData
        )
        .then(() => {
          setemployeePhoto([{ type: "", name: "" }]);
          toastMessage({
            appearance: "success",
            message: showModifyPopup
              ? "Profile Photo has been updated successfully."
              : "Profile Photo has been uploaded successfully.",
          });
        })
        .catch((err) => {
          toastMessage({ appearance: "error", message: `Error: ${err}` });
        });
    };
    if (employeePhoto[0].name !== "" && reader.onloadend) {
      reader.readAsDataURL(employeePhoto[0]);
    }
  };

  const closePopup = () => {
    setshowModifyPopup(false);
    setmodateerror("");
    setmolnerror("");
    setmofnerror("");
    setmoeduerror("");
    setmofileerror(null);
    setmogendererror(null);
  };

  const clearDetails = () => {
    setfirstName("");
    setlastName("");
    seteducation("Qualification*");
    setdateofBirth(null);
    setdateerror("");
    setlnerror("");
    setfnerror("");
    seteduerror("");
    setgender(null);
    setgendererror("");
    setfileerror(null);
    setemployeePhoto([{ type: "", name: "" }]);
  };

  const clearmoDetails = () => {
    setmodifyFirstName("");
    setmodifyLastName("");
    setmodifyeducation("Qualification*");
    setmodifydateofBirth(null);
    setmodifygender(null);
    setmodateerror("");
    setmolnerror("");
    setmofnerror("");
    setmoeduerror(null);
    setmogendererror(null);
  };

  const modifyDetails = () => {
    const mdtl = {
      _id: details.data[modificationid]._id,
      firstName: "",
      lastName: "",
      education: "",
      dob: null,
      gender: null,
    };
    const validImageExtensions = ["jpeg", "png", "jpg"];
    const ext =
      employeePhoto[0].name !== "" && employeePhoto[0].name.split(".").pop();

    // let dtl = details;
    if (modifyeducation === undefined || modifyeducation === "Qualification*") {
      setmoeduerror(edumsg);
    } else {
      mdtl.education = modifyeducation;
      setmoeduerror("");
    }

    if (modifyFirstName === undefined || modifyFirstName.trim() === "") {
      setmofnerror(fnmsg);
    } else {
      if (/^([a-zA-Z ]){1,20}$/.test(modifyFirstName)) {
        mdtl.firstName = modifyFirstName.trim();
        setmofnerror("");
      } else {
        setmofnerror(charmsg);
      }
    }

    if (
      /^([a-zA-Z ]){1,20}$/.test(modifyLastName) ||
      modifyLastName.trim() === ""
    ) {
      mdtl.lastName = modifyLastName.trim();
      setmolnerror("");
    } else {
      setmolnerror(charmsg);
    }

    if (modifydateofBirth === undefined || modifydateofBirth === null) {
      setmodateerror(dobmsg);
    } else {
      // const dd = String(modifydateofBirth.getDate()).padStart(2, "0");
      // const mm = String(modifydateofBirth.getMonth() + 1).padStart(2, "0"); //January is 0!
      // const yyyy = modifydateofBirth.getFullYear();
      mdtl.dob = modifydateofBirth;
      setmodateerror("");
    }

    if (modifygender === null) {
      setmogendererror("Please select gender");
    } else {
      mdtl.gender = modifygender;
    }

    if (
      ext !== false &&
      !(validImageExtensions.indexOf(ext.toLocaleLowerCase()) !== -1) &&
      employeePhoto[0].name !== ""
    ) {
      setmofileerror("Please select file only of type jpeg, jpg or png");
    } else {
      setmofileerror(null);
    }

    if (
      mdtl.education !== "" &&
      mdtl.firstName !== "" &&
      mdtl.dob !== null &&
      mdtl.gender !== null
    ) {
      axios
        .post(`${basicURL}/personal/byid`, mdtl)
        .then(() => {
          setshowModifyPopup(false);
          getDetails();
          uploadImage(mdtl._id);
          toastMessage({
            appearance: "success",
            message: "Record has been updated succefully.",
          });
        })
        .catch((err) => {
          toastMessage({ appearance: "error", message: `Error: ${err}` });
        });
    }
  };

  return (
    <>
      {/* <ToastContainer
        autoClose={3000}
        pauseOnHover={false}
        pauseOnFocusLoss={false}
        hideProgressBar={true}
      />
      <ToastContainer
        toastStyle={{backgroundColor:"green"}}
        autoClose={3000}
        enableMultiContainer
        containerId={"B"}
        position={toast.POSITION.TOP_CENTER}
      /> */}
      <div className="row" style={{ padding: "0px", marginTop: "1vw" }}>
        <div className="col-12" style={{ padding: "0px 1vw" }}>
          <div
            style={{
              color: "rgb(37, 37, 138)",
              marginBottom: "0px",
              fontSize: "1.6vw",
            }}
          >
            Personal Records
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
            / Personal Records
          </div>
        </div>
      </div>
      <div className="row">
        <form className="formcontainer" onSubmit={handleFrom}>
          <AddModifyComponent
            firstName={firstName}
            setfirstName={setfirstName}
            fnerror={fnerror}
            lastName={lastName}
            setlastName={setlastName}
            lnerror={lnerror}
            education={education}
            seteducation={seteducation}
            eduerror={eduerror}
            dateofBirth={dateofBirth}
            setdateofBirth={setdateofBirth}
            dateerror={dateerror}
            gender={gender}
            setgender={setgender}
            gendererror={gendererror}
            employeePhoto={employeePhoto}
            setemployeePhoto={setemployeePhoto}
            fileerror={fileerror}
            clearDetails={clearDetails}
            onsave={onsave}
            buttonName={"Save"}
          />
        </form>
      </div>

      {details.data.length > 0 && (
        <div className="row">
          <form className="formcontainer">
            <PersonalDetails.Provider
              value={{
                value: details,
                value1: setshowModifyPopup,
                value2: setmodifyFirstName,
                value3: setmodificationid,
                value4: setmodifyLastName,
                value5: setmodifyeducation,
                value6: setmodifydateofBirth,
                value7: setmodifygender,
              }}
            >
              <Table values={{ context: PersonalDetails, fnct: getDetails }} />
            </PersonalDetails.Provider>
          </form>
        </div>
      )}
      {showModifyPopup && (
        <div className=" popupBack">
          <div className="row">
            <form className="popup" onSubmit={handleFrom}>
              <i className="fas fa-times closeIcon" onClick={closePopup}></i>
              <h5 className="listHead">Modify Personal Records</h5>
              <AddModifyComponent
                handleFrom={handleFrom}
                firstName={modifyFirstName}
                setfirstName={setmodifyFirstName}
                fnerror={mofnerror}
                lastName={modifyLastName}
                setlastName={setmodifyLastName}
                lnerror={molnerror}
                education={modifyeducation}
                seteducation={setmodifyeducation}
                eduerror={moeduerror}
                dateofBirth={modifydateofBirth}
                setdateofBirth={setmodifydateofBirth}
                dateerror={modateerror}
                gender={modifygender}
                setgender={setmodifygender}
                gendererror={mogendererror}
                employeePhoto={employeePhoto}
                setemployeePhoto={setemployeePhoto}
                fileerror={mofileerror}
                clearDetails={clearmoDetails}
                onsave={modifyDetails}
                buttonName={"Update"}
              />
            </form>
          </div>
        </div>
      )}
    </>
  );
}
