import { FormControlLabel, Radio, RadioGroup, Typography } from "@mui/material";
import React from "react";
import DatePicker from "react-datepicker";
import { useSelector } from "react-redux";
import InputComponent from "../../Components/InputComponent";

export default function AddModifyComponent({
  firstName,
  setfirstName,
  fnerror,
  lastName,
  setlastName,
  lnerror,
  education,
  seteducation,
  eduerror,
  dateofBirth,
  setdateofBirth,
  dateerror,
  gender,
  setgender,
  gendererror,
  employeePhoto,
  setemployeePhoto,
  fileerror,
  clearDetails,
  onsave,
  buttonName,
}) {
  const mode = useSelector((state) => state.signInReducer.isDarkMode);
  const qualificationList = ["BE", "B.Sc", "B.Com", "BA"];
  return (
    <>
      <div className="row">
        <div className="col-sm-6">
          <InputComponent
            State={firstName}
            setState={setfirstName}
            placeHolder={"First Name*"}
            error={fnerror}
          />
        </div>
        <div className="col-sm-6">
          <InputComponent
            State={lastName}
            setState={setlastName}
            placeHolder={"Last Name"}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-sm-6">
          <select
            onChange={(event) => seteducation(event.target.value)}
            value={education}
            className={
              mode
                ? "fieldPropDark browser-default custom-select"
                : "fieldPropLight browser-default custom-select"
            }
            name={"Qualification*"}
            // defaultValue={"Qualification*"}
          >
            <option value="Qualification*" hidden selected>
              Qualification*
            </option>
            {qualificationList.map((item) => (
              <option value={item}>{item}</option>
            ))}
          </select>
          {/* <DropDownComponent
            Value={education}
            onchange={(event) => seteducation(event.target.value)}
            placeHolder={"Qualification*"}
            options={qualificationList}
          /> */}
          <div className="errorDiv">{eduerror}</div>
        </div>
        <div className="col-sm-6">
          <DatePicker
            className={mode ? "fieldPropDark" : "fieldPropLight"}
            placeholderText="Date of Birth*"
            dateFormat="dd-MM-yyyy"
            selected={dateofBirth}
            onChange={(date) => setdateofBirth(date)}
            maxDate={new Date()}
            showYearDropdown
          />
          <div className="errorDiv">{dateerror}</div>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-6 genderfield">
          <div style={{ display: "flex" }}>
            <label
              style={{
                fontWeight: "700",
                margin: "0 0.5vw",
              }}
            >
              Gender*:
            </label>
            <RadioGroup
              row
              aria-label="gender"
              name="row-radio-buttons-group"
              value={gender}
              onChange={(event) => setgender(event.target.value)}
              style={{
                display: "inline",
                margin: "0 1vw",
                fontFamily: "inherit",
                fontSize: "1.5vw",
              }}
            >
              <FormControlLabel
                value="Female"
                control={
                  <Radio
                    sx={{
                      "& .MuiSvgIcon-root": {
                        fontSize: "1.5vw",
                      },
                      "&.Mui-checked": {
                        color: mode ? "cornflowerblue" : "rgb(37, 37, 138)",
                      },
                      padding: "0",
                      margin: "0 0.5vw 0 1vw",
                      color: "inherit",
                    }}
                  />
                }
                label={
                  <Typography
                    style={{ fontSize: "1vw", fontFamily: "inherit" }}
                  >
                    Female
                  </Typography>
                }
              />
              <FormControlLabel
                value="Male"
                control={
                  <Radio
                    sx={{
                      "& .MuiSvgIcon-root": {
                        fontSize: "1.5vw",
                      },
                      "&.Mui-checked": {
                        color: mode ? "cornflowerblue" : "rgb(37, 37, 138)",
                      },
                      padding: "0",
                      margin: "0 0.5vw 0 1vw",
                      color: "inherit",
                    }}
                  />
                }
                label={
                  <Typography
                    style={{ fontSize: "1vw", fontFamily: "inherit" }}
                  >
                    Male
                  </Typography>
                }
              />
              {/* <RadioButtoComponent Label={"Other" }/> */}
              <FormControlLabel
                value="Other"
                control={
                  <Radio
                    sx={{
                      "& .MuiSvgIcon-root": {
                        fontSize: "1.5vw",
                      },
                      "&.Mui-checked": {
                        color: mode ? "cornflowerblue" : "rgb(37, 37, 138)",
                      },
                      padding: "0",
                      margin: "0 0.5vw 0 1vw",
                      color: "inherit",
                    }}
                  />
                }
                label={
                  <Typography
                    style={{ fontSize: "1vw", fontFamily: "inherit" }}
                  >
                    Other
                  </Typography>
                }
              />
            </RadioGroup>
          </div>
          <div className="errorDiv">{gendererror}</div>
        </div>
        <div className="col-sm-6 genderfield">
          <label
            style={{
              fontWeight: "700",
              margin: "0 0.5vw",
            }}
          >
            Select Your Profile Photo:
          </label>
          <input
            onChange={(event) => setemployeePhoto(event.target.files)}
            value={employeePhoto.name}
            type="file"
            placeholder="Last Name"
            style={{ width: "15vw", cursor: "pointer" }}
            accept="image/png, image/jpeg, image/jpg"
          />
          <div className="errorDiv">{fileerror}</div>
        </div>
      </div>

      <div className="row buttonContainer">
        <button
          onClick={clearDetails}
          className="buttonProp"
          type="reset"
          // style={{ background: "rgb(49, 86, 207)" }}
        >
          <b>Clear All</b>
        </button>

        <button
          id="save"
          onClick={onsave}
          className="buttonProp"
          // style={{ marginRight: '0px' }}
        >
          <b>{buttonName}</b>
        </button>
      </div>
    </>
  );
}
