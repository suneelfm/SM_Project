import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { basicURL } from "../../basicURL/basicURL";
import TableCompontent from "../../Components/TableCompontent";
import { toastMessage } from "../../Components/toastMessage";

export default function Table(prop) {
  let { value, value1, value2, value3, value4, value5, value6, value7 } =
    useContext(prop.values.context);
  const details = value;
  let setshowModifyPopup = value1;
  let setmodifyFirstName = value2;
  let setmodificationid = value3;
  let setmodifyLastName = value4;
  let setmodifyeducation = value5;
  let setmodifydateofBirth = value6;
  let setmodifygender = value7;

  const [tabledata, settabledata] = useState([]);

  useEffect(() => {
    const dtllist = [];

    details.data.forEach((item, index) => {
      const dtl = {};

      dtl._id = index + 1;
      dtl.firstName = item.firstName;
      dtl.lastName = item.lastName;
      dtl.education = item.education;
      dtl.dob = convertDate(item);
      dtl.gender = item.gender;
      dtllist.push(dtl);
    });
    settabledata(dtllist);
  }, [details.data]);

  const convertDate = (item) => {
    let date = item.dob;
    if (date !== undefined) {
      let dt = date.split("-");
      let cdate = parseInt(dt[2]) + 1 + "-" + dt[1] + "-" + dt[0];
      return cdate;
    }
  };

  const openModifyPopup = (detail) => {
    setshowModifyPopup(true);
    setmodifyFirstName(detail.firstName !== undefined ? detail.firstName : "");
    setmodifyLastName(detail.lastName !== undefined ? detail.lastName : "");
    setmodifyeducation(
      detail.education !== undefined ? detail.education : "edu"
    );
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
    let dt = [];
    if (detail.dob !== undefined) {
      dt = detail.dob.split("-");
    }
    let month = months[parseInt(dt[1]) - 1];
    setmodifydateofBirth(
      detail.dob !== undefined
        ? new Date(month + " " + parseInt(dt[2]) + ", " + dt[0])
        : null
    );
    setmodificationid(detail._id - 1);
    setmodifygender(detail.gender !== undefined ? detail.gender : null);
  };

  const deleteName = async (records) => {
    // const ids = [];
    // records.map((item) => ids.push(details.data[item._id - 1]._id));
    await axios
      .post(
        `${basicURL}/personal/delete`,
        // ids
        { id: details.data[records - 1]._id }
      )
      .then(() => {
        prop.values.fnct();
        toastMessage({
          appearance: "success",
          message: "Record has been deleted succefully",
        });
      })
      .catch((err) => {
        toastMessage({ appearance: "error", message: `Error: ${err}` });
      });
  };

  const headers = [
    "Sl. No.",
    "First Name",
    "Last Name",
    "Qualification",
    "Date of Birth",
    "Gender",
  ];
  return (
    <>
      <TableCompontent
        columnHeaderList={headers}
        // isSerialNoRequired={true}
        isSelectColumnRequired={true}
        isActionColumnRequired={true}
        onClickofModify={openModifyPopup}
        onClickofDelete={deleteName}
        data={tabledata}
        columnnoToDisplayinConfirmation={2}
        downloadApiURL={
          "https://asmita-mern.herokuapp.com/personal/exceldownload"
        }
        documentname={"Employee Personal Details"}
      />
    </>
  );
}
