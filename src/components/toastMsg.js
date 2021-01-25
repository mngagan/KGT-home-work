import { toast, ToastContainer } from 'react-toastify';

export const toastMsg = ({ msg, success, error, warning }) => {
    let config = {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    }
    if (success) {
        toast.success(msg, config);
    }
    if (error) {
        toast.error(msg, config)
    }
    if (warning) {
        toast.warn(msg, config)
    }
}