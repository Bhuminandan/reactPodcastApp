import { toast } from "react-toastify";

// common redursable toast showwer function for success
const showSuccessToast = (message, autoCloseTime = 1000) => {

    toast.success(message, {
        position: "top-center",
        autoClose: autoCloseTime,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
    });


}

export default showSuccessToast;