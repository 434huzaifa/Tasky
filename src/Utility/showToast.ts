import Swal, { SweetAlertIcon } from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

const showToast = (icon:SweetAlertIcon , title:string ) => {
    const Toast = Swal.mixin({
        toast: true,
        position: "bottom-end",
        showConfirmButton: false,
        timer: 2000,
        showCloseButton: true,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },

      });
      Toast.fire({
        icon: icon,
        title: title,
      });
};

export default showToast;