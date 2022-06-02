import { Checkbox, ListItemText, MenuItem, Tooltip } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ConfirmationPopup from "./ConfirmationPopup";
import { toastMessage } from "./toastMessage";

function TableCompontent({
  columnHeaderList,
  isViewColumnRequired = false,
  isSelectColumnRequired = false,
  onClickOfView,
  isActionColumnRequired = false,
  onClickofModify = null,
  onClickofDelete = null,
  data,
  columnnoToDisplayinConfirmation,
  downloadApiURL,
  documentname,
}) {
  const [recortPerPage, setrecortPerPage] = useState("5");
  const [pageNo, setpageNo] = useState("1");
  const [Details, setDetails] = useState([]);
  const [search, setsearch] = useState([]);
  const [searchinput, setsearchinput] = useState("");
  const [searchByinput, setsearchByinput] = useState([]);
  const [searchBy, setsearchBy] = useState([]);
  const [showSearchByMenu, setshowSearchByMenu] = useState(false);
  const [selectAll, setSelectAll] = useState({ key: "All", isSelected: true });
  const [isAscending, setisAscending] = useState({ key: null, isadg: true });
  const [headers, setheaders] = useState([{}]);
  const [tabledata, settabledata] = useState({ issorted: false, data: [] });
  const [selectedRecords, setselectedRecords] = useState([]);
  const [selectAllRecords, setSelectAllRecords] = useState({
    key: "All",
    isSelected: false,
  });
  const [deleteClicked, setdeleteClicked] = useState({
    isClicked: false,
    delid: null,
  });

  const mode = useSelector((state) => state.signInReducer.isDarkMode);

  useEffect(() => {
    let Header = [];
    if (data[0] !== undefined) {
      const detailkeys = Object.keys(data[0]);
      columnHeaderList.map(
        (item, index) =>
          (Header = [...Header, { key: detailkeys[index], name: item }])
      );
      setheaders(Header);
    }
  }, [data]);

  useEffect(() => {
    const filteredArr = (
      searchinput !== "" ? search : tabledata.issorted ? tabledata.data : data
    ).slice(
      parseInt(recortPerPage) * (parseInt(pageNo) - 1),
      parseInt(recortPerPage) * parseInt(pageNo)
    );
    setDetails(filteredArr);
  }, [recortPerPage, pageNo, data, search, tabledata]);

  useEffect(() => {
    setpageNo("1");
  }, [search, recortPerPage, data, tabledata]);

  useEffect(() => {
    searchDetails();
  }, [searchinput]);

  useEffect(() => {
    const searchbyoptions = [];
    headers.map((item) => searchbyoptions.push(item));
    setsearchBy(searchbyoptions);
  }, [headers]);

  const getSearchBy = (item) => {
    let option = [...searchBy];
    if (option.includes(item)) {
      option.splice(option.indexOf(item), 1);
    } else {
      option.push(item);
    }
    setsearchBy(option);
  };

  const searchDetails = () => {
    let searcheddtl = data.filter((item) => {
      let match = false;
      searchBy.map((ite) => {
        if (
          item[ite.key] !== undefined &&
          item[ite.key]
            .toString()
            .toLowerCase()
            .includes(searchinput.toLowerCase())
        ) {
          match = true;
        }
      });
      return match;
    });
    setsearch(searcheddtl);
  };

  useEffect(() => {
    if (searchBy.length === headers.length) {
      setSelectAll({ key: null, isSelected: true });
      setsearchByinput("All");
    } else {
      setSelectAll({ key: null, isSelected: false });
      let tooltip = searchBy.map((item) => item.name).join(", ");
      setsearchByinput(tooltip);
    }
  }, [searchBy]);

  useEffect(() => {
    let options = [];
    if (selectAll.key === "All" && selectAll.isSelected) {
      headers.map((item) => (options = [...options, item]));
      setsearchBy(options);
    } else if (selectAll.key === "All" && !selectAll.isSelected) {
      setsearchBy([]);
    }
  }, [selectAll.isSelected]);

  const sortDetailsInAscendingOrder = (basedOn) => {
    const detail = [...data];
    detail.sort(function (a, b) {
      if (a[basedOn] < b[basedOn]) {
        return -1;
      }
      if (a[basedOn] > b[basedOn]) {
        return 1;
      }
      return 0;
    });
    settabledata({ issorted: true, data: detail });
    setisAscending({ key: basedOn, isadg: false });
  };

  const sortDetailsInDescendingOrder = (basedOn) => {
    const detail = [...data];
    detail.sort(function (a, b) {
      if (a[basedOn] > b[basedOn]) {
        return -1;
      }
      if (a[basedOn] < b[basedOn]) {
        return 1;
      }
      return 0;
    });
    settabledata({ issorted: true, data: detail });
    setisAscending({ key: basedOn, isadg: true });
  };

  const exporttoExcel = async () => {
    const downloadExcelLink = document.getElementById("downloadExcelLink");
    await axios
      .get(downloadApiURL, {
        responseType: "arraybuffer",
      })
      .then(async (response) => {
        console.log(response);
        const downloadExcelBlob = await new Blob([response.data], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          encoding: "UTF-8",
        });
        const downloadExcelObjectURL = URL.createObjectURL(downloadExcelBlob);
        downloadExcelLink.href = downloadExcelObjectURL;
        downloadExcelLink.click();
        toastMessage({
          appearance: "success",
          message: "Record has been downloaded succefully.",
        });
      })
      .catch((err) => {
        toastMessage({ appearance: "error", message: `Error: ${err}` });
      });
  };

  const selectRecords = (record) => {
    let option = [...selectedRecords];
    if (option.includes(record)) {
      option.splice(option.indexOf(record), 1);
    } else {
      option.push(record);
    }
    setselectedRecords(option);
  };

  useEffect(() => {
    if (selectedRecords.length === data.length) {
      setSelectAllRecords({ key: null, isSelected: true });
      setsearchByinput("All");
    } else {
      setSelectAllRecords({ key: null, isSelected: false });
    }
  }, [selectedRecords]);

  useEffect(() => {
    let options = [];
    if (selectAllRecords.key === "All" && selectAllRecords.isSelected) {
      data.map((item) => (options = [...options, item]));
      setselectedRecords(options);
    } else if (selectAllRecords.key === "All" && !selectAllRecords.isSelected) {
      setselectedRecords([]);
    }
  }, [selectAllRecords.isSelected]);

  return (
    <>
      {deleteClicked.isClicked && (
        <ConfirmationPopup
          message={"Are you sure, you want to delete selected records?"}
          onClickofYes={() => {
            onClickofDelete(deleteClicked.delid);
            setdeleteClicked({
              ismultiple: null,
              isClicked: false,
              delid: null,
            });
          }}
          onClickofNo={() =>
            setdeleteClicked({
              ismultiple: null,
              isClicked: false,
              delid: null,
            })
          }
          selectedrecords={
            deleteClicked.ismultiple
              ? selectedRecords
                  .map(
                    (item) =>
                      item[headers[columnnoToDisplayinConfirmation - 1].key]
                  )
                  .join(", ")
              : data[deleteClicked.delid - 1][
                  headers[columnnoToDisplayinConfirmation - 1].key
                ]
          }
        ></ConfirmationPopup>
      )}
      <div className="col-12">
        <div
          className="row"
          style={{ margin: "0 0.1vw", display: "flex", alignItems: "center" }}
        >
          <div
            className={
              mode ? "tableSearchDark col-5" : "tableSearchLight col-5"
            }
          >
            <div
              style={{
                display: "inline",
                fontFamily: "inherit",
              }}
            >
              <Tooltip title={searchByinput}>
                <div
                  style={{
                    display: "inline",
                    fontFamily: "inherit",
                    cursor: "pointer",
                  }}
                  onClick={() => setshowSearchByMenu(!showSearchByMenu)}
                >
                  <input
                    type={"search"}
                    className={
                      mode
                        ? "tablesearchbyinputDark"
                        : "tablesearchbyinputLight"
                    }
                    placeholder="Search By"
                    value={searchByinput}
                    readOnly
                  />
                  <i
                    className="fas fa-caret-down"
                    style={{ margin: "0.4vw" }}
                    onClick={() => setshowSearchByMenu(!showSearchByMenu)}
                  ></i>
                </div>
              </Tooltip>
              {showSearchByMenu && (
                <div
                  style={{
                    zIndex: "2",
                    maxHeight: "15vw",
                    overflow: "auto",
                    position: "absolute",
                    backgroundColor: mode ? "#202124" : "white",
                    boxShadow: "0vw 0 1vw rgb(177, 177, 177)",
                    borderRadius: "0.3vw",
                  }}
                >
                  <MenuItem
                    key={"All"}
                    value={"All"}
                    style={{ padding: "0.5vw 0.5vw" }}
                    onClick={() =>
                      selectAll.isSelected
                        ? setSelectAll({ key: "All", isSelected: false })
                        : setSelectAll({ key: "All", isSelected: true })
                    }
                  >
                    <Checkbox
                      checked={selectAll.isSelected}
                      indeterminate={
                        searchBy.length > 0 && searchBy.length < headers.length
                      }
                      sx={{
                        "&.Mui-checked": {
                          color: mode ? "cornflowerblue" : "rgb(37, 37, 138)",
                        },
                        "& .MuiSvgIcon-root": {
                          fontSize: "1.5vw",
                        },
                        "&.MuiCheckbox-indeterminate": {
                          color: "rgb(37, 37, 138)",
                        },
                        padding: "0",
                        margin: "0 0.5vw 0 0vw",
                      }}
                    />
                    <ListItemText
                      sx={{ "& .MuiTypography-root": { fontSize: "1.1vw" } }}
                      primary={"All"}
                    />
                  </MenuItem>
                  {headers.map((item) => (
                    <MenuItem
                      id={item.key}
                      value={item.name}
                      style={{ padding: "0.5vw 0.5vw" }}
                      onClick={() => getSearchBy(item)}
                    >
                      <Checkbox
                        checked={searchBy.includes(item)}
                        sx={{
                          "&.Mui-checked": {
                            color: mode ? "cornflowerblue" : "rgb(37, 37, 138)",
                          },
                          "& .MuiSvgIcon-root": {
                            fontSize: "1.5vw",
                          },
                          padding: "0",
                          margin: "0 0.5vw 0 0vw",
                        }}
                      />
                      <ListItemText
                        sx={{
                          "& .MuiTypography-root": {
                            fontSize: "1.1vw",
                            // lineHeight: "1",
                          },
                        }}
                        primary={item.name}
                      />
                    </MenuItem>
                  ))}
                </div>
              )}
            </div>
            <div style={{ display: "inline", borderLeft: "0.15vw solid gray" }}>
              <input
                type={"search"}
                className={
                  mode ? "tablesearchinputDark" : "tablesearchinputLight"
                }
                placeholder="Search"
                onFocus={() => setshowSearchByMenu(false)}
                value={searchinput}
                onChange={(event) => setsearchinput(event.target.value)}
              />
              <div className="searchIcon">
                <i className="fas fa-search"></i>
              </div>
            </div>
          </div>
          <div className="col-5">
            {selectedRecords.length > 0 && (
              <div>
                {selectedRecords.length > 1 ? (
                  <i
                    className="fas fa-pen disebledIconProp"
                    style={{ marginLeft: "0" }}
                  />
                ) : (
                  <Tooltip title="Modify record">
                    <i
                      className="fas fa-pen iconProp"
                      style={{ marginLeft: "0" }}
                      onClick={() => onClickofModify(selectedRecords[0])}
                    />
                  </Tooltip>
                )}
                <Tooltip title="Delete record">
                  <i
                    className="fas fa-trash iconProp"
                    onClick={() =>
                      setdeleteClicked({
                        ismultiple: true,
                        isClicked: true,
                        delid: selectedRecords,
                      })
                    }
                  />
                </Tooltip>
                <span
                  style={{
                    marginLeft: "1vw",
                    whiteSpace: "pre",
                    fontWeight: "600",
                    fontSize: "1.2vw",
                  }}
                >
                  Selected Records: {selectedRecords.length}
                </span>
              </div>
            )}
          </div>
          <div className="col-2" style={{ textAlign: "end", padding: "0" }}>
            <a id="downloadExcelLink" download={documentname} href="#"></a>
            <Tooltip title="Download records">
              <i
                className="fas fa-download iconProp"
                style={{ fontSize: "1.5vw" }}
                onClick={exporttoExcel}
              />
            </Tooltip>
          </div>
        </div>
      </div>
      <div
        className="col-12"
        style={{
          maxHeight: "45vh",
          overflow: "auto",
          marginTop: "0.5vw",
          marginBottom: "0.5vw",
        }}
      >
        <table className="detailtable">
          <thead>
            <tr>
              {isSelectColumnRequired && (
                <th
                  className={mode ? "thDark" : "thLight"}
                  style={{ width: "85px" }}
                >
                  <Checkbox
                    checked={selectAllRecords.isSelected}
                    indeterminate={
                      selectedRecords.length !== 0 &&
                      selectedRecords.length < data.length
                    }
                    onChange={() =>
                      selectAllRecords.isSelected
                        ? setSelectAllRecords({ key: "All", isSelected: false })
                        : setSelectAllRecords({ key: "All", isSelected: true })
                    }
                    sx={{
                      "&.Mui-checked": {
                        color: mode ? "cornflowerblue" : "rgb(37, 37, 138)",
                      },
                      "&.MuiCheckbox-indeterminate": {
                        color: mode ? "cornflowerblue" : "rgb(37, 37, 138)",
                      },
                      "& .MuiSvgIcon-root": {
                        fontSize: "1.5vw",
                      },
                      padding: "0",
                      margin: "0 0.5vw 0 0vw",
                    }}
                  />
                </th>
              )}
              {headers.map((item) => (
                <th className={mode ? "thDark" : "thLight"}>
                  {item.name}
                  {isAscending.isadg && isAscending.key === item.key ? (
                    <i
                      className="fas fa-long-arrow-alt-up sortIcon"
                      onClick={() => sortDetailsInAscendingOrder(item.key)}
                      style={{ cursor: "pointer" }}
                    />
                  ) : (
                    <i
                      className="fas fa-long-arrow-alt-down sortIcon"
                      onClick={() => sortDetailsInDescendingOrder(item.key)}
                      style={{ cursor: "pointer" }}
                    />
                  )}
                </th>
              ))}
              {isViewColumnRequired && (
                <th
                  className={mode ? "thDark" : "thLight"}
                  style={{ width: "85px" }}
                >
                  View
                </th>
              )}
              {isActionColumnRequired && (
                <th
                  className={mode ? "thDark" : "thLight"}
                  style={{ width: "85px" }}
                >
                  Action
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {Details.map((item) => (
              <tr>
                {isSelectColumnRequired && (
                  <td
                    className={mode ? "tdDark" : "tdLight"}
                    style={{ width: "85px", textAlign: "center" }}
                  >
                    <Checkbox
                      checked={selectedRecords.includes(item)}
                      onChange={() => selectRecords(item)}
                      sx={{
                        "&.Mui-checked": {
                          color: mode ? "cornflowerblue" : "rgb(37, 37, 138)",
                        },
                        "& .MuiSvgIcon-root": {
                          fontSize: "1.5vw",
                        },
                        padding: "0",
                        margin: "0 0.5vw 0 0vw",
                      }}
                    />
                  </td>
                )}
                {Object.keys(item).map((key, index) => (
                  <td
                    className={mode ? "tdDark" : "tdLight"}
                    style={{
                      textAlign:
                        headers[index].name.toLowerCase() === "sl. no." &&
                        "center",
                    }}
                  >
                    {item[key]}
                  </td>
                ))}

                {isViewColumnRequired && (
                  <td
                    className={mode ? "tdDark" : "tdLight"}
                    style={{
                      width: "85px",
                      color: mode ? "cornflowerblue" : "rgb(37, 37, 138)",
                      cursor: "pointer",
                    }}
                  >
                    <span onClick={() => onClickOfView(item)}>
                      <i
                        className="fas fa-eye"
                        style={{ margin: "0 0.5vw 0 0" }}
                      ></i>
                      View
                    </span>
                  </td>
                )}

                {isActionColumnRequired && (
                  <td
                    className={mode ? "tdDark" : "tdLight"}
                    style={{ textAlign: "center" }}
                  >
                    <Tooltip title="Modify record">
                      <i
                        className="fas fa-pen iconProp"
                        style={{ marginLeft: "0" }}
                        onClick={() => onClickofModify(item)}
                      />
                    </Tooltip>
                    <Tooltip title="Delete record">
                      <i
                        className="fas fa-trash iconProp"
                        onClick={() =>
                          setdeleteClicked({
                            ismultiple: false,
                            isClicked: true,
                            delid: item._id,
                          })
                        }
                      />
                    </Tooltip>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="row">
        <div
          className="col-2"
          style={{ whiteSpace: "pre", fontWeight: "600", fontSize: "1.2vw" }}
        >
          <span>Total Records: </span>
          {data === undefined
            ? "0"
            : (searchinput !== "" ? search : data).length}
        </div>
        <div
          className="col-3"
          style={{ whiteSpace: "pre", fontWeight: "600", fontSize: "1.2vw" }}
        >
          <span>Records per page: </span>
          <select
            onChange={(event) => setrecortPerPage(event.target.value)}
            value={recortPerPage}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
          </select>
          {/* {(searchinput !== "" ? search : details.data).length} */}
        </div>
        <div
          className="col-7"
          style={{
            whiteSpace: "pre",
            fontWeight: "600",
            textAlign: "right",
            fontSize: "1vw",
          }}
        >
          <div>
            <i
              className="fas fa-chevron-left"
              onClick={() =>
                setpageNo(pageNo > 1 ? parseInt(pageNo) - 1 : pageNo)
              }
              style={{ margin: "0 1vw", cursor: "pointer" }}
            />
            <span style={{ border: "1px solid", padding: "0.2vw 0.5vw" }}>
              {pageNo}
            </span>
            <i
              className="fas fa-chevron-right"
              onClick={() =>
                setpageNo(
                  pageNo >= Math.ceil(data.length / recortPerPage)
                    ? pageNo
                    : parseInt(pageNo) + 1
                )
              }
              style={{ margin: "0 1vw", cursor: "pointer" }}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default React.memo(TableCompontent);
