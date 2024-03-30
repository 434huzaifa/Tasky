/* eslint-disable @typescript-eslint/no-explicit-any */
import showToast from "./showToast";

const SuccessResponse = (data:any) => {
    if (data?.msg) {
     showToast("success",data.msg)
    }else{
     showToast("success","Success")
    }
 };
 
 export default SuccessResponse;