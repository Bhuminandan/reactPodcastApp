import { toast } from "react-toastify";

// common redursable toast showwer function for normal messages
const showToast = (message, autoCloseTime = 1000) => {

    toast(message, {
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

export default showToast;