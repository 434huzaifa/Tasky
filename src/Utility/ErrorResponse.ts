/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosError } from "axios";
import showToast from "./showToast"
const ErrorResponse = (err:AxiosError) => {
    const data=err?.response?.data as any
    if (data) {
        showToast("error",data.msg)
       }else{
        showToast("error","Something wrong")
       }
};

export default ErrorResponse;