import { toast } from "react-toastify";

export const toastMessage = ({
  appearance,
  message,
  timeout = 2000,
  hideProgress = true,
  position,
}) => {
  toast.configure();
  switch (appearance) {
    case "error":
      toast.error(message, {
        toastId: "custom-id-yes",
        position:
          position === "bottom_left"
            ? toast.POSITION.BOTTOM_LEFT
            : position === "top_center"
            ? toast.POSITION.TOP_CENTER
            : position === "top_left"
            ? toast.POSITION.TOP_LEFT
            : position === "top_right"
            ? toast.POSITION.TOP_RIGHT
            : position === "bottom_right"
            ? toast.POSITION.BOTTOM_RIGHT
            : toast.POSITION.BOTTOM_CENTER,
        className: "Toastify__toast-body toast-error-container",
        hideProgressBar: hideProgress,
        autoClose: timeout,
      });
      break;
    case "success":
      toast.success(message, {
        toastId: "custom-id-yes",
        position:
          position === "bottom_left"
            ? toast.POSITION.BOTTOM_LEFT
            : position === "top_center"
            ? toast.POSITION.TOP_CENTER
            : position === "top_left"
            ? toast.POSITION.TOP_LEFT
            : position === "top_right"
            ? toast.POSITION.TOP_RIGHT
            : position === "bottom_right"
            ? toast.POSITION.BOTTOM_RIGHT
            : toast.POSITION.BOTTOM_CENTER,
        className: "Toastify__toast-body toast-success-container",
        hideProgressBar: hideProgress,
        autoClose: timeout,
      });

      break;
    case "info":
      toast.info(message, {
        toastId: "custom-id-yes",
        position:
          position === "bottom_left"
            ? toast.POSITION.BOTTOM_LEFT
            : position === "top_center"
            ? toast.POSITION.TOP_CENTER
            : position === "top_left"
            ? toast.POSITION.TOP_LEFT
            : position === "top_right"
            ? toast.POSITION.TOP_RIGHT
            : position === "bottom_right"
            ? toast.POSITION.BOTTOM_RIGHT
            : toast.POSITION.BOTTOM_CENTER,
        className: "Toastify__toast-body toast-info-container",
        hideProgressBar: hideProgress,
        autoClose: timeout,
      });

      break;
    case "warn":
      toast.warn(message, {
        toastId: "custom-id-yes",
        position:
          position === "bottom_left"
            ? toast.POSITION.BOTTOM_LEFT
            : position === "top_center"
            ? toast.POSITION.TOP_CENTER
            : position === "top_left"
            ? toast.POSITION.TOP_LEFT
            : position === "top_right"
            ? toast.POSITION.TOP_RIGHT
            : position === "bottom_right"
            ? toast.POSITION.BOTTOM_RIGHT
            : toast.POSITION.BOTTOM_CENTER,
        className: "Toastify__toast-body toast-warn-container",
        hideProgressBar: hideProgress,
        autoClose: timeout,
      });

      break;

    default:
      break;
  }
};
