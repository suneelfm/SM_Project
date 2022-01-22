import axios from "axios";
import { toast } from "react-toastify";

export const getPersonalRecords= () => async (dispatch) => {
    await axios
      .get("https://asmita-mern.herokuapp.com/personal/get")
        .then((response) => {
        return dispatch({ type: "PersonalRecords", detail: response });
      })
      .catch((err) => {
        toast.error(`Error: ${err}`, {
          position: toast.POSITION.BOTTOM_CENTER,
          className: "Toastify__toast-body",
        });
      });
  };