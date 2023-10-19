import { toast } from "react-toastify";


const showErrorToast = (message, autoCloseTime = 1000) => {

    toast.error(message, {
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

export default showErrorToast;