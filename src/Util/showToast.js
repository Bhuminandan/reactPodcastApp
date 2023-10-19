import { toast } from "react-toastify";


const showToast = (message, autoCloseTime = 1000) => {

    toast(message, {
        position: "top-right",
        autoCloseTime,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
    });


}

export default showToast;