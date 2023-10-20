import { toast } from "react-toastify";


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