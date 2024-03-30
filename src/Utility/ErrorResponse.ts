/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosError } from "axios";
import showToast from "./showToast"
const ErrorResponse = (err:AxiosError) => {
    const msg=err?.response?.data as any
    if (msg) {
        showToast("error",msg)
       }else{
        showToast("error","Something wrong")
       }
};

export default ErrorResponse;